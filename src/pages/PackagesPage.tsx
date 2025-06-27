import React from 'react';

// Custom Layout & Component Imports
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PackageCard from '@/components/PackageCard';

// shadcn/ui Component Imports
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Separator } from '@/components/ui/separator';

// Icon Import
import { Search } from 'lucide-react';

// Placeholder data for travel packages
const packagesData = [
  {
    slug: 'golden-triangle-tour',
    imageUrl: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1974&auto=format&fit=crop',
    title: 'The Golden Triangle Tour',
    description: 'Experience the classic Indian journey covering Delhi, Agra, and Jaipur. Witness the majestic Taj Mahal, explore historic forts, and immerse yourself in vibrant culture.',
    price: 45000,
    highlights: ['Taj Mahal Visit', 'Jaipur Forts', 'Rickshaw Ride'],
  },
  {
    slug: 'kerala-backwaters-escape',
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2070&auto=format&fit=crop',
    title: 'Kerala Backwaters Escape',
    description: 'Relax and unwind on a traditional houseboat as you glide through the serene backwaters of Alleppey. A perfect blend of nature and tranquility.',
    price: 35000,
    highlights: ['Houseboat Stay', 'Local Cuisine', 'Village Walks'],
  },
  {
    slug: 'himalayan-adventure-rishikesh',
    imageUrl: 'https://images.unsplash.com/photo-1609766857041-ed456ea35443?q=80&w=2070&auto=format&fit=crop',
    title: 'Himalayan Adventure in Rishikesh',
    description: 'For the thrill-seekers, this package offers white-water rafting on the Ganges, bungee jumping, and trekking with stunning Himalayan views.',
    price: 28000,
    highlights: ['River Rafting', 'Yoga & Meditation', 'Mountain Views'],
  },
  {
    slug: 'rajasthan-desert-safari',
    imageUrl: 'https://images.unsplash.com/photo-1619326937666-e8c53c1b52a4?q=80&w=2070&auto=format&fit=crop',
    title: 'Rajasthan Desert Safari',
    description: 'Explore the golden dunes of Jaisalmer on a camel safari. Spend a night under the stars and enjoy traditional Rajasthani folk music and dance.',
    price: 32000,
    highlights: ['Camel Safari', 'Cultural Evening', 'Stargazing'],
  },
  {
    slug: 'temples-of-south-india',
    imageUrl: 'https://images.unsplash.com/photo-1596175899428-9b81abe5a557?q=80&w=1974&auto=format&fit=crop',
    title: 'Temples of South India',
    description: 'A spiritual journey through the ancient temples of Tamil Nadu. Discover architectural marvels in Madurai, Thanjavur, and Mahabalipuram.',
    price: 40000,
    highlights: ['Ancient Temples', 'Rich History', 'Spiritual Experience'],
  },
  {
    slug: 'goa-beach-paradise',
    imageUrl: 'https://images.unsplash.com/photo-1590374504364-0a36e8edd3b2?q=80&w=1974&auto=format&fit=crop',
    title: 'Goa Beach Paradise',
    description: 'Relax on the sun-kissed beaches of Goa, enjoy the vibrant nightlife, and savor delicious seafood. The ultimate beach getaway.',
    price: 25000,
    highlights: ['Beach Hopping', 'Water Sports', 'Nightlife'],
  },
];


const PackagesPage = () => {
    console.log('PackagesPage loaded');

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                        Discover Your Next Adventure
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                        Browse our curated travel packages designed to showcase the best of India.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <aside className="lg:w-1/4 xl:w-1/5">
                        <Card className="sticky top-24 shadow-sm">
                            <CardHeader>
                                <CardTitle>Filter & Sort</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Search by name..." className="pl-9" />
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                    <Label htmlFor="sort-by">Sort by</Label>
                                    <Select defaultValue="popularity">
                                        <SelectTrigger id="sort-by">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="popularity">Popularity</SelectItem>
                                            <SelectItem value="price-asc">Price: Low to High</SelectItem>
                                            <SelectItem value="price-desc">Price: High to Low</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Separator />
                                <div className="space-y-4">
                                    <Label>Package Type</Label>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="adventure" />
                                        <Label htmlFor="adventure" className="font-normal text-sm">Adventure</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="cultural" />
                                        <Label htmlFor="cultural" className="font-normal text-sm">Cultural</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="relaxation" />
                                        <Label htmlFor="relaxation" className="font-normal text-sm">Relaxation</Label>
                                    </div>
                                     <div className="flex items-center space-x-2">
                                        <Checkbox id="spiritual" />
                                        <Label htmlFor="spiritual" className="font-normal text-sm">Spiritual</Label>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </aside>

                    {/* Packages Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {packagesData.map((pkg) => (
                                <PackageCard key={pkg.slug} {...pkg} />
                            ))}
                        </div>
                        
                        {/* Pagination */}
                        <div className="mt-12">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious href="#" />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#" isActive>1</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">2</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">3</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationNext href="#" />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PackagesPage;