
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Business Traveler",
    comment:
      "Roomzy made my business trip so much easier. The booking process was simple, and the room exceeded my expectations. I'll definitely be using this service again for my future trips.",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Family Vacation",
    comment:
      "We booked a family suite through Roomzy and our vacation was fantastic! The room was spacious, clean, and the staff was incredibly helpful. Highly recommended for family stays.",
    avatar: "https://randomuser.me/api/portraits/men/53.jpg",
    rating: 4,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Solo Traveler",
    comment:
      "As a solo traveler, I appreciate how easy Roomzy makes it to find safe and comfortable accommodations. The detailed room descriptions and reviews helped me make the perfect choice.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 px-6 bg-gradient-to-br from-roomzy-light-blue/30 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">What Our Guests Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their Roomzy experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600">{testimonial.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
