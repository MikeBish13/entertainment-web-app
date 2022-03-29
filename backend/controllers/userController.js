const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModal')

const registerUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    //Check all fields have been filled out
    if (!email || !password) {
        res.status(400)
        throw new Error('Please enter all fields')
    }

    //Check to see if the user exists
    const userExists = await User.findOne({email})
    if(userExists) {
        res.status(400)
        throw new Error("User already exists")
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create User
    const user = await User.create({
        email,
        password: hashedPassword,
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            email: user.email,
            token: generateToken(user._id),
            bookmarks: user.bookmarks
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    //Check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            email: user.email,
            token: generateToken(user._id),
            bookmarks: user.bookmarks
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

const getUser = asyncHandler(async (req, res) => {
    const {_id, email, bookmarks } = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        email,
        bookmarks
    })
})

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(!user) {
        res.status(400)
        throw new Error('User does not exist')
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedUser)
})

//Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getUser,
    updateUser
}