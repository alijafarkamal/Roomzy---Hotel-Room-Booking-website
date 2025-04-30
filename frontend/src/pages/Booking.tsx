
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BookingForm from "@/components/bookings/BookingForm";

const Booking = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8 bg-gray-50">
        <BookingForm />
      </main>
      <Footer />
    </div>
  );
};

export default Booking;
