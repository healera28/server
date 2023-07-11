import express from 'express'
import sequalize from './db.js'
import errorMiddleware from './Middlewares/errorMiddleware.js'
import router from './routes/router.js'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 8000

app.use((req, res, next) => {
  console.log(req.headers)
  next()
})

app.use(cors({
  origin: ["https://healera.payform.ru", "https://app.super.so", "https://book.healera.ru"],
  credentials: true
}))

app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())
app.use("/api", router)
app.use(errorMiddleware)


async function start() {
  try {
    await sequalize.authenticate()
    await sequalize.sync().then(() => {
      console.log('Database started!')
    }).catch(error => {
      console.error('Error synchronizing database:', error)
    })

    app.listen(PORT, () =>
      console.log("Server started on port: ", PORT))
  } catch (e) {
    console.log("ERROR: ")
    console.log(e.message)
  }
}

start()