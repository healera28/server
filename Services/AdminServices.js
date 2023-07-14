import { nanoid } from "nanoid"
import ApiError from "../Exeptions/ApiError.js"
import models from "../models/models.js"
import bcrypt from 'bcrypt'
import MailService from "./MailService.js"
import getAuthMessage from "../utiles/authMessage.js"
import adminCodeMessage from "../utiles/adminCodeMessage.js"
import CodeService from "./CodeService.js"
import getAdminAuthMessage from "../utiles/getAdminAuthMessage.js"

class AdminServices {
    async resetPassword(body) {
        const {email} = body
        
        try {
            const admin = await models.Admin.findOne({where: {email}})

            if(!admin) {
                throw ApiError.BadRequest("Пользователель не найден")
            }
            
            const generatedPassword = nanoid(5).toUpperCase()
            const hash_password = await bcrypt.hash(generatedPassword, 3)
            await models.Admin.update({password: hash_password}, {where: {email}})

            await MailService.send({
                from: "admin@healera.ru",
                to: email,
                subject: "Новый пароль",
                html: getAdminAuthMessage({email, generatedPassword, type: "reset"})
            })
            
            return 1
        }catch(e) {
            throw e
        }
    }
    
    async signUp(body) {
        const {email} = body

        try {
            const candidate = await models.Admin.findOne({where: {email}})

            if(candidate) {
                throw ApiError.BadRequest("Уже авторизован")
            }

            const generatedPassword = nanoid(5).toUpperCase()
            const hash_password = await bcrypt.hash(generatedPassword, 3)
            const newUser = await models.Admin.create({id: nanoid(16), email, password: hash_password, role: "ADMIN"})
            delete newUser.dataValues.password

            await MailService.send({
                from: 'admin@healera.ru',
                to: email,
                subject: "Доступ к админ панели healera.ru",
                html: getAdminAuthMessage({email, generatedPassword, type: "admin"})
            })
            
            return "sent"
        } catch (e) {
            throw e
        }
    }
    
    async confirmCode(code) {
        try {
            const response = await CodeService.verify(code)
            return response
        }catch(e) {
            throw e
        }
    }

    async signIn(body) {
        const {email, password} = body

        try {
            const admin = await models.Admin.findOne({where: {email}})

            if(!admin) {
                throw ApiError.BadRequest("Неправильная почта или пароль")
            }

            const correctPassword = bcrypt.compareSync(password, admin.dataValues.password)

            if(!correctPassword) {
                throw ApiError.BadRequest("Неправильная почта или пароль")
            }

            const verificationCode = await CodeService.generateCode()

            await MailService.send({
                from: 'admin@healera.ru',
                to: email,
                subject: "Код доступа для авторизации в healera.ru",
                html: adminCodeMessage(verificationCode)
            })

            return "sent"
        }catch(e) {
            throw e
        }
    }
}   

export default new AdminServices()