import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { User, Plane, Hotel, Car, CreditCard, PlusCircle, Trash2 } from "lucide-react";

// Zod schema for validation
const travelerSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  age: z.number().min(1, "Age must be a positive number.").max(120),
  gender: z.enum(["male", "female", "other"]),
});

const bookingFormSchema = z.object({
  travelers: z.array(travelerSchema).min(1, "At least one traveler is required."),
  contactEmail: z.string().email("Invalid email address."),
  contactPhone: z.string().min(10, "Phone number must be at least 10 digits."),
  
  // Optional sections based on services booked
  flightDetails: z.object({
    preference: z.string().optional(),
  }).optional(),
  hotelDetails: z.object({
    roomType: z.string().optional(),
    specialRequests: z.string().max(200, "Requests cannot exceed 200 characters.").optional(),
  }).optional(),
  cabDetails: z.object({
    pickupLocation: z.string().optional(),
    carType: z.string().optional(),
  }).optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

interface MultiModalBookingFormProps {
  // Services included in this booking
  services: {
    flights: boolean;
    hotels: boolean;
    cabs: boolean;
  };
  // Pre-filled data from the estimator
  initialData?: Partial<BookingFormValues>;
}

const MultiModalBookingForm: React.FC<MultiModalBookingFormProps> = ({
  services,
  initialData,
}) => {
  console.log("MultiModalBookingForm loaded");

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      travelers: initialData?.travelers || [{ fullName: "", age: 30, gender: "male" }],
      contactEmail: initialData?.contactEmail || "",
      contactPhone: initialData?.contactPhone || "",
      flightDetails: initialData?.flightDetails || { preference: 'Any' },
      hotelDetails: initialData?.hotelDetails || { roomType: 'Standard' },
      cabDetails: initialData?.cabDetails || { carType: 'Sedan' },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "travelers",
  });

  const onSubmit = (data: BookingFormValues) => {
    console.log("Form Submitted:", data);
    toast({
      title: "Booking Submitted!",
      description: "We've received your details and will be in touch shortly.",
    });
  };
  
  const formValues = form.watch();

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Complete Your Booking</CardTitle>
        <CardDescription>
          Please fill in the details below to finalize your trip.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs defaultValue="travelers" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
                <TabsTrigger value="travelers"><User className="mr-2 h-4 w-4" />Travelers</TabsTrigger>
                {services.flights && <TabsTrigger value="flights"><Plane className="mr-2 h-4 w-4" />Flights</TabsTrigger>}
                {services.hotels && <TabsTrigger value="hotels"><Hotel className="mr-2 h-4 w-4" />Hotels</TabsTrigger>}
                {services.cabs && <TabsTrigger value="cabs"><Car className="mr-2 h-4 w-4" />Cabs</TabsTrigger>}
                <TabsTrigger value="review"><CreditCard className="mr-2 h-4 w-4" />Review</TabsTrigger>
              </TabsList>

              <TabsContent value="travelers" className="pt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Traveler Information</h3>
                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email</FormLabel>
                        <FormControl><Input placeholder="you@example.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Phone</FormLabel>
                        <FormControl><Input placeholder="+91 98765 43210" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Separator className="my-6"/>
                  {fields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-md space-y-4 relative">
                       <h4 className="font-semibold">Traveler {index + 1}</h4>
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name={`travelers.${index}.fullName`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl><Input placeholder="e.g., Rohan Kumar" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                         <FormField
                          control={form.control}
                          name={`travelers.${index}.age`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Age</FormLabel>
                              <FormControl><Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)}/></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                         <FormField
                          control={form.control}
                          name={`travelers.${index}.gender`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Gender</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger></FormControl>
                                <SelectContent>
                                  <SelectItem value="male">Male</SelectItem>
                                  <SelectItem value="female">Female</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                       </div>
                       {fields.length > 1 && (
                         <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2" onClick={() => remove(index)}>
                           <Trash2 className="h-4 w-4" />
                         </Button>
                       )}
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={() => append({ fullName: "", age: 30, gender: "male" })}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Traveler
                  </Button>
                </div>
              </TabsContent>

              {services.flights && <TabsContent value="flights" className="pt-6">
                 <div className="space-y-4">
                    <h3 className="text-lg font-medium">Flight Preferences</h3>
                     <FormField
                      control={form.control}
                      name="flightDetails.preference"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Seat Preference</FormLabel>
                           <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select a preference" /></SelectTrigger></FormControl>
                            <SelectContent>
                              <SelectItem value="Any">Any</SelectItem>
                              <SelectItem value="Window">Window</SelectItem>
                              <SelectItem value="Aisle">Aisle</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>
              </TabsContent>}
              
              {services.hotels && <TabsContent value="hotels" className="pt-6">
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Hotel Preferences</h3>
                    <FormField
                      control={form.control}
                      name="hotelDetails.roomType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Room Type</FormLabel>
                           <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select a room type" /></SelectTrigger></FormControl>
                            <SelectContent>
                              <SelectItem value="Standard">Standard</SelectItem>
                              <SelectItem value="Deluxe">Deluxe</SelectItem>
                              <SelectItem value="Suite">Suite</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                        control={form.control}
                        name="hotelDetails.specialRequests"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Special Requests</FormLabel>
                            <FormControl>
                              <Textarea placeholder="e.g., early check-in, non-smoking room" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                </div>
              </TabsContent>}

              {services.cabs && <TabsContent value="cabs" className="pt-6">
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Cab Preferences</h3>
                    <FormField
                      control={form.control}
                      name="cabDetails.pickupLocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Airport Pickup Location</FormLabel>
                          <FormControl><Input placeholder="e.g., Delhi T3 Departures" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cabDetails.carType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Car Type</FormLabel>
                           <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select car type" /></SelectTrigger></FormControl>
                            <SelectContent>
                              <SelectItem value="Sedan">Sedan (4-seater)</SelectItem>
                              <SelectItem value="SUV">SUV (6-seater)</SelectItem>
                              <SelectItem value="Van">Van (10+ seater)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>
              </TabsContent>}

              <TabsContent value="review" className="pt-6">
                 <div className="space-y-4">
                    <h3 className="text-lg font-medium">Review Your Booking</h3>
                    <div className="p-4 border rounded-md space-y-2 bg-muted/50">
                        <p><strong>Contact:</strong> {formValues.contactEmail || 'Not provided'}</p>
                        <p><strong>Travelers:</strong> {formValues.travelers.length}</p>
                        {services.flights && <p><strong>Flight Seat:</strong> {formValues.flightDetails?.preference || 'N/A'}</p>}
                        {services.hotels && <p><strong>Hotel Room:</strong> {formValues.hotelDetails?.roomType || 'N/A'}</p>}
                        {services.cabs && <p><strong>Cab Type:</strong> {formValues.cabDetails?.carType || 'N/A'}</p>}
                    </div>
                    <p className="text-sm text-muted-foreground">Please review all details carefully before proceeding. This action cannot be undone.</p>
                 </div>
              </TabsContent>

            </Tabs>
             <CardFooter className="px-0 pt-8">
                <Button type="submit" size="lg" className="w-full md:w-auto ml-auto">
                    Confirm & Proceed to Payment
                </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default MultiModalBookingForm;