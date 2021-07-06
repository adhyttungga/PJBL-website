import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template.js'
import userRoutes from './routes/user.routes'
import authRoutes from  './routes/auth.routes'

const app = express()

// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ exended: true }))
app.use(cookieParser())
app.use(compress())
// enable CORS - Cross Origin Resource Sharing
app.use(cors())
// secure apps by setting various HTTP headers
app.use(helmet())

// mount routes
app.use('/', userRoutes)
app.use('/', authRoutes)

app.get('/', (req, res) => {
  res.status(200).send(Template())
})

// Catch unauthorized errors
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({"error": err.name + ": " + err.message})
  } else if (err) {
    res.status(400).json({"error": err.name + ": " + err.message})
    console.log(err)
  }
})

export default app