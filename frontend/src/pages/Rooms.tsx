
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RoomCard, { Room } from "@/components/rooms/RoomCard";
import RoomFilters from "@/components/rooms/RoomFilters";

// Mock room data
const allRooms: Room[] = [
  {
    id: 1,
    name: "Deluxe King Suite",
    description: "Spacious suite with a king-sized bed, ensuite bathroom, and city view.",
    price: 199,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1470",
    capacity: 2,
    beds: 1,
    bathrooms: 1,
    amenities: ["King Bed", "City View", "Free WiFi", "Breakfast Included"],
    discount: "20% OFF"
  },
  {
    id: 2,
    name: "Standard Twin Room",
    description: "Comfortable room with two single beds, perfect for friends or colleagues.",
    price: 129,
    image: "https://images.unsplash.com/photo-1598928636135-d146006ff4be?auto=format&fit=crop&q=80&w=1470",
    capacity: 2,
    beds: 2,
    bathrooms: 1,
    amenities: ["Twin Beds", "Garden View", "Free WiFi"]
  },
  {
    id: 3,
    name: "Premium Ocean View",
    description: "Luxury room with a stunning ocean view and private balcony.",
    price: 249,
    image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80&w=1474",
    capacity: 2,
    beds: 1,
    bathrooms: 1,
    amenities: ["King Bed", "Ocean View", "Private Balcony", "Room Service", "Spa Access"],
    discount: "10% OFF"
  },
  {
    id: 4,
    name: "Family Suite",
    description: "Spacious suite with a master bedroom and separate area with two twin beds.",
    price: 299,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=1470",
    capacity: 4,
    beds: 3,
    bathrooms: 2,
    amenities: ["King Bed", "Twin Beds", "City View", "Mini Kitchen", "Two TVs"]
  },
  {
    id: 5,
    name: "Budget Single Room",
    description: "Cozy room with a single bed, perfect for solo travelers.",
    price: 89,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1470",
    capacity: 1,
    beds: 1,
    bathrooms: 1,
    amenities: ["Single Bed", "Work Desk", "Free WiFi"]
  },
  {
    id: 6,
    name: "Executive Suite",
    description: "Luxurious suite with a separate living area and stunning panoramic views.",
    price: 399,
    image: "https://images.unsplash.com/photo-1609949279532-12eafffc6ff2?auto=format&fit=crop&q=80&w=1470",
    capacity: 2,
    beds: 1,
    bathrooms: 1,
    amenities: ["King Bed", "Panoramic View", "Living Room", "Work Area", "Premium Amenities"]
  }
];

const Rooms = () => {
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(allRooms);

  const handleFilter = (filters: any) => {
    let result = [...allRooms];
    
    // Filter by price range
    if (filters.priceRange && filters.priceRange.length === 2) {
      result = result.filter(
        room => room.price >= filters.priceRange[0] && room.price <= filters.priceRange[1]
      );
    }
    
    // Filter by amenities
    if (filters.amenities && filters.amenities.length > 0) {
      result = result.filter(room => {
        return filters.amenities.every((amenity: string) => {
          // This is just a simple check - in a real app, you'd match amenities more accurately
          return room.amenities.some(a => a.toLowerCase().includes(amenity.toLowerCase()));
        });
      });
    }
    
    // Filter by search term
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      result = result.filter(
        room => 
          room.name.toLowerCase().includes(searchLower) || 
          room.description.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredRooms(result);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-4">Our Rooms</h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Browse our selection of luxurious and comfortable rooms, all designed with your comfort in mind.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <RoomFilters onFilter={handleFilter} />
            </div>
            
            <div className="lg:col-span-3">
              {filteredRooms.length === 0 ? (
                <div className="text-center py-10">
                  <h3 className="text-xl font-semibold mb-2">No rooms match your filters</h3>
                  <p className="text-gray-600">Try adjusting your search criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {filteredRooms.map(room => (
                    <RoomCard key={room.id} room={room} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Rooms;
