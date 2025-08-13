const User = require('../models/User')
const Provider = require('../models/Provider')
const middleware = require('../middleware')

// User Registration

const RegisterUser = async (req, res) => {
  try {
    const { name, email, password, location, contact } = req.body

    const validation = middleware.validatePassword(password)
    console.log(validation)
    if (!validation.valid) {
      return res.status(400).send({ status: 'Error', msg: validation.msg })
    }

    let passwordDigest = await middleware.hashPassword(password)

    let existingUser = await User.findOne({ email })
    if (existingUser) {
      return res
        .status(400)
        .send('A user with that email has already been registered!')
    } else {
      const user = await User.create({
        name,
        email,
        passwordDigest,
        location,
        contact
      })
      res.send(user)
    }
  } catch (error) {
    throw error
  }
}

// Provider Registration
const RegisterProvider = async (req, res) => {
  try {
    const {
      CPR,
      name,
      email,
      password,
      location,
      contact,
      profession,
      categories
    } = req.body

    const validation = middleware.validatePassword(password)
    if (!validation.valid) {
      return res.status(400).send({ status: 'Error', msg: validation.msg })
    }

    let passwordDigest = await middleware.hashPassword(password)

    let existingProvider = await Provider.findOne({ email })
    if (existingProvider) {
      return res
        .status(400)
        .send('A provider with that email has already been registered!')
    } else {
      const provider = await Provider.create({
        CPR,
        name,
        email,
        passwordDigest,
        location,
        contact,
        profession,
        categories
      })
      res.send(provider)
    }
  } catch (error) {
    throw error
  }
}

// Combined Login
const Login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Try User collection first
    let user = await User.findOne({ email })
    let type = 'user'

    // If not found in User, try Provider
    if (!user) {
      user = await Provider.findOne({ email })
      type = 'provider'
    }

    if (!user) {
      return res.status(401).send({ status: 'Error', msg: 'Account not found' })
    }

    let matched = await middleware.comparePassword(
      password,
      user.passwordDigest
    )

    if (matched) {
      let payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: user.type
      }
      let token = middleware.createToken(payload)
      return res.send({ user: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    res
      .status(401)
      .send({ status: 'Error', msg: 'An error has occurred when logging in!' })
  }
}
const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.status(200).send(payload)
}

module.exports = {
  RegisterUser,
  RegisterProvider,
  Login,
  CheckSession
}
