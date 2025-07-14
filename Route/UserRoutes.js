import express from 'express'
import { logoutUser, UserLogin, UserRegister } from '../controller/UserController.js'


const UserRouter = express.Router()


UserRouter.post('/UserRegister', UserRegister)
UserRouter.post('/UserLogin', UserLogin)
UserRouter.post('/logoutUser', logoutUser)

export default UserRouter