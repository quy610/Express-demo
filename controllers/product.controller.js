var db = require('../db');
var shortid = require('shortid');

module.exports.index = function(req, res) {
	var page = parseInt(req.query.page) || 1; // neu khong co gia tri thi mac dinh bang 1
	var perPage = 8; // so san pham trong moi trang

	var start = (page - 1) * perPage;
	var end = page * perPage;

	var products = db.get('products').drop(start).take(perPage).value();
	var totalPage = 0;

	var totalProd = db.get('products').value();

	
	if(!totalProd.length % perPage) {
		totalPage = totalProd.length / perPage;
	} else {
		totalPage = parseInt(totalProd.length / perPage) + 1;
	}
	 

	res.render('product/index', {
		//products: db.get('products').value().slice(start, end)
		products: products,
		total: totalPage,
		page: page
	});
};

module.exports.search = function(req, res) {
	var page =  parseInt(req.query.page) || 1;
	var q = req.query.q;
	var matchedProd = db.get('products').value().filter(function(product) {
		return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});

	// var perPage = 8;
	// var totalPage = 0;

	// if(!matchedProd.length % perPage) {
	// 	totalPage = matchedProd.length / perPage;
	// } else {
	// 	totalPage = parseInt(matchedProd.length / perPage) + 1;
	// }

	res.render('product/index', {
		products: matchedProd,
		total: 0,
		page: 0
	})
}