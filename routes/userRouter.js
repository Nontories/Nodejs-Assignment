var express = require('express');
var userRouter = express.Router();
const UserController = require('../Controllers/userController');

userRouter.get('/login', UserController.loginIndex)
userRouter.route('/register')
    .get(UserController.regisIndex)
        .post(UserController.register)
// userRouter.post('/', UserController.register())

module.exports = userRouter;
