import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 500,
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog", 
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const commentModel = mongoose.model("Comment", commentSchema);
export default commentModel;
