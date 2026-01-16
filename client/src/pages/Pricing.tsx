import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  CheckCircle2, 
  Truck, 
  Package, 
  Clock, 
  Building2,
  ArrowRight,
  Info
} from "lucide-react";

const pricingTiers = [
  {
    name: "Same-Day",
    icon: Truck,
    description: "Urgent deliveries within hours",
    color: "bg-blue-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    popular: false,
    features: [
      "Delivery within 4-6 hours",
      "Real-time GPS tracking",
      "Dedicated courier",
      "Priority handling",
      "Insurance included"
    ],
    prices: [
      { weight: "Up to 1 kg", price: "RM 15" },
      { weight: "1-3 kg", price: "RM 20" },
      { weight: "3-5 kg", price: "RM 28" },
      { weight: "5-10 kg", price: "RM 38" },
      { weight: "10-20 kg", price: "RM 55" },
    ]
  },
  {
    name: "Next-Day",
    icon: Package,
    description: "Reliable overnight delivery",
    color: "bg-primary",
    bgColor: "bg-primary/10",
    textColor: "text-primary",
    popular: true,
    features: [
      "Delivery by 12pm next day",
      "Nationwide coverage",
      "Online tracking",
      "SMS notifications",
      "Insurance included"
    ],
    prices: [
      { weight: "Up to 1 kg", price: "RM 8" },
      { weight: "1-3 kg", price: "RM 12" },
      { weight: "3-5 kg", price: "RM 18" },
      { weight: "5-10 kg", price: "RM 25" },
      { weight: "10-20 kg", price: "RM 38" },
    ]
  },
  {
    name: "Scheduled",
    icon: Clock,
    description: "Plan your deliveries ahead",
    color: "bg-green-500",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
    popular: false,
    features: [
      "Flexible time slots",
      "Recurring options",
      "Advance booking discount",
      "Calendar integration",
      "Insurance included"
    ],
    prices: [
      { weight: "Up to 1 kg", price: "RM 10" },
      { weight: "1-3 kg", price: "RM 14" },
      { weight: "3-5 kg", price: "RM 20" },
      { weight: "5-10 kg", price: "RM 28" },
      { weight: "10-20 kg", price: "RM 42" },
    ]
  },
];

const bulkPricing = [
  { volume: "50-100 parcels/month", discount: "10% off" },
  { volume: "100-500 parcels/month", discount: "15% off" },
  { volume: "500-1000 parcels/month", discount: "20% off" },
  { volume: "1000+ parcels/month", discount: "Custom pricing" },
];

const additionalServices = [
  { service: "Cash on Delivery (COD)", price: "RM 3 per transaction" },
  { service: "Fragile Handling", price: "RM 5 per parcel" },
  { service: "Temperature Controlled", price: "RM 15 per parcel" },
  { service: "Signature Required", price: "RM 2 per parcel" },
  { service: "Weekend Delivery", price: "+RM 5 per parcel" },
  { service: "Additional Insurance", price: "1% of declared value" },
];

const zones = [
  { zone: "Zone 1", areas: "Within same city/district", surcharge: "No surcharge" },
  { zone: "Zone 2", areas: "Within same state", surcharge: "+RM 2" },
  { zone: "Zone 3", areas: "Peninsular Malaysia (interstate)", surcharge: "+RM 5" },
  { zone: "Zone 4", areas: "East Malaysia (Sabah & Sarawak)", surcharge: "+RM 12" },
];

