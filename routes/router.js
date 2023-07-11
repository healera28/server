import { Router } from "express";
import UserController from "../Controllers/UserController.js";

const router = new Router()

router.get("/", (req, res) => res.json(200))
router.post("/signin", UserController.signIn)
router.post("/signup", UserController.signUp)
router.post("/reset-password", UserController.resetPassword)
router.post("/notify-payment-status", UserController.notifyPaymentStatus)

export default router 