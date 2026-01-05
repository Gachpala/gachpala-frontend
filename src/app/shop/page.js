"use client";
import React, { useState } from "react";
import Container from "@/components/container";
import Product from "@/components/product";
import { inter, openSans } from "@/lib/fonts";
import { BsFilter, BsGrid3X3Gap, BsListUl, BsSearch, BsChevronDown } from "react-icons/bs";

const products = [
  { id: 1, title: "Chinese Money Plant", price: "23.00", image: "/plant.png", rating: 4, category: "Indoor" },
  { id: 2, title: "Snake Plant", price: "15.00", image: "/indoor3.jpg", rating: 5, category: "Indoor", isHot: true },
  { id: 3, title: "Aloe Vera", price: "12.00", image: "/indoor5.jpg", rating: 4, category: "Succulents" },
  { id: 4, title: "Monstera Deliciosa", price: "45.00", image: "/indoor2.jpg", rating: 5, category: "Indoor" },
  { id: 5, title: "Fiddle Leaf Fig", price: "35.00", image: "/outdoor1.jpg", rating: 3, category: "Trees" },
  { id: 6, title: "Peace Lily", price: "18.00", image: "/outdoor2.jpg", rating: 4, category: "Indoor" },
  { id: 7, title: "Rubber Plant", price: "25.00", image: "/outdoor3.jpg", rating: 4, category: "Trees" },
  { id: 8, title: "Pothos", price: "10.00", image: "/tools1.jpg", rating: 5, category: "Indoor" },
  { id: 9, title: "ZZ Plant", price: "28.00", image: "/tools2.jpg", rating: 4, category: "Indoor", isHot: true },
  { id: 10, title: "Bird of Paradise", price: "55.00", image: "/tools3.jpg", rating: 5, category: "Trees" },
  { id: 11, title: "Spider Plant", price: "14.00", image: "/gift2.jpg", rating: 4, category: "Indoor" },
  { id: 12, title: "Boston Fern", price: "20.00", image: "/gift3.jpg", rating: 3, category: "Indoor" },
];

