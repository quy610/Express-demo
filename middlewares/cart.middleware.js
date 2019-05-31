var db = require('../db');


module.exports = function(req, res, next) {
	var sessionId = req.signedCookies.sessionId;
	var matchedSession = db.get('sessions').find({ id : sessionId}).value();
	var newArr = matchedSession.cart;
    var sum = 0;
    for(var key in newArr) {
      sum+= newArr[key];
    }
    res.locals.sum = sum;

	next();
}