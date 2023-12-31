import express from 'express'
import sequalize from './db.js'
import errorMiddleware from './Middlewares/errorMiddleware.js'
import router from './routes/router.js'
import cors from 'cors'
import models from './models/models.js'
import AdminServices from './Services/AdminServices.js'

const app = express()
const PORT = process.env.PORT || 8000

app.use(cors({
  origin: ["https://healera.payform.ru", "https://app.super.so", "https://book.healera.ru", "https://admin.healera.ru"],
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

    await signUpAdmin()

    app.listen(PORT, () => console.log("Server started on port: ", PORT))
  } catch (e) {
    console.log("ERROR: ")
    console.log(e.message)
  }
}

start()

async function signUpAdmin() {
  try {
    const admin = await models.Admin.findOne({where: {email: "zaprudnev.da@gmail.com"}})

    if(!admin) {
      await AdminServices.signUp({email: "zaprudnev.da@gmail.com"})
      console.log("Админ успешно зарегестрирован")
    }

  }catch(e) {
    console.log(e)
  }
}

async function backupUsers() {
  try {
    const users = await models.User.findAll()
  
    for (const user of users) {
      try {
        await models.UserCopy.create({ ...user.dataValues })
      } catch (e) {
        continue
      }
    }

    console.log("Users backup was accomplished")
  } catch (e) {
    console.log(e)
  }
}

setTimeout(backupUsers,  4  * 24  * 60  * 60  * 1000) // 4 days in millseconds
