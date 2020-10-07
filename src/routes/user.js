const router = require('express').Router();
const userController = require('../contrrollers/user.controller');



router.route('/:clientId/signup').post(userController.signup);
// router.route('/signin').post(userController.signin);

// router.route('/:clientId/users').post(userController.create);
// router.route('/:clientId/users/:id').put(userController.update);
 


module.exports = router;  