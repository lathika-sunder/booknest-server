const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY


const generateToken = (id, email,role) => {

    try {
        const token = jwt.sign(
            {
                id: id,
                email: email,
                role: role,
            },
            SECRET_KEY,
            { expiresIn: '30m' }
        );
        return token;
    } catch (error) {
        console.log("Error generating access token", error)
    }


};

module.exports = generateToken;
