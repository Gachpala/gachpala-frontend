"use client";
import Container from "@/components/container";
import { inter, openSans } from "@/lib/fonts";
import Link from "next/link";
import React, { useState } from "react";
import { 
  FiUser, 
  FiPackage, 
  FiMapPin, 
  FiHeart, 
  FiLogOut, 
  FiSettings,
  FiCamera,
  FiBox
} from "react-icons/fi";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock User Data
  const user = {
    name: "Sakib Al Hasan",
    email: "sakib@example.com",
    phone: "+880 1712 345678",
    avatar: "/boy.jpg", // Using existing asset if available or placeholder
    joinDate: "January 2024"
  };

  // Mock Orders
  const orders = [
    { id: "#ORD-7829", date: "Jan 06, 2024", total: "1,250", status: "Processing", items: 3 },
    { id: "#ORD-7828", date: "Dec 28, 2023", total: "4,500", status: "Delivered", items: 5 },
    { id: "#ORD-7827", date: "Dec 15, 2023", total: "850", status: "Cancelled", items: 1 },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case "dashboard":
        return (
            <div className="space-y-6">
                 {/* Stats Grid */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div className="bg-green-50 p-6 rounded-xl border border-green-100 flex items-center gap-4">
                         <div className="bg-green-100 p-3 rounded-full text-green-600"> <FiBox size={24}/> </div>
                         <div>
                             <h3 className={`${inter.className} text-2xl font-bold text-gray-900`}>12</h3>
                             <p className="text-sm text-gray-500">Total Orders</p>
                         </div>
                     </div>
                     <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 flex items-center gap-4">
                         <div className="bg-orange-100 p-3 rounded-full text-orange-600"> <FiPackage size={24}/> </div>
                         <div>
                             <h3 className={`${inter.className} text-2xl font-bold text-gray-900`}>2</h3>
                             <p className="text-sm text-gray-500">Pending</p>
                         </div>
                     </div>
                     <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 flex items-center gap-4">
                         <div className="bg-purple-100 p-3 rounded-full text-purple-600"> <FiHeart size={24}/> </div>
                         <div>
                             <h3 className={`${inter.className} text-2xl font-bold text-gray-900`}>5</h3>
                             <p className="text-sm text-gray-500">Wishlist</p>
                         </div>
                     </div>
                 </div>

                 {/* Recent Order Preview */}
                 <div className="bg-white border border-gray-100 rounded-xl p-6">
                     <h3 className={`${inter.className} text-lg font-bold text-gray-900 mb-4`}>Recent Orders</h3>
                     <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
                                <tr>
                                    <th className="px-4 py-3 rounded-l-lg">Order ID</th>
                                    <th className="px-4 py-3">Date</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3 rounded-r-lg">Total</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm">
                                {orders.map((order, i) => (
                                    <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 font-medium text-green-600">{order.id}</td>
                                        <td className="px-4 py-3">{order.date}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded text-xs font-semibold
                                                ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                                                  order.status === 'Processing' ? 'bg-orange-100 text-orange-700' : 
                                                  'bg-red-100 text-red-700'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">৳{order.total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                     </div>
                 </div>
            </div>
        );
      case "orders":
        return (
            <div className="bg-white border border-gray-100 rounded-xl p-6">
                <h3 className={`${inter.className} text-lg font-bold text-gray-900 mb-6`}>My Orders</h3>
                <div className="space-y-4">
                    {orders.map((order, i) => (
                         <div key={i} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow">
                             <div className="mb-4 md:mb-0">
                                 <div className="flex items-center gap-3 mb-1">
                                     <span className="font-bold text-gray-900">{order.id}</span>
                                     <span className="text-gray-400 text-sm">• {order.date}</span>
                                 </div>
                                 <p className="text-sm text-gray-500">{order.items} items for <span className="text-gray-900 font-medium">৳{order.total}</span></p>
                             </div>
                             <div className="flex items-center gap-4 w-full md:w-auto">
                                 <span className={`px-3 py-1 rounded-full text-xs font-semibold flex-1 md:flex-none text-center
                                     ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                                       order.status === 'Processing' ? 'bg-orange-100 text-orange-700' : 
                                       'bg-red-100 text-red-700'}`}>
                                     {order.status}
                                 </span>
                                 <button className="px-4 py-2 border border-green-600 text-green-600 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors">
                                     View Details
                                 </button>
                             </div>
                         </div>
                    ))}
                </div>
            </div>
        );
      case "address":
        return (
            <div className="bg-white border border-gray-100 rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                     <h3 className={`${inter.className} text-lg font-bold text-gray-900`}>My Addresses</h3>
                     <button className="text-sm bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700">Add New</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-green-200 bg-green-50/50 p-6 rounded-xl relative">
                        <span className="absolute top-4 right-4 bg-green-600 text-white text-xs px-2 py-1 rounded">Default</span>
                        <h4 className="font-bold text-gray-900 mb-2">Home</h4>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            House 12, Road 5, Block B <br/>
                            Mirpur 12, Dhaka 1216 <br/>
                            Bangladesh
                        </p>
                        <div className="flex gap-3 text-sm font-medium">
                            <button className="text-green-600 hover:underline">Edit</button>
                            <button className="text-red-500 hover:underline">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        );
      case "account":
        return (
            <div className="bg-white border border-gray-100 rounded-xl p-6">
                <h3 className={`${inter.className} text-lg font-bold text-gray-900 mb-6`}>Account Settings</h3>
                <form className="space-y-6 max-w-lg">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                            <input type="text" defaultValue="Sakib" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                            <input type="text" defaultValue="Hasan" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input type="email" defaultValue={user.email} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input type="tel" defaultValue={user.phone} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none" />
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100">
                        <h4 className="font-bold text-gray-900 mb-4">Password Change</h4>
                        <div className="space-y-4">
                            <input type="password" placeholder="Current Password" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none" />
                            <input type="password" placeholder="New Password" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none" />
                            <input type="password" placeholder="Confirm Password" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none" />
                        </div>
                    </div>

                    <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-black transition-colors">
                        Save Changes
                    </button>
                </form>
            </div>
        );
      default: return null;
    }
  }

  return (
    <div className="bg-[#f5f5f5] min-h-screen py-10">
      <Container>
         {/* Profile Header */}
         <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-[#000000] to-[#ebeee3] opacity-10"></div>
             
             <div className="relative group">
                 <div className="w-28 h-28 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-200">
                     <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                 </div>
                 <button className="absolute bottom-0 right-0 bg-gray-900 text-white p-2 rounded-full shadow-lg hover:bg-green-600 transition-colors">
                     <FiCamera size={14} />
                 </button>
             </div>
             
             <div className="text-center md:text-left z-10 flex-grow">
                 <h1 className={`${inter.className} text-3xl font-bold text-gray-900`}>{user.name}</h1>
                 <p className={`${openSans.className} text-gray-500 mt-1`}>{user.email}</p>
             </div>

             <div className="flex gap-4 z-10">
                 <div className="text-center px-4 md:border-r border-gray-200">
                     <div className="text-2xl font-bold text-gray-900">12</div>
                     <div className="text-xs text-gray-500 uppercase">Orders</div>
                 </div>
             </div>
         </div>

         <div className="flex flex-col lg:flex-row gap-8">
             {/* Sidebar Navigation */}
             <div className="w-full lg:w-1/4">
                 <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-24">
                     <div className="p-4 border-b border-gray-50">
                         <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Menu</span>
                     </div>
                     <nav className="flex flex-col p-2">
                         <button 
                            onClick={() => setActiveTab("dashboard")}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'}`}
                         >
                             <FiUser size={18} /> Dashboard
                         </button>
                         <button 
                            onClick={() => setActiveTab("orders")}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'orders' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'}`}
                         >
                             <FiPackage size={18} /> Orders
                         </button>
                         <button 
                            onClick={() => setActiveTab("address")}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'address' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'}`}
                         >
                             <FiMapPin size={18} /> Addresses
                         </button>
                         <button 
                            onClick={() => setActiveTab("account")}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'account' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'}`}
                         >
                             <FiSettings size={18} /> Account Details
                         </button>
                         <button 
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors mt-2"
                         >
                             <FiLogOut size={18} /> Logout
                         </button>
                     </nav>
                 </div>
             </div>

             {/* Main Content Area */}
             <div className="w-full lg:w-3/4">
                 {renderContent()}
             </div>
         </div>
      </Container>
    </div>
  );
}
