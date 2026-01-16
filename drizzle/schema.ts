import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Parcel tracking table
export const parcels = mysqlTable("parcels", {
  id: int("id").autoincrement().primaryKey(),
  trackingNumber: varchar("trackingNumber", { length: 32 }).notNull().unique(),
  senderName: varchar("senderName", { length: 255 }).notNull(),
  senderPhone: varchar("senderPhone", { length: 20 }).notNull(),
  senderAddress: text("senderAddress").notNull(),
  receiverName: varchar("receiverName", { length: 255 }).notNull(),
  receiverPhone: varchar("receiverPhone", { length: 20 }).notNull(),
  receiverAddress: text("receiverAddress").notNull(),
  weight: varchar("weight", { length: 20 }).notNull(),
  serviceType: mysqlEnum("serviceType", ["same-day", "next-day", "scheduled", "bulk"]).notNull(),
  status: mysqlEnum("status", ["collected", "in-transit", "out-for-delivery", "delivered"]).default("collected").notNull(),
  estimatedDelivery: timestamp("estimatedDelivery"),
  actualDelivery: timestamp("actualDelivery"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Parcel = typeof parcels.$inferSelect;
export type InsertParcel = typeof parcels.$inferInsert;

// Parcel status history for tracking timeline
export const parcelStatusHistory = mysqlTable("parcelStatusHistory", {
  id: int("id").autoincrement().primaryKey(),
  parcelId: int("parcelId").notNull(),
  status: mysqlEnum("status", ["collected", "in-transit", "out-for-delivery", "delivered"]).notNull(),
  location: varchar("location", { length: 255 }),
  description: text("description"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export type ParcelStatusHistory = typeof parcelStatusHistory.$inferSelect;
export type InsertParcelStatusHistory = typeof parcelStatusHistory.$inferInsert;

// Booking requests table
export const bookings = mysqlTable("bookings", {
  id: int("id").autoincrement().primaryKey(),
  bookingRef: varchar("bookingRef", { length: 32 }).notNull().unique(),
  customerName: varchar("customerName", { length: 255 }).notNull(),
  customerEmail: varchar("customerEmail", { length: 320 }).notNull(),
  customerPhone: varchar("customerPhone", { length: 20 }).notNull(),
  pickupAddress: text("pickupAddress").notNull(),
  deliveryAddress: text("deliveryAddress").notNull(),
  packageWeight: varchar("packageWeight", { length: 20 }).notNull(),
  serviceType: mysqlEnum("serviceType", ["same-day", "next-day", "scheduled", "bulk"]).notNull(),
  scheduledDate: timestamp("scheduledDate"),
  specialInstructions: text("specialInstructions"),
  status: mysqlEnum("bookingStatus", ["pending", "confirmed", "picked-up", "completed", "cancelled"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;

// Contact inquiries table
export const contactInquiries = mysqlTable("contactInquiries", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  status: mysqlEnum("inquiryStatus", ["new", "read", "replied", "closed"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ContactInquiry = typeof contactInquiries.$inferSelect;
export type InsertContactInquiry = typeof contactInquiries.$inferInsert;