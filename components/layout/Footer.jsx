"use client";
import Link from "next/link";
import { FiGithub, FiTwitter, FiLinkedin, FiInstagram } from "react-icons/fi";
import { NAV_ITEMS } from "../../configs/routes";

const Footer = () => {
  const socialLinks = [
    { icon: <FiGithub size={20} />, href: "#", label: "GitHub" },
    { icon: <FiTwitter size={20} />, href: "#", label: "Twitter" },
    { icon: <FiLinkedin size={20} />, href: "#", label: "LinkedIn" },
    { icon: <FiInstagram size={20} />, href: "#", label: "Instagram" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold text-white">
              InfoTech
            </Link>
            <p className="text-gray-400">
              Creating digital experiences that make a difference.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <nav className="space-y-3">
              {NAV_ITEMS.slice(0, 5).map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* More Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">More</h3>
            <nav className="space-y-3">
              {NAV_ITEMS.slice(5).map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h3>
            <div className="space-y-3 text-gray-400">
              <p>Dhaka</p>
              <p>Bangladesh</p>
              <p>Email: contact@example.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {currentYear} Infotech25. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
