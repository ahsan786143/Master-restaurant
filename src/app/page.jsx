"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin } from "lucide-react";
import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";
import BannerPage from "./_components/Banner";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showBanner, setShowBanner] = useState(true);
  const [locations, setLocations] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const router = useRouter();

  //  Watch for login/logout changes dynamically
  useEffect(() => {
    const checkLoginStatus = () => {
      const user = localStorage.getItem("user");
      const restaurantUser = localStorage.getItem("restaurantUser");
      setShowBanner(!(user || restaurantUser));
    };

    checkLoginStatus(); // initial check
    window.addEventListener("storage", checkLoginStatus); // react to login/logout in other tabs

    // Custom event for logout or login within same tab
    window.addEventListener("authChange", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
      window.removeEventListener("authChange", checkLoginStatus);
    };
  }, []);

  //  Fetch locations & restaurants when banner hides
  useEffect(() => {
    if (!showBanner) {
      const fetchLocations = async () => {
        try {
          const res = await fetch("/api/customer/locations");
          const data = await res.json();
          if (data.success) setLocations(data.result);
        } catch (error) {
          console.error("Error fetching locations:", error);
        }
      };
      fetchLocations();
      handleSearch();
    }
  }, [showBanner]);

  //  Search handler
  const handleSearch = async () => {
    try {
      const query = new URLSearchParams({
        location: selectedPlace,
        restaurant: searchTerm,
      }).toString();

      const res = await fetch(`/api/customer/search?${query}`);
      const data = await res.json();

      if (data && Array.isArray(data.restaurants)) {
        setRestaurants(data.restaurants);
      } else {
        setRestaurants([]);
      }
    } catch (err) {
      console.error("Error fetching restaurants:", err);
      setRestaurants([]);
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col bg-gray-50 overflow-hidden">
      <CustomerHeader />

      {/* Hero Section */}
      <section className="relative w-full h-[550px] overflow-hidden">
        <Image
          src="/banner.jpg"
          alt="Restaurant background"
          fill
          className="object-cover brightness-70"
          priority
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        {/* Main Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Find the Best Food Around You
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-2xl mb-8 max-w-2xl text-gray-200"
          >
            Explore top-rated restaurants and mouthwatering dishes near your
            location.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-center gap-3 bg-white p-4 rounded-2xl shadow-2xl w-full max-w-3xl"
          >
            <div className="relative w-full md:w-1/3">
              <MapPin className="absolute left-3 top-3 text-gray-400" />
              <select
                className="w-full pl-10 p-3 rounded-xl border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={selectedPlace}
                onChange={(e) => setSelectedPlace(e.target.value)}
              >
                <option value="">Select Location</option>
                {locations.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative w-full md:w-2/3">
              <Search className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search food or restaurant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
                className="w-full pl-10 p-3 rounded-xl border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results */}
      {restaurants.length > 0 && (
        <section className="py-16 px-6 md:px-12 bg-gray-50 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-10 text-gray-800"
          >
            Search Results
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
            {restaurants.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-white shadow-lg rounded-2xl overflow-hidden w-full max-w-sm cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={() =>
                  router.push(`/explore/${item.name}?id=${item._id}`)
                }
              >
                <div className="relative h-60 w-full">
                  <img
                    src={item.img_URL}
                    alt={item.name}
                    className="object-cover rounded-xl mx-auto mb-3 mt-2 h-60"
                  />
                </div>
                <div className="p-4 text-left">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm text-gray-400">{item.city}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      <Footer />

      {/*  Show Banner when logged out */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-center"
          >
            <BannerPage />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
