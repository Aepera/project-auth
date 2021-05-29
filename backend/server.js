import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.Promise = Promise

const Secret = mongoose.model('Secret', {
  message: String
})

const User = mongoose.model('User', {
  username: {
    type: String,
    required: true,
    unique: true,
    //minlength: [5, 'Minimum length is 5 characters'],
    //maxlength: [20, 'Maximum length is 20 characters']
  },
  password: {
    type: String,
    required: true,
    //minlength: [5, 'Minimum length is 5 characters']
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
})

const port = process.env.PORT || 8080
const app = express()

const authenticateUSer = async (req, res, next) => {
  const accessToken = req.header('Authorization')

  try {
    const user = await User.findOne({ accessToken })
    if (user) {
      next() // next function means that if user exists, go to the endpoint
    } else {
      res.status(401).json({ message: 'Not authenticated'})
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid request', error })
  }
}

app.use(cors())
app.use(express.json())
//app.use(authenticateUSer) this would make all endpoints accessible only with accesstoken

// Routes
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/secret', authenticateUSer)
app.get('/secret', async (req, res) => {
  const secrets = await Secret.find()
  res.json(secrets)
})

app.post('/secret', async (req, res) => {
  const { message } = req.body

  try {
    const newSecret = await new Secret({ message }).save()
    res.json(newSecret)
  } catch (error) {
    res.status(400).json({ message: 'Invalid request', error })
  }
})

// LOGIN
app.post('/signin', async (req, res) => {
  const { username, password } = req.body
console.log(user)
  try {
    const user = await User.findOne({ username })

    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({
        success: true,
        userID: user._id,
        username: user.username,
        accessToken: user.accessToken
      })
    } else {
      res.status(404).json({ success: false, message: 'User not found'})
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error})
  }
})

// SIGN UP
app.post('/signup', async (req, res) => {
  const { username, password } = req.body

  try {
    const salt = bcrypt.genSaltSync()

    const newUser = await new User({
      username,
      password: bcrypt.hashSync(password, salt)
    }).save()

    res.json({
      success: true,
      userID: newUser._id,
      username: newUser.username,
      accessToken: newUser.accessToken
    })
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error })
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
