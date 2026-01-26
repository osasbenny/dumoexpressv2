import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, users, 
  parcels, InsertParcel, Parcel,
  parcelStatusHistory, InsertParcelStatusHistory, ParcelStatusHistory,
  bookings, InsertBooking, Booking,
  contactInquiries, InsertContactInquiry, ContactInquiry
} from "../drizzle/schema";
import { ENV } from './_core/env';
import { nanoid } from 'nanoid';
import fs from 'fs';
import path from 'path';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============ Parcel Tracking Queries ============

export async function getParcelByTrackingNumber(trackingNumber: string): Promise<Parcel | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(parcels).where(eq(parcels.trackingNumber, trackingNumber)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getParcelStatusHistory(parcelId: number): Promise<ParcelStatusHistory[]> {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(parcelStatusHistory)
    .where(eq(parcelStatusHistory.parcelId, parcelId))
    .orderBy(desc(parcelStatusHistory.timestamp));
}

export async function createParcel(parcel: Omit<InsertParcel, 'trackingNumber'>): Promise<string> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const trackingNumber = `DE${nanoid(10).toUpperCase()}`;
  await db.insert(parcels).values({ ...parcel, trackingNumber });
  
  // Add initial status history
  const newParcel = await getParcelByTrackingNumber(trackingNumber);
  if (newParcel) {
    await addParcelStatusHistory({
      parcelId: newParcel.id,
      status: 'collected',
      location: 'DumoExpress Hub',
      description: 'Parcel collected and registered in system'
    });
  }
  
  return trackingNumber;
}

export async function addParcelStatusHistory(history: InsertParcelStatusHistory): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(parcelStatusHistory).values(history);
  
  // Update parcel status
  if (history.parcelId) {
    await db.update(parcels)
      .set({ status: history.status })
      .where(eq(parcels.id, history.parcelId));
  }
}

export async function getAllParcels(): Promise<Parcel[]> {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(parcels).orderBy(desc(parcels.createdAt));
}

// ============ Booking Queries ============

export async function createBooking(booking: Omit<InsertBooking, 'bookingRef'>): Promise<string> {
  const db = await getDb();
  
  const bookingRef = `DES${nanoid(8).toUpperCase()}`; // DES + 8 characters format
  
  // Save to database if available
  if (db) {
    try {
      await db.insert(bookings).values({ ...booking, bookingRef });
    } catch (error) {
      console.error("[Database] Failed to save booking:", error);
    }
  }

  // Also save to tracking-data.json for cPanel/Static deployment compatibility
  try {
    const trackingDataPath = path.resolve(process.cwd(), 'client', 'public', 'tracking-data.json');
    const distTrackingDataPath = path.resolve(process.cwd(), 'dist', 'public', 'tracking-data.json');
    
    let data = { shipments: [] };
    if (fs.existsSync(trackingDataPath)) {
      const content = fs.readFileSync(trackingDataPath, 'utf-8');
      data = JSON.parse(content);
    }

    // Map service type to display name
    const serviceMap = {
      'same-day': 'Same-Day Delivery',
      'next-day': 'Next-Day Delivery',
      'scheduled': 'Scheduled Pickup',
      'bulk': 'Bulk Shipment'
    };

    const now = new Date();
    const estDelivery = new Date();
    estDelivery.setDate(now.getDate() + 3); // Default 3 days delivery

    const newShipment = {
      trackingNumber: bookingRef,
      sender: {
        name: booking.customerName,
        location: booking.pickupAddress
      },
      receiver: {
        name: "To be assigned",
        address: booking.deliveryAddress
      },
      package: {
        description: "New Booking",
        weight: booking.packageWeight
      },
      serviceType: serviceMap[booking.serviceType as keyof typeof serviceMap] || booking.serviceType,
      status: "Collected",
      createdAt: now.toISOString(),
      estimatedDelivery: estDelivery.toISOString(),
      history: [
        {
          status: "Collected",
          timestamp: now.toISOString(),
          location: "Online Booking",
          description: "Shipment created via online booking"
        }
      ]
    };

    data.shipments.push(newShipment as any);
    
    const updatedContent = JSON.stringify(data, null, 2);
    fs.writeFileSync(trackingDataPath, updatedContent);
    
    // Also update dist if it exists (for immediate preview)
    if (fs.existsSync(path.dirname(distTrackingDataPath))) {
      fs.writeFileSync(distTrackingDataPath, updatedContent);
    }
    
    console.log(`[Storage] Booking ${bookingRef} saved to tracking-data.json`);
  } catch (error) {
    console.error("[Storage] Failed to save to tracking-data.json:", error);
  }
  
  return bookingRef;
}

export async function getBookingByRef(bookingRef: string): Promise<Booking | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(bookings).where(eq(bookings.bookingRef, bookingRef)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllBookings(): Promise<Booking[]> {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(bookings).orderBy(desc(bookings.createdAt));
}

export async function updateBookingStatus(bookingRef: string, status: Booking['status']): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(bookings).set({ status }).where(eq(bookings.bookingRef, bookingRef));
}

// ============ Contact Inquiry Queries ============

export async function createContactInquiry(inquiry: InsertContactInquiry): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(contactInquiries).values(inquiry);
  return Number(result[0].insertId);
}

export async function getAllContactInquiries(): Promise<ContactInquiry[]> {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(contactInquiries).orderBy(desc(contactInquiries.createdAt));
}

export async function updateInquiryStatus(id: number, status: ContactInquiry['status']): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(contactInquiries).set({ status }).where(eq(contactInquiries.id, id));
}
