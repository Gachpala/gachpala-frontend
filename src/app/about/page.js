import Container from "@/components/container";
import Journey from "@/components/journey";
import { inter, openSans } from "@/lib/fonts";
import { FaLeaf, FaHandHoldingHeart, FaTruck, FaUsers } from "react-icons/fa";

export default function About() {
  return (
    <>
      <main className="bg-white">
        {/* Simple Hero Section */}
        <section className="bg-green-50 py-20 lg:py-28 relative overflow-hidden">
             {/* Decorative Background Elements */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-green-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
             <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-50 translate-y-1/3 -translate-x-1/3"></div>
             
             <Container className="relative z-10 text-center">
                <span className={`${openSans.className} text-green-600 font-semibold tracking-widest text-sm uppercase mb-4 block`}>About GachPala</span>
                <h1 className={`${inter.className} text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight`}>
                    Cultivating Nature <br className="hidden md:block" /> for Your Home
                </h1>
                <p className={`${openSans.className} text-gray-600 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed`}>
                    We are on a mission to make plant parenting easy, accessible, and delightful for everyone in Bangladesh.
                </p>
             </Container>
        </section>

        {/* Journey Section */}
        <Container>
           <Journey />
        </Container>

        {/* Values / Features Section */}
        <section className="bg-gray-50 py-20 lg:py-28">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className={`${inter.className} text-3xl md:text-4xl font-bold text-gray-900 mb-4`}>
                        Why We Are Different
                    </h2>
                    <p className={`${openSans.className} text-gray-600`}>
                        We don't just sell plants; we nurture relationships. Here is what makes GachPala the preferred choice for plant lovers.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                     {/* Feature 1 */}
                     <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                        <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-green-600 text-2xl mb-6">
                            <FaLeaf />
                        </div>
                        <h3 className={`${inter.className} text-xl font-bold text-gray-900 mb-3`}>Quality Guaranteed</h3>
                        <p className={`${openSans.className} text-gray-500 leading-relaxed`}>
                            Every plant is hand-picked from top nurseries. We ensure you receive healthy, vibrant plants ready to thrive.
                        </p>
                     </div>

                     {/* Feature 2 */}
                     <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                        <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-green-600 text-2xl mb-6">
                            <FaHandHoldingHeart />
                        </div>
                        <h3 className={`${inter.className} text-xl font-bold text-gray-900 mb-3`}>Expert Support</h3>
                        <p className={`${openSans.className} text-gray-500 leading-relaxed`}>
                            Not sure how to care for your new green friend? Our team of horticulturists is just a message away.
                        </p>
                     </div>

                     {/* Feature 3 */}
                     <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                        <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-green-600 text-2xl mb-6">
                            <FaTruck />
                        </div>
                        <h3 className={`${inter.className} text-xl font-bold text-gray-900 mb-3`}>Secure Delivery</h3>
                        <p className={`${openSans.className} text-gray-500 leading-relaxed`}>
                            Our specialized packaging ensures your plants arrive safely at your doorstep, no matter the distance.
                        </p>
                     </div>
                </div>
            </Container>
        </section>

        {/* CTA Section */}
        <section className="bg-green-600 py-20">
            <Container>
                <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="text-white max-w-2xl">
                        <h2 className={`${inter.className} text-3xl md:text-4xl font-bold mb-4`}>
                            Ready to transform your space?
                        </h2>
                        <p className={`${openSans.className} text-green-100 text-lg`}>
                            Explore our diverse collection of plants and accessories today.
                        </p>
                    </div>
                    <div>
                        <a href="/shop" className={`${inter.className} bg-white text-green-600 px-8 py-4 rounded-xl font-bold hover:bg-green-50 transition-colors shadow-lg inline-block`}>
                            Start Shopping
                        </a>
                    </div>
                </div>
            </Container>
        </section>

      </main>
    </>
  );
}
