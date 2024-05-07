import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from "./router"

const app = express()

app.use(
  cors({
    credentials: true,
  })
)

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

dotenv.config()

const server = http.createServer(app)

server.listen(4000, () => console.log('Server running on port 4000'))

const MONGO_URL = process.env.MONGO_URL

mongoose.Promise = Promise
mongoose.connect(MONGO_URL).then(() => console.log('Connected to mongodb'))

mongoose.connection.on('error', (error: Error) => console.log(error))

app.use('/', router())
