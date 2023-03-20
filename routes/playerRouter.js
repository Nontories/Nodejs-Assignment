var express = require('express');
var playerRouter = express.Router();
const playerController = require('../Controllers/playerController');
const auth = require('../config/auth')

/* GET users listing. */

playerRouter.route('/')
  .get(playerController.index)
    .post(auth.isAdmin,playerController.create)

// http://localhost:3000/players/edit/id
playerRouter.route('/edit/:playerId')
  .get(auth.isAdmin,playerController.formEdit)
    .post(auth.isAdmin,playerController.edit)

playerRouter.route('/delete/:playerId')
    .get(auth.isAdmin,playerController.delete)
    
module.exports = playerRouter;
