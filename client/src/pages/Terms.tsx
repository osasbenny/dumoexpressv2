import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16 lg:py-24">
        <div className="container max-w-4xl">
          <h1 className="text-4xl font-bold mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Terms of Service
          </h1>
          
          <div className="prose prose-gray max-w-none space-y-8">
            <p className="text-muted-foreground mb-8">
              <strong>Effective Date:</strong> January 1, 2026<br />
              <strong>Last Updated:</strong> January 17, 2026
            </p>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms of Service ("Terms") constitute a legally binding agreement between you ("Customer," "you," or "your") and DumoExpress Sdn Bhd ("DumoExpress," "we," "us," or "our"), a courier and logistics company registered in Malaysia. By accessing our website, mobile application, or using any of our courier and delivery services, you acknowledge that you have read, understood, and agree to be bound by these Terms, as well as our Privacy Policy and Shipping Policy. If you do not agree with any part of these Terms, you must immediately discontinue use of our services.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                These Terms apply to all users of our services, including individual customers, business clients, and third-party agents acting on behalf of customers. By placing a booking or shipment order, you represent that you are at least 18 years of age and have the legal capacity to enter into this agreement.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                DumoExpress provides professional courier and parcel delivery services throughout Malaysia, including Peninsular Malaysia, Sabah, and Sarawak. Our service offerings include Same-Day Delivery (delivery within 4-6 hours in major cities), Next-Day Delivery (guaranteed delivery by 12pm the following business day), Scheduled Pickup & Delivery (flexible scheduling with advance booking), and Business Bulk Shipments (volume-based solutions for enterprises with dedicated account management).
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                All services are subject to availability, operational capacity, and geographic coverage. We reserve the right to refuse service or modify delivery schedules due to operational constraints, weather conditions, public holidays, force majeure events, or other circumstances beyond our reasonable control. Service availability and delivery times may vary by location, and certain remote areas may require additional transit time or surcharges.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Booking and Order Placement</h2>
              <p className="text-muted-foreground leading-relaxed">
                Customers may book services through our website, mobile application, customer service hotline, or authorized agents. Each booking requires accurate and complete information, including sender and recipient names, contact numbers, full addresses with postal codes, parcel weight and dimensions, service type selection, and any special handling instructions. Incomplete or inaccurate information may result in delivery delays, failed deliveries, or additional charges.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Upon successful booking, you will receive a confirmation email or SMS containing your unique tracking number (format: DExxxxxxxxxx), booking reference, estimated pickup time, estimated delivery date, and total charges. This confirmation constitutes acceptance of your order by DumoExpress. You are responsible for reviewing all booking details immediately and notifying us of any errors within 2 hours of booking confirmation.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">4. User Responsibilities and Obligations</h2>
              <p className="text-muted-foreground leading-relaxed">
                As a customer of DumoExpress, you agree to provide accurate, current, and complete pickup and delivery information for all shipments. You must ensure that all parcels are securely and appropriately packaged to withstand normal handling and transportation conditions. Fragile items must be clearly labeled and require additional protective packaging. You are solely responsible for ensuring that the contents of your shipment comply with all applicable Malaysian laws and regulations, as well as our prohibited items policy.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                You must be available at the designated pickup location during the scheduled pickup window, or arrange for an authorized representative to be present. Similarly, the recipient must be available at the delivery address during the delivery window. If no one is available to receive the parcel, we will make up to three delivery attempts before the parcel is returned to the sender at the sender's expense. You agree to pay all applicable fees, charges, and surcharges in a timely manner according to the payment terms specified in your booking confirmation.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Prohibited and Restricted Items</h2>
              <p className="text-muted-foreground leading-relaxed">
                DumoExpress strictly prohibits the shipment of certain items for safety, legal, and operational reasons. Prohibited items include but are not limited to illegal drugs and controlled substances, weapons, firearms, ammunition, and explosives, hazardous materials including flammable liquids, corrosive substances, and toxic chemicals, live animals and insects (except where specifically authorized), human remains or ashes, perishable food items without proper temperature-controlled packaging, currency, cash, negotiable instruments, and bearer bonds, pornographic or obscene materials, counterfeit goods and items that infringe intellectual property rights, and any items prohibited under Malaysian law or international shipping regulations.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Restricted items that require special handling or documentation include lithium batteries and electronic devices containing them, perfumes and alcoholic beverages, medical samples and biological substances, valuable items exceeding RM 5,000 in declared value, and documents requiring signature confirmation. Customers must declare all restricted items at the time of booking and comply with all special handling requirements. DumoExpress reserves the right to inspect any shipment if we have reasonable grounds to believe it contains prohibited or undeclared restricted items. Violation of this policy may result in immediate termination of service, forfeiture of the shipment, legal action, and reporting to relevant authorities.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Pricing, Fees, and Payment Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                All prices are quoted in Malaysian Ringgit (RM) and are calculated based on several factors including parcel weight (actual or volumetric, whichever is greater), service type selected (same-day, next-day, scheduled, or bulk), delivery zone and distance, and any additional services requested such as insurance, signature confirmation, or special handling. Volumetric weight is calculated using the formula: (Length × Width × Height in cm) ÷ 5000. If the volumetric weight exceeds the actual weight, charges will be based on volumetric weight.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Payment is due at the time of booking for individual customers. Business account holders may be eligible for credit terms subject to credit approval and execution of a separate business agreement. We accept payment via credit/debit cards (Visa, Mastercard, American Express), online banking (FPX), e-wallets (Touch 'n Go, GrabPay, Boost), and bank transfer for business accounts. All prices are subject to change without prior notice, though any changes will not affect bookings already confirmed and paid for. Additional charges may apply for remote area deliveries, failed delivery attempts due to recipient unavailability, address corrections, re-routing requests, and storage beyond the free storage period.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Delivery Commitments and Service Levels</h2>
              <p className="text-muted-foreground leading-relaxed">
                DumoExpress makes every reasonable effort to meet stated delivery timeframes. However, all delivery times are estimates and not guarantees unless explicitly stated otherwise in a premium service agreement. Same-Day Delivery aims for delivery within 4-6 hours from pickup in major urban areas (Kuala Lumpur, Selangor, Penang, Johor Bahru). Next-Day Delivery targets delivery by 12pm noon on the next business day for shipments booked before 5pm on the previous business day. Scheduled Delivery allows customers to select preferred delivery dates and time windows subject to availability.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Delivery times may be affected by factors beyond our control, including severe weather conditions, natural disasters, traffic congestion and road closures, public holidays and festive seasons, customs clearance delays for cross-border shipments, recipient unavailability, incorrect or incomplete address information, and force majeure events. In such cases, DumoExpress will make reasonable efforts to notify affected customers and provide updated delivery estimates. We do not guarantee delivery on specific dates or times unless purchased as a premium add-on service with explicit written confirmation.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Tracking and Notifications</h2>
              <p className="text-muted-foreground leading-relaxed">
                All shipments are assigned a unique tracking number that allows real-time monitoring of parcel status through our website, mobile app, or customer service hotline. Tracking updates are provided at key checkpoints including parcel collected, arrived at sorting facility, in transit to destination, out for delivery, and delivered with proof of delivery. Customers can opt in to receive automated notifications via SMS and email at each tracking milestone.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                While we strive to provide accurate and timely tracking information, there may be occasional delays in system updates due to technical issues or operational constraints. The absence of tracking updates does not necessarily indicate a problem with your shipment. If you have concerns about your shipment status, please contact our customer service team for assistance.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Liability, Insurance, and Claims</h2>
              <p className="text-muted-foreground leading-relaxed">
                DumoExpress provides standard insurance coverage of up to RM 500 per shipment at no additional cost. This coverage protects against loss, theft, or damage during transit under normal handling conditions. For shipments with declared values exceeding RM 500, customers must purchase additional insurance at the time of booking. Insurance premiums are calculated at 1% of the declared value above RM 500, with a maximum insurable value of RM 50,000 per shipment.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Our liability is limited to the lesser of the declared value of the shipment or the maximum insurance coverage purchased. We are not liable for indirect, consequential, or special damages including but not limited to loss of profits, loss of business opportunity, or emotional distress. Claims for lost, damaged, or delayed shipments must be filed in writing within 7 calendar days of the expected delivery date, accompanied by supporting documentation including original booking confirmation, proof of value (invoice or receipt), photographs of damaged items and packaging, and police report for lost or stolen items if applicable.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                DumoExpress is not liable for damage or loss resulting from improper packaging, acts of God or force majeure, inherent defects in the goods, failure to declare restricted items, customs seizure or confiscation, or recipient refusal to accept delivery. Approved claims will be settled within 30 business days of claim approval through refund, replacement, or compensation as determined by DumoExpress in its sole discretion.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Cancellations, Modifications, and Returns</h2>
              <p className="text-muted-foreground leading-relaxed">
                Customers may cancel bookings free of charge up to 2 hours before the scheduled pickup time by contacting our customer service team. Cancellations made less than 2 hours before pickup or after the parcel has been collected are subject to a cancellation fee of 50% of the total booking amount. No refunds are provided for cancellations after the parcel is in transit.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Address changes, delivery rescheduling, or service upgrades may be requested before the parcel is out for delivery, subject to availability and additional charges. Once a parcel is out for delivery, no modifications can be made. Parcels that cannot be delivered due to incorrect address, recipient unavailability, or refusal to accept will be held at our facility for 7 days. After this period, undelivered parcels will be returned to the sender at the sender's expense, or disposed of if the sender cannot be contacted.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Privacy and Data Protection</h2>
              <p className="text-muted-foreground leading-relaxed">
                DumoExpress is committed to protecting your personal information in accordance with the Personal Data Protection Act 2010 (PDPA) of Malaysia. We collect, use, and disclose personal data only for purposes related to providing our courier services, processing payments, communicating with customers, and improving our services. For detailed information on how we handle your personal data, please refer to our Privacy Policy available on our website.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                By using our services, you consent to the collection, use, and disclosure of your personal information as described in our Privacy Policy. You have the right to access, correct, or request deletion of your personal data subject to legal and operational requirements. We implement appropriate technical and organizational measures to protect your data from unauthorized access, disclosure, alteration, or destruction.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Intellectual Property Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on the DumoExpress website and mobile application, including but not limited to text, graphics, logos, images, software, and trademarks, is the property of DumoExpress Sdn Bhd or its licensors and is protected by Malaysian and international copyright, trademark, and intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, or exploit any content without our prior written permission.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                The DumoExpress name, logo, and all related marks are trademarks of DumoExpress Sdn Bhd. Use of these trademarks without express written permission is strictly prohibited and may constitute trademark infringement.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">13. Dispute Resolution and Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms of Service shall be governed by and construed in accordance with the laws of Malaysia. Any disputes arising out of or relating to these Terms or our services shall first be attempted to be resolved through good faith negotiations between the parties. If a dispute cannot be resolved through negotiation within 30 days, either party may submit the dispute to mediation under the auspices of the Malaysian Mediation Centre.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                If mediation is unsuccessful, the dispute shall be subject to the exclusive jurisdiction of the courts of Malaysia. By using our services, you irrevocably submit to the jurisdiction of the Malaysian courts and waive any objection to venue or inconvenient forum.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">14. Modifications to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                DumoExpress reserves the right to modify, amend, or update these Terms of Service at any time without prior notice. Changes will be effective immediately upon posting on our website. The "Last Updated" date at the top of this document indicates when the Terms were last revised. We encourage you to review these Terms periodically to stay informed of any changes.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Your continued use of our services after any modifications to these Terms constitutes your acceptance of the revised Terms. If you do not agree with the modified Terms, you must discontinue use of our services immediately. Material changes that significantly affect your rights or obligations will be communicated via email or prominent notice on our website.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">15. Severability and Waiver</h2>
              <p className="text-muted-foreground leading-relaxed">
                If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such provision shall be modified to the minimum extent necessary to make it valid and enforceable, or if such modification is not possible, the provision shall be severed from these Terms. The remaining provisions shall continue in full force and effect.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                No waiver of any term or condition of these Terms shall be deemed a further or continuing waiver of such term or condition or any other term or condition. Our failure to assert any right or provision under these Terms shall not constitute a waiver of such right or provision.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">16. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions, concerns, or inquiries regarding these Terms of Service, please contact us through the following channels:
              </p>
              <div className="mt-4 p-6 bg-gray-50 rounded-lg">
                <p className="text-muted-foreground"><strong>DumoExpress Sdn Bhd</strong></p>
                <p className="text-muted-foreground">Level 15, Menara KL</p>
                <p className="text-muted-foreground">Jalan Sultan Ismail</p>
                <p className="text-muted-foreground">50250 Kuala Lumpur, Malaysia</p>
                <p className="text-muted-foreground mt-4"><strong>Email:</strong> legal@dumoexpress.com</p>
                <p className="text-muted-foreground"><strong>Phone:</strong> +60 3-1234 5678</p>
                <p className="text-muted-foreground"><strong>Customer Service:</strong> support@dumoexpress.com</p>
                <p className="text-muted-foreground"><strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM (GMT+8)</p>
              </div>
            </section>
            
            <section className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-700">
                <strong>Acknowledgment:</strong> By using DumoExpress services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service, as well as our Privacy Policy and Shipping Policy. If you have any questions or do not understand any part of these Terms, please contact us before using our services.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
