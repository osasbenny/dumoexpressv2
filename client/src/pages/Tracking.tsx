import { useState, useEffect } from "react";
import { useSearch } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
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
  "collected": {
    icon: Package,
    label: "Collected",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    description: "Parcel has been collected and registered"
  },
  "in-transit": {
    icon: Truck,
    label: "In Transit",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    description: "Parcel is on its way to the destination"
  },
  "out-for-delivery": {
    icon: MapPin,
    label: "Out for Delivery",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    description: "Parcel is out for delivery"
  },
  "delivered": {
    icon: CheckCircle2,
    label: "Delivered",
    color: "text-green-600",
    bgColor: "bg-green-100",
    description: "Parcel has been delivered successfully"
  }
};

const statusOrder = ["collected", "in-transit", "out-for-delivery", "delivered"];

export default function Tracking() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const initialQuery = params.get("q") || "";
  
  const [trackingNumber, setTrackingNumber] = useState(initialQuery);
  const [searchedNumber, setSearchedNumber] = useState(initialQuery);

  const { data, isLoading, error, refetch } = trpc.tracking.track.useQuery(
    { trackingNumber: searchedNumber },
    { enabled: !!searchedNumber }
  );

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
        <section className="bg-gradient-to-br from-[oklch(0.45_0.15_250)] to-[oklch(0.35_0.12_250)] text-white py-16 lg:py-20">
          <div className="container">
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
                      placeholder="Enter tracking number (e.g., DE1234567890)"
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
              <Card className="border-red-200 bg-red-50">
                <CardContent className="py-8 text-center">
                  <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-red-900 mb-2">Error</h3>
                  <p className="text-red-700">Something went wrong. Please try again later.</p>
                </CardContent>
              </Card>
            )}

            {data && !data.found && searchedNumber && (
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="py-8 text-center">
                  <Package className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-yellow-900 mb-2">Parcel Not Found</h3>
                  <p className="text-yellow-700 mb-4">
                    We couldn't find a parcel with tracking number <strong>{searchedNumber}</strong>.
                  </p>
                  <p className="text-sm text-yellow-600">
                    Please check the tracking number and try again. If you just booked, it may take a few minutes to appear in our system.
                  </p>
                </CardContent>
              </Card>
            )}

            {data && data.found && data.parcel && (
              <div className="space-y-6">
                {/* Parcel Info Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Tracking Number</p>
                        <CardTitle className="text-2xl">{data.parcel.trackingNumber}</CardTitle>
                      </div>
                      <div className={`px-4 py-2 rounded-full ${statusConfig[data.parcel.status as keyof typeof statusConfig]?.bgColor}`}>
                        <span className={`font-semibold ${statusConfig[data.parcel.status as keyof typeof statusConfig]?.color}`}>
                          {statusConfig[data.parcel.status as keyof typeof statusConfig]?.label}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Sender</h4>
                        <p className="text-muted-foreground">{data.parcel.senderName}</p>
                        <p className="text-sm text-muted-foreground">{data.parcel.senderAddress}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Receiver</h4>
                        <p className="text-muted-foreground">{data.parcel.receiverName}</p>
                        <p className="text-sm text-muted-foreground">{data.parcel.receiverAddress}</p>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Service Type</p>
                        <p className="font-medium capitalize">{data.parcel.serviceType.replace('-', ' ')}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Weight</p>
                        <p className="font-medium">{data.parcel.weight}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Created</p>
                        <p className="font-medium">{new Date(data.parcel.createdAt).toLocaleDateString()}</p>
                      </div>
                      {data.parcel.estimatedDelivery && (
                        <div>
                          <p className="text-muted-foreground">Est. Delivery</p>
                          <p className="font-medium">{new Date(data.parcel.estimatedDelivery).toLocaleDateString()}</p>
                        </div>
                      )}
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
                          height: `${(getCurrentStatusIndex(data.parcel.status) / (statusOrder.length - 1)) * 100}%` 
                        }}
                      />
                      
                      {/* Status Steps */}
                      <div className="space-y-8">
                        {statusOrder.map((status, index) => {
                          const config = statusConfig[status as keyof typeof statusConfig];
                          const StatusIcon = config.icon;
                          const isActive = getCurrentStatusIndex(data.parcel!.status) >= index;
                          const isCurrent = data.parcel!.status === status;
                          
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
                {data.history && data.history.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Tracking History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {data.history.map((entry, index) => {
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
                    <p>Tracking numbers start with <strong>DE</strong> followed by 10 characters.</p>
                    <p className="mt-1">Example: DE1234567890</p>
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
                    Your tracking number is provided in the confirmation email or SMS sent after booking. It starts with "DE" followed by 10 characters.
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
