"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

const EditFoodItems = () => {
  const router = useRouter();
  const { id } = useParams(); 
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (id) {
      handleLoadFoodItems();
    }
  }, [id]);

  const handleLoadFoodItems = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/restaurant/foods/edit/${id}`);
      const data = await res.json();

      if (data.success) {
        const food = data.data;
        setName(food.name);
        setPrice(food.price);
        setDescription(food.description);
        setImage(food.img_URL);
      } else {
        console.error("Failed to load food item:", data.message);
      }
    } catch (err) {
      console.error("Error fetching food:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !description || !image) {
      setError(true);
      return;
    }

    
    const res = await fetch(`http://localhost:3000/api/restaurant/foods/edit/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, description, img_URL: image }),
    });

    const data = await res.json();
    if (data.success) {
      alert("Food updated successfully!");
      router.push("/restaurant/dashboard");
    } else {
      alert("Failed to update food");
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Update Food Item</h1>
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
        {error && !price && <p className="text-red-500 text-sm">Please enter food price</p>}

        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Description"
          className="p-2 border-2 border-gray-300 rounded-md w-full"
        />
        {error && !description && <p className="text-red-500 text-sm">Please enter food description</p>}

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
          Update Food Item
        </button>

        <div className="flex justify-center mt-4">
          <button
            type="button"
            onClick={() => router.push(`/restaurant/dashboard`)}
            className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFoodItems;
