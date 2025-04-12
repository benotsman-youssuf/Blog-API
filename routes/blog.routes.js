import express from "express";
import { Router } from "express";
import { authenticate, isAdmin } from "../middleware/auth.middleware.js";
import { validate, blogSchema } from "../middleware/vaidate.middleware.js";
import {
  getBlog,
  getBlogs,
  searchBlogs,
  postBlog,
  updateBlog,
  deleteBlog,
  getMyBlogs
} from "../controllers/blog.controller.js";

//Public
const router = Router();

router.get("/", getBlogs);
router.get("/search", searchBlogs);
router.get("/:id", getBlog);

//protected
router.get("/user/myblogs", authenticate, getMyBlogs); 
router.post("/", authenticate,validate(blogSchema), postBlog);
router.patch("/:id", authenticate, updateBlog);
router.delete("/:id", authenticate,isAdmin, deleteBlog);

export default router;
