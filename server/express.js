import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template.js'
import userRoutes from './../routes/user.routes'
import authRoutes from  './../routes/auth.routes'

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
app.user('/', authRoutes)

app.get('/', (req, res) => {
  res.status(200).send(Template())
})








export default app