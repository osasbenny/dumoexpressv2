import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  getParcelByTrackingNumber,
  getParcelStatusHistory,
  createParcel,
  getAllParcels,
  createBooking,
  getBookingByRef,
  getAllBookings,
  updateBookingStatus,
  createContactInquiry,
  getAllContactInquiries,
  updateInquiryStatus,
  addParcelStatusHistory
} from "./db";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Parcel Tracking Router
  tracking: router({
    // Public: Track a parcel by tracking number
    track: publicProcedure
      .input(z.object({ trackingNumber: z.string().min(1) }))
      .query(async ({ input }) => {
        const parcel = await getParcelByTrackingNumber(input.trackingNumber.toUpperCase());
        if (!parcel) {
          return { found: false, parcel: null, history: [] };
        }
        const history = await getParcelStatusHistory(parcel.id);
        return { found: true, parcel, history };
      }),
    
    // Admin: Get all parcels
    list: protectedProcedure.query(async () => {
      return await getAllParcels();
    }),
    
    // Admin: Create a new parcel
    create: protectedProcedure
      .input(z.object({
        senderName: z.string().min(1),
        senderPhone: z.string().min(1),
        senderAddress: z.string().min(1),
        receiverName: z.string().min(1),
        receiverPhone: z.string().min(1),
        receiverAddress: z.string().min(1),
        weight: z.string().min(1),
        serviceType: z.enum(['same-day', 'next-day', 'scheduled', 'bulk']),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const trackingNumber = await createParcel(input);
        return { trackingNumber };
      }),
    
    // Admin: Update parcel status
    updateStatus: protectedProcedure
      .input(z.object({
        parcelId: z.number(),
        status: z.enum(['collected', 'in-transit', 'out-for-delivery', 'delivered']),
        location: z.string().optional(),
        description: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await addParcelStatusHistory({
          parcelId: input.parcelId,
          status: input.status,
          location: input.location,
          description: input.description,
        });
        return { success: true };
      }),
  }),
  
  // Booking Router
  booking: router({
    // Public: Create a new booking
    create: publicProcedure
      .input(z.object({
        customerName: z.string().min(1),
        customerEmail: z.string().email(),
        customerPhone: z.string().min(1),
        pickupAddress: z.string().min(1),
        deliveryAddress: z.string().min(1),
        packageWeight: z.string().min(1),
        serviceType: z.enum(['same-day', 'next-day', 'scheduled', 'bulk']),
        scheduledDate: z.date().optional(),
        specialInstructions: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const bookingRef = await createBooking(input);
        // Notify owner of new booking
        await notifyOwner({
          title: 'New Booking Request',
          content: `New booking ${bookingRef} from ${input.customerName}. Service: ${input.serviceType}. Pickup: ${input.pickupAddress}`
        });
        return { bookingRef };
      }),
    
    // Public: Check booking status
    check: publicProcedure
      .input(z.object({ bookingRef: z.string().min(1) }))
      .query(async ({ input }) => {
        const booking = await getBookingByRef(input.bookingRef.toUpperCase());
        return { found: !!booking, booking };
      }),
    
    // Admin: Get all bookings
    list: protectedProcedure.query(async () => {
      return await getAllBookings();
    }),
    
    // Admin: Update booking status
    updateStatus: protectedProcedure
      .input(z.object({
        bookingRef: z.string().min(1),
        status: z.enum(['pending', 'confirmed', 'picked-up', 'completed', 'cancelled']),
      }))
      .mutation(async ({ input }) => {
        await updateBookingStatus(input.bookingRef, input.status);
        return { success: true };
      }),
  }),
  
  // Contact Inquiry Router
  contact: router({
    // Public: Submit a contact inquiry
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        subject: z.string().min(1),
        message: z.string().min(1),
      }))
      .mutation(async ({ input }) => {
        const id = await createContactInquiry(input);
        // Notify owner of new inquiry
        await notifyOwner({
          title: 'New Contact Inquiry',
          content: `From: ${input.name} (${input.email})\nSubject: ${input.subject}\nMessage: ${input.message}`
        });
        return { success: true, id };
      }),
    
    // Admin: Get all inquiries
    list: protectedProcedure.query(async () => {
      return await getAllContactInquiries();
    }),
    
    // Admin: Update inquiry status
    updateStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(['new', 'read', 'replied', 'closed']),
      }))
      .mutation(async ({ input }) => {
        await updateInquiryStatus(input.id, input.status);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
