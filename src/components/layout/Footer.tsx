import React from 'react';
import { Link } from 'react-router-dom';
import { Mountain, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t">
      <div className="container py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <Mountain className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Indian Horizon</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your gateway to exploring the incredible beauty and culture of India.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Company</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
              <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">Careers</Link></li>
              <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">Press</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Follow Us</h3>
            <div className="flex items-center gap-4">
              <Link to="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link to="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link to="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Indian Horizon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;