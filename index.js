const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const routerauth = require('./app/routes/auth')
const routerart = require('./app/routes/article')

const app = express()

app.use(express.json())
app.use(cors())
app.use('/auth', routerauth)
app.use('/main', routerart)

const PORT = process.env.PORT
const DB_URL = process.env.DB_URL

async function App() {
  try {
    await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))
  } catch (e) {
    console.log(e)
  }
}

App()
