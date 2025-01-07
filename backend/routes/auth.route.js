import express from "express"
import { login, logout, signup } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/auth/signup",signup)
router.post("/auth/login",login)
router.post("/auth/logout",logout)

export default router;
//export { router as authRoutes }