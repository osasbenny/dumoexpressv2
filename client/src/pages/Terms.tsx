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
          
          <div className="prose prose-gray max-w-none">
            <p className="text-muted-foreground mb-8">
              Last updated: January 2026
            </p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground mb-4">
                By accessing and using DumoExpress services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use our services.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
              <p className="text-muted-foreground mb-4">
                DumoExpress provides courier and delivery services across Malaysia, including but not limited to same-day delivery, next-day delivery, scheduled pickup and delivery, and business bulk shipments.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
              <p className="text-muted-foreground mb-4">
                Users are responsible for:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Providing accurate pickup and delivery information</li>
                <li>Ensuring parcels are properly packaged</li>
                <li>Not shipping prohibited or illegal items</li>
                <li>Paying all applicable fees and charges</li>
                <li>Being available during scheduled pickup/delivery times</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Prohibited Items</h2>
              <p className="text-muted-foreground mb-4">
                The following items are prohibited from shipping:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Illegal substances and controlled drugs</li>
                <li>Weapons, firearms, and explosives</li>
                <li>Hazardous materials</li>
                <li>Live animals</li>
                <li>Perishable goods (unless using temperature-controlled service)</li>
                <li>Currency and negotiable instruments</li>
                <li>Items prohibited by Malaysian law</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Pricing and Payment</h2>
              <p className="text-muted-foreground mb-4">
                Prices are based on weight, dimensions, service type, and delivery zone. All prices are in Malaysian Ringgit (RM) and are subject to change. Payment is due at the time of booking unless otherwise agreed for business accounts.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Delivery Times</h2>
              <p className="text-muted-foreground mb-4">
                While we strive to meet all delivery commitments, delivery times are estimates and not guarantees. Delays may occur due to weather, traffic, customs, or other circumstances beyond our control.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Liability and Insurance</h2>
              <p className="text-muted-foreground mb-4">
                Standard insurance coverage is included with all shipments. Our liability is limited to the declared value of the parcel or the maximum coverage amount, whichever is lower. Additional insurance is available for purchase.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Claims and Refunds</h2>
              <p className="text-muted-foreground mb-4">
                Claims for lost or damaged items must be filed within 7 days of the expected delivery date. Refunds for service failures will be processed within 14 business days upon approval.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Privacy</h2>
              <p className="text-muted-foreground mb-4">
                Your privacy is important to us. Please refer to our Privacy Policy for information on how we collect, use, and protect your personal data.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Modifications</h2>
              <p className="text-muted-foreground mb-4">
                DumoExpress reserves the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Continued use of our services constitutes acceptance of modified terms.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">11. Contact</h2>
              <p className="text-muted-foreground mb-4">
                For questions about these Terms of Service, please contact us at legal@dumoexpress.com or call +60 3-1234 5678.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
