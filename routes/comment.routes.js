import express from "express";
import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  postComment,
  getComment,
  getComments,
  getMyComments,
  updateComment,
  deleteComent,
} from "../controllers/comments.controller.js";

const router = Router();
router.get("/my",authenticate, getMyComments)

router.post("/:blogId", authenticate, postComment);
router.get("/:id", getComment);
router.get("/", getComments);
router.patch("/:id",authenticate, updateComment);
router.delete("/:id",authenticate, deleteComent);

export default router;
