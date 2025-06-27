import React from 'react';
import { Link } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// shadcn/ui Components
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// Icons
import { Star, MapPin, Calendar, CheckCircle, XCircle, Users } from 'lucide-react';

// --- Placeholder Data ---
const packageData = {
  title: "Enchanting Kerala: Backwaters & Beaches",
  location: "Kochi - Munnar - Alleppey - Kovalam",
  duration: "8 Days / 7 Nights",
  price: "35,000",
  rating: 4.8,
  reviewsCount: 128,
  tags: ["Bestseller", "Nature", "Relaxation"],
  images: [
    "https://images.unsplash.com/photo-1593693397649-35a2c2b6d6a5?q=80&w=2070&auto=format&fit=crop", // Kerala backwaters
    "https://images.unsplash.com/photo-1600675276632-6821d3f54a2f?q=80&w=1932&auto=format&fit=crop", // Munnar tea plantation
    "https://images.unsplash.com/photo-1614292253393-3b683416d8a9?q=80&w=2070&auto=format&fit=crop", // Kovalam beach
    "https://images.unsplash.com/photo-1594958805988-51884e937d36?q=80&w=2070&auto=format&fit=crop", // Kathakali dancer
  ],
  description: "Embark on a mesmerizing journey through 'God's Own Country'. Experience the lush greenery of Munnar's tea gardens, glide through the serene backwaters of Alleppey on a traditional houseboat, and unwind on the golden sands of Kovalam beach. This package offers a perfect blend of nature, culture, and relaxation.",
  itinerary: [
    { day: 1, title: "Arrival in Kochi & Sightseeing", content: "Arrive at Cochin International Airport, transfer to your hotel. Later, explore Fort Kochi, see the Chinese Fishing Nets, and visit St. Francis Church." },
    { day: 2, title: "Journey to Munnar", content: "Drive to Munnar, a haven of peace and tranquility. Check into your hotel and enjoy the evening at leisure amidst the sprawling tea plantations." },
    { day: 3, title: "Munnar Exploration", content: "Visit Mattupetty Dam, Echo Point, and the Tea Museum. Learn about the process of tea making and enjoy the stunning landscapes." },
    { day: 4, title: "Alleppey Houseboat Experience", content: "Travel to Alleppey and board your private houseboat. Cruise through the enchanting backwaters, canals, and villages. Enjoy an overnight stay on the boat." },
    { day: 5, title: "Travel to Kovalam", content: "After breakfast on the houseboat, disembark and drive to the beach paradise of Kovalam. Check into your beachside resort." },
    { day: 6, title: "Leisure in Kovalam", content: "Enjoy a full day at leisure on the beautiful beaches of Kovalam. You can indulge in water sports or simply relax by the sea." },
    { day: 7, title: "Trivandrum Day Trip", content: "Optional day trip to Trivandrum to visit the Napier Museum, Kuthiramalika Palace Museum, and the famous Padmanabhaswamy Temple." },
    { day: 8, title: "Departure", content: "After breakfast, transfer to Trivandrum International Airport for your onward journey with beautiful memories." },
  ],
  inclusions: ["Accommodation in 3/4-star hotels", "Daily breakfast", "AC vehicle for all transfers & sightseeing", "Overnight stay in an AC houseboat in Alleppey", "All applicable taxes"],
  exclusions: ["Airfare/Train fare", "Lunches and dinners", "Entry fees at monuments", "Personal expenses", "Anything not mentioned in inclusions"],
  reviews: [
    { name: "Anjali & Rohan", rating: 5, comment: "The houseboat experience was magical! Everything was perfectly organized. Highly recommend Indian Horizon." },
    { name: "The Sharma Family", rating: 4, comment: "A wonderful family trip. Munnar was breathtaking. The driver was very courteous and knowledgeable." },
  ]
};

const PackageDetailsPage = () => {
  console.log('PackageDetailsPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* --- Page Header --- */}
          <section className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">{packageData.title}</h1>
            <div className="flex items-center gap-4 text-muted-foreground mt-2">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                <span>{packageData.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{packageData.duration}</span>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {packageData.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
            {/* --- Left Column --- */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Carousel */}
              <Carousel className="w-full rounded-lg overflow-hidden shadow-lg">
                <CarouselContent>
                  {packageData.images.map((src, index) => (
                    <CarouselItem key={index}>
                      <img src={src} alt={`View of ${packageData.title} #${index + 1}`} className="w-full h-64 md:h-96 object-cover" />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>About This Tour</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{packageData.description}</p>
                </CardContent>
              </Card>

              {/* Itinerary */}
              <Card>
                <CardHeader>
                  <CardTitle>Day-by-Day Itinerary</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {packageData.itinerary.map(item => (
                      <AccordionItem key={item.day} value={`item-${item.day}`}>
                        <AccordionTrigger className="font-semibold">Day {item.day}: {item.title}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {item.content}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>

              {/* Inclusions & Exclusions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Inclusions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-muted-foreground">
                      {packageData.inclusions.map(item => <li key={item} className="flex items-start gap-2"><span className="mt-1 flex-shrink-0 h-2 w-2 rounded-full bg-green-500"></span><span>{item}</span></li>)}
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><XCircle className="h-5 w-5 text-red-500" /> Exclusions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-muted-foreground">
                      {packageData.exclusions.map(item => <li key={item} className="flex items-start gap-2"><span className="mt-1 flex-shrink-0 h-2 w-2 rounded-full bg-red-500"></span><span>{item}</span></li>)}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Reviews */}
              <Card>
                <CardHeader>
                  <CardTitle>Guest Reviews</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {packageData.reviews.map((review, index) => (
                    <div key={index} className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <p className="font-semibold">{review.name}</p>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />)}
                        </div>
                      </div>
                      <p className="text-muted-foreground italic">"{review.comment}"</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

            </div>

            {/* --- Right Column (Sticky) --- */}
            <div className="lg:col-span-1 mt-8 lg:mt-0">
              <div className="lg:sticky lg:top-24">
                <Card className="shadow-xl">
                  <CardHeader>
                    <CardDescription>Starting from</CardDescription>
                    <CardTitle className="text-4xl">₹{packageData.price}</CardTitle>
                    <CardDescription>per person</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                       <div className="flex items-center gap-0.5">
                         {[...Array(5)].map((_, i) => <Star key={i} className={`h-5 w-5 ${i < Math.round(packageData.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />)}
                       </div>
                       <span className="text-muted-foreground font-semibold">{packageData.rating}</span>
                       <span className="text-sm text-muted-foreground">({packageData.reviewsCount} reviews)</span>
                    </div>
                    <Link to="/booking" className="w-full">
                      <Button size="lg" className="w-full text-lg">
                        <Users className="mr-2 h-5 w-5" />
                        Book This Trip
                      </Button>
                    </Link>
                  </CardContent>
                  <CardFooter>
                      <p className="text-xs text-muted-foreground text-center w-full">Questions? Contact us 24/7 for support.</p>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PackageDetailsPage;