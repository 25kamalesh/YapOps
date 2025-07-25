import ENV_VARS from "../config/env.js"
import jwt from 'jsonwebtoken'

const { JWT_EXPIRES_IN  , JWT_SECRET , NODE_ENV}  = ENV_VARS

const tokenGeneration = (userId , response) => {
    const token  = jwt.sign({userId} , JWT_SECRET , {expiresIn:JWT_EXPIRES_IN})
    response.cookie('jwt', token , {
        httpOnly: true,
        secure: false, // Set to false for HTTP Kubernetes deployment
        sameSite: 'lax', // Add sameSite for better compatibility
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
}

export default tokenGeneration