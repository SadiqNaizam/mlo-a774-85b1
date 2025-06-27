import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TripCostEstimatorTool from '@/components/TripCostEstimatorTool';

const TripCostEstimatorPage: React.FC = () => {
  console.log('TripCostEstimatorPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        {/* The TripCostEstimatorTool is the main feature of this page. */}
        {/* It is self-contained and handles all the interactive logic. */}
        <TripCostEstimatorTool />
      </main>
      <Footer />
    </div>
  );
};

export default TripCostEstimatorPage;