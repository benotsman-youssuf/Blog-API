import express from "express";
import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import {
  validate,
  loginSchema,
  registerSchema,
} from "../middleware/validate.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error or user already exists
 */
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

export default router;
