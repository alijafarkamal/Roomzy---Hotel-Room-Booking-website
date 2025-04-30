
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Pencil, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data
const initialRooms = [
  {
    id: 1,
    name: "Deluxe King Suite",
    description: "Spacious suite with a king-sized bed, ensuite bathroom, and city view.",
    price: 199,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1470",
    capacity: 2,
    beds: 1,
    bathrooms: 1,
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
  },
];

const roomFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number.",
  }),
  image: z.string().url({
    message: "Please enter a valid URL for the image.",
  }),
  capacity: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Capacity must be a positive number.",
  }),
  beds: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Beds must be a positive number.",
  }),
  bathrooms: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Bathrooms must be a positive number.",
  }),
});

type RoomFormValues = z.infer<typeof roomFormSchema>;

const RoomManagement = () => {
  const [rooms, setRooms] = useState(initialRooms);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<typeof initialRooms[0] | null>(null);
  const { toast } = useToast();

  const form = useForm<RoomFormValues>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      image: "",
      capacity: "",
      beds: "",
      bathrooms: "",
    },
  });

  const openAddDialog = () => {
    form.reset({
      name: "",
      description: "",
      price: "",
      image: "",
      capacity: "",
      beds: "",
      bathrooms: "",
    });
    setIsAddMode(true);
    setEditDialogOpen(true);
  };

  const openEditDialog = (room: typeof initialRooms[0]) => {
    form.reset({
      name: room.name,
      description: room.description,
      price: room.price.toString(),
      image: room.image,
      capacity: room.capacity.toString(),
      beds: room.beds.toString(),
      bathrooms: room.bathrooms.toString(),
    });
    setSelectedRoom(room);
    setIsAddMode(false);
    setEditDialogOpen(true);
  };

  const handleDeleteRoom = (roomId: number) => {
    setRooms(rooms.filter((room) => room.id !== roomId));
    toast({
      title: "Room deleted",
      description: "The room has been deleted successfully.",
    });
  };

  const onSubmit = (values: RoomFormValues) => {
    if (isAddMode) {
      const newRoom = {
        id: rooms.length > 0 ? Math.max(...rooms.map((r) => r.id)) + 1 : 1,
        name: values.name,
        description: values.description,
        price: Number(values.price),
        image: values.image,
        capacity: Number(values.capacity),
        beds: Number(values.beds),
        bathrooms: Number(values.bathrooms),
      };
      setRooms([...rooms, newRoom]);
      toast({
        title: "Room added",
        description: "The new room has been added successfully.",
      });
    } else if (selectedRoom) {
      setRooms(
        rooms.map((room) =>
          room.id === selectedRoom.id
            ? {
                ...room,
                name: values.name,
                description: values.description,
                price: Number(values.price),
                image: values.image,
                capacity: Number(values.capacity),
                beds: Number(values.beds),
                bathrooms: Number(values.bathrooms),
              }
            : room
        )
      );
      toast({
        title: "Room updated",
        description: "The room has been updated successfully.",
      });
    }
    setEditDialogOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Room Management</CardTitle>
              <CardDescription>
                Manage your hotel rooms - add, edit or remove rooms.
              </CardDescription>
            </div>
            <Button onClick={openAddDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Room
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell>
                    <div className="h-14 w-14 rounded overflow-hidden">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{room.name}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {room.description}
                  </TableCell>
                  <TableCell>${room.price}</TableCell>
                  <TableCell>{room.capacity} guests</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(room)}
                      >
                        <Pencil className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <Trash className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Room</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this room? This action cannot be
                              undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteRoom(room.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {isAddMode ? "Add New Room" : "Edit Room"}
            </DialogTitle>
            <DialogDescription>
              {isAddMode
                ? "Fill out the form below to add a new room."
                : "Update the room information."}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Deluxe King Suite" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price per Night</FormLabel>
                      <FormControl>
                        <Input placeholder="199" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Spacious suite with a king-sized bed..."
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://example.com/image.jpg"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="capacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Capacity</FormLabel>
                      <FormControl>
                        <Input placeholder="2" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="beds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Beds</FormLabel>
                      <FormControl>
                        <Input placeholder="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bathrooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bathrooms</FormLabel>
                      <FormControl>
                        <Input placeholder="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {isAddMode ? "Add Room" : "Update Room"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RoomManagement;
