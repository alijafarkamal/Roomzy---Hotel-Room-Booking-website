
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock booking data
const initialBookings = [
  {
    id: 1,
    guestName: "Sarah Johnson",
    guestEmail: "sarah.j@example.com",
    guestPhone: "+1 (555) 123-4567",
    roomName: "Deluxe King Suite",
    roomImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1470",
    checkIn: new Date("2023-11-20"),
    checkOut: new Date("2023-11-25"),
    totalPrice: 1145.85,
    status: "confirmed",
  },
  {
    id: 2,
    guestName: "Michael Chen",
    guestEmail: "m.chen@example.com",
    guestPhone: "+1 (555) 234-5678",
    roomName: "Standard Twin Room",
    roomImage: "https://images.unsplash.com/photo-1598928636135-d146006ff4be?auto=format&fit=crop&q=80&w=1470",
    checkIn: new Date("2023-12-10"),
    checkOut: new Date("2023-12-15"),
    totalPrice: 743.85,
    status: "pending",
  },
  {
    id: 3,
    guestName: "Emma Rodriguez",
    guestEmail: "emma.r@example.com",
    guestPhone: "+1 (555) 345-6789",
    roomName: "Premium Ocean View",
    roomImage: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80&w=1474",
    checkIn: new Date("2023-10-05"),
    checkOut: new Date("2023-10-10"),
    totalPrice: 1435.25,
    status: "completed",
  },
  {
    id: 4,
    guestName: "John Smith",
    guestEmail: "john.s@example.com",
    guestPhone: "+1 (555) 456-7890",
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

const BookingManagement = () => {
  const [bookings, setBookings] = useState(initialBookings);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<typeof initialBookings[0] | null>(null);
  const [newStatus, setNewStatus] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredBookings = statusFilter
    ? bookings.filter((booking) => booking.status === statusFilter)
    : bookings;

  const handleUpdateStatus = (booking: typeof initialBookings[0]) => {
    setSelectedBooking(booking);
    setNewStatus(booking.status);
    setStatusDialogOpen(true);
  };

  const handleSaveStatus = () => {
    if (selectedBooking && newStatus) {
      setBookings(bookings.map(booking => 
        booking.id === selectedBooking.id 
          ? { ...booking, status: newStatus } 
          : booking
      ));
      
      setStatusDialogOpen(false);
      
      toast({
        title: "Status Updated",
        description: `Booking status has been updated to ${newStatus}.`,
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
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Booking Management</h2>
        <div className="flex gap-4 mb-4">
          <Select 
            value={statusFilter || ""} 
            onValueChange={(value) => setStatusFilter(value || null)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          {statusFilter && (
            <Button variant="outline" onClick={() => setStatusFilter(null)}>
              Clear Filter
            </Button>
          )}
        </div>
      </div>

      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Guest</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{booking.guestName}</div>
                    <div className="text-sm text-gray-500">{booking.guestEmail}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded overflow-hidden">
                      <img 
                        src={booking.roomImage} 
                        alt={booking.roomName} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span>{booking.roomName}</span>
                  </div>
                </TableCell>
                <TableCell>{format(booking.checkIn, "MMM d, yyyy")}</TableCell>
                <TableCell>{format(booking.checkOut, "MMM d, yyyy")}</TableCell>
                <TableCell>${booking.totalPrice.toFixed(2)}</TableCell>
                <TableCell>{getStatusBadge(booking.status)}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdateStatus(booking)}
                    disabled={booking.status === "completed"}
                  >
                    <Pencil className="h-4 w-4 mr-1" />
                    Update Status
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredBookings.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No bookings found with the selected filter.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Booking Status</DialogTitle>
            <DialogDescription>
              Change the status for booking #{selectedBooking?.id} - {selectedBooking?.guestName}'s {selectedBooking?.roomName}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStatusDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveStatus}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookingManagement;
