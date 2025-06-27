import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, Mountain, Plane } from 'lucide-react';

const Header: React.FC = () => {
  console.log('Header loaded');

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Packages', path: '/packages' },
    { label: 'Offers', path: '/packages' }, // Offers link to the main packages page
    { label: 'Trip Cost Estimator', path: '/trip-cost-estimator' },
  ];

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? 'text-primary font-semibold' : 'text-muted-foreground'
    }`;

  const MobileNavLink = ({ path, children }: { path: string; children: React.ReactNode }) => (
    <SheetClose asChild>
      <NavLink
        to={path}
        className={({ isActive }) =>
          `block px-4 py-2 rounded-md text-base font-medium ${
            isActive
              ? 'bg-accent text-accent-foreground'
              : 'text-muted-foreground hover:bg-accent'
          }`
        }
      >
        {children}
      </NavLink>
    </SheetClose>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <Mountain className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg hidden sm:inline-block">Indian Horizon</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={navLinkClasses}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost">Login</Button>
            <Button>Sign Up</Button>
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="p-4">
                    <Link to="/" className="flex items-center gap-2 mb-8">
                        <Mountain className="h-6 w-6 text-primary" />
                        <span className="font-bold text-lg">Indian Horizon</span>
                    </Link>
                    <nav className="flex flex-col gap-y-2">
                        {navItems.map((item) => (
                            <MobileNavLink key={item.path} path={item.path}>
                                {item.label}
                            </MobileNavLink>
                        ))}
                    </nav>
                    <div className="mt-8 pt-4 border-t flex flex-col gap-2">
                        <SheetClose asChild><Button variant="ghost" className="w-full">Login</Button></SheetClose>
                        <SheetClose asChild><Button className="w-full">Sign Up</Button></SheetClose>
                    </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;