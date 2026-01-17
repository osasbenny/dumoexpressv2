import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Truck, 
  Package, 
  Clock, 
  Building2, 
  CheckCircle2,
  ArrowRight,
  Zap,
  Shield,
  MapPin,
  Calendar
} from "lucide-react";

const services = [
  {
    id: "same-day",
    icon: Truck,
    image: "/images/delivery-person.jpg",
    title: "Same-Day Delivery",
    subtitle: "Urgent deliveries within hours",
    description: "When time is critical, our same-day delivery service ensures your parcels reach their destination within hours. Perfect for urgent documents, time-sensitive products, and last-minute gifts.",
    features: [
      "Delivery within 4-6 hours in city areas",
      "Real-time GPS tracking",
      "Dedicated courier assignment",
      "Priority handling",
      "SMS/Email notifications",
      "Proof of delivery"
    ],
    pricing: "From RM 15",
    color: "bg-blue-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    id: "next-day",
    icon: Package,
    image: "/images/delivery-truck.jpg",
    title: "Next-Day Delivery",
    subtitle: "Reliable overnight shipping",
    description: "Our most popular service for businesses and individuals. Ship today, deliver tomorrow. Guaranteed delivery by noon the next business day to major cities across Malaysia.",
    features: [
      "Guaranteed delivery by 12pm",
      "Nationwide coverage",
      "Competitive pricing",
      "Package insurance included",
      "Multiple pickup options",
      "Bulk discounts available"
    ],
    pricing: "From RM 8",
    color: "bg-yellow-500",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-600",
  },
  {
    id: "scheduled",
    icon: Clock,
    image: "/images/courier-smiling.jpg",
    title: "Scheduled Pickup & Delivery",
    subtitle: "Plan your deliveries in advance",
    description: "Perfect for regular shipments and planned deliveries. Schedule pickups and deliveries at your convenience. Ideal for subscription boxes, regular business shipments, and recurring orders.",
    features: [
      "Flexible scheduling options",
      "Recurring pickup available",
      "Preferred time slots",
      "Advance booking discounts",
      "Calendar integration",
      "Automated reminders"
    ],
    pricing: "From RM 10",
    color: "bg-green-500",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
  },
  {
    id: "bulk",
    icon: Building2,
    image: "/images/bulk-shipping.webp",
    title: "Business Bulk Shipments",
    subtitle: "Volume solutions for enterprises",
    description: "Tailored logistics solutions for businesses with high-volume shipping needs. Enjoy dedicated account management, volume discounts, and customized delivery schedules.",
    features: [
      "Volume-based pricing",
      "Dedicated account manager",
      "API integration available",
      "Custom reporting",
      "Invoice billing",
      "Priority support"
    ],
    pricing: "Custom Quote",
    color: "bg-purple-500",
    bgColor: "bg-purple-50",
    textColor: "text-purple-600",
  },
];

