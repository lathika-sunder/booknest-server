const jwt = require('jsonwebtoken')
const BlackList = require('../models/blackListModel')
const User = require('../models/userModel')
const SECRET_KEY=process.env.SECRET_KEY

const verifyToken = async (request, response, next) => {
    try {
        const authHeader = request.headers['cookie']
        if (!authHeader) {
            return response.status(204).json({ message: "AuthHeader not available" })
        }
        const cookie = authHeader.split('=')[1]
        const token = cookie.split(';')[0]

        const isBlackListed = await BlackList.findOne({ token: token })

        if (isBlackListed) {
            return response.status(401).json({message:"Sesson Expired"})
        }

        jwt.verify(cookie,SECRET_KEY,async(error,decoded)=>{
            if(error)
                {
                    return response.status(204).json({message:"Session Expired"})
                }
                const {id}=decoded
                const user=await User.findById(id)
                request.user=user
                next()
        })
        
    } catch (error) {
        response.status(500).json({message:"Internal server error",error})
    }
}
module.exports = verifyToken