import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database functions
vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue(null),
  getParcelByTrackingNumber: vi.fn().mockResolvedValue(null),
  getParcelStatusHistory: vi.fn().mockResolvedValue([]),
  createBooking: vi.fn().mockImplementation(() => {
    // Generate a unique booking reference
    return `BK${Date.now()}${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  }),
  createContactInquiry: vi.fn().mockResolvedValue(1),
  upsertUser: vi.fn(),
  getUserByOpenId: vi.fn(),
}));

// Mock the notification function
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
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

describe("tracking.track", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns not found for non-existent tracking number", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.tracking.track({ trackingNumber: "INVALID123" });

    expect(result.found).toBe(false);
    expect(result.parcel).toBeNull();
  });

  it("handles tracking number with uppercase conversion", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // Should handle lowercase input
    const result = await caller.tracking.track({ trackingNumber: "de1234567890" });
    expect(result.found).toBe(false);
  });
});

describe("booking.create", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates a booking with valid data", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const bookingData = {
      serviceType: "next-day" as const,
      customerName: "John Doe",
      customerEmail: "john@example.com",
      customerPhone: "+60123456789",
      pickupAddress: "123 Jalan Test, KL",
      deliveryAddress: "456 Jalan Delivery, Penang",
      packageWeight: "1-3 kg",
      specialInstructions: "Handle with care",
    };

    const result = await caller.booking.create(bookingData);

    expect(result.bookingRef).toBeDefined();
    expect(result.bookingRef).toMatch(/^BK/);
  });

  it("generates unique booking references", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const bookingData = {
      serviceType: "same-day" as const,
      customerName: "Jane Doe",
      customerEmail: "jane@example.com",
      customerPhone: "+60198765432",
      pickupAddress: "789 Jalan Pickup, Selangor",
      deliveryAddress: "101 Jalan Drop, Johor",
      packageWeight: "Up to 1 kg",
    };

    const result1 = await caller.booking.create(bookingData);
    const result2 = await caller.booking.create(bookingData);

    expect(result1.bookingRef).toBeDefined();
    expect(result2.bookingRef).toBeDefined();
    expect(result1.bookingRef).not.toBe(result2.bookingRef);
  });
});

describe("contact.submit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("submits a contact inquiry successfully", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const contactData = {
      name: "Test User",
      email: "test@example.com",
      phone: "+60123456789",
      subject: "General Inquiry",
      message: "This is a test message",
    };

    const result = await caller.contact.submit(contactData);

    expect(result.success).toBe(true);
    expect(result.id).toBeDefined();
  });

  it("handles contact submission without phone number", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const contactData = {
      name: "Test User",
      email: "test@example.com",
      subject: "Pricing & Quotes",
      message: "I need a quote for bulk shipping",
    };

    const result = await caller.contact.submit(contactData);

    expect(result.success).toBe(true);
  });
});
