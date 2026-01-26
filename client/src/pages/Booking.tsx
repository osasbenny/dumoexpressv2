import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Link } from "wouter";
import { 
  Package, 
  Truck, 
  Clock, 
  Building2,
  Loader2,
  CheckCircle2,
  ArrowRight,
  Copy
} from "lucide-react";

const serviceTypes = [
  {
    id: "same-day",
    icon: Truck,
    name: "Same-Day Delivery",
    description: "Delivery within 4-6 hours",
    price: "From RM 15"
  },
  {
    id: "next-day",
    icon: Package,
    name: "Next-Day Delivery",
    description: "Delivery by 12pm next day",
    price: "From RM 8"
  },
  {
    id: "scheduled",
    icon: Clock,
    name: "Scheduled Pickup",
    description: "Choose your preferred date",
    price: "From RM 10"
  },
  {
    id: "bulk",
    icon: Building2,
    name: "Bulk Shipment",
    description: "Volume discounts available",
    price: "Custom quote"
  },
];

const weightOptions = [
  "Up to 1 kg",
  "1-3 kg",
  "3-5 kg",
  "5-10 kg",
  "10-20 kg",
  "Over 20 kg"
];

export default function Booking() {
  const [step, setStep] = useState(1);
  const [bookingRef, setBookingRef] = useState("");
  const [formData, setFormData] = useState({
    serviceType: "next-day" as "same-day" | "next-day" | "scheduled" | "bulk",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    pickupAddress: "",
    deliveryAddress: "",
    packageWeight: "",
    specialInstructions: ""
  });

  const createBooking = trpc.booking.create.useMutation({
    onSuccess: (data) => {
      setBookingRef(data.bookingRef);
      setStep(3);
      toast.success("Booking created successfully!");
    },
    onError: (error) => {
      toast.error("Failed to create booking. Please try again.");
    }
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceSelect = (serviceId: string) => {
    setFormData(prev => ({ ...prev, serviceType: serviceId as typeof formData.serviceType }));
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.customerEmail || !formData.customerPhone || 
        !formData.pickupAddress || !formData.deliveryAddress || !formData.packageWeight) {
      toast.error("Please fill in all required fields.");
      return;
    }
    createBooking.mutate(formData);
  };

  const copyBookingRef = () => {
    navigator.clipboard.writeText(bookingRef);
    toast.success("Booking reference copied!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[oklch(0.45_0.15_250)] to-[oklch(0.35_0.12_250)] text-white py-12 lg:py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Book a Delivery
              </h1>
              <p className="text-xl text-white/80">
                Schedule your parcel pickup in just a few steps.
              </p>
            </div>
          </div>
        </section>

        {/* Progress Steps */}
        <section className="py-8 border-b">
          <div className="container">
            <div className="flex items-center justify-center gap-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-semibold
                    ${step >= s ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}
                  `}>
                    {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
                  </div>
                  <span className={`ml-2 hidden sm:inline ${step >= s ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {s === 1 ? 'Select Service' : s === 2 ? 'Enter Details' : 'Confirmation'}
                  </span>
                  {s < 3 && <div className="w-12 h-0.5 bg-gray-200 mx-4" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Step Content */}
        <section className="py-12 lg:py-16">
          <div className="container max-w-4xl">
            {/* Step 1: Select Service */}
            {step === 1 && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-2">Choose Your Service</h2>
                  <p className="text-muted-foreground">Select the delivery option that best fits your needs.</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {serviceTypes.map((service) => (
                    <Card 
                      key={service.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        formData.serviceType === service.id ? 'border-2 border-primary' : ''
                      }`}
                      onClick={() => handleServiceSelect(service.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <service.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">{service.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                            <p className="text-sm font-semibold text-primary">{service.price}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Enter Details */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Booking Details</CardTitle>
                  <CardDescription>
                    Service: {serviceTypes.find(s => s.id === formData.serviceType)?.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Contact Information */}
                    <div>
                      <h3 className="font-semibold mb-4">Contact Information</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="customerName">Full Name *</Label>
                          <Input
                            id="customerName"
                            placeholder="Your name"
                            value={formData.customerName}
                            onChange={(e) => handleChange("customerName", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="customerEmail">Email *</Label>
                          <Input
                            id="customerEmail"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.customerEmail}
                            onChange={(e) => handleChange("customerEmail", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="customerPhone">Phone *</Label>
                          <Input
                            id="customerPhone"
                            type="tel"
                            placeholder="+60 12-345 6789"
                            value={formData.customerPhone}
                            onChange={(e) => handleChange("customerPhone", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Addresses */}
                    <div>
                      <h3 className="font-semibold mb-4">Pickup & Delivery</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="pickupAddress">Pickup Address *</Label>
                          <Textarea
                            id="pickupAddress"
                            placeholder="Full address including postcode"
                            rows={3}
                            value={formData.pickupAddress}
                            onChange={(e) => handleChange("pickupAddress", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="deliveryAddress">Delivery Address *</Label>
                          <Textarea
                            id="deliveryAddress"
                            placeholder="Full address including postcode"
                            rows={3}
                            value={formData.deliveryAddress}
                            onChange={(e) => handleChange("deliveryAddress", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Package Details */}
                    <div>
                      <h3 className="font-semibold mb-4">Package Details</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="packageWeight">Package Weight *</Label>
                          <Select 
                            value={formData.packageWeight} 
                            onValueChange={(value) => handleChange("packageWeight", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select weight range" />
                            </SelectTrigger>
                            <SelectContent>
                              {weightOptions.map((weight) => (
                                <SelectItem key={weight} value={weight}>
                                  {weight}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="specialInstructions">Special Instructions</Label>
                          <Input
                            id="specialInstructions"
                            placeholder="Fragile, handle with care, etc."
                            value={formData.specialInstructions}
                            onChange={(e) => handleChange("specialInstructions", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 pt-4">
                      <Button type="button" variant="outline" onClick={() => setStep(1)}>
                        Back
                      </Button>
                      <Button type="submit" className="flex-1 gap-2" disabled={createBooking.isPending}>
                        {createBooking.isPending ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            Confirm Booking <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <Card className="text-center">
                <CardContent className="py-12">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
                  <p className="text-muted-foreground mb-6">
                    Your delivery has been scheduled. You can now track your shipment using the reference number below.
                  </p>
                  
                  <div className="bg-[oklch(0.97_0.01_250)] rounded-lg p-6 max-w-md mx-auto mb-8">
                    <p className="text-sm text-muted-foreground mb-2">Your Booking Reference</p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-2xl font-bold font-mono">{bookingRef}</span>
                      <Button variant="ghost" size="icon" onClick={copyBookingRef}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Save this reference to track your booking status
                    </p>
                  </div>
                  
                  <div className="space-y-4 text-left max-w-md mx-auto mb-8">
                    <h3 className="font-semibold">What's Next?</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        You'll receive a confirmation email with booking details
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Our team will contact you to confirm pickup time
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Once collected, you can track your parcel in real-time
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href={`/tracking?q=${bookingRef}`}>
                      <Button variant="outline" className="gap-2">
                        Track Parcel Now
                      </Button>
                    </Link>
                    <Button onClick={() => {
                      setStep(1);
                      setBookingRef("");
                      setFormData({
                        serviceType: "next-day",
                        customerName: "",
                        customerEmail: "",
                        customerPhone: "",
                        pickupAddress: "",
                        deliveryAddress: "",
                        packageWeight: "",
                        specialInstructions: ""
                      });
                    }} className="gap-2">
                      Book Another Delivery
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
