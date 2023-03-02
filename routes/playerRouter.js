var express = require('express');
var playerRouter = express.Router();
const playerController = require('../Controllers/playerController');

/* GET users listing. */

playerRouter.get('/', playerController.index);

playerRouter.post('/', playerController.create);

// http://localhost:3000/players/edit/id
playerRouter.route('/edit/:playerId')
  .get(playerController.formEdit)
    .post(playerController.edit)

playerRouter.route('/delete/:playerId')
    .get(playerController.delete)
    
module.exports = playerRouter;
