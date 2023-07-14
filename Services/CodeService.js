import moment from "moment"
import { nanoid } from "nanoid"
import models from "../models/models.js"
import ApiError from "../Exeptions/ApiError.js"

class CodeService {
    async generateCode(){
        try {
            const code = nanoid(5).toUpperCase()
            const expiresIn = moment().add("5", "minutes")
            await models.Code.create({code, expiresIn})
            return code
        }catch(e) {
            throw e
        }
    }

    async verify(code) {
        try {
            const candidate = await models.Code.findOne({where: {code}})

            if(!candidate) {
                throw ApiError.BadRequest("Код недействителен")
            }

            if(moment().isAfter(candidate.dataValues.expiresIn)) {
                throw ApiError.BadRequest("Код недействителен")
            }

            return 1
        }catch(e) {
            throw e
        }
    }
}   

export default new CodeService()