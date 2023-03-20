var express = require('express');
var playerRouter = express.Router();
const playerController = require('../Controllers/playerController');
const auth = require('../config/auth')

/* GET users listing. */

playerRouter.route('/')
  .get(playerController.index)
    .post(auth.ensureAuthenticated, auth.isAdmin,playerController.create)

playerRouter.route('/filter')
  .post(playerController.filter)

playerRouter.route('/edit/:playerId')
  .get(auth.ensureAuthenticated, auth.isAdmin,playerController.formEdit)
    .post(auth.ensureAuthenticated, auth.isAdmin,playerController.edit)

playerRouter.route('/delete/:playerId')
    .get(auth.ensureAuthenticated, auth.isAdmin,playerController.delete)
    
module.exports = playerRouter;
