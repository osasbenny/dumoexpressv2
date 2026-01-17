import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  services: [
    { name: "Same-Day Delivery", href: "/services#same-day" },
    { name: "Next-Day Delivery", href: "/services#next-day" },
    { name: "Scheduled Pickup", href: "/services#scheduled" },
    { name: "Bulk Shipments", href: "/services#bulk" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Pricing", href: "/pricing" },
    { name: "Track Parcel", href: "/tracking" },
    { name: "Contact Us", href: "/contact" },
  ],
  legal: [
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Shipping Policy", href: "/shipping-policy" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com/dumoexpress" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/dumoexpress" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/dumoexpress" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/dumoexpress" },
];

export default function Footer() {
  return (
    <footer className="bg-[oklch(0.2_0.02_250)] text-white">
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <img src="/logo.png" alt="DumoExpress" className="h-12 w-auto brightness-0 invert" />
            </Link>
            <p className="text-sm text-gray-300 leading-relaxed">
              Fast & Reliable Global Courier Services. Your trusted partner for express parcel delivery worldwide. Based in Malaysia, serving 150+ countries.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Our Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[oklch(0.85_0.15_85)] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300">
                  Level 15, Menara KL<br />
                  Jalan Sultan Ismail<br />
                  50250 Kuala Lumpur, Malaysia
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[oklch(0.85_0.15_85)] flex-shrink-0" />
                <a href="tel:+60312345678" className="text-sm text-gray-300 hover:text-white transition-colors">
                  +60 3-1234 5678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[oklch(0.85_0.15_85)] flex-shrink-0" />
                <a href="mailto:info@dumoexpress.com" className="text-sm text-gray-300 hover:text-white transition-colors">
                  info@dumoexpress.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2021-2026 DumoExpress. All rights reserved.
            </p>
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
