import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, X, Package, Truck, Clock, Building2, Phone, MapPin, Search } from "lucide-react";

const services = [
  {
    title: "Same-Day Delivery",
    href: "/services#same-day",
    description: "Urgent deliveries within hours across Malaysia",
    icon: Truck,
  },
  {
    title: "Next-Day Delivery",
    href: "/services#next-day",
    description: "Reliable overnight delivery nationwide",
    icon: Package,
  },
  {
    title: "Scheduled Pickup & Delivery",
    href: "/services#scheduled",
    description: "Plan your deliveries in advance",
    icon: Clock,
  },
  {
    title: "Business Bulk Shipments",
    href: "/services#bulk",
    description: "Volume solutions for businesses",
    icon: Building2,
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="DumoExpress" className="h-10 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/") ? "text-primary" : "text-foreground/80"
            }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/about") ? "text-primary" : "text-foreground/80"
            }`}
          >
            About Us
          </Link>

          {/* Services Dropdown */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={`text-sm font-medium ${
                    location.startsWith("/services") ? "text-primary" : "text-foreground/80"
                  }`}
                >
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {services.map((service) => (
                      <li key={service.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={service.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="flex items-center gap-2">
                              <service.icon className="h-4 w-4 text-primary" />
                              <div className="text-sm font-medium leading-none">{service.title}</div>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {service.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link
            href="/tracking"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/tracking") ? "text-primary" : "text-foreground/80"
            }`}
          >
            Track Parcel
          </Link>
          <Link
            href="/pricing"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/pricing") ? "text-primary" : "text-foreground/80"
            }`}
          >
            Pricing
          </Link>
          <Link
            href="/contact"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/contact") ? "text-primary" : "text-foreground/80"
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Desktop CTA Buttons */}
        <div className="hidden lg:flex lg:items-center lg:gap-3">
          <Link href="/tracking">
            <Button variant="outline" size="sm" className="gap-2">
              <Search className="h-4 w-4" />
              Track
            </Button>
          </Link>
          <Link href="/booking">
            <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90">
              <Package className="h-4 w-4" />
              Book Now
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-muted"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden border-t bg-white">
          <div className="container py-4 space-y-4">
            <Link
              href="/"
              className="block py-2 text-sm font-medium hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block py-2 text-sm font-medium hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <div className="py-2">
              <p className="text-sm font-medium text-foreground mb-2">Services</p>
              <div className="pl-4 space-y-2">
                {services.map((service) => (
                  <Link
                    key={service.title}
                    href={service.href}
                    className="flex items-center gap-2 py-1 text-sm text-muted-foreground hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    <service.icon className="h-4 w-4" />
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="/tracking"
              className="block py-2 text-sm font-medium hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Track Parcel
            </Link>
            <Link
              href="/pricing"
              className="block py-2 text-sm font-medium hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className="block py-2 text-sm font-medium hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <div className="flex gap-3 pt-4 border-t">
              <Link href="/tracking" className="flex-1" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full gap-2">
                  <Search className="h-4 w-4" />
                  Track
                </Button>
              </Link>
              <Link href="/booking" className="flex-1" onClick={() => setIsOpen(false)}>
                <Button className="w-full gap-2 bg-primary">
                  <Package className="h-4 w-4" />
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
