CREATE TABLE `bookings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`bookingRef` varchar(32) NOT NULL,
	`customerName` varchar(255) NOT NULL,
	`customerEmail` varchar(320) NOT NULL,
	`customerPhone` varchar(20) NOT NULL,
	`pickupAddress` text NOT NULL,
	`deliveryAddress` text NOT NULL,
	`packageWeight` varchar(20) NOT NULL,
	`serviceType` enum('same-day','next-day','scheduled','bulk') NOT NULL,
	`scheduledDate` timestamp,
	`specialInstructions` text,
	`bookingStatus` enum('pending','confirmed','picked-up','completed','cancelled') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `bookings_id` PRIMARY KEY(`id`),
	CONSTRAINT `bookings_bookingRef_unique` UNIQUE(`bookingRef`)
);
--> statement-breakpoint
CREATE TABLE `contactInquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20),
	`subject` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`inquiryStatus` enum('new','read','replied','closed') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contactInquiries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `parcelStatusHistory` (
	`id` int AUTO_INCREMENT NOT NULL,
	`parcelId` int NOT NULL,
	`status` enum('collected','in-transit','out-for-delivery','delivered') NOT NULL,
	`location` varchar(255),
	`description` text,
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `parcelStatusHistory_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `parcels` (
	`id` int AUTO_INCREMENT NOT NULL,
	`trackingNumber` varchar(32) NOT NULL,
	`senderName` varchar(255) NOT NULL,
	`senderPhone` varchar(20) NOT NULL,
	`senderAddress` text NOT NULL,
	`receiverName` varchar(255) NOT NULL,
	`receiverPhone` varchar(20) NOT NULL,
	`receiverAddress` text NOT NULL,
	`weight` varchar(20) NOT NULL,
	`serviceType` enum('same-day','next-day','scheduled','bulk') NOT NULL,
	`status` enum('collected','in-transit','out-for-delivery','delivered') NOT NULL DEFAULT 'collected',
	`estimatedDelivery` timestamp,
	`actualDelivery` timestamp,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `parcels_id` PRIMARY KEY(`id`),
	CONSTRAINT `parcels_trackingNumber_unique` UNIQUE(`trackingNumber`)
);
