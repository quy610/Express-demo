var db = require('../db');

module.exports.addToCart = function(req, res, next) {
	var productId = req.params.productId;
	var sessionId = req.signedCookies.sessionId;

	if(!sessionId) {
		res.redirect('/product');
		return;
	}

	var count = db
		.get('sessions')
		.find({ id: sessionId})
		.get('cart.' + productId, 0)
		.value();

	db.get('sessions')
		.find({ id: sessionId})
		.set('cart.' + productId, count + 1)
		.write();

	res.redirect('/product');
}

module.exports.countProd = function(req, res, next) {
	var sessionId = req.signedCookies.sessionId;
	var matchedSession = db.get('sessions').find({ id : sessionId}).value();
	var newArr = matchedSession.cart;
    var sum = 0;
    for(var key in newArr) {
      sum+= newArr[key];
    }

    res.locals.sum = sum;
    
}