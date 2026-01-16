# DumoExpress API Specification

**Version:** 1.0.0  
**Base URL:** `/api/trpc`  
**Author:** Manus AI  
**Last Updated:** January 2026

## Overview

The DumoExpress API provides endpoints for parcel tracking, booking management, and contact inquiries. The API is built using tRPC (TypeScript Remote Procedure Call) which provides end-to-end type safety between the client and server.

## Authentication

The API uses session-based authentication via HTTP-only cookies. Protected endpoints require a valid session cookie obtained through the OAuth login flow.

| Endpoint Type | Authentication Required |
|--------------|------------------------|
| Public Procedures | No |
| Protected Procedures | Yes (Admin only) |

## API Endpoints

### 1. Tracking API

#### 1.1 Track Parcel (Public)

Track a parcel by its tracking number.

**Procedure:** `tracking.track`  
**Type:** Query  
**Authentication:** None required

**Input Schema:**
```typescript
{
  trackingNumber: string // Required, min 1 character
}
```

**Response Schema:**
```typescript
{
  found: boolean,
  parcel: {
    id: number,
    trackingNumber: string,
    senderName: string,
    senderPhone: string,
    senderAddress: string,
    receiverName: string,
    receiverPhone: string,
    receiverAddress: string,
    weight: string,
    serviceType: 'same-day' | 'next-day' | 'scheduled' | 'bulk',
    status: 'collected' | 'in-transit' | 'out-for-delivery' | 'delivered',
    notes: string | null,
    estimatedDelivery: Date | null,
    createdAt: Date,
    updatedAt: Date
  } | null,
  history: Array<{
    id: number,
    parcelId: number,
    status: string,
    location: string | null,
    description: string | null,
    timestamp: Date
  }>
}
```

**Example Request:**
```typescript
const result = await trpc.tracking.track.query({ 
  trackingNumber: "DE1234567890" 
});
```

#### 1.2 List All Parcels (Admin)

Retrieve all parcels in the system.

**Procedure:** `tracking.list`  
**Type:** Query  
**Authentication:** Required (Admin)

**Response:** Array of parcel objects

#### 1.3 Create Parcel (Admin)

Create a new parcel entry in the system.

**Procedure:** `tracking.create`  
**Type:** Mutation  
**Authentication:** Required (Admin)

**Input Schema:**
```typescript
{
  senderName: string,
  senderPhone: string,
  senderAddress: string,
  receiverName: string,
  receiverPhone: string,
  receiverAddress: string,
  weight: string,
  serviceType: 'same-day' | 'next-day' | 'scheduled' | 'bulk',
  notes?: string
}
```

**Response:**
```typescript
{
  trackingNumber: string // Generated tracking number (format: DE + 10 chars)
}
```

#### 1.4 Update Parcel Status (Admin)

Update the status of a parcel and add to tracking history.

**Procedure:** `tracking.updateStatus`  
**Type:** Mutation  
**Authentication:** Required (Admin)

**Input Schema:**
```typescript
{
  parcelId: number,
  status: 'collected' | 'in-transit' | 'out-for-delivery' | 'delivered',
  location?: string,
  description?: string
}
```

### 2. Booking API

#### 2.1 Create Booking (Public)

Submit a new delivery booking request.

**Procedure:** `booking.create`  
**Type:** Mutation  
**Authentication:** None required

**Input Schema:**
```typescript
{
  customerName: string,
  customerEmail: string, // Valid email format
  customerPhone: string,
  pickupAddress: string,
  deliveryAddress: string,
  packageWeight: string,
  serviceType: 'same-day' | 'next-day' | 'scheduled' | 'bulk',
  scheduledDate?: Date,
  specialInstructions?: string
}
```

**Response:**
```typescript
{
  bookingRef: string // Generated reference (format: BK + timestamp + random)
}
```

**Side Effects:**
- Sends notification to owner about new booking

#### 2.2 Check Booking Status (Public)

Check the status of an existing booking.

**Procedure:** `booking.check`  
**Type:** Query  
**Authentication:** None required

**Input Schema:**
```typescript
{
  bookingRef: string
}
```

