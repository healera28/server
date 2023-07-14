import AdminServices from "../Services/AdminServices.js"
import models from "../models/models.js"

class AdminController {
    async signIn(req, res, next) {
        try {
            const response = await AdminServices.signIn(req.body)
            return res.json(response)
        }catch(e) {
            next(e)
        }
    }

    async confirmCode(req, res, next) {
        const {code} = req.body

        try {
            const response = await AdminServices.confirmCode(code)
            return res.json(response)
        }catch(e) {
            next(e)
        }
    }

    async resetPassword(req, res, next) {
        try {
            const response = await AdminServices.resetPassword(req.body)
            return res.json(response)
        }catch(e) {
            next(e)
        }
    }

    async signUp(req, res, next) {
        try {
            const newUser = await AdminServices.signUp(req.body)
            return res.json(newUser)
        }catch(e) {
            next(e)
        }
    }

}

export default new AdminController()