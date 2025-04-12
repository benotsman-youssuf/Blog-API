import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  tags: [String],

  author:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

// Create a text index on title, content, and category
blogSchema.index({ title: "text", content: "text", category: "text" });

const blogModel = mongoose.model("Blog", blogSchema);

export default blogModel;