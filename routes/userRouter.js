var express = require('express');
var userRouter = express.Router();
const UserController = require('../Controllers/userController');
const auth = require('../config/auth')

userRouter.route('/login')
    .get(auth.checkLogined, UserController.loginIndex)
    .post(auth.checkLogined, UserController.login)

userRouter.route('/logout')
    .get(auth.checkLogined, UserController.logout)

userRouter.route('/register')
    .get(auth.checkLogined, UserController.regisIndex)
    .post(auth.checkLogined, UserController.register)

userRouter.route('/dashboard')
    .get(auth.ensureAuthenticated, auth.isAdmin, UserController.dashboard)

userRouter.route('/delete/:userId')
    .get(auth.ensureAuthenticated, auth.isAdmin, UserController.delete)

userRouter.route('/edit/:userId')
    .get(auth.ensureAuthenticated, auth.isAdmin, UserController.updateForm)
      .post(auth.ensureAuthenticated, auth.isAdmin, UserController.updateProfile)

module.exports = userRouter;