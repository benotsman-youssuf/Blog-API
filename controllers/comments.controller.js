import commentModel from "../models/comment.model.js";

export const postComment = async (req, res) => {
  try {
    const { content } = req.body;
    const author = req.user.id;
    const { blogId } = req.params;

    console.log(author);
    const newComment = new commentModel({
      content,
      author,
      blogId,
    });
    await newComment.save();
    res.status(201).json({
      message: "comment created",
      newComment,
    });
  } catch (error) {
    console.error(`error in postComment controller: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await commentModel.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "comment not found" });
    }
    res.status(200).json({
      message: "comment found",
      comment,
    });
  } catch (error) {
    console.error(`error in getComment controller: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await commentModel.find().populate("author", "username email");
    if (comments.length === 0) {
      return res.status(404).json({ message: "nor comments found" });
    }
    res.status(200).json({
      message: "comments found",
      comments,
    });
  } catch (error) {
    console.error(`error in getComments controller: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getMyComments = async (req, res) => {
  try {
    const userId = req.user.id;
    const comments = await commentModel.find({ author: userId });
    // .populate("author", "username email");

    res.status(200).json({
      message: "your comments found",
      comments,
    });
  } catch (error) {
    console.error(`Error in getMyComments: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { content } = req.body;
    const options = { new: true };
    console.log(id);
    const updateComment = await commentModel.findOneAndUpdate(
      { _id: id, author: userId },
      { content },
      options
    );
    if (!updateComment) {
      return res.status(404).json({ message: "comment not found" });
    }
    res.status(200).json({
      message: "comment updated",
      updateComment,
    });
  } catch (error) {
    console.error("error in updateComment ", error);
    res.status(500).json({ message: "internal server error" });
  }
};
export const deleteComent = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const deletedComment = await commentModel
    .findOneAndDelete({
      _id: id,
      author: userId,
    })
    .populate("author", "username email");
  if (!deletedComment) {
    return res.status(404).json({ message: "comment not found" });
  }

  res.status(200).json({
    message: "coment deleted successfully",
    deletedComment,
  });
};
