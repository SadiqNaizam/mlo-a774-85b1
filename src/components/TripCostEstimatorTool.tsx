import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, animate } from 'framer-motion';
import { addDays, format, differenceInCalendarDays } from 'date-fns';
import type { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';

import { Hotel, Plane, Car, Users, MapPin, CalendarIcon, Star, RefreshCw } from 'lucide-react';

const DESTINATIONS = ['Goa', 'Kerala', 'Rajasthan', 'Himalayas'];
const COST_CONSTANTS = {
  flightPerPerson: 8000,
  transport: {
    Cab: 500,
    Bus: 200,
    Train: 150,
  },
};

const TripCostEstimatorTool: React.FC = () => {
  console.log('TripCostEstimatorTool loaded');
  const navigate = useNavigate();

  // State for user inputs
  const [destination, setDestination] = useState<string>('');
  const [date, setDate] = useState<DateRange | undefined>({ from: new Date(), to: addDays(new Date(), 7) });
  const [includeHotel, setIncludeHotel] = useState(false);
  const [hotelPrice, setHotelPrice] = useState([1500]);
  const [hotelStars, setHotelStars] = useState('3');
  const [includeFlights, setIncludeFlights] = useState(false);
  const [travelers, setTravelers] = useState(1);
  const [includeTransport, setIncludeTransport] = useState(false);
  const [transportType, setTransportType] = useState('Cab');

  // State for calculated cost
  const [totalCost, setTotalCost] = useState(0);

  const durationInDays = useMemo(() => {
    if (date?.from && date?.to) {
      return differenceInCalendarDays(date.to, date.from) + 1;
    }
    return 0;
  }, [date]);

  // Effect to recalculate cost when inputs change
  useEffect(() => {
    let cost = 0;
    if (durationInDays > 0) {
      if (includeHotel) {
        cost += hotelPrice[0] * durationInDays;
      }
      if (includeFlights) {
        cost += travelers * COST_CONSTANTS.flightPerPerson;
      }
      if (includeTransport) {
        cost += (COST_CONSTANTS.transport[transportType as keyof typeof COST_CONSTANTS.transport] || 0) * durationInDays;
      }
    }
    setTotalCost(cost);
  }, [destination, date, includeHotel, hotelPrice, includeFlights, travelers, includeTransport, transportType, durationInDays]);

  const handleReset = () => {
    setDestination('');
    setDate({ from: new Date(), to: addDays(new Date(), 7) });
    setIncludeHotel(false);
    setHotelPrice([1500]);
    setHotelStars('3');
    setIncludeFlights(false);
    setTravelers(1);
    setIncludeTransport(false);
    setTransportType('Cab');
  };

  const handleFinalizeBooking = () => {
    const tripDetails = {
      destination,
      date,
      durationInDays,
      includeHotel,
      hotelPrice: hotelPrice[0],
      hotelStars,
      includeFlights,
      travelers,
      includeTransport,
      transportType,
      totalCost,
    };
    navigate('/booking', { state: { tripDetails } });
  };

  // Animated counter component
  const AnimatedCounter = ({ value }: { value: number }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
      const controls = animate(displayValue, value, {
        duration: 0.8,
        ease: "easeOut",
        onUpdate: (latest) => setDisplayValue(latest),
      });
      return () => controls.stop();
    }, [value]);

    return (
      <motion.h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
        ₹{Math.round(displayValue).toLocaleString('en-IN')}
      </motion.h2>
    );
  };

  return (
    <Card className="w-full max-w-6xl mx-auto shadow-2xl overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Left Side: Controls */}
        <div className="md:col-span-2 p-6 md:p-8 space-y-6 bg-white">
          <CardHeader className="p-0">
            <CardTitle className="text-3xl font-bold">Trip Cost Estimator</CardTitle>
            <CardDescription>Build your dream trip and see the costs in real-time.</CardDescription>
          </CardHeader>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="destination" className="flex items-center mb-2"><MapPin className="h-4 w-4 mr-2" />Destination</Label>
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger id="destination"><SelectValue placeholder="Select a destination" /></SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {DESTINATIONS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="date-range" className="flex items-center mb-2"><CalendarIcon className="h-4 w-4 mr-2" />Travel Dates</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button id="date-range" variant="outline" className="w-full justify-start text-left font-normal">
                    {date?.from ? (date.to ? `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}` : format(date.from, "LLL dd, y")) : <span>Pick a date range</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="range" selected={date} onSelect={setDate} initialFocus numberOfMonths={2} />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <Separator />
          
          {/* Service Toggles and Options */}
          <div className="space-y-4">
            {/* Hotel */}
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <Label htmlFor="include-hotel" className="flex items-center text-lg font-medium"><Hotel className="h-5 w-5 mr-3 text-blue-500"/>Include Hotel Stay</Label>
                <Switch id="include-hotel" checked={includeHotel} onCheckedChange={setIncludeHotel} />
              </div>
              {includeHotel && (
                <div className="mt-4 space-y-4 pt-4 border-t">
                  <Label>Price per Night: ₹{hotelPrice[0].toLocaleString('en-IN')}</Label>
                  <Slider value={hotelPrice} onValueChange={setHotelPrice} max={10000} step={500} />
                  <Label>Hotel Star Rating</Label>
                  <RadioGroup value={hotelStars} onValueChange={setHotelStars} className="flex">
                    {[2, 3, 4, 5].map(s => (
                        <div key={s} className="flex items-center space-x-2">
                           <RadioGroupItem value={s.toString()} id={`stars-${s}`} />
                           <Label htmlFor={`stars-${s}`} className="flex">{Array(s).fill(0).map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />)}</Label>
                        </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
            </div>

            {/* Flights */}
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <Label htmlFor="include-flights" className="flex items-center text-lg font-medium"><Plane className="h-5 w-5 mr-3 text-green-500"/>Include Flights</Label>
                <Switch id="include-flights" checked={includeFlights} onCheckedChange={setIncludeFlights} />
              </div>
              {includeFlights && (
                <div className="mt-4 space-y-4 pt-4 border-t">
                   <Label>Number of Travelers</Label>
                   <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <Slider value={[travelers]} onValueChange={(val) => setTravelers(val[0])} min={1} max={10} step={1} />
                    <span className="font-bold">{travelers}</span>
                   </div>
                </div>
              )}
            </div>
            
            {/* Local Transport */}
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <Label htmlFor="include-transport" className="flex items-center text-lg font-medium"><Car className="h-5 w-5 mr-3 text-red-500"/>Include Local Transport</Label>
                <Switch id="include-transport" checked={includeTransport} onCheckedChange={setIncludeTransport} />
              </div>
              {includeTransport && (
                <div className="mt-4 space-y-2 pt-4 border-t">
                  <Label>Transport Type (per day)</Label>
                  <RadioGroup value={transportType} onValueChange={setTransportType} className="flex space-x-4">
                     {Object.keys(COST_CONSTANTS.transport).map(type => (
                       <div key={type} className="flex items-center space-x-2">
                         <RadioGroupItem value={type} id={`transport-${type}`} />
                         <Label htmlFor={`transport-${type}`}>{type}</Label>
                       </div>
                     ))}
                  </RadioGroup>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Side: Cost Summary */}
        <div className="md:col-span-1 bg-gray-50 p-6 md:p-8 flex flex-col justify-between">
          <div className="sticky top-8 text-center md:text-left">
            <h3 className="text-xl font-semibold text-gray-700">Estimated Total Cost</h3>
            <AnimatedCounter value={totalCost} />
            <Separator className="my-6" />
            <h4 className="font-semibold mb-2">Your Trip Summary:</h4>
            <div className="space-y-1 text-sm text-gray-600">
                <p><strong>Destination:</strong> {destination || 'Not selected'}</p>
                <p><strong>Duration:</strong> {durationInDays > 0 ? `${durationInDays} days` : 'Select dates'}</p>
                {includeHotel && <p><strong>Hotel:</strong> Included (₹{hotelPrice[0]}/night, {hotelStars}-star)</p>}
                {includeFlights && <p><strong>Flights:</strong> Included ({travelers} traveler{travelers > 1 ? 's' : ''})</p>}
                {includeTransport && <p><strong>Transport:</strong> {transportType}</p>}
            </div>
          </div>
          <CardFooter className="flex flex-col sm:flex-row gap-2 p-0 mt-8">
            <Button size="lg" className="w-full" onClick={handleFinalizeBooking} disabled={!destination || durationInDays <= 0 || totalCost <= 0}>
                Finalize & Book this Trip
            </Button>
            <Button size="lg" variant="outline" onClick={handleReset}>
                <RefreshCw className="h-4 w-4" />
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default TripCostEstimatorTool;