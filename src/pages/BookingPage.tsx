import React from 'react';
import { useLocation } from 'react-router-dom';

// Import Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Import Custom Page Components
import MultiModalBookingForm from '@/components/MultiModalBookingForm';

const BookingPage = () => {
  console.log('BookingPage loaded');

  // In a real application, data would come from the previous page via React Router's location state.
  // const location = useLocation();
  // const { services, initialData } = location.state || {};
  
  // For demonstration, we use mock data that reflects the user journey from the Trip Cost Estimator.
  // This simulates the user's choices being carried over.
  const mockServices = {
    flights: true,
    hotels: true,
    cabs: true,
  };

  const mockInitialData = {
    travelers: [{ fullName: 'Anjali Sharma', age: 28, gender: 'female' as const }],
    contactEmail: 'anjali.sharma@example.com',
    contactPhone: '+91 9988776655',
    flightDetails: { preference: 'Window' },
    hotelDetails: { roomType: 'Deluxe' },
    cabDetails: { carType: 'SUV' },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-background">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <section className="flex flex-col items-center">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
              Almost There!
            </h1>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl">
              We've pre-filled the form with your selections. Please review the details below, add traveler information, and proceed to finalize your incredible journey.
            </p>
          </div>
          
          <MultiModalBookingForm 
            services={mockServices} 
            initialData={mockInitialData} 
          />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BookingPage;