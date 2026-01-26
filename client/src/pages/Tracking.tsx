import { useState, useEffect } from "react";
import { useSearch } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock,
  MapPin,
  AlertCircle,
  Loader2
} from "lucide-react";

const statusConfig = {
  "Collected": {
    icon: Package,
    label: "Collected",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    description: "Parcel has been collected and registered"
  },
  "In Transit": {
    icon: Truck,
    label: "In Transit",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    description: "Parcel is on its way to the destination"
  },
  "Out for Delivery": {
    icon: MapPin,
    label: "Out for Delivery",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    description: "Parcel is out for delivery"
  },
  "Delivered": {
    icon: CheckCircle2,
    label: "Delivered",
    color: "text-green-600",
    bgColor: "bg-green-100",
    description: "Parcel has been delivered successfully"
  }
};

const statusOrder = ["Collected", "In Transit", "Out for Delivery", "Delivered"];

interface TrackingData {
  shipments: Array<{
    trackingNumber: string;
    sender: { name: string; location: string };
    receiver: { name: string; address: string };
    package: { description: string; weight: string };
    serviceType: string;
    status: string;
    createdAt: string;
    estimatedDelivery: string;
    history: Array<{
      status: string;
      timestamp: string;
      location: string;
      description: string;
    }>;
  }>;
}

