import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16 lg:py-24">
        <div className="container max-w-4xl">
          <h1 className="text-4xl font-bold mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Shipping Policy
          </h1>
          
          <div className="prose prose-gray max-w-none space-y-8">
            <p className="text-muted-foreground mb-8">
              <strong>Effective Date:</strong> January 1, 2026<br />
              <strong>Last Updated:</strong> January 17, 2026
            </p>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Overview and Scope</h2>
              <p className="text-muted-foreground leading-relaxed">
                This Shipping Policy outlines the terms, conditions, procedures, and guidelines governing the pickup, transportation, and delivery of parcels through DumoExpress Sdn Bhd ("DumoExpress," "we," "us," or "our"). This policy applies to all shipments within Malaysia, including Peninsular Malaysia, Sabah, and Sarawak, and covers all service types offered by DumoExpress including Same-Day Delivery, Next-Day Delivery, Scheduled Pickup & Delivery, and Business Bulk Shipments.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                By booking a shipment with DumoExpress, you acknowledge that you have read, understood, and agree to comply with this Shipping Policy, as well as our Terms of Service and Privacy Policy. This policy should be read in conjunction with those documents to understand the complete framework of our service obligations and your responsibilities as a customer.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Service Coverage and Delivery Zones</h2>
              <p className="text-muted-foreground leading-relaxed">
                DumoExpress provides comprehensive courier services across Malaysia with varying service levels and delivery timeframes based on geographic zones. Our service coverage is divided into several delivery zones to ensure accurate pricing and realistic delivery commitments.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">2.1 Zone Classification</h3>
              <p className="text-muted-foreground leading-relaxed">
                Zone 1 (Major Urban Centers) includes Kuala Lumpur, Selangor (Petaling Jaya, Shah Alam, Subang Jaya, Klang), Penang (Georgetown, Butterworth), and Johor Bahru, offering same-day delivery within 4-6 hours and next-day delivery by 12pm. Zone 2 (Secondary Cities) covers Ipoh, Melaka, Seremban, Kuantan, Kota Kinabalu, and Kuching, with next-day delivery by 2pm and same-day delivery available in city centers only. Zone 3 (Towns and Suburban Areas) encompasses smaller towns and suburban regions throughout Peninsular Malaysia, with delivery typically within 1-2 business days. Zone 4 (Remote and Rural Areas) includes rural locations, islands, and hard-to-reach areas, requiring 2-4 business days for delivery and potentially subject to additional surcharges.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">2.2 Service Availability</h3>
              <p className="text-muted-foreground leading-relaxed">
                Same-Day Delivery is available in Zone 1 for bookings made before 2pm on business days, with delivery completed by 9pm the same day. Next-Day Delivery is available in Zones 1 and 2 for bookings made before 5pm, with guaranteed delivery by noon (Zone 1) or 2pm (Zone 2) the following business day. Scheduled Delivery is available in all zones with advance booking of at least 24 hours, allowing customers to select preferred delivery dates and time windows. Business Bulk Shipments are available nationwide with customized delivery schedules based on volume and destination.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">2.3 Restricted and Excluded Areas</h3>
              <p className="text-muted-foreground leading-relaxed">
                Certain locations may have restricted access or be temporarily excluded from our service coverage due to infrastructure limitations, security concerns, natural disasters, or other operational constraints. We maintain an updated list of restricted areas on our website. Customers attempting to ship to or from restricted areas will be notified at the time of booking, and alternative arrangements may be offered where feasible.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Pickup Services and Procedures</h2>
              <p className="text-muted-foreground leading-relaxed">
                DumoExpress offers convenient pickup services to collect parcels directly from your location, eliminating the need to visit a drop-off center. Understanding our pickup procedures ensures smooth and timely collection of your shipments.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">3.1 Pickup Scheduling</h3>
              <p className="text-muted-foreground leading-relaxed">
                Pickups can be scheduled through our website, mobile app, or customer service hotline. For Same-Day Delivery, pickup must be requested before 2pm, with collection typically occurring within 2-3 hours of booking confirmation. For Next-Day and Scheduled Delivery, pickups can be booked up to 7 days in advance, with specific time windows available (9am-12pm, 12pm-3pm, 3pm-6pm). Business accounts with regular shipping needs can arrange recurring pickup schedules with dedicated pickup times.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">3.2 Pickup Requirements</h3>
              <p className="text-muted-foreground leading-relaxed">
                At the time of pickup, the sender or an authorized representative must be present to hand over the parcel and provide any necessary documentation. Parcels must be properly packaged and labeled with sender and recipient information clearly visible. For high-value or restricted items, additional documentation such as invoices, permits, or declarations may be required. The sender must verify the parcel details on the pickup receipt, including weight, dimensions, and service type, as this information determines the final charges.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">3.3 Failed Pickup Attempts</h3>
              <p className="text-muted-foreground leading-relaxed">
                If our courier arrives at the pickup location and no one is available to hand over the parcel, or if the parcel is not ready for collection, this will be considered a failed pickup attempt. We will make up to two additional pickup attempts on the same day (for same-day service) or the following business day (for next-day service). After three failed attempts, the booking will be automatically cancelled, and a cancellation fee of RM 10 will be charged. Customers can reschedule pickups by contacting our customer service team, subject to availability and potential rescheduling fees.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Packaging Requirements and Guidelines</h2>
              <p className="text-muted-foreground leading-relaxed">
                Proper packaging is essential to ensure your parcels arrive safely and in good condition. Customers are responsible for packaging their items securely and appropriately for transportation. DumoExpress is not liable for damage resulting from inadequate or improper packaging.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">4.1 General Packaging Standards</h3>
              <p className="text-muted-foreground leading-relaxed">
                All parcels must be packed in sturdy, corrugated cardboard boxes or appropriate containers suitable for the weight and nature of the contents. Boxes should be new or in excellent condition without tears, dents, or previous shipping labels. Items must be cushioned with adequate protective materials such as bubble wrap, foam inserts, packing peanuts, or crumpled paper to prevent movement during transit. Fragile items require extra protection and must be clearly labeled with "FRAGILE" or "HANDLE WITH CARE" stickers on multiple sides of the package.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">4.2 Labeling Requirements</h3>
              <p className="text-muted-foreground leading-relaxed">
                Each parcel must have a clear, legible shipping label affixed to the top or side of the package (not on seams or closures). The label must include the sender's full name, address, and contact number, the recipient's full name, complete address with postal code, and contact number, the DumoExpress tracking number (provided upon booking confirmation), and any special handling instructions or warnings. Remove or cover all old shipping labels and barcodes to avoid confusion during sorting and delivery.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">4.3 Weight and Size Limitations</h3>
              <p className="text-muted-foreground leading-relaxed">
                Standard parcels must not exceed 30kg in weight and 120cm in length (longest side), with a maximum combined length + girth of 300cm. Parcels exceeding these dimensions are considered oversized and require special handling arrangements and additional charges. For extremely heavy or bulky items (over 50kg or 200cm), please contact our business solutions team for customized freight arrangements. Accurate weight and dimensions must be provided at booking, as discrepancies discovered during processing may result in additional charges or delivery delays.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">4.4 Special Packaging for Specific Items</h3>
              <p className="text-muted-foreground leading-relaxed">
                Documents and papers should be placed in waterproof envelopes or document pouches. Electronics and gadgets require original manufacturer packaging when possible, or anti-static bubble wrap and rigid boxes with ample cushioning. Liquids and semi-liquids must be in sealed, leak-proof containers placed inside plastic bags, with absorbent material surrounding the container. Perishable items require insulated packaging with ice packs or dry ice, and must be clearly labeled with "PERISHABLE" and "KEEP REFRIGERATED" markings. Fragile items like glassware, ceramics, and artwork need double-boxing (box within a box) with at least 5cm of cushioning material on all sides.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Delivery Procedures and Recipient Responsibilities</h2>
              <p className="text-muted-foreground leading-relaxed">
                Successful delivery requires cooperation between DumoExpress and the recipient. Understanding our delivery procedures and recipient responsibilities helps ensure smooth and timely delivery of your parcels.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">5.1 Delivery Attempts and Notification</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our couriers will make up to three delivery attempts to the specified address. Before each delivery attempt, recipients who have opted in will receive SMS or email notifications with the estimated delivery time window. If the recipient is not available during the first attempt, a delivery notice will be left at the address with instructions for rescheduling or arranging collection. The second attempt will be made on the following business day during a similar time window. If the second attempt also fails, a final attempt will be made, after which the parcel will be held at our nearest service center for 7 days for customer collection.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">5.2 Recipient Availability and Identification</h3>
              <p className="text-muted-foreground leading-relaxed">
                Recipients or their authorized representatives must be available at the delivery address during the estimated delivery window. For high-value shipments (over RM 1,000) or items requiring signature confirmation, valid photo identification (IC, passport, or driver's license) must be presented upon delivery. If an authorized representative accepts the delivery, they must provide their name, IC number, and signature, which will be recorded as proof of delivery. Refusal to provide identification for signature-required deliveries will result in the parcel being returned to our facility.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">5.3 Safe Drop and Contactless Delivery</h3>
              <p className="text-muted-foreground leading-relaxed">
                For standard parcels not requiring signature confirmation, customers may authorize safe drop delivery, where the courier leaves the parcel at a secure location at the delivery address (such as with a building security guard, in a parcel locker, or at a designated safe place). Safe drop instructions can be provided in the delivery notes at the time of booking. Photographic proof of delivery will be captured and uploaded to the tracking system. DumoExpress is not liable for parcels left at safe drop locations as per customer instructions if the parcel is subsequently lost or stolen.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">5.4 Address Accuracy and Corrections</h3>
              <p className="text-muted-foreground leading-relaxed">
                Customers are responsible for providing complete and accurate delivery addresses including street names, building names, unit numbers, and postal codes. Incomplete or incorrect addresses may result in delivery delays or failed deliveries. If an address is found to be incorrect or incomplete after the parcel is dispatched, address correction services are available for an additional fee of RM 15-30 depending on the distance to the corrected address. Multiple address corrections or significant rerouting may incur higher charges and extend delivery timeframes.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Tracking and Status Updates</h2>
              <p className="text-muted-foreground leading-relaxed">
                DumoExpress provides comprehensive real-time tracking for all shipments, allowing customers to monitor their parcels from pickup to delivery. Each booking is assigned a unique tracking number (format: DExxxxxxxxxx) that can be used to check shipment status through our website, mobile app, or customer service hotline.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">6.1 Tracking Milestones</h3>
              <p className="text-muted-foreground leading-relaxed">
                Tracking updates are provided at key checkpoints throughout the delivery journey: "Collected" indicates the parcel has been picked up from the sender and registered in our system, "Arrived at Sorting Facility" shows the parcel has reached our hub for processing and routing, "In Transit" means the parcel is being transported to the destination area, "Out for Delivery" indicates the parcel is with a courier for final delivery, and "Delivered" confirms successful delivery with timestamp and recipient signature or photo proof.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">6.2 Automated Notifications</h3>
              <p className="text-muted-foreground leading-relaxed">
                Customers can opt in to receive automated SMS and email notifications at each tracking milestone. Notifications include the current status, estimated delivery time (when out for delivery), and any actions required from the recipient. Both senders and recipients can subscribe to tracking notifications by providing their contact information at the time of booking or through the tracking page on our website.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">6.3 Tracking Delays and Issues</h3>
              <p className="text-muted-foreground leading-relaxed">
                While we strive to provide real-time tracking updates, there may be occasional delays in system updates due to technical issues, network connectivity in remote areas, or high processing volumes during peak periods. If your tracking has not updated for more than 24 hours, or if you have concerns about your shipment status, please contact our customer service team with your tracking number for immediate assistance and manual status verification.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Delivery Timeframes and Service Commitments</h2>
              <p className="text-muted-foreground leading-relaxed">
                DumoExpress is committed to meeting our stated delivery timeframes. However, all delivery times are estimates based on normal operating conditions and are not absolute guarantees unless explicitly stated in a premium service agreement with service level guarantees.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">7.1 Standard Delivery Times</h3>
              <p className="text-muted-foreground leading-relaxed">
                Same-Day Delivery aims for delivery within 4-6 hours from pickup in Zone 1 major urban centers, with bookings accepted until 2pm for same-day completion by 9pm. Next-Day Delivery targets delivery by 12pm noon the following business day for Zone 1, and by 2pm for Zone 2, for bookings made before 5pm on the previous business day. Scheduled Delivery allows customers to select specific delivery dates up to 30 days in advance, with preferred time windows (morning, afternoon, or evening). Standard Delivery to Zone 3 areas typically takes 1-2 business days, while Zone 4 remote areas may require 2-4 business days depending on accessibility and distance.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">7.2 Business Days and Operating Hours</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our standard business days are Monday through Saturday, excluding Malaysian public holidays. Deliveries are typically made between 9am and 6pm, with extended hours until 9pm for same-day deliveries. Bookings made on Sundays or public holidays will be processed on the next business day. During major festive seasons (Chinese New Year, Hari Raya, Deepavali, Christmas), delivery timeframes may be extended by 1-2 days due to increased volumes and limited operating hours.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">7.3 Factors Affecting Delivery Times</h3>
              <p className="text-muted-foreground leading-relaxed">
                Several factors beyond our control may affect delivery timeframes, including severe weather conditions such as floods, storms, or haze that impact transportation safety, traffic congestion and road closures due to accidents or construction, customs clearance delays for cross-border shipments, recipient unavailability requiring multiple delivery attempts, incorrect or incomplete address information necessitating verification or correction, peak season volumes during festive periods and promotional campaigns, and force majeure events such as natural disasters, pandemics, or civil unrest. In such cases, we will make reasonable efforts to notify affected customers and provide updated delivery estimates.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Failed Deliveries and Returns</h2>
              <p className="text-muted-foreground leading-relaxed">
                When a parcel cannot be delivered after three attempts or for other valid reasons, it will be classified as a failed delivery and subject to our return procedures.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">8.1 Reasons for Failed Delivery</h3>
              <p className="text-muted-foreground leading-relaxed">
                Common reasons for failed deliveries include recipient unavailable at the delivery address after three attempts, incorrect or incomplete address that cannot be verified, recipient refusal to accept the parcel, recipient refusal to pay cash-on-delivery charges (if applicable), recipient unable to provide required identification for signature confirmation, delivery location inaccessible due to security restrictions or physical barriers, and parcel damaged during transit and refused by recipient upon inspection.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">8.2 Holding Period and Collection</h3>
              <p className="text-muted-foreground leading-relaxed">
                After three failed delivery attempts, parcels will be held at our nearest service center for 7 calendar days. Recipients will be notified via SMS and email with collection instructions, including the service center address, operating hours, and required identification. Parcels can be collected Monday through Saturday from 9am to 6pm. A valid photo ID matching the recipient name on the parcel must be presented for collection. After the 7-day holding period, uncollected parcels will be returned to the sender at the sender's expense.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">8.3 Return to Sender</h3>
              <p className="text-muted-foreground leading-relaxed">
                Parcels that cannot be delivered and are not collected within the holding period will be returned to the sender's address. Return shipping charges will be billed to the sender's account or collected upon delivery of the returned parcel. The sender will be notified when the parcel is being returned and provided with a return tracking number. If the sender also cannot be reached or refuses the returned parcel, the item will be held at our facility for an additional 14 days, after which it may be disposed of or donated to charity at our discretion. No refunds will be provided for parcels that are disposed of due to abandonment.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Special Handling and Premium Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                DumoExpress offers several special handling options and premium services for parcels requiring extra care, security, or specific delivery requirements. These services are available for an additional fee and must be requested at the time of booking.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">9.1 Signature Confirmation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Signature confirmation requires the recipient to sign for the parcel upon delivery and present valid photo identification. This service provides enhanced proof of delivery with recipient name, IC number, signature, and timestamp. Signature confirmation is automatically included for high-value shipments over RM 1,000 and is available as an optional add-on for RM 5 per shipment for lower-value items.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">9.2 Insurance and Declared Value</h3>
              <p className="text-muted-foreground leading-relaxed">
                Standard insurance coverage of up to RM 500 is included with all shipments at no additional cost. For parcels with higher values, additional insurance can be purchased at 1% of the declared value above RM 500, with a maximum insurable value of RM 50,000 per shipment. Customers must declare the accurate value of their shipment contents at the time of booking. Undervaluation may result in reduced compensation in the event of loss or damage.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">9.3 Temperature-Controlled Delivery</h3>
              <p className="text-muted-foreground leading-relaxed">
                For perishable items requiring temperature control (food, pharmaceuticals, biological samples), we offer refrigerated and frozen delivery services with specialized insulated packaging and temperature monitoring. This service is available in Zone 1 and 2 areas for same-day and next-day delivery only. Additional charges apply based on parcel size and temperature requirements (chilled 2-8°C or frozen -18°C).
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">9.4 Weekend and Holiday Delivery</h3>
              <p className="text-muted-foreground leading-relaxed">
                Sunday and public holiday deliveries are available as a premium service for an additional surcharge of RM 20-50 depending on the delivery zone. This service must be requested at least 24 hours in advance and is subject to courier availability. Not all areas may be covered for weekend and holiday deliveries.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Customs, Duties, and Cross-Border Shipments</h2>
              <p className="text-muted-foreground leading-relaxed">
                While DumoExpress primarily operates within Malaysia, we facilitate cross-border shipments to and from neighboring countries through our partner networks. Customers shipping internationally must understand their responsibilities regarding customs clearance and import/export regulations.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">10.1 Customs Documentation</h3>
              <p className="text-muted-foreground leading-relaxed">
                International shipments require accurate customs declarations including detailed descriptions of contents, quantities, values, country of origin, and harmonized system (HS) codes. Commercial invoices must be provided for goods with commercial value. Customers are responsible for ensuring all required documentation is complete and accurate. Incomplete or inaccurate customs documentation may result in delays, additional charges, or seizure of goods by customs authorities.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">10.2 Duties, Taxes, and Fees</h3>
              <p className="text-muted-foreground leading-relaxed">
                Recipients of international shipments are responsible for paying all applicable import duties, taxes, and customs clearance fees imposed by the destination country. These charges are determined by the customs authorities and are not included in the shipping fees paid to DumoExpress. Shipments may be held by customs until these charges are paid. Refusal to pay customs charges will result in the parcel being returned to the sender at the sender's expense, with no refund of original shipping charges.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">10.3 Prohibited and Restricted Items for International Shipping</h3>
              <p className="text-muted-foreground leading-relaxed">
                In addition to our standard prohibited items list, international shipments are subject to additional restrictions imposed by destination countries and international shipping regulations. Commonly restricted items for international shipping include certain foods and agricultural products, plants and seeds, medications and pharmaceuticals, tobacco and alcohol, and items of cultural or historical significance. Customers must research and comply with the import regulations of the destination country. DumoExpress is not liable for seizure, confiscation, or destruction of items by customs authorities due to regulatory violations.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Claims for Lost, Damaged, or Delayed Shipments</h2>
              <p className="text-muted-foreground leading-relaxed">
                While we take every precaution to ensure safe and timely delivery, issues may occasionally occur. DumoExpress has established procedures for handling claims related to lost, damaged, or significantly delayed shipments.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">11.1 Filing a Claim</h3>
              <p className="text-muted-foreground leading-relaxed">
                Claims must be filed in writing within 7 calendar days of the expected delivery date for lost parcels, within 3 calendar days of delivery for damaged parcels, or within 7 days for delayed deliveries. Claims can be submitted through our website claims portal, by email to claims@dumoexpress.com, or by visiting any DumoExpress service center. Required documentation includes original booking confirmation and tracking number, proof of value (invoice, receipt, or purchase order), photographs of damaged items and packaging (for damage claims), police report (for lost parcels with high value), and detailed description of the issue and claimed amount.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">11.2 Claims Investigation and Resolution</h3>
              <p className="text-muted-foreground leading-relaxed">
                Upon receiving a claim, we will conduct an investigation which may include reviewing tracking records and courier reports, inspecting damaged items and packaging, interviewing involved personnel, and verifying documentation and declared values. Most claims are resolved within 14-21 business days of receipt of complete documentation. Complex cases may require additional time. We will keep you informed of the investigation progress and may request additional information or clarification.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">11.3 Claim Outcomes and Compensation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Approved claims will be settled through refund of shipping charges, compensation for lost or damaged items up to the insured value, or replacement of items (at our discretion). Compensation is limited to the lesser of the declared value or the maximum insurance coverage purchased. We are not liable for indirect, consequential, or special damages including loss of profits, business interruption, or emotional distress. Claims may be denied if the loss or damage resulted from improper packaging, failure to declare restricted items, acts of God or force majeure, customs seizure, or recipient refusal.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Modifications and Cancellations</h2>
              <p className="text-muted-foreground leading-relaxed">
                We understand that plans change, and we offer flexible options for modifying or cancelling shipments, subject to certain conditions and fees.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">12.1 Cancellation Policy</h3>
              <p className="text-muted-foreground leading-relaxed">
                Bookings can be cancelled free of charge up to 2 hours before the scheduled pickup time by contacting our customer service team. Cancellations made less than 2 hours before pickup or after the parcel has been collected are subject to a 50% cancellation fee. Once a parcel is in transit, cancellations are not permitted, though delivery address changes or holding for pickup may be possible for an additional fee.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">12.2 Address Changes and Rerouting</h3>
              <p className="text-muted-foreground leading-relaxed">
                Delivery address changes can be requested before the parcel is out for delivery, subject to a rerouting fee of RM 15-50 depending on the distance to the new address. Address changes are processed on a best-effort basis and may not be possible if the parcel is already in the final delivery stage. Significant rerouting that changes the delivery zone may require additional shipping charges.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">12.3 Delivery Rescheduling</h3>
              <p className="text-muted-foreground leading-relaxed">
                Recipients can request to reschedule delivery to a different date or time window by contacting customer service or through the tracking page on our website. The first rescheduling request is free of charge, while subsequent requests may incur a RM 10 rescheduling fee. Rescheduling is subject to courier availability and operational capacity.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">13. Contact Information for Shipping Inquiries</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions, assistance, or concerns related to shipping, tracking, or delivery, please contact our customer service team through the following channels:
              </p>
              <div className="mt-4 p-6 bg-gray-50 rounded-lg">
                <p className="text-muted-foreground"><strong>DumoExpress Customer Service</strong></p>
                <p className="text-muted-foreground">Level 15, Menara KL</p>
                <p className="text-muted-foreground">Jalan Sultan Ismail</p>
                <p className="text-muted-foreground">50250 Kuala Lumpur, Malaysia</p>
                <p className="text-muted-foreground mt-4"><strong>Hotline:</strong> +60 3-1234 5678</p>
                <p className="text-muted-foreground"><strong>WhatsApp:</strong> +60 12-345 6789</p>
                <p className="text-muted-foreground"><strong>Email:</strong> support@dumoexpress.com</p>
                <p className="text-muted-foreground"><strong>Business Hours:</strong> Monday - Saturday, 9:00 AM - 6:00 PM (GMT+8)</p>
                <p className="text-muted-foreground"><strong>Emergency Hotline:</strong> +60 12-999 8888 (24/7 for urgent delivery issues)</p>
              </div>
            </section>
            
            <section className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-700">
                <strong>Policy Updates:</strong> This Shipping Policy may be updated from time to time to reflect changes in our services, procedures, or regulatory requirements. The "Last Updated" date at the top indicates the most recent revision. Continued use of our services after policy updates constitutes acceptance of the revised terms. For significant changes, we will provide notice through email or our website.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
