import UserService from "../Services/UserService.js"

class UserController {  
    async notifyPaymentStatus(req, res, next) {
        console.log("PAYMENT STATUS: ", req.body.payment_status)
        console.log("body: ", req.body)
        
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