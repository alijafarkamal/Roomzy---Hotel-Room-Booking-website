
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock featured room data
const featuredRooms = [
  {
    id: 1,
    name: "Deluxe King Suite",
    description: "Spacious room with king-sized bed, ensuite bathroom and city view.",
    price: 199,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1470",
    amenities: ["King Bed", "City View", "Free WiFi", "Breakfast Included"],
    discount: "20% OFF"
  },
  {
    id: 2,
    name: "Standard Twin Room",
    description: "Comfortable room with two single beds, perfect for friends or colleagues.",
    price: 129,
    image: "https://images.unsplash.com/photo-1598928636135-d146006ff4be?auto=format&fit=crop&q=80&w=1470",
    amenities: ["Twin Beds", "Garden View", "Free WiFi"]
  },
  {
    id: 3,
    name: "Premium Ocean View",
    description: "Luxury room with a stunning ocean view and private balcony.",
    price: 249,
    image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80&w=1474",
    amenities: ["King Bed", "Ocean View", "Private Balcony", "Room Service", "Spa Access"],
    discount: "10% OFF"
  }
];

const FeaturedRooms = () => {
  return (
    <section className="py-16 px-6 bg-roomzy-soft-gray">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured Rooms</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular room options, offering the perfect blend of comfort, style, and value.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRooms.map((room) => (
            <Card key={room.id} className="room-card overflow-hidden border border-gray-200">
              <div className="relative h-56">
                <img 
                  src={room.image} 
                  alt={room.name} 
                  className="w-full h-full object-cover"
                />
                {room.discount && (
                  <Badge className="absolute top-3 right-3 bg-roomzy-purple">
                    {room.discount}
                  </Badge>
                )}
              </div>
              <CardHeader>
                <CardTitle>{room.name}</CardTitle>
                <div className="flex justify-between items-center">
                  <CardDescription>${room.price} per night</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-600">{room.description}</p>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.slice(0, 3).map((amenity, index) => (
                    <Badge key={index} variant="secondary">
                      {amenity}
                    </Badge>
                  ))}
                  {room.amenities.length > 3 && (
                    <Badge variant="outline">
                      +{room.amenities.length - 3} more
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link to={`/rooms/${room.id}`}>
                  <Button variant="outline">View Details</Button>
                </Link>
                <Link to={`/booking/${room.id}`}>
                  <Button>Book Now</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/rooms">
            <Button size="lg">
              View All Rooms
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRooms;
