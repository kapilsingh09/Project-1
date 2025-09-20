import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Recycle, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Report Waste', path: '/report' },
    { name: 'Recycling Tips', path: '/tips' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  const contactInfo = [
    { icon: Mail, text: 'support@cleangreen.eco', href: 'mailto:support@cleangreen.eco' },
    { icon: Phone, text: '+1 9934524884', href: 'tel:+19934524884' },
    { icon: MapPin, text: '123 Green Street, Haldwani, Nainital', href: '#' },
  ];

  const resources = [
    { name: 'Recycling Guide', href: '#' },
    { name: 'Community Forums', href: '#' },
    { name: 'Environmental Blog', href: '#' },
    { name: 'Support Center', href: '#' },
  ];

  return (
    <footer className="bg-gradient-subtle border-t mt-auto">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6 lg:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-primary rounded-xl shadow-soft">
                <Recycle className="h-7 w-7 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
                  Clean & Green
                </span>
                <span className="text-sm text-muted-foreground font-medium">Waste Management</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Making the world cleaner, one waste report at a time. Join our mission to create a sustainable future through innovative waste management solutions.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-accent/50 hover:bg-primary hover:text-primary-foreground rounded-xl transition-all duration-300 shadow-soft hover:shadow-green"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-foreground">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center group"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-foreground">Resources</h3>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <a 
                    href={resource.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center group"
                  >
                    <span>{resource.name}</span>
                    <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-foreground">Contact Us</h3>
            <ul className="space-y-4">
              {contactInfo.map((contact, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="p-2 bg-accent/30 rounded-lg">
                    <contact.icon className="h-4 w-4 text-primary flex-shrink-0" />
                  </div>
                  <a 
                    href={contact.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 leading-relaxed"
                  >
                    {contact.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/50 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 Clean & Green Technology. All rights reserved.
            </p>
            <div className="flex space-x-8">
              <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;