
import { Check, ShieldCheck, Clock, Coffee } from "lucide-react";

const features = [
  {
    icon: <Check className="h-10 w-10 text-roomzy-blue" />,
    title: "Easy Booking",
    description:
      "Book your room in just a few clicks with our streamlined booking process.",
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-roomzy-blue" />,
    title: "Secure Payments",
    description:
      "Your payment information is always secure with our encrypted payment system.",
  },
  {
    icon: <Clock className="h-10 w-10 text-roomzy-blue" />,
    title: "24/7 Support",
    description:
      "Our customer service team is available around the clock to assist you.",
  },
  {
    icon: <Coffee className="h-10 w-10 text-roomzy-blue" />,
    title: "Free Amenities",
    description:
      "Enjoy complimentary WiFi, breakfast, and other amenities during your stay.",
  },
];

const Features = () => {
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Why Choose Roomzy?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience the best in hospitality with our premium services and customer-focused approach.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
