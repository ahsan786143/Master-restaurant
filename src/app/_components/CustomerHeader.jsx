"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, ShoppingCart } from "lucide-react";

const CustomerHeader = () => {
  const [details, setDetails] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/user_auth");
  };

  //  Listen for cart updates
  useEffect(() => {
    const updateCartCount = () => {
      const cartData = localStorage.getItem("cart");
      setCartCount(cartData ? JSON.parse(cartData).length : 0);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  //  Manage user session + redirects
  useEffect(() => {
    let data = localStorage.getItem("user");
    if (!data && pathname === "/restaurant/dashboard") {
      router.push("/restaurant");
    } else if (data && pathname === "/restaurant") {
      router.push("/restaurant/dashboard");
    } else {
      if (data) setDetails(JSON.parse(data));
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-sky-400 via-blue-500 to-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-[70px] px-4 sm:px-6">
        {/*  Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <img
            className="w-[45px] h-[45px] sm:w-[50px] sm:h-[50px] object-contain transition-transform duration-300 hover:scale-110 drop-shadow-md"
            src="https://png.pngtree.com/png-clipart/20250106/original/pngtree-orange-delivery-man-on-motorcycle-png-image_20086589.png"
            alt="logo"
          />
          <h1 className="text-xl sm:text-2xl font-extrabold text-white drop-shadow-sm">
            Master Restaurant
          </h1>
        </div>

        {/*  Desktop / Tablet Menu */}
        <nav className="hidden lg:flex">
          <ul className="flex items-center gap-6 xl:gap-8">
            <li>
              <Link
                href="/"
                className="relative text-white font-medium hover:text-yellow-300 transition duration-300 after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-yellow-300 after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="relative text-white font-medium hover:text-yellow-300 transition duration-300 after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-yellow-300 after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="relative text-white font-medium hover:text-yellow-300 transition duration-300 after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-yellow-300 after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300"
              >
                Contact
              </Link>
            </li>

            {/*  Cart + Logout only if logged in */}
            {details && details.name ? (
              <>
                <li>
                  <Link href="/cart" className="relative">
                    <ShoppingCart
                      size={26}
                      className="text-white hover:text-yellow-300 transition"
                    />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full px-1.5 py-0.5">
                        {cartCount}
                      </span>
                    )}
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
              <li>
                <Link
                  href="/user_auth"
                  className="px-4 py-2 bg-white hover:bg-gray-100 text-blue-600 font-semibold rounded-full shadow-md transition"
                >
                  Login / SignUp
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/*  Mobile / iPad Menu Toggle */}
        <button
          className="lg:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/*  Mobile / iPad Collapsible Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-blue-600 text-white py-5 px-6 flex flex-col gap-4 sm:gap-5 shadow-md transition-all">
          <Link
            href="/"
            className="hover:text-yellow-300 text-lg"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="hover:text-yellow-300 text-lg"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-yellow-300 text-lg"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>

          {details && details.name ? (
            <>
              <Link
                href="/cart"
                className="flex items-center justify-center gap-2 text-lg hover:text-yellow-300"
                onClick={() => setMenuOpen(false)}
              >
                <ShoppingCart size={22} /> Cart ({cartCount})
              </Link>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full text-white font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/user_auth"
              onClick={() => setMenuOpen(false)}
              className="bg-white hover:bg-gray-100 text-blue-600 font-semibold px-4 py-2 rounded-full text-center shadow-md"
            >
              Login / SignUp
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default CustomerHeader;
