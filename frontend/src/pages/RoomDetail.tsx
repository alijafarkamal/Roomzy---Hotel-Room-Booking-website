
import { useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RoomDetail from "@/components/rooms/RoomDetail";

const RoomDetailPage = () => {
  const { roomId } = useParams<{ roomId: string }>();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8 bg-gray-50">
        <RoomDetail />
      </main>
      <Footer />
    </div>
  );
};

export default RoomDetailPage;
