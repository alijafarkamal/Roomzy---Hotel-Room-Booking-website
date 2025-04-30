
import Hero from "@/components/home/Hero";
import FeaturedRooms from "@/components/home/FeaturedRooms";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/Testimonials";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedRooms />
        <Features />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
