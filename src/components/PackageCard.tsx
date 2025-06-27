import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { CheckCircle2 } from 'lucide-react';

interface PackageCardProps {
  slug: string; // Used for key and future-proofing, even if route is static for now
  imageUrl: string;
  title: string;
  description: string;
  price: number;
  highlights: string[];
}

const PackageCard: React.FC<PackageCardProps> = ({
  slug,
  imageUrl,
  title,
  description,
  price,
  highlights,
}) => {
  console.log(`PackageCard loaded for: ${title}`);

  return (
    <Card className="group relative w-full overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col">
      <Link to="/package-details" aria-label={`View details for ${title}`}>
        <CardHeader className="p-0 border-b">
          <AspectRatio ratio={16 / 9}>
            <img
              src={imageUrl}
              alt={`Scenic view for the ${title} package`}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="space-y-2 text-center">
                {highlights.map((highlight, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-2 text-sm py-1 px-3">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>{highlight}</span>
                  </Badge>
                ))}
              </div>
            </div>
          </AspectRatio>
        </CardHeader>
      </Link>
      
      <CardContent className="p-4 flex-grow">
        <Link to="/package-details" className="hover:underline">
            <CardTitle className="text-xl font-bold tracking-tight text-gray-800">{title}</CardTitle>
        </Link>
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">{description}</p>
      </CardContent>

      <CardFooter className="bg-gray-50 p-4 border-t flex justify-between items-center">
        <div className="text-lg font-semibold text-gray-900">
          <span className="text-sm font-normal text-gray-500">From </span>₹{price.toLocaleString('en-IN')}
        </div>
        <Link to="/package-details" className="text-sm font-medium text-orange-600 hover:text-orange-800">
          View Details &rarr;
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PackageCard;