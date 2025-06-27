import React from 'react';
import { Link } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Custom Page Components
import ProminentSearchBar from '@/components/ProminentSearchBar';
import PackageCard from '@/components/PackageCard';
import OfferBanner from '@/components/OfferBanner';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

// Placeholder data for popular packages
const popularPackages = [
  {
    slug: 'golden-triangle-glory',
    imageUrl: 'https://images.unsplash.com/photo-1564514210209-913f635c3a49?q=80&w=1920&auto=format&fit=crop',
    title: 'Golden Triangle Glory',
    description: 'Explore the iconic cities of Delhi, Agra, and Jaipur. Witness the majestic Taj Mahal and the vibrant culture of Rajasthan.',
    price: 45000,
    highlights: ['Taj Mahal Visit', 'Amber Fort Tour', 'Cultural Shows'],
  },
  {
    slug: 'kerala-backwater-bliss',
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1920&auto=format&fit=crop',
    title: 'Kerala Backwater Bliss',
    description: 'Relax and unwind on a traditional houseboat as you glide through the serene backwaters of Alleppey, surrounded by lush greenery.',
    price: 35000,
    highlights: ['Houseboat Stay', 'Local Cuisine', 'Village Walks'],
  },
  {
    slug: 'himalayan-serenity',
    imageUrl: 'https://images.unsplash.com/photo-1617653292518-21c35e408888?q=80&w=1920&auto=format&fit=crop',
    title: 'Himalayan Serenity',
    description: 'Embark on a spiritual journey to the Himalayas. Experience tranquility in Rishikesh and adventure in the scenic mountain towns.',
    price: 55000,
    highlights: ['Mountain Trekking', 'Yoga & Meditation', 'River Rafting'],
  },
];

// Placeholder data for top destinations
const topDestinations = [
  {
    name: 'Jaipur',
    imageUrl: 'https://images.unsplash.com/photo-1603261599321-7243919d7a22?q=80&w=1200&auto=format&fit=crop',
    link: '/packages',
  },
  {
    name: 'Varanasi',
    imageUrl: 'https://images.unsplash.com/photo-1561361523-9a3b9a093e96?q=80&w=1200&auto=format&fit=crop',
    link: '/packages',
  },
  {
    name: 'Goa',
    imageUrl: 'https://images.unsplash.com/photo-1560179406-1f621e84b2c1?q=80&w=1200&auto=format&fit=crop',
    link: '/packages',
  },
  {
    name: 'Rishikesh',
    imageUrl: 'https://images.unsplash.com/photo-1593181827448-9b8833596549?q=80&w=1200&auto=format&fit=crop',
    link: '/packages',
  },
];

const HomePage = () => {
  console.log('HomePage loaded');
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-center text-white">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1920&auto=format&fit=crop"
            alt="Beautiful landscape of India"
            className="h-full w-full object-cover"
          />
          <div className="relative z-20 container px-4 flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-shadow-lg">
              Discover the Soul of India
            </h1>
            <p className="mt-4 max-w-2xl text-lg md:text-xl text-gray-200 text-shadow">
              Your journey to incredible experiences starts here. Plan your perfect trip with us.
            </p>
            <div className="mt-8 w-full">
              <ProminentSearchBar />
            </div>
          </div>
        </section>

        {/* Popular Packages Section */}
        <section className="py-16 sm:py-24 bg-white dark:bg-black">
          <div className="container px-4">
            <h2 className="text-3xl font-bold tracking-tight text-center">Popular Packages</h2>
            <p className="mt-2 text-lg text-muted-foreground text-center max-w-2xl mx-auto">
              Handpicked journeys that our travelers love the most. Start your adventure with one of these popular choices.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularPackages.map((pkg) => (
                <PackageCard key={pkg.slug} {...pkg} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Offer Banner Section */}
        <section className="py-16 sm:py-20">
             <div className="container px-4">
                <OfferBanner />
            </div>
        </section>

        {/* Top Destinations Section */}
        <section className="py-16 sm:py-24 bg-white dark:bg-black">
          <div className="container px-4">
            <h2 className="text-3xl font-bold tracking-tight text-center">Explore Top Destinations</h2>
            <p className="mt-2 text-lg text-muted-foreground text-center max-w-2xl mx-auto">
              From majestic mountains to serene beaches, find your next destination among India's finest.
            </p>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {topDestinations.map((dest) => (
                <Card key={dest.name} className="overflow-hidden group">
                  <AspectRatio ratio={3 / 4}>
                    <img src={dest.imageUrl} alt={dest.name} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" />
                  </AspectRatio>
                  <CardHeader className="p-4">
                    <CardTitle>{dest.name}</CardTitle>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0">
                    <Button asChild className="w-full" variant="outline">
                      <Link to={dest.link}>Explore</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
             <div className="text-center mt-12">
                <Button size="lg" asChild>
                    <Link to="/packages">View All Packages</Link>
                </Button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default HomePage;