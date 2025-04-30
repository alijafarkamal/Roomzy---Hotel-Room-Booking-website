
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar, CreditCard, User, Mail, Phone } from "lucide-react";
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
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Mock room data - in a real app this would come from an API
const rooms = [
  {
    id: 1,
    name: "Deluxe King Suite",
    price: 199,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1470",
  },
  {
    id: 2,
    name: "Standard Twin Room",
    price: 129,
    image: "https://images.unsplash.com/photo-1598928636135-d146006ff4be?auto=format&fit=crop&q=80&w=1470",
  },
  {
    id: 3,
    name: "Premium Ocean View",
    price: 249,
    image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80&w=1474",
  },
];

const bookingSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  checkInDate: z.date({
    required_error: "Please select a check-in date.",
  }),
  checkOutDate: z.date({
    required_error: "Please select a check-out date.",
  }),
  cardNumber: z.string().min(16, {
    message: "Card number must be at least 16 digits.",
  }),
  cardName: z.string().min(2, {
    message: "Name on card must be at least 2 characters.",
  }),
  expiryMonth: z.string().min(1, {
    message: "Please select expiry month.",
  }),
  expiryYear: z.string().min(1, {
    message: "Please select expiry year.",
  }),
  cvv: z.string().min(3, {
    message: "CVV must be at least 3 digits.",
  }),
}).refine((data) => data.checkOutDate > data.checkInDate, {
  message: "Check-out date must be after check-in date.",
  path: ["checkOutDate"],
});

type BookingValues = z.infer<typeof bookingSchema>;

const BookingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const { toast } = useToast();
  
  // Find the room based on the roomId
  const room = rooms.find((r) => r.id === Number(roomId));
  
  const form = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      cardNumber: "",
      cardName: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
    },
  });

  const onSubmit = async (values: BookingValues) => {
    setIsSubmitting(true);
    
    // Calculate the number of nights and total price
    const nights = Math.ceil(
      (values.checkOutDate.getTime() - values.checkInDate.getTime()) /
        (1000 * 60 * 60 * 24)
    );
    const totalPrice = room ? room.price * nights * 1.15 : 0;
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      setIsSubmitting(false);
      console.log("Booking values:", values);
      
      // Show success toast
      toast({
        title: "Booking successful!",
        description: `Your booking for ${room?.name} has been confirmed.`,
      });
      
      // Redirect to dashboard
      navigate("/dashboard");
    }, 1500);
  };

  if (!room) {
    return (
      <div className="text-center p-6">
        <h2 className="text-2xl font-bold">Room not found</h2>
        <p className="mt-4">The room you're trying to book doesn't exist.</p>
        <Button className="mt-4" onClick={() => navigate("/rooms")}>
          Back to Rooms
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Book Your Stay</h1>
        <p className="text-gray-600 mt-2">
          Complete the form below to book your stay at {room.name}.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Guest Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 text-gray-400 mr-2" />
                            <Input placeholder="john.doe@example.com" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 text-gray-400 mr-2" />
                            <Input placeholder="+1 (555) 123-4567" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="checkInDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Check In Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className="w-full pl-3 text-left font-normal"
                              >
                                <Calendar className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date()
                              }
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="checkOutDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Check Out Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className="w-full pl-3 text-left font-normal"
                              >
                                <Calendar className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => {
                                const checkInDate = form.getValues("checkInDate");
                                return !checkInDate || date <= checkInDate;
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-6 pt-4 border-t">
                <h2 className="text-xl font-semibold">Payment Information</h2>
                
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <CreditCard className="h-4 w-4 text-gray-400 mr-2" />
                          <Input placeholder="1234 5678 9012 3456" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cardName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name on Card</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-gray-400 mr-2" />
                          <Input placeholder="John Doe" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="expiryMonth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Month</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Month" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => {
                              const month = i + 1;
                              return (
                                <SelectItem
                                  key={month}
                                  value={month.toString().padStart(2, "0")}
                                >
                                  {month.toString().padStart(2, "0")}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="expiryYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Year</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Year" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 10 }, (_, i) => {
                              const year = new Date().getFullYear() + i;
                              return (
                                <SelectItem key={year} value={year.toString()}>
                                  {year}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVV</FormLabel>
                        <FormControl>
                          <Input placeholder="123" {...field} maxLength={4} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Confirm Booking"}
              </Button>
            </form>
          </Form>
        </div>
        
        <div className="md:w-1/3">
          <div className="sticky top-24">
            <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">{room.name}</h3>
                <div className="text-gray-700 mb-4">
                  <div>
                    <span className="font-medium">Price per night:</span> ${room.price}
                  </div>
                </div>
                <div className="border-t pt-4 mt-4">
                  <h4 className="font-medium mb-2">Booking Summary</h4>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Room Price</span>
                    <span>${room.price} × {
                      form.watch("checkInDate") && form.watch("checkOutDate")
                        ? Math.ceil(
                            (form.watch("checkOutDate").getTime() - form.watch("checkInDate").getTime()) /
                              (1000 * 60 * 60 * 24)
                          )
                        : 0
                    } nights</span>
                  </div>
                  <div className="flex justify-between text-sm mb-3">
                    <span>Taxes & Fees (15%)</span>
                    <span>${
                      form.watch("checkInDate") && form.watch("checkOutDate")
                        ? Math.ceil(
                            ((form.watch("checkOutDate").getTime() - form.watch("checkInDate").getTime()) /
                              (1000 * 60 * 60 * 24)) *
                              room.price *
                              0.15
                          )
                        : 0
                    }</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-3">
                    <span>Total</span>
                    <span>${
                      form.watch("checkInDate") && form.watch("checkOutDate")
                        ? Math.ceil(
                            ((form.watch("checkOutDate").getTime() - form.watch("checkInDate").getTime()) /
                              (1000 * 60 * 60 * 24)) *
                              room.price *
                              1.15
                          )
                        : 0
                    }</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
