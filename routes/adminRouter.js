import { Router } from "express";
import AdminController from "../Controllers/AdminController.js";


const adminRouter = new Router()

adminRouter.post("/signin", AdminController.signIn)
adminRouter.post("/signUp", AdminController.signUp)
adminRouter.post("/confirmCode", AdminController.confirmCode)
adminRouter.post("/reset-password", AdminController.resetPassword)

export default adminRouter