export default function Tracking() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const initialQuery = params.get("q") || "";
  
  const [trackingNumber, setTrackingNumber] = useState(initialQuery);
  const [searchedNumber, setSearchedNumber] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [foundParcel, setFoundParcel] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Load tracking data on component mount
  useEffect(() => {
    const loadTrackingData = async () => {
      try {
        const response = await fetch("/tracking-data.json");
        const data = await response.json();
        setTrackingData(data);
      } catch (err) {
        console.error("Failed to load tracking data:", err);
      }
    };
    loadTrackingData();
  }, []);

  // Search for parcel when searchedNumber changes
  useEffect(() => {
    if (searchedNumber && trackingData) {
      setIsLoading(true);
      setError(null);
      setFoundParcel(null);

      // Simulate search delay for better UX
      setTimeout(() => {
        const parcel = trackingData.shipments.find(
          (s) => s.trackingNumber === searchedNumber.toUpperCase()
        );

        if (parcel) {
          setFoundParcel(parcel);
        } else {
          setError(`No parcel found with tracking number: ${searchedNumber}`);
        }
        setIsLoading(false);
      }, 500);
    }
  }, [searchedNumber, trackingData]);

  useEffect(() => {
    if (initialQuery) {
      setSearchedNumber(initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      setSearchedNumber(trackingNumber.trim().toUpperCase());
    }
  };

  const getCurrentStatusIndex = (status: string) => {
    return statusOrder.indexOf(status);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[oklch(0.45_0.15_250)] to-[oklch(0.35_0.12_250)] text-white py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img src="/images/tracking-app.jpg" alt="Tracking app" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.45_0.15_250)] via-[oklch(0.45_0.15_250)]/90 to-[oklch(0.35_0.12_250)]/80" />
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Track Your Parcel
              </h1>
              <p className="text-xl text-white/80 mb-8">
                Enter your tracking number to see real-time updates on your delivery status.
              </p>
              
              {/* Search Form */}
              <form onSubmit={handleSearch} className="max-w-xl mx-auto">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Enter tracking number (e.g., DE2024DUBAI1)"
                      className="pl-12 h-14 text-lg border-0 bg-white text-gray-900"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                    />
                  </div>
                  <Button type="submit" size="lg" className="h-14 px-8 bg-[oklch(0.85_0.15_85)] text-[oklch(0.2_0.02_250)] hover:bg-[oklch(0.8_0.15_85)]">
                    Track
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-12 lg:py-16">
          <div className="container max-w-4xl">
            {isLoading && (
              <Card>
                <CardContent className="py-16 text-center">
                  <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">Searching for your parcel...</p>
                </CardContent>
              </Card>
            )}

            {error && (
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="py-8 text-center">
                  <Package className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-yellow-900 mb-2">Parcel Not Found</h3>
                  <p className="text-yellow-700 mb-4">
                    {error}
                  </p>
                  <p className="text-sm text-yellow-600">
                    Please check the tracking number and try again. Test tracking numbers: DE2024DUBAI1, RL2024CANADA1
                  </p>
                </CardContent>
              </Card>
            )}

            {foundParcel && (
              <div className="space-y-6">
                {/* Parcel Info Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Tracking Number</p>
                        <CardTitle className="text-2xl">{foundParcel.trackingNumber}</CardTitle>
                      </div>
                      <div className={`px-4 py-2 rounded-full ${statusConfig[foundParcel.status as keyof typeof statusConfig]?.bgColor}`}>
                        <span className={`font-semibold ${statusConfig[foundParcel.status as keyof typeof statusConfig]?.color}`}>
                          {statusConfig[foundParcel.status as keyof typeof statusConfig]?.label}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Sender</h4>
                        <p className="text-muted-foreground">{foundParcel.sender.name}</p>
                        <p className="text-sm text-muted-foreground">{foundParcel.sender.location}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Receiver</h4>
                        <p className="text-muted-foreground">{foundParcel.receiver.name}</p>
                        <p className="text-sm text-muted-foreground">{foundParcel.receiver.address}</p>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Service Type</p>
                        <p className="font-medium capitalize">{foundParcel.serviceType}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Weight</p>
                        <p className="font-medium">{foundParcel.package.weight}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Created</p>
                        <p className="font-medium">{new Date(foundParcel.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Est. Delivery</p>
                        <p className="font-medium">{new Date(foundParcel.estimatedDelivery).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Status Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle>Delivery Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      {/* Progress Line */}
                      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
                      <div 
                        className="absolute left-6 top-0 w-0.5 bg-primary transition-all duration-500"
                        style={{ 
                          height: `${(getCurrentStatusIndex(foundParcel.status) / (statusOrder.length - 1)) * 100}%` 
                        }}
                      />
                      
                      {/* Status Steps */}
                      <div className="space-y-8">
                        {statusOrder.map((status, index) => {
                          const config = statusConfig[status as keyof typeof statusConfig];
                          const StatusIcon = config.icon;
                          const isActive = getCurrentStatusIndex(foundParcel.status) >= index;
                          const isCurrent = foundParcel.status === status;
                          
                          return (
                            <div key={status} className="flex items-start gap-4 relative">
                              <div className={`
                                w-12 h-12 rounded-full flex items-center justify-center z-10
                                ${isActive ? config.bgColor : 'bg-gray-100'}
                                ${isCurrent ? 'ring-4 ring-primary/20' : ''}
                              `}>
                                <StatusIcon className={`h-6 w-6 ${isActive ? config.color : 'text-gray-400'}`} />
                              </div>
                              <div className="flex-1 pt-2">
                                <h4 className={`font-semibold ${isActive ? 'text-foreground' : 'text-gray-400'}`}>
                                  {config.label}
                                </h4>
                                <p className={`text-sm ${isActive ? 'text-muted-foreground' : 'text-gray-300'}`}>
                                  {config.description}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Status History */}
                {foundParcel.history && foundParcel.history.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Tracking History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {foundParcel.history.map((entry: any, index: number) => {
                          const config = statusConfig[entry.status as keyof typeof statusConfig];
                          return (
                            <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                              <div className={`w-10 h-10 rounded-full ${config.bgColor} flex items-center justify-center flex-shrink-0`}>
                                <config.icon className={`h-5 w-5 ${config.color}`} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-semibold">{config.label}</h4>
                                  <span className="text-sm text-muted-foreground">
                                    {new Date(entry.timestamp).toLocaleString()}
                                  </span>
                                </div>
                                {entry.location && (
                                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                    <MapPin className="h-3 w-3" /> {entry.location}
                                  </p>
                                )}
                                {entry.description && (
                                  <p className="text-sm text-muted-foreground mt-1">{entry.description}</p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Empty State */}
            {!searchedNumber && !isLoading && (
              <Card>
                <CardContent className="py-16 text-center">
                  <Search className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Enter Your Tracking Number</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Enter your DumoExpress tracking number above to see the current status and location of your parcel.
                  </p>
                  <div className="mt-6 text-sm text-muted-foreground">
                    <p>Test tracking numbers:</p>
                    <p className="mt-2"><strong>DE2024DUBAI1</strong> - Dubai delivery</p>
                    <p><strong>RL2024CANADA1</strong> - Canada delivery</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* Help Section */}
        <section className="py-12 lg:py-16 bg-[oklch(0.97_0.01_250)]">
          <div className="container max-w-4xl">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Where can I find my tracking number?</h3>
                  <p className="text-sm text-muted-foreground">
                    Your tracking number is provided in the confirmation email or SMS sent after booking. It starts with "DE" or "RL" followed by numbers.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">How often is tracking updated?</h3>
                  <p className="text-sm text-muted-foreground">
                    Tracking information is updated in real-time as your parcel moves through our network. You'll see updates at each checkpoint.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">What if my parcel is delayed?</h3>
                  <p className="text-sm text-muted-foreground">
                    If your parcel is delayed, please contact our support team. We'll investigate and provide you with an updated delivery estimate.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Can I change the delivery address?</h3>
                  <p className="text-sm text-muted-foreground">
                    Address changes may be possible before the parcel is out for delivery. Contact us immediately if you need to make changes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
