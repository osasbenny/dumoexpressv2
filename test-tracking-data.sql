-- Test tracking data for Dubai delivery
-- Tracking Number: DE2024DUBAI1

INSERT INTO parcels (
  trackingNumber,
  senderName,
  senderAddress,
  senderPhone,
  receiverName,
  receiverAddress,
  receiverPhone,
  serviceType,
  weight,
  status,
  estimatedDelivery,
  createdAt,
  updatedAt
) VALUES (
  'DE2024DUBAI1',
  'Ahmad Hassan',
  'Level 10, Menara KL, Jalan Sultan Ismail, 50250 Kuala Lumpur, Malaysia',
  '+60 12-345 6789',
  'Mohammed Al-Rashid',
  'Dubai Marina, Marina Plaza, Sheikh Zayed Road, Dubai, United Arab Emirates',
  '+971 50-123-4567',
  'next-day',
  '2.5kg',
  'in-transit',
  DATE_ADD(NOW(), INTERVAL 1 DAY),
  DATE_SUB(NOW(), INTERVAL 2 DAY),
  NOW()
);

-- Get the parcel ID for tracking history
SET @parcel_id = LAST_INSERT_ID();

-- Insert tracking history
INSERT INTO tracking_history (parcelId, status, location, description, timestamp) VALUES
(@parcel_id, 'collected', 'Kuala Lumpur, Malaysia', 'Parcel collected from sender and registered in our system', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(@parcel_id, 'collected', 'KL Central Hub, Malaysia', 'Parcel arrived at sorting facility', DATE_SUB(NOW(), INTERVAL 47 HOUR)),
(@parcel_id, 'in-transit', 'KLIA Cargo Terminal, Malaysia', 'Parcel cleared for international shipping', DATE_SUB(NOW(), INTERVAL 40 HOUR)),
(@parcel_id, 'in-transit', 'Dubai International Airport, UAE', 'Parcel arrived in Dubai and cleared customs', DATE_SUB(NOW(), INTERVAL 12 HOUR)),
(@parcel_id, 'in-transit', 'Dubai Distribution Center, UAE', 'Parcel sorted for local delivery', DATE_SUB(NOW(), INTERVAL 4 HOUR));
