"use client";
import React, { useState } from "react";

const AddFoodItems = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Food Data:", { name, price, description, image }); 
    
    if (!name || !price || !description || !image) {
      setError(true);
      return;
    }
   
    let resto_id;
    const restaurantData = JSON.parse(localStorage.getItem("user"));
    if (restaurantData) {
      resto_id = restaurantData._id;
    }

    try {
      const response = await fetch("http://localhost:3000/api/restaurant/foods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price,
          description,
          img_URL: image,
          resto_id,
        }),
      });

      const data = await response.json();
      console.log("API Response:", data);// API response

      if (data.success) {
        alert("Food added successfully");
        setName("");
        setPrice("");
        setDescription("");
        setImage("");
      } else {
        alert("Error: " + data.error);
      }
      window.location.href = "/restaurant/dashboard"
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Add Food Item</h1>
      <form
        className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md w-[400px]"
        onSubmit={handleSubmit} 
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Food Name"
          className="p-2 border-2 border-gray-300 rounded-md w-full"
        />

        {error && !name && <p className="text-red-500 text-sm">Please enter food name</p>}

        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter Price"
          className="p-2 border-2 border-gray-300 rounded-md w-full"
        />
        {error && !name && <p className="text-red-500 text-sm">Please enter food price</p>}


        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Description"
          className="p-2 border-2 border-gray-300 rounded-md w-full"
        />
        {error && !name && <p className="text-red-500 text-sm">Please enter food description</p>}


        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Enter Image URL"
          className="p-2 border-2 border-gray-300 rounded-md w-full"
        />
        {error && !image && <p className="text-red-500 text-sm">Please enter food image</p>}


        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddFoodItems;
