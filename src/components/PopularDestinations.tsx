import Image from "next/image";
import { FaHotel } from "react-icons/fa";

const destinations = [
  {
    city: "London",
    dates: "Jul 31 – Aug 6",
    description: "Buckingham Palace and British Museum",
    price: "ARS 196,693",
    image: "/images/london.jpg"
  },
  {
    city: "Paris",
    dates: "Jul 31 – Aug 6",
    description: "Eiffel Tower, Louvre, cafés and fashion",
    price: "ARS 172,498",
    image: "/images/paris.jpg"
  },
  {
    city: "New York",
    dates: "Jul 31 – Aug 6",
    description: "Statue of Liberty and skyscrapers",
    price: "ARS 303,862",
    image: "/images/newyork.jpg"
  }
];

export default function PopularDestinations() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-1">Popular destinations</h2>
      <p className="text-sm mb-6">
        Based on your location in ...
      </p>

      <div className="flex flex-col-reverse lg:flex-row gap-6">
        <div className="flex flex-col gap-4 flex-1">
          {destinations.map((dest, idx) => (
            <div
              key={idx}
              className="flex rounded-xl overflow-hidden shadow-sm border border-gray-500 hover:shadow-xl cursor-pointer transition"
            >
              <div className="relative w-32 h-24 md:w-48 md:h-32 flex-shrink-0">
                <Image
                  src={dest.image}
                  alt={dest.city}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-medium">{dest.city}</h3>
                  <p className="text-sm">{dest.dates}</p>
                  <p className="text-sm mt-1">{dest.description}</p>
                </div>
                <div className="flex items-center text-sm mt-2">
                  <FaHotel className="mr-1" />
                  {dest.price}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex-1 rounded-xl overflow-hidden shadow border border-gray-500">
          <iframe
            title="Map"
            className="w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m3!1m2!1s0x0%3A0x0!2zMjcuMzc4NzY0LCAtODAuODkwMDAw!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjcuMzc4NzY0LCAtODAuODkwMDAw!5e0!3m2!1sen!2sar!4v1628298672050!5m2!1sen!2sar"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
