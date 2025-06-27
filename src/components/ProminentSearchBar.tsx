import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { MapPin, Calendar as CalendarIcon, Users, Search, Plus, Minus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ProminentSearchBar: React.FC = () => {
  console.log("ProminentSearchBar loaded");
  const navigate = useNavigate();

  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<DateRange | undefined>();
  const [travelers, setTravelers] = useState({ adults: 2, children: 0, rooms: 1 });

  const handleTravelerChange = (type: keyof typeof travelers, operation: 'increment' | 'decrement') => {
    setTravelers(prev => {
      const currentValue = prev[type];
      const newValue = operation === 'increment' ? currentValue + 1 : currentValue - 1;
      
      // Basic validation
      if (type === 'adults' && newValue < 1) return prev;
      if ((type === 'children' || type === 'rooms') && newValue < 0) return prev;
      if (type === 'rooms' && newValue < 1) return prev;


      return { ...prev, [type]: newValue };
    });
  };

  const handleSearch = () => {
    console.log("Searching with:", { destination, date, travelers });
    // In a real app, you'd construct a query string
    // e.g., /packages?dest=...&from=...&to=...&adults=...
    navigate("/packages");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white/90 dark:bg-black/80 backdrop-blur-sm rounded-2xl shadow-2xl border">
      <div className="flex flex-col lg:flex-row items-center gap-4">
        {/* Destination Input */}
        <div className="w-full lg:flex-1 relative">
          <Label htmlFor="destination" className="text-xs font-semibold text-gray-500 absolute -top-2 left-3 bg-white/90 dark:bg-black/80 px-1">Destination</Label>
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            id="destination"
            type="text"
            placeholder="Where are you going?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="pl-10 h-12 text-base"
          />
        </div>

        {/* Date Picker */}
        <div className="w-full lg:w-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-full lg:w-[300px] justify-start text-left font-normal h-12 text-base",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Travelers Selector */}
        <div className="w-full lg:w-auto">
          <Popover>
            <PopoverTrigger asChild>
               <Button variant="outline" className="w-full lg:w-[200px] justify-start text-left font-normal h-12 text-base">
                 <Users className="mr-2 h-4 w-4" />
                 <span>{travelers.adults} Adults, {travelers.children} Children</span>
               </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-4 space-y-4">
               <div className="space-y-2">
                 <h4 className="font-medium leading-none">Travelers</h4>
                 <p className="text-sm text-muted-foreground">
                   Select number of guests and rooms.
                 </p>
               </div>
               <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="adults">Adults</Label>
                    <div className="flex items-center gap-2">
                       <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleTravelerChange('adults', 'decrement')}><Minus className="h-4 w-4" /></Button>
                       <span className="w-6 text-center">{travelers.adults}</span>
                       <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleTravelerChange('adults', 'increment')}><Plus className="h-4 w-4" /></Button>
                    </div>
                  </div>
                   <div className="flex items-center justify-between">
                    <Label htmlFor="children">Children</Label>
                     <div className="flex items-center gap-2">
                       <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleTravelerChange('children', 'decrement')}><Minus className="h-4 w-4" /></Button>
                       <span className="w-6 text-center">{travelers.children}</span>
                       <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleTravelerChange('children', 'increment')}><Plus className="h-4 w-4" /></Button>
                    </div>
                  </div>
               </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Search Button */}
        <div className="w-full lg:w-auto">
          <Button size="lg" className="w-full h-12 text-base lg:w-auto lg:px-8" onClick={handleSearch}>
            <Search className="mr-2 h-5 w-5" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProminentSearchBar;