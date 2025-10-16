import mongoose from "mongoose";

const foodsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    img_URL: { type: String, required: true },
    description: { type: String, required: true },
    resto_id: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

const Foods = mongoose.models.Foods || mongoose.model("Foods", foodsSchema);

export default Foods || foodsSchema;
