import { Router } from "express";
import UserController from "../Controllers/UserController.js";
import adminRouter from "./adminRouter.js";

const router = new Router()

router.get("/", (req, res) => res.json(200))
router.get("/users",  UserController.getUsers)
router.delete("/delete/:userId", UserController.deleteUser)
router.post("/signin", UserController.signIn)
router.post("/signup", UserController.signUp)
router.post("/reset-password", UserController.resetPassword)
router.post("/notify-payment-status", UserController.notifyPaymentStatus)
router.use("/admin", adminRouter)

export default router 