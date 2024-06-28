

const User = require('../models/userModel')
const validatePassword = require('../utils/validatePassword')

const loginUser = async (request, response) => {
    const { email, password } = request.body

    try {
        const userToBeLogged = await User.findOne({ email })

        if (!userToBeLogged) {
            return response.status(401).json({ message: "User not found" })
        }
        const isValidPassword = validatePassword(password, userToBeLogged.password)

        if (!isValidPassword) {
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
        response.status(201).json({ message: "Login Successful", token: token })

    } catch (error) {
        response.status(500).json({ message: "Internal Server Error", error: error })
    }

}

const logoutUser = (req, res) => {
    // Logic to logout a user
    res.send('User logged out');
};



const addAdmin = async (request, response) => {
  const { name, email, phone, password } = request.body;
  const user = new User({ name, email, phone, password, role:'admin' });

  try {
    const newUser = await user.save();
    response.status(201).json(newUser);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};


const addUser = async (request, response) => {
  const { name, email, phone, password, role } = request.body;

  // Validate role
  if (role !== 'user' && role !== 'admin') {
    return response.status(400).json({ message: 'Invalid role. Allowed roles are "user" and "admin".' });
  }

 
  const user = new User({ name, email, phone, password, role });

  try {
    const newUser = await user.save();
    response.status(201).json(newUser);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};

module.exports = { addAdmin, addUser };


const removeUser = (req, res) => {
    // Logic to remove a user
    res.send('User removed');
};

const getUser = (req, res) => {
    const userId = req.params.userId;
    // Logic to get a user by ID
    res.send(`User details for userId ${userId}`);
};

const getUsers = (req, res) => {
    // Logic to get all users
    res.send('All users retrieved');
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
