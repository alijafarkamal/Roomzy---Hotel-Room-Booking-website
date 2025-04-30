
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { Calendar, Users, Bed, Bath, Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock room data - in a real app this would come from an API
const rooms = [
  {
    id: 1,
    name: "Deluxe King Suite",
    description:
      "Spacious suite with a king-sized bed, ensuite bathroom, and city view. The room features high-end furnishings, a work desk, and a comfortable seating area perfect for both business and leisure travelers.",
    longDescription:
      "Experience luxury and comfort in our Deluxe King Suite. This spacious room offers a premium king-sized bed with high-quality linens, ensuring a peaceful night's sleep. The modern ensuite bathroom features a rainfall shower, deep soaking tub, and premium toiletries.\n\nEnjoy stunning city views through the floor-to-ceiling windows while relaxing in the dedicated seating area. The room is equipped with a work desk, high-speed Wi-Fi, and multiple charging ports for business travelers.\n\nAdditional amenities include a 55-inch smart TV, in-room safe, minibar, coffee maker, and individually controlled air conditioning. Daily housekeeping and room service are available upon request.",
    price: 199,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1470",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1470",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1474",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1074",
    ],
    capacity: 2,
    beds: 1,
    bathrooms: 1,
    amenities: [
      "King Bed",
      "City View",
      "Free WiFi",
      "Breakfast Included",
      "Air Conditioning",
      "Room Service",
      "Mini Bar",
      "Work Desk",
      "55\" Smart TV",
      "Coffee Maker",
    ],
    policies: {
      checkIn: "2:00 PM",
      checkOut: "12:00 PM",
      cancellation: "Free cancellation up to 48 hours before check-in",
      smoking: "No smoking",
      pets: "Pets not allowed",
    },
    reviews: [
      {
        id: 1,
        user: "Sarah Johnson",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        rating: 5,
        date: "2023-10-15",
        comment: "Beautiful room with amazing city views. The bed was extremely comfortable and the staff was very helpful.",
      },
      {
        id: 2,
        user: "Michael Chen",
        avatar: "https://randomuser.me/api/portraits/men/53.jpg",
        rating: 4,
        date: "2023-09-22",
        comment: "Great suite with all the amenities needed for a business trip. Only issue was some street noise, but otherwise perfect.",
      },
    ],
    discount: "20% OFF",
  },
];

const RoomDetail = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  
  // Find the room based on the roomId
  const room = rooms.find((r) => r.id === Number(roomId));
  
  if (!room) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold">Room not found</h2>
        <p className="mt-4">The room you're looking for doesn't exist.</p>
        <Link to="/rooms">
          <Button className="mt-4">Back to Rooms</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-6">
      <div className="mb-6">
        <Link to="/rooms" className="text-roomzy-blue hover:underline flex items-center mb-4">
          &larr; Back to All Rooms
        </Link>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">{room.name}</h1>
            {room.discount && (
              <Badge className="mt-1 bg-roomzy-purple">{room.discount}</Badge>
            )}
          </div>
          <div className="text-3xl font-bold text-roomzy-blue">
            ${room.price}<span className="text-lg font-normal text-gray-500">/night</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Room images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-3">
              <img
                src={room.images[0]}
                alt={room.name}
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
            {room.images.slice(1).map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`${room.name} ${index + 2}`}
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>

          {/* Room details tabs */}
          <Card>
            <CardContent className="p-0">
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="p-6">
                  <p className="text-gray-600 whitespace-pre-line">{room.longDescription}</p>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">Policies</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium">Check-in time</p>
                        <p className="text-gray-600">{room.policies.checkIn}</p>
                      </div>
                      <div>
                        <p className="font-medium">Check-out time</p>
                        <p className="text-gray-600">{room.policies.checkOut}</p>
                      </div>
                      <div>
                        <p className="font-medium">Cancellation</p>
                        <p className="text-gray-600">{room.policies.cancellation}</p>
                      </div>
                      <div>
                        <p className="font-medium">Smoking</p>
                        <p className="text-gray-600">{room.policies.smoking}</p>
                      </div>
                      <div>
                        <p className="font-medium">Pets</p>
                        <p className="text-gray-600">{room.policies.pets}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="amenities" className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Room Amenities</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {room.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="h-5 w-5 mr-2 text-green-500" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="reviews" className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < 4.5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-medium">4.5 out of 5</span>
                    <span className="text-gray-500 ml-2">
                      ({room.reviews.length} reviews)
                    </span>
                  </div>
                  
                  <div className="space-y-6">
                    {room.reviews.map((review) => (
                      <div key={review.id} className="border-b pb-6 last:border-0">
                        <div className="flex items-center mb-2">
                          <img
                            src={review.avatar}
                            alt={review.user}
                            className="h-10 w-10 rounded-full mr-3"
                          />
                          <div>
                            <div className="font-medium">{review.user}</div>
                            <div className="text-sm text-gray-500">
                              {format(new Date(review.date), "MMMM d, yyyy")}
                            </div>
                          </div>
                        </div>
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Book This Room</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-gray-700">
                  <Bed className="h-5 w-5 mr-2" />
                  <span>{room.beds} {room.beds > 1 ? "Beds" : "Bed"}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Users className="h-5 w-5 mr-2" />
                  <span>Fits up to {room.capacity} {room.capacity > 1 ? "guests" : "guest"}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Bath className="h-5 w-5 mr-2" />
                  <span>{room.bathrooms} {room.bathrooms > 1 ? "Bathrooms" : "Bathroom"}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-gray-700 font-medium block">Check In</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {checkInDate ? format(checkInDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={checkInDate}
                      onSelect={setCheckInDate}
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <label className="text-gray-700 font-medium block">Check Out</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {checkOutDate ? format(checkOutDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={checkOutDate}
                      onSelect={setCheckOutDate}
                      disabled={(date) => !checkInDate || date <= checkInDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between mb-2">
                  <span>Price per night</span>
                  <span>${room.price}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Nights</span>
                  <span>
                    {checkInDate && checkOutDate
                      ? Math.ceil(
                          (checkOutDate.getTime() - checkInDate.getTime()) /
                            (1000 * 60 * 60 * 24)
                        )
                      : 0}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Taxes & fees</span>
                  <span>
                    $
                    {checkInDate && checkOutDate
                      ? Math.ceil(
                          ((checkOutDate.getTime() - checkInDate.getTime()) /
                            (1000 * 60 * 60 * 24)) *
                            room.price *
                            0.15
                        )
                      : 0}
                  </span>
                </div>
                <div className="border-t pt-2 mt-2 font-bold flex justify-between">
                  <span>Total</span>
                  <span>
                    $
                    {checkInDate && checkOutDate
                      ? Math.ceil(
                          ((checkOutDate.getTime() - checkInDate.getTime()) /
                            (1000 * 60 * 60 * 24)) *
                            room.price *
                            1.15
                        )
                      : 0}
                  </span>
                </div>
              </div>

              <Link to={`/booking/${room.id}`}>
                <Button className="w-full" disabled={!checkInDate || !checkOutDate}>
                  Book Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
