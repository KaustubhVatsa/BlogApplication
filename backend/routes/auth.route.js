import express from "express"
import { checkAuth, login, logout, signup } from "../controller/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/auth/signup",signup)
router.post("/auth/login",login)
router.post("/auth/logout",logout)
router.get("/auth/checkAuth", protectedRoute, checkAuth);
export default router;
//export { router as authRoutes }