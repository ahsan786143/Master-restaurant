import mongoose from "mongoose";

const ValueSchema = new mongoose.Schema({
  title: String,
  desc: String,
  icon: String, // e.g. "utensils", "heart", "sparkles"
});

const TeamMemberSchema = new mongoose.Schema({
  name: String,
  role: String,
  img: String,
});

const AboutPageSchema = new mongoose.Schema({
  journey: {
    title: String,
    description: String,
    image: String,
  },
  mission: String,
  vision: String,
  values: [ValueSchema],
  team: [TeamMemberSchema],
});

export default mongoose.models.AboutPage ||
  mongoose.model("AboutPage", AboutPageSchema);
