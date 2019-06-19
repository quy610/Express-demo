var md5 = require('md5');
var db = require('../db');

module.exports.login = function(req, res) {
	res.render('auth/login', {
		csrfToken: req.csrfToken()
	});
};

module.exports.postLogin = function(req, res) {
	var email = req.body.email;
	var pass = req.body.password;

	if(!email) {
		res.render('auth/login', {
			errors: [
				'Info required'
			]
		});
		return;
	}

	var user = db.get('users').find({email: email}).value();

	if(!user) {
		res.render('auth/login', {
			errors: [
				'User does not exist'
			],
			values: req.body
		});
		return;
	}

	var hashedPass = md5(pass);
	if(user.password !== hashedPass) {
		res.render('auth/login', {
			errors: [
				'Wrong password'
			],
			values: req.body
		});
		return;
	}

	res.cookie('userId', user.id, {
		signed: true
	});
	res.redirect('/users');
};