**Response:**
```typescript
{
  found: boolean,
  booking: {
    id: number,
    bookingRef: string,
    customerName: string,
    customerEmail: string,
    customerPhone: string,
    pickupAddress: string,
    deliveryAddress: string,
    packageWeight: string,
    serviceType: string,
    scheduledDate: Date | null,
    specialInstructions: string | null,
    status: 'pending' | 'confirmed' | 'picked-up' | 'completed' | 'cancelled',
    createdAt: Date,
    updatedAt: Date
  } | null
}
```

#### 2.3 List All Bookings (Admin)

Retrieve all bookings in the system.

**Procedure:** `booking.list`  
**Type:** Query  
**Authentication:** Required (Admin)

#### 2.4 Update Booking Status (Admin)

Update the status of a booking.

**Procedure:** `booking.updateStatus`  
**Type:** Mutation  
**Authentication:** Required (Admin)

**Input Schema:**
```typescript
{
  bookingRef: string,
  status: 'pending' | 'confirmed' | 'picked-up' | 'completed' | 'cancelled'
}
```

### 3. Contact API

#### 3.1 Submit Contact Inquiry (Public)

Submit a contact form inquiry.

**Procedure:** `contact.submit`  
**Type:** Mutation  
**Authentication:** None required

**Input Schema:**
```typescript
{
  name: string,
  email: string, // Valid email format
  phone?: string,
  subject: string,
  message: string
}
```

**Response:**
```typescript
{
  success: boolean,
  id: number
}
```

**Side Effects:**
- Sends notification to owner about new inquiry

#### 3.2 List All Inquiries (Admin)

Retrieve all contact inquiries.

**Procedure:** `contact.list`  
**Type:** Query  
**Authentication:** Required (Admin)

#### 3.3 Update Inquiry Status (Admin)

Update the status of a contact inquiry.

**Procedure:** `contact.updateStatus`  
**Type:** Mutation  
**Authentication:** Required (Admin)

**Input Schema:**
```typescript
{
  id: number,
  status: 'new' | 'read' | 'replied' | 'closed'
}
```

## Database Schema

### Tables Overview

| Table | Description |
|-------|-------------|
| users | User accounts and authentication |
| parcels | Parcel/shipment records |
| parcel_status_history | Tracking history for parcels |
| bookings | Delivery booking requests |
| contact_inquiries | Customer contact form submissions |

### Parcel Status Flow

```
collected → in-transit → out-for-delivery → delivered
```

### Booking Status Flow

```
pending → confirmed → picked-up → completed
                   ↘ cancelled
```

## Error Handling

The API uses tRPC's built-in error handling. Common error codes:

| Code | Description |
|------|-------------|
| BAD_REQUEST | Invalid input data |
| UNAUTHORIZED | Authentication required |
| FORBIDDEN | Insufficient permissions |
| NOT_FOUND | Resource not found |
| INTERNAL_SERVER_ERROR | Server error |

## Rate Limiting

Currently, no rate limiting is implemented. For production use, consider implementing rate limiting on public endpoints.

## Tracking Number Format

Tracking numbers follow the format: `DE` + 10 alphanumeric characters

**Examples:**
- `DE1234567890`
- `DEABCD123456`

## Booking Reference Format

Booking references follow the format: `BK` + timestamp + 4 random characters

**Example:** `BK1737024000ABCD`

## Integration Examples

### React/TypeScript Client

```typescript
import { trpc } from '@/lib/trpc';

// Track a parcel
const { data } = trpc.tracking.track.useQuery({ 
  trackingNumber: 'DE1234567890' 
});

// Create a booking
const createBooking = trpc.booking.create.useMutation();
await createBooking.mutateAsync({
  customerName: 'John Doe',
  customerEmail: 'john@example.com',
  customerPhone: '+60123456789',
  pickupAddress: '123 Jalan Test, KL',
  deliveryAddress: '456 Jalan Delivery, Penang',
  packageWeight: '1-3 kg',
  serviceType: 'next-day'
});

// Submit contact form
const submitContact = trpc.contact.submit.useMutation();
await submitContact.mutateAsync({
  name: 'Jane Doe',
  email: 'jane@example.com',
  subject: 'General Inquiry',
  message: 'Hello, I have a question...'
});
```

## Changelog

### Version 1.0.0 (January 2026)
- Initial release
- Parcel tracking API
- Booking management API
- Contact inquiry API
- Admin dashboard endpoints
