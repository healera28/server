import { Op } from "sequelize"
import UserService from "../Services/UserService.js"
import models from "../models/models.js"

class UserController {  
    async deleteUser(req, res, next) {
        const {userId} = req.params

        try {
            const response = await models.User.destroy({where: {id: userId}})
            return res.json(response)
        }catch(e) {
            next(e)
        }
    }

    async getUsers(req, res, next) {
        const page = parseInt(req.query.page) || 1
        const limit = 3
        const search = req.query.search || '';
      
        const query = search ? { email: { [Op.iLike]: `%${search}%` } } : {}

        try {
            const usersCount = await models.User.count({ where: query })

            const users = await models.User.findAll({
                where: query,
                offset: (page - 1) * limit,
                limit: limit
            })

            return res.json({
                users,
                page,
                pages: Math.ceil(usersCount / limit),
                usersCount,
            })
        }catch(e) {
            next(e)
        }
    }

    async notifyPaymentStatus(req, res, next) {
        try {       
            if(req.body.payment_status === "success") {
                if(req.body.customer_email) {
                    const response = await UserService.signUp({email: req.body.customer_email})
                    if(response) {
                        console.log(`Пользователь ${req.body.customer_email} зарегестрирован`)
                    }
                }else {
                    console.error("Нету почты пользователя")
                }
            }   

           return res.json(200).status(200)
        }catch(e) { 
            next(e)
        }
    }

    async resetPassword(req, res, next) {
        try {
            const response = await UserService.resetPassword(req.body)

           response ? res.json(1) : res.json(0)
        }catch(e) {
            next(e)
        }
    }

    async signUp(req, res, next) {
        try {
            const newUser = await UserService.signUp(req.body)
            return res.json(newUser)
        }catch(e) {
            next(e)
        }
    }

    async signIn(req, res, next) {
        try {
            const user = await UserService.signIn(req.body)
            return res.json(user)
        }catch(e) {
            next(e)
        }
    }
}

export default new UserController()