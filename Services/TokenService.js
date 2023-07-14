import jwt from 'jsonwebtoken'

class TokenService {
    generateToken() {
        const accessToken = jwt.sign(body, process.env.ADMIN_SECRET_KEY)
        return accessToken
    }

    verify(token) {
        const response = jwt.verify(token, process.env.ADMIN_SECRET_KEY)
        return response.payload
    }
}

export default new TokenService()