const FilterSection = ({ title, children, isOpen = true }) => {
    const [open, setOpen] = useState(isOpen);
    return (
        <div className="border-b border-gray-200 py-4 last:border-0">
             <div className="flex justify-between items-center cursor-pointer mb-2" onClick={() => setOpen(!open)}>
                 <h3 className={`${inter.className} font-medium text-lg text-gray-900`}>{title}</h3>
                 <BsChevronDown className={`transition-transform duration-300 ${open ? 'rotate-180' : ''} text-gray-500`} size={14} />
             </div>
             <div className={`transition-all duration-300 overflow-hidden ${open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                 {children}
             </div>
        </div>
    );
};

export default function Shop() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid | list

  return (
    <div className="bg-[#fcfdfa] min-h-screen pb-20">
      
      <Container className="pt-10">
        <div className="flex flex-col lg:flex-row gap-8 relative">
          
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-1/4 flex-shrink-0">
             <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="mb-6 relative">
                    <input 
                        type="text" 
                        placeholder="Search plants..." 
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all placeholder-gray-400 font-light"
                    />
                    <BsSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>

                <FilterSection title="Categories">
                    <ul className="space-y-2 mt-2">
                        {['All Plants', 'Indoor', 'Outdoor', 'Succulents', 'Trees', 'Garden Tools', 'Pots & Planters', 'Gifts'].map((cat, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <input type="checkbox" id={`cat-${i}`} className="rounded text-green-600 focus:ring-green-500 border-gray-300" />
                                <label htmlFor={`cat-${i}`} className={`${openSans.className} text-sm text-gray-600 hover:text-green-700 cursor-pointer`}>{cat}</label>
                            </li>
                        ))}
                    </ul>
                </FilterSection>

                <FilterSection title="Price Range">
                    <div className="mt-4 px-2">
                         <input type="range" min="0" max="100" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600" />
                         <div className="flex justify-between mt-2 text-sm text-gray-600 font-medium">
                             <span>$0</span>
                             <span>$100+</span>
                         </div>
                    </div>
                </FilterSection>

                <FilterSection title="Rating">
                     <div className="space-y-2 mt-2">
                         {[5, 4, 3, 2, 1].map((stars) => (
                             <div key={stars} className="flex items-center gap-2 cursor-pointer group">
                                 <input type="checkbox" className="rounded text-green-600 focus:ring-green-500 border-gray-300" />
                                 <div className="flex gap-0.5">
                                     {Array.from({length: 5}).map((_, i) => (
                                         <svg key={i} className={`w-4 h-4 ${i < stars ? 'text-yellow-400' : 'text-gray-200 group-hover:text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                                     ))}
                                 </div>
                             </div>
                         ))}
                     </div>
                </FilterSection>
             </div>
          </aside>

          {/* Main Content */}
          <main className="w-full lg:w-3/4">
             {/* Toolbar */}
             <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                 <button 
                    onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                    className="lg:hidden flex items-center gap-2 font-medium text-gray-700 hover:text-green-700 transition-colors"
                 >
                     <BsFilter size={20} /> Filters
                 </button>

                 <p className={`${openSans.className} text-gray-500 hidden sm:block`}>
                     Showing <span className="text-gray-900 font-bold">1-12</span> of <span className="text-gray-900 font-bold">45</span> results
                 </p>

                 <div className="flex items-center gap-4 ml-auto lg:ml-0">
                     <div className="flex items-center gap-2 border-r border-gray-200 pr-4">
                         <span className="text-sm text-gray-500 hidden sm:inline">Sort by:</span>
                         <select className="bg-transparent border-none text-sm font-medium text-gray-900 focus:ring-0 cursor-pointer">
                             <option>Newest Arrivals</option>
                             <option>Price: Low to High</option>
                             <option>Price: High to Low</option>
                             <option>Best Selling</option>
                         </select>
                     </div>
                     <div className="flex items-center gap-2 pl-2">
                         <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-green-50 text-green-700' : 'text-gray-400 hover:text-gray-600'}`}>
                             <BsGrid3X3Gap size={18} />
                         </button>
                         <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-green-50 text-green-700' : 'text-gray-400 hover:text-gray-600'}`}>
                             <BsListUl size={20} />
                         </button>
                     </div>
                 </div>
             </div>

             {/* Products Grid */}
             <div className={`grid gap-4 md:gap-6 ${viewMode === 'grid' ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                 {products.map((product) => (
                    viewMode === 'grid' ? (
                        <Product key={product.id} {...product} />
                    ) : (
                        // Horizontal List View for Products
                        <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 flex gap-6 items-center border border-gray-100">
                             <div className="w-32 h-32 flex-shrink-0 bg-[#EBEEE3] rounded-lg overflow-hidden p-2">
                                 <img src={product.image} alt={product.title} className="w-full h-full object-contain" />
                             </div>
                             <div className="flex-1">
                                 <h3 className={`${inter.className} text-xl font-medium text-gray-900`}>{product.title}</h3>
                                 <div className="flex items-center gap-1 my-2">
                                     {Array.from({length: 5}).map((_, i) => (
                                         <svg key={i} className={`w-4 h-4 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                                     ))}
                                     <span className="text-xs text-gray-400 ml-1">(24 reviews)</span>
                                 </div>
                                 <p className={`${openSans.className} text-green-700 font-bold text-lg`}>${product.price}</p>
                                 <p className="text-sm text-gray-500 mt-2 line-clamp-2">A beautiful addition to any indoor space, easy to care for and air purifying.</p>
                             </div>
                             <div className="flex-shrink-0">
                                 <button className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-green-700 transition-colors">
                                     Add to Cart
                                 </button>
                             </div>
                        </div>
                    )
                 ))}
             </div>
             
             {/* Load More */}
             <div className="mt-12 text-center">
                 <button className="px-8 py-3 bg-transparent border-2 border-green-700 text-green-700 rounded-lg font-medium hover:bg-green-700 hover:text-white transition-all duration-300">
                     Load More Products
                 </button>
             </div>
          </main>

        </div>
      </Container>

      {/* Mobile Filters Modal */}
      {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden px-4">
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
              <div className="absolute left-0 bottom-0 w-full h-[90vh] bg-white rounded-t-3xl p-6 flex flex-col shadow-2xl animate-slide-up">
                  <div className="flex justify-between items-center mb-6">
                      <h2 className={`${inter.className} text-2xl font-bold`}>Filters</h2>
                      <button onClick={() => setMobileFiltersOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                  </div>
                  
                  <div className="overflow-y-auto flex-1 pr-2">
                       {/* Duplicate Filter Content for Mobile */}
                       <FilterSection title="Categories">
                            <ul className="space-y-3 mt-2">
                                {['All Plants', 'Indoor', 'Outdoor', 'Succulents', 'Trees', 'Garden Tools', 'Pots & Planters', 'Gifts'].map((cat, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <input type="checkbox" id={`m-cat-${i}`} className="w-5 h-5 rounded text-green-600 focus:ring-green-500 border-gray-300" />
                                        <label htmlFor={`m-cat-${i}`} className="text-base text-gray-700">{cat}</label>
                                    </li>
                                ))}
                            </ul>
                       </FilterSection>

                       <FilterSection title="Price Range">
                           <div className="mt-4 px-2 pb-6">
                               <input type="range" className="w-full h-2 bg-gray-200 rounded-lg accent-green-600" />
                               <div className="flex justify-between mt-3 font-medium">
                                   <span>$0</span>
                                   <span>$100+</span>
                               </div>
                           </div>
                       </FilterSection>
                  </div>

                  <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => setMobileFiltersOpen(false)}
                        className="py-3 px-4 rounded-xl border border-gray-300 font-medium text-gray-700"
                      >
                          Clear All
                      </button>
                      <button 
                        onClick={() => setMobileFiltersOpen(false)}
                        className="py-3 px-4 rounded-xl bg-green-700 text-white font-medium shadow-lg shadow-green-700/30"
                      >
                          Apply Filters
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}
