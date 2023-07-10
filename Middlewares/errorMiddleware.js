import ApiError from "../Exeptions/ApiError.js"

const errorMiddleware = (error, req, res, next) => {
    if(error instanceof ApiError) {
        if(error.status === 401) {
            res.cookie('refreshToken', '', { expires: new Date(0) })
        }

        return res.status(error.status).json({status: error.status, message: error.message})
    }

    console.log(error)
    console.log("ERROR MESSAGE: ", error.message)
    return res.status(500).json({status: error.status, message: "Unexpected server error"})
}

export default errorMiddleware