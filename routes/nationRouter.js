var express = require('express');
var nationRouter = express.Router();
const nationController = require('../Controllers/nationController');
const auth = require('../config/auth')

/* GET users listing. */

nationRouter.route('/')
  .get(nationController.index)
    .post(auth.isAdmin,nationController.create)

nationRouter.route('/edit/:nationId')
  .get(auth.isAdmin,nationController.formEdit)
    .post(auth.isAdmin,nationController.edit)

 nationRouter.route('/delete/:nationId')
    .get(auth.isAdmin,nationController.delete)
    
module.exports = nationRouter;
