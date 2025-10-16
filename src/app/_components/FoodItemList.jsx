import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const FoodItemList = () => {
  const [foodItems, setFoodItems] = useState([]);
  const router = useRouter();


  useEffect(() => {
    loadFoodItems();
  }, []);

  const loadFoodItems = async () => {
  const restaurantData = JSON.parse(localStorage.getItem("user"));
  const resto_id = restaurantData._id;
  try {
    const response = await fetch(
      "http://localhost:3000/api/restaurant/foods/" + resto_id
    );
    const data = await response.json();
    if (data.success) {
      setFoodItems(data.result);
    }

  } catch (error) {
    console.error("Error fetching food items:", error);
  }
};

const deleteFoodItem = async (id) => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/restaurant/foods/" + id,
      { method: "DELETE" }
    );
    const data = await response.json();
    if (data.success) {
      loadFoodItems();
    }
  } catch (error) {
    console.error("Error deleting food item:", error);
  }
};

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Food Items
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-md">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-6 text-left">No.</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            { foodItems && foodItems.map((items, key) => (
              <tr key={key} className="border-b hover:bg-gray-50 transition">
                <td className="py-3 px-6">{key+1}</td>
                <td className="py-3 px-6">{items.name}</td>
                <td className="py-3 px-6">{items.price}</td>
                <td className="py-3 px-6"> {items.description}</td>
                 <td className="py-3 px-6">
                  <img
                    src={items.img_URL}
                    
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
               
                <td className="py-3 px-6 text-center space-x-2">
                  <button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
                  
                  onClick={() => router.push(`/restaurant/dashboard/${items._id}`)}>
                    Edit
                  </button>
                  <button 
                  onClick={() => deleteFoodItem(items._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">
                  Delete
                  </button>
                </td>
              </tr>
            ))}

          
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FoodItemList;