const benefits = [
  {
    icon: Zap,
    title: "Fast Processing",
    description: "Quick pickup within 2 hours of booking confirmation",
  },
  {
    icon: Shield,
    title: "Secure Handling",
    description: "All parcels are handled with care and fully insured",
  },
  {
    icon: MapPin,
    title: "Wide Coverage",
    description: "Delivering to all states in Malaysia including East Malaysia",
  },
  {
    icon: Calendar,
    title: "Flexible Options",
    description: "Choose delivery times that work for you and your customers",
  },
];

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[oklch(0.45_0.15_250)] to-[oklch(0.35_0.12_250)] text-white py-16 lg:py-24">
          <div className="container">
            <div className="max-w-3xl">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Our Delivery Services
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                From urgent same-day deliveries to scheduled business shipments, we have the right solution for every need. Choose the service that fits your requirements.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="space-y-16">
              {services.map((service, index) => (
                <div 
                  key={service.id} 
                  id={service.id}
                  className={`scroll-mt-24 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                >
                  <Card className="overflow-hidden border-2 hover:border-primary/20 transition-colors">
                    <div className={`grid lg:grid-cols-2 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                      {/* Image Side */}
                      <div className={`relative h-64 lg:h-auto ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                        <img 
                          src={service.image} 
                          alt={service.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </div>
                      
                      {/* Content Side */}
                      <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                        <CardContent className="p-8 lg:p-12">
                        <div className={`w-16 h-16 rounded-2xl ${service.bgColor} flex items-center justify-center mb-6`}>
                          <service.icon className={`h-8 w-8 ${service.textColor}`} />
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {service.title}
                        </h2>
                        <p className={`${service.textColor} font-medium mb-4`}>{service.subtitle}</p>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {service.description}
                        </p>
                        <div className="flex items-center gap-4 mb-6">
                          <span className="text-2xl font-bold text-primary">{service.pricing}</span>
                          <span className="text-sm text-muted-foreground">per parcel</span>
                        </div>
                        <Link href="/booking">
                          <Button className="gap-2">
                            Book This Service <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </CardContent>
                      </div>
                      
                      {/* Features Side */}
                      <div className={`${service.bgColor} p-8 lg:p-12`}>
                        <h3 className="font-semibold text-lg mb-6">What's Included</h3>
                        <ul className="space-y-4">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-3">
                              <CheckCircle2 className={`h-5 w-5 ${service.textColor} flex-shrink-0 mt-0.5`} />
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 lg:py-24 bg-[oklch(0.97_0.01_250)]">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Why Choose Our Services?
              </h2>
              <p className="text-muted-foreground text-lg">
                Every service comes with these standard benefits at no extra cost.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit) => (
                <Card key={benefit.title} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Service Comparison
              </h2>
              <p className="text-muted-foreground text-lg">
                Compare our services to find the best fit for your needs.
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[oklch(0.97_0.01_250)]">
                    <th className="p-4 text-left font-semibold border">Feature</th>
                    <th className="p-4 text-center font-semibold border">Same-Day</th>
                    <th className="p-4 text-center font-semibold border">Next-Day</th>
                    <th className="p-4 text-center font-semibold border">Scheduled</th>
                    <th className="p-4 text-center font-semibold border">Bulk</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 border font-medium">Starting Price</td>
                    <td className="p-4 text-center border">RM 15</td>
                    <td className="p-4 text-center border">RM 8</td>
                    <td className="p-4 text-center border">RM 10</td>
                    <td className="p-4 text-center border">Custom</td>
                  </tr>
                  <tr className="bg-[oklch(0.99_0_0)]">
                    <td className="p-4 border font-medium">Delivery Time</td>
                    <td className="p-4 text-center border">4-6 hours</td>
                    <td className="p-4 text-center border">By 12pm next day</td>
                    <td className="p-4 text-center border">As scheduled</td>
                    <td className="p-4 text-center border">Flexible</td>
                  </tr>
                  <tr>
                    <td className="p-4 border font-medium">Real-time Tracking</td>
                    <td className="p-4 text-center border"><CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="p-4 text-center border"><CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="p-4 text-center border"><CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="p-4 text-center border"><CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr className="bg-[oklch(0.99_0_0)]">
                    <td className="p-4 border font-medium">Insurance</td>
                    <td className="p-4 text-center border"><CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="p-4 text-center border"><CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="p-4 text-center border"><CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="p-4 text-center border"><CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 border font-medium">Dedicated Support</td>
                    <td className="p-4 text-center border"><CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="p-4 text-center border">Standard</td>
                    <td className="p-4 text-center border">Standard</td>
                    <td className="p-4 text-center border"><CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr className="bg-[oklch(0.99_0_0)]">
                    <td className="p-4 border font-medium">Best For</td>
                    <td className="p-4 text-center border text-sm">Urgent items</td>
                    <td className="p-4 text-center border text-sm">Regular shipping</td>
                    <td className="p-4 text-center border text-sm">Planned deliveries</td>
                    <td className="p-4 text-center border text-sm">High volume</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-primary text-white">
          <div className="container text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Ready to Get Started?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Book your first delivery today and experience the DumoExpress difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking">
                <Button size="lg" className="bg-[oklch(0.85_0.15_85)] text-[oklch(0.2_0.02_250)] hover:bg-[oklch(0.8_0.15_85)] gap-2">
                  Book Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  View Full Pricing
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
