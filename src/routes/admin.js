const router = require('express').Router();
const adminController = require('../contrrollers/admin.controller');



router.route('/signup').post(adminController.signup);
router.route('/signin').post(adminController.signin);


 


module.exports = router;