import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Package, 
  Truck, 
  Clock, 
  Building2, 
  Search, 
  Shield, 
  Zap, 
  MapPin,
  CheckCircle2,
  ArrowRight,
  Star
} from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

const services = [
  {
    icon: Truck,
    title: "Same-Day Delivery",
    description: "Urgent deliveries within hours. Perfect for time-sensitive packages across Malaysia.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Package,
    title: "Next-Day Delivery",
    description: "Reliable overnight delivery to any location in Malaysia. Guaranteed by noon.",
    color: "bg-yellow-50 text-yellow-600",
  },
  {
    icon: Clock,
    title: "Scheduled Pickup",
    description: "Plan your deliveries in advance. We pick up at your convenience.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Building2,
    title: "Business Solutions",
    description: "Volume discounts and dedicated account management for businesses.",
    color: "bg-purple-50 text-purple-600",
  },
];

const stats = [
  { value: "50K+", label: "Parcels Delivered" },
  { value: "99.5%", label: "On-Time Delivery" },
  { value: "500+", label: "Business Partners" },
  { value: "13", label: "States Covered" },
];

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Same-day delivery available for urgent shipments within city limits.",
  },
  {
    icon: Shield,
    title: "Fully Insured",
    description: "All parcels are covered with comprehensive insurance protection.",
  },
  {
    icon: MapPin,
    title: "Nationwide Coverage",
    description: "Delivering to all 13 states and 3 federal territories in Malaysia.",
  },
];

const testimonials = [
  {
    name: "Ahmad Razak",
    role: "E-commerce Owner",
    content: "DumoExpress has transformed our delivery operations. Same-day delivery has boosted our customer satisfaction significantly.",
    rating: 5,
  },
  {
    name: "Sarah Lim",
    role: "Small Business Owner",
    content: "Reliable, affordable, and professional. The tracking system keeps both us and our customers informed at every step.",
    rating: 5,
  },
  {
    name: "Raj Kumar",
    role: "Operations Manager",
    content: "We've been using DumoExpress for bulk shipments. Their business solutions have saved us both time and money.",
    rating: 5,
  },
];

export default function Home() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [, setLocation] = useLocation();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      setLocation(`/tracking?q=${encodeURIComponent(trackingNumber.trim())}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[oklch(0.45_0.15_250)] to-[oklch(0.35_0.12_250)] text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[oklch(0.85_0.15_85)] rounded-full blur-3xl" />
          </div>
          
          <div className="container relative py-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Delivering across Malaysia
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Fast & Reliable Courier Services in Malaysia
                </h1>
                
                <p className="text-lg text-white/80 max-w-xl">
                  From same-day express to scheduled pickups, we deliver your parcels safely and on time. Track your shipments in real-time, anywhere in Malaysia.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/booking">
                    <Button size="lg" className="w-full sm:w-auto bg-[oklch(0.85_0.15_85)] text-[oklch(0.2_0.02_250)] hover:bg-[oklch(0.8_0.15_85)] font-semibold gap-2">
                      <Package className="h-5 w-5" />
                      Book Now
                    </Button>
                  </Link>
                  <Link href="/tracking">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 gap-2">
                      <Search className="h-5 w-5" />
                      Track Parcel
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Hero Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/delivery-truck.jpg" 
                  alt="DumoExpress delivery truck" 
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </div>
          </div>
          
          {/* Quick Track Box - Moved below hero */}
          <div className="container relative -mt-8 pb-8">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-2xl">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Track Your Parcel</h2>
                <form onSubmit={handleTrack} className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Enter tracking number (e.g., DE1234567890)"
                      className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-primary text-gray-900"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-lg font-semibold">
                    Track Now
                  </Button>
                </form>
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-gray-500 mb-3">Popular tracking formats:</p>
                  <div className="flex flex-wrap gap-2">
                    {["DE1234567890", "DEABCD12345"].map((format) => (
                      <button
                        key={format}
                        onClick={() => setTrackingNumber(format)}
                        className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        {format}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-[oklch(0.97_0.01_250)] py-12">
          <div className="container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-primary mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Our Delivery Services
              </h2>
              <p className="text-muted-foreground text-lg">
                Choose the service that fits your needs. From urgent same-day deliveries to scheduled business shipments.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => (
                <Card key={service.title} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <service.icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                    <Link href="/services" className="inline-flex items-center text-sm font-medium text-primary hover:gap-2 transition-all">
                      Learn more <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 lg:py-24 bg-[oklch(0.97_0.01_250)]">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Why Choose DumoExpress?
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  We're committed to providing the best courier experience in Malaysia. Here's what sets us apart from the rest.
                </p>
                
                <div className="space-y-6">
                  {features.map((feature) => (
                    <div key={feature.title} className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <Link href="/about">
                    <Button variant="outline" className="gap-2">
                      Learn More About Us <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="/images/delivery-person.jpg" 
                  alt="Smiling delivery person" 
                  className="w-full h-[400px] object-cover rounded-2xl shadow-xl mb-6"
                />
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                      <div>
                        <p className="font-medium text-green-900">Parcel Delivered</p>
                        <p className="text-sm text-green-700">Your package has been delivered successfully</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                      <Truck className="h-6 w-6 text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-900">Out for Delivery</p>
                        <p className="text-sm text-blue-700">Driver is on the way to your location</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg">
                      <Package className="h-6 w-6 text-yellow-600" />
                      <div>
                        <p className="font-medium text-yellow-900">In Transit</p>
                        <p className="text-sm text-yellow-700">Package is being transported</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-[oklch(0.85_0.15_85)] rounded-full opacity-20 blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary rounded-full opacity-20 blur-xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                What Our Customers Say
              </h2>
              <p className="text-muted-foreground text-lg">
                Trusted by thousands of businesses and individuals across Malaysia.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name} className="border-2">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-primary text-white">
          <div className="container text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Ready to Ship Your Parcel?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Get started with DumoExpress today. Book your first delivery and experience the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking">
                <Button size="lg" className="bg-[oklch(0.85_0.15_85)] text-[oklch(0.2_0.02_250)] hover:bg-[oklch(0.8_0.15_85)] font-semibold gap-2">
                  <Package className="h-5 w-5" />
                  Book a Delivery
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2">
                  Contact Sales
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
