import blogModel from "../models/blog.model.js";

export const getBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({
      message: "Blog found",
      blog,
    });
  } catch (error) {
    console.error(`Error in getBlog: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);

    const skip = (pageNumber - 1) * pageSize;

    const blogs = await blogModel.find().skip(skip).limit(pageSize);
    const totalBlogs = await blogModel.countDocuments();
    res.status(200).json({
      message: "Blogs found",
      blogs,
      pagination: {
        totalBlogs,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalBlogs / pageSize),
        pageSize,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error getBlogs" });
  }
};

export const searchBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, term } = req.query;

    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);

    const skip = (pageNumber - 1) * pageSize;
    const blogs = await blogModel
      .find({ $text: { $search: term } })
      .skip(skip)
      .limit(pageSize);

    const totalBlogsInSearch = await blogModel.countDocuments({
      $text: { $search: term },
    });

    res.status(200).json({
      message: "Search results",
      blogs,
      pagination: {
        totalBlogsInSearch,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalBlogsInSearch / pageSize),
        pageSize,
      },
    });
  } catch (error) {
    console.error(`Error in searchBlogs: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const postBlog = (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    const author = req.user.id;
    const newBlog = new blogModel({
      title,
      content,
      category,
      tags,
      author,
    });
    if (!newBlog) {
      return res.status(400).json({ message: "Blog not created" });
    }
    newBlog.save();
    res.status(201).json({
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    console.error(`Error in postBlog: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const updateData = req.body;
    const options = { new: true };
    const updatedBlog = await blogModel.findOneAndUpdate(
      { _id: id, author: userId }, // Match both blog ID and author
      updateData,
      options
    );
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error(`Error in updateBlog: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const deletedBlog = await blogModel.findOneAndDelete({
      _id: id,
      author: userId,
    });
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({
      message: "Blog deleted successfully",
      blog: deletedBlog,
    });
  } catch (error) {
    console.error(`Error in deleteBlog: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMyBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);

    const skip = (pageNumber - 1) * pageSize;

    const userId = req.user.id;
    const blogs = await blogModel
      .find({ author: userId })
      .populate("author", "username email")
      .skip(skip)
      .limit(pageSize);

    const totalBlogs = await blogModel.countDocuments({ author: userId });

    res.status(200).json({
      message: "Your blogs found",
      blogs,
      pagination: {
        totalBlogs,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalBlogs / pageSize),
        pageSize,
      },
    });
  } catch (error) {
    console.error(`Error in getMyBlogs: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
