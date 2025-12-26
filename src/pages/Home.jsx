import {useEffect, useState } from 'react';
import Navbar from '@/components/public/Navbar';
import ProductCard from '@/components/public/ProductCard';
import Footer from '@/components/public/Footer';
// import { kostData } from "@/data/kostData";

const Home = () => {
  const [kostData] = useState([
    {
      id: 1,
      name: "Kost Putri Melati Indah",
      price: 1500000,
      facilities: ["WiFi", "AC", "Private Bathroom", "Kitchen", "Laundry", "Parking"],
      image: null
    },
    {
      id: 2,
      name: "Kost Putra Mawar Residence",
      price: 1200000,
      facilities: ["WiFi", "Fan", "Shared Bathroom", "Kitchen", "Security"],
      image: null
    },
    {
      id: 3,
      name: "Kost Campur Anggrek Plaza",
      price: 1800000,
      facilities: ["WiFi", "AC", "Private Bathroom", "Kitchen", "Gym", "Swimming Pool", "24h Security"],
      image: null
    },
    {
      id: 4,
      name: "Kost Putri Dahlia Cozy",
      price: 1000000,
      facilities: ["WiFi", "Fan", "Shared Bathroom", "Kitchen"],
      image: null
    },
    {
      id: 5,
      name: "Kost Putra Sakura Modern",
      price: 2000000,
      facilities: ["WiFi", "AC", "Private Bathroom", "Kitchen", "Laundry", "Parking", "Rooftop"],
      image: null
    },
    {
      id: 6,
      name: "Kost Putri Tulip Garden",
      price: 1300000,
      facilities: ["WiFi", "AC", "Private Bathroom", "Kitchen", "Garden"],
      image: null
    }
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Find Your Perfect
              <span className="block text-accent">Kost</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-3xl mx-auto leading-tight">
              Discover comfortable and affordable living spaces with modern facilities and strategic locations
            </p>
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20">
              <div className="bg-accent w-3 h-3 rounded-full mr-3 animate-pulse"></div>
              {kostData.length} Available Kost
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl"></div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">100+</div>
                <div className="text-gray-600">Verified Kost</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-gray-600">Locations</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                <div className="text-gray-600">Happy Tenants</div>
              </div>
            </div>
          </div>
        </section>

        {/* Kost Catalog */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Available Kost Rooms
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Browse through our carefully selected kost accommodations with various facilities and price ranges
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {kostData.map((kost) => (
                <ProductCard key={kost.id} kost={kost} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Find Your Dream Kost?</h2>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of satisfied tenants who found their perfect home with us
            </p>
            <button className="bg-accent hover:bg-accent/90 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-200 shadow-lg hover:shadow-xl">
              Get Started Today
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;