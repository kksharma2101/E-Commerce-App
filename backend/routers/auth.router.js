import express from "express";
import {
  login,
  register,
  test,
  forgotPasswordController,
  userProfileUpdate,
} from "../controllers/auth.controller.js";
import { isAdmin, userVerify } from "../middleware/auth.middleware.js";

const router = express.Router();

// register router
router.post("/register", register);
// login router
router.post("/login", login);
// Forgot password || post
router.post("/forgot-password", forgotPasswordController);

router.get("/test", userVerify, isAdmin, test);

// protected user route auth
router.get("/user-auth", userVerify, (req, res) => {
  res.status(200).send({ ok: true });
});
// protected admin route auth
router.get("/admin-auth", userVerify, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// user profile updated
router.put("/profile", userVerify, userProfileUpdate);

export default router;
