
class ApiError extends Error {
    constructor(status, message) {
        super()
        this.status = status
        this.message = message
    }

    static forbidden(message = "Отказано в доступе"){
        return new this(403, message)
    }

    static BadRequest(message) {
        return new this(400, message)
    }

    static UnAuthorized(message = "Не авторизован") {
        return new this(401, message)
    }
}

export default ApiError