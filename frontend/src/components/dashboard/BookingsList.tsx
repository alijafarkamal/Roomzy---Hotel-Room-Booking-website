
import { useState } from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Calendar, Pencil, Trash } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Mock booking data
const mockBookings = [
  {
    id: 1,
    roomName: "Deluxe King Suite",
    roomImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1470",
    checkIn: new Date("2023-11-20"),
    checkOut: new Date("2023-11-25"),
    totalPrice: 1145.85,
    status: "confirmed",
  },
  {
    id: 2,
    roomName: "Standard Twin Room",
    roomImage: "https://images.unsplash.com/photo-1598928636135-d146006ff4be?auto=format&fit=crop&q=80&w=1470",
    checkIn: new Date("2023-12-10"),
    checkOut: new Date("2023-12-15"),
    totalPrice: 743.85,
    status: "pending",
  },
  {
    id: 3,
    roomName: "Premium Ocean View",
    roomImage: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80&w=1474",
    checkIn: new Date("2023-10-05"),
    checkOut: new Date("2023-10-10"),
    totalPrice: 1435.25,
    status: "completed",
  },
  {
    id: 4,
    roomName: "Deluxe King Suite",
    roomImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1470",
    checkIn: new Date("2023-09-15"),
    checkOut: new Date("2023-09-20"),
    totalPrice: 1145.85,
    status: "cancelled",
  },
];

const statusColors = {
  confirmed: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800",
};

const BookingsList = () => {
  const [bookings, setBookings] = useState(mockBookings);
  const [selectedBooking, setSelectedBooking] = useState<typeof mockBookings[0] | null>(null);
  const [modifyDialogOpen, setModifyDialogOpen] = useState(false);
  const [newCheckIn, setNewCheckIn] = useState<Date | undefined>(undefined);
  const [newCheckOut, setNewCheckOut] = useState<Date | undefined>(undefined);
  const { toast } = useToast();

  const handleModifyBooking = (booking: typeof mockBookings[0]) => {
    setSelectedBooking(booking);
    setNewCheckIn(booking.checkIn);
    setNewCheckOut(booking.checkOut);
    setModifyDialogOpen(true);
  };

  const handleCancelBooking = (bookingId: number) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: "cancelled" } : booking
    ));
    
    toast({
      title: "Booking Cancelled",
      description: "Your booking has been cancelled successfully.",
    });
  };

  const handleSaveModification = () => {
    if (selectedBooking && newCheckIn && newCheckOut) {
      setBookings(bookings.map(booking => 
        booking.id === selectedBooking.id 
          ? { ...booking, checkIn: newCheckIn, checkOut: newCheckOut } 
          : booking
      ));
      
      setModifyDialogOpen(false);
      
      toast({
        title: "Booking Modified",
        description: "Your booking dates have been updated successfully.",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    let colorClass = statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-800";
    return (
      <Badge className={`${colorClass} capitalize`}>
        {status}
      </Badge>
    );
  };

  return (
    <>
      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Room</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="h-14 w-14 rounded overflow-hidden">
                      <img 
                        src={booking.roomImage} 
                        alt={booking.roomName} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="font-medium">{booking.roomName}</span>
                  </div>
                </TableCell>
                <TableCell>{format(booking.checkIn, "MMM d, yyyy")}</TableCell>
                <TableCell>{format(booking.checkOut, "MMM d, yyyy")}</TableCell>
                <TableCell>${booking.totalPrice.toFixed(2)}</TableCell>
                <TableCell>{getStatusBadge(booking.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    {booking.status === "confirmed" || booking.status === "pending" ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleModifyBooking(booking)}
                        >
                          <Pencil className="h-4 w-4 mr-1" />
                          Modify
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <Trash className="h-4 w-4 mr-1" />
                              Cancel
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to cancel this booking? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>No, keep booking</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleCancelBooking(booking.id)}
                              >
                                Yes, cancel booking
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    ) : (
                      <Button variant="ghost" size="sm" disabled>
                        No actions available
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={modifyDialogOpen} onOpenChange={setModifyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modify Booking</DialogTitle>
            <DialogDescription>
              Update your check-in and check-out dates for {selectedBooking?.roomName}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Check In Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full justify-start text-left"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newCheckIn ? format(newCheckIn, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={newCheckIn}
                      onSelect={setNewCheckIn}
                      disabled={(date) =>
                        date < new Date()
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Check Out Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full justify-start text-left"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newCheckOut ? format(newCheckOut, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={newCheckOut}
                      onSelect={setNewCheckOut}
                      disabled={(date) =>
                        !newCheckIn || date <= newCheckIn
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModifyDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSaveModification}
              disabled={!newCheckIn || !newCheckOut}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookingsList;
