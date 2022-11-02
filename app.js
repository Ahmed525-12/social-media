import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import connectDB from"./connection/connection.js"
import * as indexRouter from './index_route.js'

const app = express()
const port = 3000
const baseUrl = process.env.BASEURL
app.use(express.json())
app.use(`${baseUrl}/auth`, indexRouter.authRouter)
app.use(`${baseUrl}/user`, indexRouter.userRouter)

app.use("*", (req, res) => {
    res.json({ message: "In-valid Routing" })
})
connectDB()
app.listen(port, () => console.log(`Server running on port .......${port}`))