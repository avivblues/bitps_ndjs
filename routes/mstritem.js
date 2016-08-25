var express = require('express');
var router = express.Router();
var db = require('./db');
/* GET master item page. */
router.get('/', function(req, res, next) {
	
	sql='SELECT mstr_id,mstr_code,mstr_img,mstr_name,mstr_merk,mstr_desc,mstr_cat,mstr_um,mstr_type FROM mstr_item where mstr_status="Y"';
	var getallcat;var getallum;
	var getallmerk;var getalltype;
	getallmstrcat(function(cb){
		getallcat = cb;
		console.log(getallcat);
	});
	getallmstrum(function(cbk){
		getallum = cbk;
		console.log(getallum);
	});
	getallmstrmerk(function(cbk){
		getallmerk = cbk;
		console.log(getallmerk);
	});
	getallmstrtype(function(cbk){
		getalltype = cbk;
		console.log(getalltype);
	});
	// execution sql and save result to "rows"
	db.query(sql, function(e, rows, f){if (!e) {
				res.render('mstr_item', {
				catrows: getallcat,
				umrows: getallum,
				merkrows: getallmerk,
				typerows: getalltype,
				data: rows,
				title: 'Master Item',
				menu:"Master"
			});
		}
	});
});
// ajax master product/item
router.post('/delete', function(req, res){
	db.query('UPDATE mstr_item SET ? WHERE ?', [{ mstr_status: 'N' },req.body],
		function (err, result,f){
		if (err) throw err;
		console.log('Changed status item to N' + result.changedRows);
		res.send("OK");
	})
});
router.post('/update', function(req, res){
	db.query('UPDATE mstr_item SET ? WHERE ?', [req.body.set,req.body.where],
		function (err, result,f){
		if (err) throw err;
		console.log('update data' + result.changedRows);
		res.send("OK");
	})
});
router.post('/insert', function(req, res){
	if(req.body.model.model=="single"){
		//res.send(req.body.set);
		db.query('insert mstr_item SET ?', [req.body.set],
			function (err, result,f){
			if (err) throw err;
			console.log('insert mstr_item' + result.changedRows);
			res.send("OK");
		});
	}else{

	}
});
// ajax master cat
router.post('/newmstrcat', function(req, res){
	db.query('insert into setup_category SET ?', [req.body],
		function (err, result,f){
		if (err) throw err;
		console.log('A new um has been created.' + result.changedRows);
		res.send("OK");
	})
});
function countmstrcat(callback) {
	var sql = 'SELECT COUNT(st_id) AS "count" FROM setup_category where st_status="Y"';
	db.query(sql, function(err, rows, f) {
		callback(rows);
	});
	
}
function getallmstrcat(callback) {
	var sql = 'SELECT st_id,st_name FROM setup_category where st_status="Y"';
	db.query(sql, function(err, rows, f) {
		callback(rows);
	});
	
}
// ajax master um
router.post('/newmstrum', function(req, res){
	db.query('insert into setup_um SET ?', [req.body],
		function (err, result,f){
		if (err) throw err;
		console.log('A new um has been created.' + result.changedRows);
		res.send("OK");
	})
});
function countmstrum(callback) {
	var sql = 'Select count(um_id) as "count" from setup_um where um_status="Y"';
	db.query(sql, function(err,rows,f){
		callback(rows);
	});
}

function getallmstrum(callback) {
	var sql = 'select um_id,um_name from setup_um where um_status="Y"';
	db.query(sql,function(err,rows,f){
		callback(rows);
	});
}
// ajax master merk
router.post('/newmstrmerk', function(req, res){
	db.query('insert into setup_merk SET ?', [req.body],
		function (err, result,f){
		if (err) throw err;
		console.log('A new merk has been created.' + result.changedRows);
		res.send("OK");
	})
});
function getallmstrmerk(callback) {
	var sql = 'SELECT mr_id,mr_name FROM setup_merk where mr_status="Y"';
	db.query(sql, function(err, rows, f) {
		callback(rows);
	});
	
}
// ajax master type
router.post('/newmstrtype', function(req, res){
	db.query('insert into setup_type SET ?', [req.body],
		function (err, result,f){
		if (err) throw err;
		console.log('A new type has been created.' + result.changedRows);
		res.send("OK");
	})
});
function getallmstrtype(callback) {
	var sql = 'SELECT tp_id,tp_name FROM setup_type where tp_status="Y"';
	db.query(sql, function(err, rows, f) {
		callback(rows);
	});
	
}
module.exports = router;
