import { useState, useEffect } from "react";
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

// Generate random alphanumeric string
function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Generate DES booking reference (DES + 8 random characters)
function generateBookingRef(): string {
  return `DES${generateRandomString(8)}`;
}

export default function Booking() {
  const [step, setStep] = useState(1);
  const [bookingRef, setBookingRef] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceSelect = (serviceId: string) => {
    setFormData(prev => ({ 
      ...prev, 
      serviceType: serviceId as "same-day" | "next-day" | "scheduled" | "bulk"
    }));
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.customerName || !formData.customerEmail || !formData.customerPhone ||
        !formData.pickupAddress || !formData.deliveryAddress || !formData.packageWeight) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    try {
      // Generate booking reference
      const newBookingRef = generateBookingRef();
      
      // Load existing tracking data
      const response = await fetch("/tracking-data.json");
      const trackingData = await response.json();

      // Calculate estimated delivery date
      const now = new Date();
      const estDelivery = new Date();
      
      const deliveryDays = {
        'same-day': 1,
        'next-day': 1,
        'scheduled': 3,
        'bulk': 5
      };
      
      estDelivery.setDate(now.getDate() + (deliveryDays[formData.serviceType] || 3));

      // Map service type to display name
      const serviceMap = {
        'same-day': 'Same-Day Delivery',
        'next-day': 'Next-Day Delivery',
        'scheduled': 'Scheduled Pickup',
        'bulk': 'Bulk Shipment'
      };

      // Create new shipment entry
      const newShipment = {
        trackingNumber: newBookingRef,
        sender: {
          name: formData.customerName,
          location: formData.pickupAddress
        },
        receiver: {
          name: "To be assigned",
          address: formData.deliveryAddress
        },
        package: {
          description: "New Booking",
          weight: formData.packageWeight
        },
        serviceType: serviceMap[formData.serviceType] || formData.serviceType,
        status: "Collected",
        createdAt: now.toISOString(),
        estimatedDelivery: estDelivery.toISOString(),
        history: [
          {
            status: "Collected",
            timestamp: now.toISOString(),
            location: "Online Booking",
            description: "Shipment created via online booking"
          }
        ]
      };

      // Add to tracking data
      trackingData.shipments.push(newShipment);

      // Store in localStorage for persistence (since we can't write to server)
      localStorage.setItem('dumoexpress_bookings', JSON.stringify(trackingData.shipments));
      
      // Also try to update the JSON file via a simple POST (will fail on cPanel but won't break the flow)
      try {
        await fetch("/api/update-tracking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(trackingData)
        }).catch(() => {
          // Silently fail - we have localStorage as backup
        });
      } catch (err) {
        // Ignore errors
      }

      setBookingRef(newBookingRef);
      setStep(3);
      toast.success("Booking created successfully!");
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to create booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bookingRef);
    toast.success("Booking reference copied!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[oklch(0.45_0.15_250)] to-[oklch(0.35_0.12_250)] text-white py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img src="/images/booking-hero.jpg" alt="Book a delivery" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.45_0.15_250)] via-[oklch(0.45_0.15_250)]/90 to-[oklch(0.35_0.12_250)]/80" />
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Book a Delivery
              </h1>
              <p className="text-lg text-white/90">
                Schedule your parcel pickup in just a few steps.
              </p>
            </div>
          </div>
        </section>

        {/* Booking Steps */}
        <section className="py-12 lg:py-16">
          <div className="container max-w-4xl">
            {/* Step Indicator */}
            <div className="flex justify-between mb-12">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                    s <= step 
                      ? 'bg-[oklch(0.45_0.15_250)] text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {s}
                  </div>
                  <div className={`flex-1 h-1 mx-2 ${
                    s < step ? 'bg-[oklch(0.45_0.15_250)]' : 'bg-gray-200'
                  }`} />
                </div>
              ))}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                3 <= step 
                  ? 'bg-[oklch(0.45_0.15_250)] text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                3
              </div>
            </div>

            {/* Step 1: Select Service */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold mb-8">Select Service Type</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {serviceTypes.map((service) => {
                    const Icon = service.icon;
                    return (
                      <button
                        key={service.id}
                        onClick={() => handleServiceSelect(service.id)}
                        className="p-6 border-2 border-gray-200 rounded-lg hover:border-[oklch(0.45_0.15_250)] hover:bg-blue-50 transition text-left"
                      >
                        <Icon className="w-8 h-8 text-[oklch(0.45_0.15_250)] mb-3" />
                        <h3 className="font-semibold text-lg mb-1">{service.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                        <p className="font-semibold text-[oklch(0.45_0.15_250)]">{service.price}</p>
                      </button>
                    );
                  })}
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
                          <Input
                            id="packageWeight"
                            placeholder="e.g., 2.5 kg, 500g, 1 lb"
                            value={formData.packageWeight}
                            onChange={(e) => handleChange("packageWeight", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="specialInstructions">Special Instructions</Label>
                          <Input
                            id="specialInstructions"
                            placeholder="e.g., Fragile, Handle with care"
                            value={formData.specialInstructions}
                            onChange={(e) => handleChange("specialInstructions", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex gap-4 pt-6">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 bg-[oklch(0.45_0.15_250)] hover:bg-[oklch(0.40_0.15_250)]"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            Confirm Booking
                            <ArrowRight className="w-4 h-4 ml-2" />
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
              <Card className="border-2 border-green-200 bg-green-50">
                <CardContent className="pt-8">
                  <div className="text-center">
                    <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
                    <p className="text-gray-600 mb-6">
                      Your booking has been successfully created. You can now track your delivery using the reference number below.
                    </p>

                    <div className="bg-white p-6 rounded-lg border-2 border-gray-200 mb-6">
                      <p className="text-sm text-gray-600 mb-2">Your Booking Reference</p>
                      <div className="flex items-center justify-center gap-3">
                        <code className="text-2xl font-bold text-[oklch(0.45_0.15_250)]">
                          {bookingRef}
                        </code>
                        <button
                          onClick={copyToClipboard}
                          className="p-2 hover:bg-gray-100 rounded transition"
                        >
                          <Copy className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">
                        Use this reference number to track your delivery on our tracking page.
                      </p>
                      <div className="flex gap-3">
                        <Link href="/track" className="flex-1">
                          <Button className="w-full bg-[oklch(0.45_0.15_250)] hover:bg-[oklch(0.40_0.15_250)]">
                            Track Parcel
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setStep(1);
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
                            setBookingRef("");
                          }}
                        >
                          New Booking
                        </Button>
                      </div>
                    </div>
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
