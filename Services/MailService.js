import mailer from 'nodemailer'

class MailService {
    async send({
        from, 
        to, 
        subject,
        html
    }) {
        
        try {
            const transporter = mailer.createTransport({
                host: "smtp.beget.com",
                port: 2525,
                sender: "admin@healera.ru",
                secure: false,
                auth: {
                    user: 'admin@healera.ru',
                    pass: process.env.EMAIL_PASSWORD
                }
            })
    
            const request = await transporter.sendMail({
                from,
                to,
                subject,
                html
            })

            if (request.messageId) {
                console.log('Логин и пароль отправлены на: ', to) 
              } else {
                console.log('Ошибка при отправке сообщение на почту: ', to)
              }

            return request.response
        }catch(e) {
            throw e
        }
    }
}

export default new MailService()