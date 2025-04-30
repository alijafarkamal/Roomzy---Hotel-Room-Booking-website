
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Search, FilterX } from "lucide-react";

interface RoomFiltersProps {
  onFilter: (filters: any) => void;
}

const amenities = [
  { id: "wifi", label: "Free Wi-Fi" },
  { id: "breakfast", label: "Breakfast Included" },
  { id: "parking", label: "Free Parking" },
  { id: "ac", label: "Air Conditioning" },
  { id: "tv", label: "TV" },
  { id: "fridge", label: "Mini Fridge" },
  { id: "bath", label: "Private Bathroom" },
  { id: "balcony", label: "Balcony" },
];

const RoomFilters = ({ onFilter }: RoomFiltersProps) => {
  const [priceRange, setPriceRange] = useState<number[]>([0, 500]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAmenityChange = (amenityId: string, checked: boolean) => {
    if (checked) {
      setSelectedAmenities([...selectedAmenities, amenityId]);
    } else {
      setSelectedAmenities(selectedAmenities.filter((id) => id !== amenityId));
    }
  };

  const handleFilter = () => {
    onFilter({
      priceRange,
      amenities: selectedAmenities,
      searchTerm,
    });
  };

  const handleReset = () => {
    setPriceRange([0, 500]);
    setSelectedAmenities([]);
    setSearchTerm("");
    onFilter({
      priceRange: [0, 500],
      amenities: [],
      searchTerm: "",
    });
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="text-xl">Filter Rooms</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center mb-2">
            <Input 
              placeholder="Search rooms..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Price Range</h3>
          <Slider
            value={priceRange}
            min={0}
            max={500}
            step={10}
            onValueChange={(value) => setPriceRange(value as number[])}
            className="mb-2"
          />
          <div className="flex justify-between text-sm">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Amenities</h3>
          <div className="grid grid-cols-1 gap-2">
            {amenities.map((amenity) => (
              <div key={amenity.id} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity.id}
                  checked={selectedAmenities.includes(amenity.id)}
                  onCheckedChange={(checked) => handleAmenityChange(amenity.id, checked as boolean)}
                />
                <label
                  htmlFor={amenity.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {amenity.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Button className="w-full" onClick={handleFilter}>
            <Search className="w-4 h-4 mr-2" />
            Apply Filters
          </Button>
          <Button variant="outline" className="w-full" onClick={handleReset}>
            <FilterX className="w-4 h-4 mr-2" />
            Reset Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomFilters;
