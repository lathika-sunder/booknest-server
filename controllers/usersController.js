

const User = require('../models/userModel')
const validatePassword = require('../utils/validatePassword')
const generateToken=require('../utils/generateToken')
const BlackList = require('../models/blackListModel')

const loginUser = async (request, response) => {
    const { email, password } = request.body

    try {
        const userToBeLogged = await User.findOne({ email })

        if (!userToBeLogged) {
            return response.status(401).json({ message: "User not found" })
        }
        

        if (userToBeLogged.password!=password) {
            return response.status(404).json({ message: "Login Failed, Invalid Password" })
        }


        //cookie generation
        const token = generateToken(userToBeLogged._id, userToBeLogged.email, userToBeLogged.role)

        const options = {
            maxAge: 20 * 60 * 1000,
            httpOnly: true,
            sameSite: 'None'
        }
        response.cookie('SessionID', token, options)
        response.status(201).json({ message: "Login Successful", token: token,role:userToBeLogged.role })

    } catch (error) {
        response.status(500).json({ message: "Internal Server Error", error: error.message })
    }

}

const logoutUser = async (request, response) => {
    try {
        const authHeader = request.headers['cookie']
        if (!authHeader) {
            //No cookie provided
            return response.status(204).json({ message: "No Cookie Provided" })

        }

        const cookie = authHeader.split('=')[1]//extract cookie value
        const token = cookie.split(';')[0]//token is the first value in a cookie

        const isBlackListed = await BlackList.findOne({ token: token })

        if (isBlackListed) {
            //No acton required already blacklisted
            return response.status(204).json({ message: "No Content" })
        }
        const newBlackList = new BlackList({ token: token })
        await newBlackList.save()

        //browser should clear the cookie header
        response.setHeader('Clear-Site-Data', '"cookies"')

        response.status(200).json({ message: "Log Out Successful" })

    } catch (error) {
        response.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}



const addAdmin = async (request, response) => {
  const { name, email, phone, password } = request.body;
  const user = new User({ name, email, phone, password, role:'admin' });

  try {
    const newUser = await user.save();
    response.status(201).json({message:"Admin added successfuly",newUser});
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};


const addUser = async (request, response) => {
    const { name, email, phone, password } = request.body;
    const user = new User({ name, email, phone, password, role:'user' });
  
    try {
      const newUser = await user.save();
      response.status(201).json({message:"Admin added successfuly",newUser});
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
};


// Remove User
const removeUser = async (request, response) => {
    const userId = request.params.userId;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return response.status(404).json({ message: "User not found" });
        }

        response.status(200).json({ message: "User removed successfully", deletedUser });
    } catch (error) {
        response.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// Get User by ID
const getUser = async (request, response) => {
    const userId = request.params.userId;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }

        response.status(200).json({ message: "User details retrieved", user });
    } catch (error) {
        response.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// Get All Users
const getUsers = async (request, response) => {
    try {
        const users = await User.find();
        response.status(200).json({ message: "All users retrieved", users });
    } catch (error) {
        response.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


module.exports = {
    loginUser,
    logoutUser,
    addUser,
    removeUser,
    getUser,
    getUsers,
    addAdmin
};
