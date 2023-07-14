import { nanoid } from "nanoid"
import ApiError from "../Exeptions/ApiError.js"
import models from "../models/models.js"
import bcrypt from 'bcrypt'
import MailService from "./MailService.js"
import getAuthMessage from "../utiles/authMessage.js"

class UserService {
    async resetPassword(body) {
        const {email} = body
        
        try {
            const user = await models.User.findOne({where: {email}})

            if(!user) {
                throw ApiError.BadRequest("Пользователель не найден")
            }
            
            const generatedPassword = nanoid(5).toUpperCase()
            const hash_password = await bcrypt.hash(generatedPassword, 3)
            await models.User.update({password: hash_password}, {where: {email}})

            const response = await MailService.send({
                from: "Нутрициолог Валерия Кононова <admin@healera.ru>",
                to: email,
                subject: "Новый пароль",
                html: getAuthMessage({email, generatedPassword, type: "reset"})
            })
            
            return response
        } catch (e) {
            throw e
        }
    }

    async signUp(body) {
        const {email, customer_phone, order_id,} = body

        try {
            const candidate = await models.User.findOne({where: {email}})

            if(candidate) {
                throw ApiError.BadRequest("Уже авторизован")
            }

            const generatedPassword = nanoid(5).toUpperCase()
            const hash_password = await bcrypt.hash(generatedPassword, 3)
            const newUser = await models.User.create({id: nanoid(16),  phone: customer_phone, order_id, email, password: hash_password})
            delete newUser.dataValues.password

            await MailService.send({
                from: 'Нутрициолог Валерия Кононова <admin@healera.ru>',
                to: email,
                subject: "Доступ к книге рецептов",
                html: getAuthMessage({email, generatedPassword})
            })
            
            return newUser.dataValues
        } catch (e) {
            throw e
        }
    }

    async signIn(body) {
        const {email, password} = body

        try {
            const user = await models.User.findOne({where: {email}})

            if(!user) {
                throw ApiError.BadRequest("Неправильная почта или пароль")
            }

            const correctPassword = bcrypt.compareSync(password, user.dataValues.password)

            if(!correctPassword) {
                throw ApiError.BadRequest("Неправильная почта или пароль")
            }

            delete user.dataValues.password

            return user.dataValues
        } catch (e) {
            throw e
        }
    }
}

export default new UserService()