import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the notifyOwner function
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

// Mock the database functions
vi.mock("./db", () => ({
  createBooking: vi.fn().mockResolvedValue("BK12345678"),
  getBookingByRef: vi.fn().mockResolvedValue({
    id: 1,
    bookingRef: "BK12345678",
    customerName: "Test Customer",
    customerEmail: "test@example.com",
    customerPhone: "+60123456789",
    pickupAddress: "123 Test St, KL",
    deliveryAddress: "456 Delivery Ave, Selangor",
    packageWeight: "1-3 kg",
    serviceType: "next-day",
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
  getAllBookings: vi.fn().mockResolvedValue([]),
  updateBookingStatus: vi.fn().mockResolvedValue(undefined),
  createContactInquiry: vi.fn().mockResolvedValue(1),
  getAllContactInquiries: vi.fn().mockResolvedValue([]),
  updateInquiryStatus: vi.fn().mockResolvedValue(undefined),
  getParcelByTrackingNumber: vi.fn(),
  getParcelStatusHistory: vi.fn(),
  createParcel: vi.fn(),
  getAllParcels: vi.fn(),
  addParcelStatusHistory: vi.fn(),
  upsertUser: vi.fn(),
  getUserByOpenId: vi.fn(),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("Booking Form", () => {
  it("creates a booking successfully with all required fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.booking.create({
      customerName: "John Doe",
      customerEmail: "john@example.com",
      customerPhone: "+60123456789",
      pickupAddress: "123 Jalan Test, Kuala Lumpur",
      deliveryAddress: "456 Jalan Delivery, Selangor",
      packageWeight: "1-3 kg",
      serviceType: "next-day",
      specialInstructions: "Handle with care",
    });

    expect(result).toHaveProperty("bookingRef");
    expect(result.bookingRef).toBe("BK12345678");
  });

  it("creates a booking with scheduled date", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const scheduledDate = "2026-01-20T10:00:00.000Z";

    const result = await caller.booking.create({
      customerName: "Jane Smith",
      customerEmail: "jane@example.com",
      customerPhone: "+60198765432",
      pickupAddress: "789 Scheduled St, Penang",
      deliveryAddress: "321 Future Ave, Johor",
      packageWeight: "3-5 kg",
      serviceType: "scheduled",
      scheduledDate: scheduledDate,
      specialInstructions: "Deliver in the morning",
    });

    expect(result).toHaveProperty("bookingRef");
    expect(result.bookingRef).toBe("BK12345678");
  });

  it("rejects booking with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.booking.create({
        customerName: "Invalid Email User",
        customerEmail: "not-an-email",
        customerPhone: "+60123456789",
        pickupAddress: "123 Test St",
        deliveryAddress: "456 Delivery Ave",
        packageWeight: "1-3 kg",
        serviceType: "same-day",
      })
    ).rejects.toThrow();
  });

  it("rejects booking with missing required fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.booking.create({
        customerName: "",
        customerEmail: "test@example.com",
        customerPhone: "+60123456789",
        pickupAddress: "123 Test St",
        deliveryAddress: "456 Delivery Ave",
        packageWeight: "1-3 kg",
        serviceType: "next-day",
      })
    ).rejects.toThrow();
  });
});

describe("Contact Form", () => {
  it("submits contact inquiry successfully", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "Contact User",
      email: "contact@example.com",
      phone: "+60123456789",
      subject: "General Inquiry",
      message: "I have a question about your services.",
    });

    expect(result).toEqual({ success: true, id: 1 });
  });

  it("submits contact inquiry without phone number", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "No Phone User",
      email: "nophone@example.com",
      subject: "Pricing Question",
      message: "What are your rates for bulk shipments?",
    });

    expect(result).toEqual({ success: true, id: 1 });
  });

  it("rejects contact inquiry with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "Invalid Email",
        email: "invalid-email",
        subject: "Test",
        message: "This should fail",
      })
    ).rejects.toThrow();
  });

  it("rejects contact inquiry with empty message", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "Empty Message User",
        email: "test@example.com",
        subject: "Empty",
        message: "",
      })
    ).rejects.toThrow();
  });
});