export default function Pricing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[oklch(0.45_0.15_250)] to-[oklch(0.35_0.12_250)] text-white py-16 lg:py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Simple, Transparent Pricing
              </h1>
              <p className="text-xl text-white/80">
                No hidden fees. Choose the service that fits your needs and budget.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8">
              {pricingTiers.map((tier) => (
                <Card 
                  key={tier.name} 
                  className={`relative overflow-hidden ${tier.popular ? 'border-2 border-primary shadow-lg' : ''}`}
                >
                  {tier.popular && (
                    <div className="absolute top-0 right-0 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                      Most Popular
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <div className={`w-14 h-14 rounded-xl ${tier.bgColor} flex items-center justify-center mb-4`}>
                      <tier.icon className={`h-7 w-7 ${tier.textColor}`} />
                    </div>
                    <CardTitle className="text-2xl">{tier.name}</CardTitle>
                    <p className="text-muted-foreground">{tier.description}</p>
                  </CardHeader>
                  <CardContent>
                    {/* Price Table */}
                    <div className="mb-6">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="py-2 text-left font-medium text-muted-foreground">Weight</th>
                            <th className="py-2 text-right font-medium text-muted-foreground">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tier.prices.map((price) => (
                            <tr key={price.weight} className="border-b last:border-0">
                              <td className="py-2">{price.weight}</td>
                              <td className="py-2 text-right font-semibold">{price.price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link href="/booking">
                      <Button className={`w-full ${tier.popular ? '' : 'bg-primary/90'}`}>
                        Book Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Bulk Pricing */}
        <section className="py-16 lg:py-24 bg-[oklch(0.97_0.01_250)]">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-purple-600" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Business Bulk Pricing
                </h2>
                <p className="text-muted-foreground text-lg">
                  Volume discounts for businesses with regular shipping needs.
                </p>
              </div>
              
              <Card>
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[oklch(0.97_0.01_250)]">
                        <th className="p-4 text-left font-semibold">Monthly Volume</th>
                        <th className="p-4 text-right font-semibold">Discount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bulkPricing.map((tier) => (
                        <tr key={tier.volume} className="border-t">
                          <td className="p-4">{tier.volume}</td>
                          <td className="p-4 text-right font-semibold text-green-600">{tier.discount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
              
              <div className="text-center mt-8">
                <Link href="/contact">
                  <Button size="lg" className="gap-2">
                    Contact Sales for Custom Quote <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Zone Pricing */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Delivery Zones
                </h2>
                <p className="text-muted-foreground text-lg">
                  Pricing varies based on delivery distance. Here's our zone structure.
                </p>
              </div>
              
              <Card>
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[oklch(0.97_0.01_250)]">
                        <th className="p-4 text-left font-semibold">Zone</th>
                        <th className="p-4 text-left font-semibold">Coverage</th>
                        <th className="p-4 text-right font-semibold">Surcharge</th>
                      </tr>
                    </thead>
                    <tbody>
                      {zones.map((zone) => (
                        <tr key={zone.zone} className="border-t">
                          <td className="p-4 font-medium">{zone.zone}</td>
                          <td className="p-4 text-muted-foreground">{zone.areas}</td>
                          <td className="p-4 text-right font-semibold">{zone.surcharge}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-16 lg:py-24 bg-[oklch(0.97_0.01_250)]">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Additional Services
                </h2>
                <p className="text-muted-foreground text-lg">
                  Enhance your delivery with these optional add-ons.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {additionalServices.map((service) => (
                  <Card key={service.service}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <span>{service.service}</span>
                      <span className="font-semibold text-primary">{service.price}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Pricing FAQ
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">How is the weight calculated?</h3>
                    <p className="text-sm text-muted-foreground">
                      We use the greater of actual weight or volumetric weight. Volumetric weight = (L × W × H) / 5000 (in cm).
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Are there any hidden fees?</h3>
                    <p className="text-sm text-muted-foreground">
                      No hidden fees. The price you see includes basic insurance and standard handling. Additional services are optional.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                    <p className="text-sm text-muted-foreground">
                      We accept credit/debit cards, online banking (FPX), e-wallets, and invoice billing for business accounts.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Can I get a refund if delivery fails?</h3>
                    <p className="text-sm text-muted-foreground">
                      Yes, we offer full refunds for failed deliveries due to our fault. Please contact support within 7 days.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24 bg-primary text-white">
          <div className="container text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Ready to Ship?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Get started with DumoExpress today. Book your first delivery in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking">
                <Button size="lg" className="bg-[oklch(0.85_0.15_85)] text-[oklch(0.2_0.02_250)] hover:bg-[oklch(0.8_0.15_85)] gap-2">
                  Book a Delivery <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Get Custom Quote
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
