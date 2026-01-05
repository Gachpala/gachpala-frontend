import { inter, openSans } from "@/lib/fonts";
import { FaShippingFast, FaHeadset, FaShieldAlt, FaUndo } from "react-icons/fa";
import Container from "./container";

export default function Features() {
  const features = [
    {
      icon: <FaShippingFast className="text-4xl text-green-600 mb-4" />,
      title: "Free Shipping",
      desc: "On all orders over ৳2000",
    },
    {
      icon: <FaHeadset className="text-4xl text-green-600 mb-4" />,
      title: "24/7 Support",
      desc: "Expert gardening advice",
    },
    {
      icon: <FaShieldAlt className="text-4xl text-green-600 mb-4" />,
      title: "Secure Payment",
      desc: "100% secure payment",
    },
    {
      icon: <FaUndo className="text-4xl text-green-600 mb-4" />,
      title: "Money Back",
      desc: "30 days guarantee",
    },
  ];

  return (
    <section className="bg-white py-12 border-b border-gray-100">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-gray-50 transition-colors duration-300 group"
            >
              <div className="transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className={`${inter.className} text-lg font-bold text-gray-900 mb-2`}>
                {feature.title}
              </h3>
              <p className={`${openSans.className} text-gray-500 text-sm`}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
