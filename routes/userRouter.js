var express = require('express');
var userRouter = express.Router();
const UserController = require('../Controllers/userController');
const auth = require('../config/auth')

userRouter.route('/login')
    .get(UserController.loginIndex)
    .post(UserController.login)

userRouter.route('/logout')
    .get(UserController.logout)

userRouter.route('/register')
    .get(UserController.regisIndex)
    .post(UserController.register)

userRouter.route('/dashboard')
    .get(auth.ensureAuthenticated,auth.isAdmin, UserController.dashboard)

userRouter.route('/delete/:userId')
    .get(auth.isAdmin,UserController.delete)

userRouter.route('/edit/:userId')
    .get(auth.isAdmin,UserController.updateForm)
      .post(auth.isAdmin,UserController.updateProfile)

module.exports = userRouter;