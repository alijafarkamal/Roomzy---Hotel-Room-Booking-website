
import { Link } from "react-router-dom";
import { Bed, Users, Bath, Check, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Room {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  capacity: number;
  beds: number;
  bathrooms: number;
  amenities: string[];
  discount?: string;
}

interface RoomCardProps {
  room: Room;
}

const RoomCard = ({ room }: RoomCardProps) => {
  return (
    <Card className="room-card overflow-hidden border border-gray-200">
      <div className="relative h-56">
        <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
        {room.discount && (
          <Badge className="absolute top-3 right-3 bg-roomzy-purple">
            {room.discount}
          </Badge>
        )}
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{room.name}</CardTitle>
          <div className="text-lg font-bold text-roomzy-blue">${room.price}<span className="text-sm font-normal text-gray-500">/night</span></div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600">{room.description}</p>
        
        <div className="grid grid-cols-3 gap-2">
          <div className="flex items-center text-gray-700 text-sm">
            <Bed className="h-4 w-4 mr-1" />
            <span>{room.beds} Beds</span>
          </div>
          <div className="flex items-center text-gray-700 text-sm">
            <Users className="h-4 w-4 mr-1" />
            <span>For {room.capacity}</span>
          </div>
          <div className="flex items-center text-gray-700 text-sm">
            <Bath className="h-4 w-4 mr-1" />
            <span>{room.bathrooms} Bath</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Amenities</h4>
          <div className="flex flex-wrap gap-2">
            {room.amenities.slice(0, 3).map((amenity, index) => (
              <div key={index} className="flex items-center text-xs text-gray-600">
                <Check className="h-3 w-3 mr-1 text-green-500" />
                <span>{amenity}</span>
              </div>
            ))}
            {room.amenities.length > 3 && (
              <div className="flex items-center text-xs text-roomzy-blue cursor-pointer">
                <Tag className="h-3 w-3 mr-1" />
                <span>+{room.amenities.length - 3} more</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-4 border-t">
        <Link to={`/rooms/${room.id}`}>
          <Button variant="outline">View Details</Button>
        </Link>
        <Link to={`/booking/${room.id}`}>
          <Button>Book Now</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
