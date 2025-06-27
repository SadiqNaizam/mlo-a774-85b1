import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface OfferBannerProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  className?: string;
}

const OfferBanner: React.FC<OfferBannerProps> = ({
  title = "Exclusive Winter Gateway Deals",
  description = "Discover breathtaking landscapes and serene destinations. Book now and save up to 25% on select packages.",
  ctaText = "Explore Packages",
  ctaLink = "/packages",
  className,
}) => {
  console.log('OfferBanner loaded');

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/40',
        className
      )}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%3E%3Cpath%20d%3D%22M0%200h100v100H0z%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M25%2050a25%2025%200%2000-50%200zm50%200a25%2025%200%2000-50%200zM25%2050a25%2025%200%200150%200zm50%200a25%2025%200%200150%200z%22%20stroke%3D%22rgba(255%2C255%2C255%2C0.05)%22%20stroke-width%3D%221%22%2F%3E%3C%2Fsvg%3E')] opacity-50"></div>
      
      <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="text-white">
          <h3 className="text-2xl font-bold tracking-tight md:text-3xl">
            {title}
          </h3>
          <p className="mt-2 max-w-2xl text-amber-100">
            {description}
          </p>
        </div>
        <div className="flex-shrink-0">
          <Button
            size="lg"
            className="bg-white text-orange-600 shadow-md transition-transform duration-200 hover:bg-gray-100 hover:scale-105"
            asChild
          >
            <Link to={ctaLink}>
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OfferBanner;