var express = require('express');
var userRouter = express.Router();
const UserController = require('../Controllers/userController');
const {ensureAuthenticated} = require('../config/auth')

userRouter.route('/login')
    .get(UserController.loginIndex)
    .post(UserController.login)

userRouter.route('/logout')
    .get(UserController.logout)

userRouter.route('/register')
    .get(UserController.regisIndex)
    .post(UserController.register)

userRouter.route('/dashboard')
    .get(ensureAuthenticated, UserController.dashboard)

module.exports = userRouter;