import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Shield, 
  Zap, 
  MapPin, 
  Users, 
  Award, 
  Clock,
  Target,
  Heart,
  Lightbulb,
  ArrowRight
} from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Trust & Reliability",
    description: "We handle every parcel with care and ensure it reaches its destination safely. Our 99.5% on-time delivery rate speaks for itself.",
  },
  {
    icon: Zap,
    title: "Speed & Efficiency",
    description: "Time matters. Our optimized routes and dedicated fleet ensure your parcels arrive as quickly as possible.",
  },
  {
    icon: MapPin,
    title: "Nationwide Coverage",
    description: "From Perlis to Sabah, we deliver to every corner of Malaysia. No destination is too far for DumoExpress.",
  },
];

const milestones = [
  { year: "2018", title: "Founded", description: "DumoExpress started operations in Kuala Lumpur" },
  { year: "2019", title: "Expansion", description: "Extended services to Selangor and Penang" },
  { year: "2020", title: "Nationwide", description: "Achieved coverage across all 13 states" },
  { year: "2021", title: "50K Deliveries", description: "Milestone of 50,000 successful deliveries" },
  { year: "2022", title: "Tech Upgrade", description: "Launched real-time tracking system" },
  { year: "2023", title: "Business Solutions", description: "Introduced bulk shipment services" },
];

const team = [
  {
    name: "Ahmad Razali",
    role: "Chief Executive Officer",
    description: "15+ years in logistics and supply chain management",
  },
  {
    name: "Sarah Wong",
    role: "Operations Director",
    description: "Expert in fleet management and route optimization",
  },
  {
    name: "Raj Krishnan",
    role: "Technology Lead",
    description: "Building innovative tracking and delivery solutions",
  },
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[oklch(0.45_0.15_250)] to-[oklch(0.35_0.12_250)] text-white py-16 lg:py-24">
          <div className="container">
            <div className="max-w-3xl">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                About DumoExpress
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                We're on a mission to revolutionize courier services in Malaysia. Since 2018, we've been delivering trust, speed, and reliability to thousands of customers across the nation.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12">
              <Card className="border-2 border-primary/20">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Target className="h-7 w-7 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To provide fast, reliable, and affordable courier services that connect businesses and individuals across Malaysia. We strive to make every delivery a seamless experience, ensuring your parcels arrive safely and on time.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-[oklch(0.85_0.15_85)]/20">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-[oklch(0.85_0.15_85)]/10 flex items-center justify-center mb-6">
                    <Lightbulb className="h-7 w-7 text-[oklch(0.75_0.15_85)]" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Our Vision</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To become Malaysia's most trusted courier service, known for innovation, customer satisfaction, and sustainable delivery practices. We envision a future where every Malaysian has access to world-class logistics services.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 lg:py-24 bg-[oklch(0.97_0.01_250)]">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Our Core Values
              </h2>
              <p className="text-muted-foreground text-lg">
                These principles guide everything we do at DumoExpress.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value) => (
                <div key={value.title} className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Timeline */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Our Journey
              </h2>
              <p className="text-muted-foreground text-lg">
                From a small startup to a nationwide courier service.
              </p>
            </div>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border hidden lg:block" />
              
              <div className="space-y-8 lg:space-y-0">
                {milestones.map((milestone, index) => (
                  <div key={milestone.year} className={`lg:flex lg:items-center lg:gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:text-left lg:pl-12'}`}>
                      <Card className="inline-block">
                        <CardContent className="p-6">
                          <span className="text-sm font-semibold text-primary">{milestone.year}</span>
                          <h3 className="text-lg font-semibold mt-1">{milestone.title}</h3>
                          <p className="text-sm text-muted-foreground mt-2">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="hidden lg:flex w-4 h-4 rounded-full bg-primary relative z-10" />
                    <div className="lg:w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 lg:py-24 bg-primary text-white">
          <div className="container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl lg:text-5xl font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>50K+</div>
                <div className="text-white/70">Parcels Delivered</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>500+</div>
                <div className="text-white/70">Business Partners</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>13</div>
                <div className="text-white/70">States Covered</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>99.5%</div>
                <div className="text-white/70">On-Time Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Leadership Team
              </h2>
              <p className="text-muted-foreground text-lg">
                Meet the people driving DumoExpress forward.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member) => (
                <Card key={member.name} className="text-center">
                  <CardContent className="p-8">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-[oklch(0.55_0.15_250)] mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-primary font-medium text-sm mb-2">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-[oklch(0.97_0.01_250)]">
          <div className="container text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Ready to Experience the DumoExpress Difference?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us with their deliveries every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking">
                <Button size="lg" className="gap-2">
                  Book a Delivery <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="gap-2">
                  Contact Us
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
