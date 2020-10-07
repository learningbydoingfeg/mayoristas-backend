const router = require('express').Router();
const clientController = require('../contrrollers/client.controller');


router.route('/').get(clientController.list);
router.route('/').post(clientController.create);
router.route('/:id').put(clientController.update);
 


module.exports = router;