import { Router } from "express";
import {
  logout,
  profile,
  login,
  verifyToken,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/vaidateToken.js";
import { loginSchema } from "../schemas/auth.schema.js";

const router = Router();
router.post("/login", login);

router.post("/logout", logout);

router.get("/profile", authRequired, profile);

router.get("/verify", verifyToken);
export default router;
