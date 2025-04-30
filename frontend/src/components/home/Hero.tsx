
import { Calendar, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

const Hero = () => {
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();

  return (
    <div className="hero-section w-full h-[600px] flex items-center justify-center text-white px-6">
      <div className="max-w-6xl w-full flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">
          Find Your Perfect Stay
        </h1>
        <p className="text-xl md:text-2xl text-center mb-12 max-w-3xl">
          Book hotels at the best prices, with instant confirmation and excellent customer service.
        </p>
        
        <Card className="w-full max-w-4xl bg-white/95 backdrop-blur p-2">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              
              <div className="flex items-end">
                <Link to="/rooms" className="w-full">
                  <Button className="w-full">
                    <Search className="mr-2 h-4 w-4" />
                    Search Rooms
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Hero;
