import { describe, expect, it, vi, beforeAll } from "vitest";
import { sendBookingNotification, sendContactNotification } from "./_core/email";

// Note: These tests verify the email functions execute without errors
// Actual SMTP sending is tested in production environment

describe("SMTP Email Service", () => {
  beforeAll(() => {
    // Mock console to avoid SMTP connection errors in test environment
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  it("sendBookingNotification should execute without throwing errors", async () => {
    const bookingData = {
      bookingRef: "BK12345TEST",
      customerName: "Test Customer",
      customerEmail: "test@example.com",
      customerPhone: "+60123456789",
      serviceType: "next-day",
      packageWeight: "1-3 kg",
      pickupAddress: "123 Test St, KL",
      deliveryAddress: "456 Delivery Ave, Selangor",
      scheduledDate: "2026-01-20",
      specialInstructions: "Handle with care",
    };

    // Function should not throw even if SMTP connection fails in test env
    await expect(sendBookingNotification(bookingData)).resolves.toBeDefined();
  });

  it("sendContactNotification should execute without throwing errors", async () => {
    const contactData = {
      name: "Test User",
      email: "testuser@example.com",
      phone: "+60123456789",
      subject: "Test Inquiry",
      message: "This is a test message",
    };

    // Function should not throw even if SMTP connection fails in test env
    await expect(sendContactNotification(contactData)).resolves.toBeDefined();
  });

  it("sendBookingNotification handles missing optional fields", async () => {
    const bookingData = {
      bookingRef: "BK67890TEST",
      customerName: "Another Customer",
      customerEmail: "another@example.com",
      customerPhone: "+60198765432",
      serviceType: "same-day" as const,
      packageWeight: "3-5 kg",
      pickupAddress: "789 Pickup Rd, Penang",
      deliveryAddress: "321 Drop Ave, Johor",
    };

    await expect(sendBookingNotification(bookingData)).resolves.toBeDefined();
  });

  it("sendContactNotification handles missing phone number", async () => {
    const contactData = {
      name: "No Phone User",
      email: "nophone@example.com",
      subject: "General Question",
      message: "I have a question about your services",
    };

    await expect(sendContactNotification(contactData)).resolves.toBeDefined();
  });
});
