"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const RestaurantHeader = () => {
  const [details, setDetails] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/restaurant");
  };

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (!data && pathname === "/restaurant/dashboard") {
      router.push("/restaurant");
    } else if (data && pathname === "/restaurant") {
      router.push("/restaurant/dashboard");
    } else if (data) {
      setDetails(JSON.parse(data));
    }
  }, [pathname, router]);

  return (
    <header className="sticky top-0 z-50 w-full bg-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-[80px] px-6">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <img
            className="w-[55px] h-[55px] object-contain transition-transform duration-300 hover:scale-110 drop-shadow-md"
            src="https://png.pngtree.com/png-clipart/20250106/original/pngtree-orange-delivery-man-on-motorcycle-png-image_20086589.png"
            alt="logo"
          />
          <h1 className="text-2xl font-extrabold text-white drop-shadow-sm">
            Master Restaurant
          </h1>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-4">
          <ul className="flex items-center gap-6">
            {details && details.name ? (
              <>
                <li>
                  <Link
                    href="/restaurant/profile"
                    className="px-4 py-2 bg-yellow-300 hover:bg-yellow-400 text-black font-semibold rounded-full shadow-md transition"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md transition"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/restaurant"
                    className="px-4 py-2 bg-white hover:bg-gray-100 text-blue-600 font-semibold rounded-full shadow-md transition"
                  >
                    Login / SignUp
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="px-4 py-2 bg-white hover:bg-gray-100 text-blue-600 font-semibold rounded-full shadow-md transition"
                  >
                    Back To Home
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 px-6 py-4 space-y-4">
          <Link
            href="/"
            className="block text-white hover:text-yellow-300 transition"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          {details && details.name ? (
            <>
              <Link
                href="/restaurant/profile"
                className="block px-4 py-2 bg-yellow-300 hover:bg-yellow-400 text-black font-semibold rounded-md"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/restaurant"
                className="block px-4 py-2 bg-white hover:bg-gray-100 text-blue-600 font-semibold rounded-md"
                onClick={() => setMenuOpen(false)}
              >
                Login / SignUp
              </Link>
              <Link
                href="/"
                className="block px-4 py-2 bg-white hover:bg-gray-100 text-blue-600 font-semibold rounded-md"
                onClick={() => setMenuOpen(false)}
              >
                Back To Home
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default RestaurantHeader;
