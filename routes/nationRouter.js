var express = require('express');
var nationRouter = express.Router();
const nationController = require('../Controllers/nationController');

/* GET users listing. */
nationRouter.get('/', nationController.index);

nationRouter.post('/', nationController.create);

nationRouter.route('/edit/:nationId')
  .get(nationController.formEdit)
    .post(nationController.edit)

 nationRouter.route('/delete/:nationId')
    .get(nationController.delete)
    
module.exports = nationRouter;
