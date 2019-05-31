var express = require('express');
var router = express.Router();
var validate = require('../validate/user.validate');

var controller = require('../controllers/user.controller');

var authMiddleware = require('../middlewares/auth.middleware');

var multer = require('multer');
var upload = multer({ dest: './public/uploads/' });

router.get('/', controller.index);

router.get('/cookie', function(req, res, next) {
	res.send('Hello');
});

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create', 
	upload.single('avatar'), 
	validate.postCreate, 
	controller.postCreate
);

module.exports = router;