var express = require('express');
var userModel = require.main.require('./model/user-model');
var router = express.Router();


//ROUTES
router.get('*', function(req, res, next){
	if(req.session.un != null){
		next();
	}else{
		res.redirect('/login');
	}
});

router.get('/', function(req, res){
	
	userModel.getAll(function(results){
		var data = {
			name: req.session.un,
			uList: results
		};
		res.render('home/index', data);
	});
});

router.get('/userlist', function(req, res){

	userModel.getAll(function(results){
	
		var data = {
			name: req.session.un,
			uList: results
		};
		res.render('home/medicinelist', data);
	});
});

router.get('/frontpage', function(req, res){

	userModel.getAll(function(results){
	
		var data = {
			name: req.session.un,
			uList: results
		};
		res.render('home/fontpage', data);
	});
});

router.get('/cartproduct', function(req, res){

	userModel.getcart(function(results){
	
		var data = {
			name: req.session.un,
			uList: results
		};
		res.render('home/cart', data);
	});
});

router.get('/profile', function(req, res){

	userModel.getpro(req.session.uid, function(result){

		if(result != ""){
			res.render('home/profile', result);
		}else{
			res.redirect('/home');
		}
	});
});

router.get('/adduser', function(req, res){
	res.render('home/addmedicine');
});


router.post("/adduser", function(req, res){

	var user = {
		uploader_id:req.body.uploader_id,
		medicine_name: req.body.medicine_name,
		company_name: req.body.company_name,
		production_date: req.body.production_date,
		expired_date: req.body.expired_date,
		medicine_type: req.body.medicine_type,
		medicine_description: req.body.medicine_description
	};
     
	userModel.insert(user, function(status){

		if(status){
			res.redirect('/home/userlist');
		}else{
			res.redirect('/home/adduser');
		}
	});
});

router.get('/edit/:id', function(req, res){

	userModel.get(req.params.id, function(result){

		if(result != ""){
			res.render('home/edit', result);
		}else{
			res.redirect('/home/userlist');
		}
	});
});

router.post("/edit/:id", function(req, res){

	var user = {
		id: req.params.id,
		uploader_id:req.body.uploader_id,
		medicine_name: req.body.medicine_name,
		company_name: req.body.company_name,
		production_date: req.body.production_date,
		expired_date: req.body.expired_date,
		medicine_type: req.body.medicine_type,
		medicine_description: req.body.medicine_description
	};

	userModel.update(user, function(status){

		if(status){
			res.redirect('/home/userlist');
		}else{
			res.redirect('/home/edit:'+req.params.id);
		}
	});
});

router.get('/cart/:name/:id', function(req, res){

     var data ={
     	name:req.params.name,
     	id:req.params.id
     };

    
	userModel.cartupdate(data, function(status){

		if(status){
			res.redirect('/home/frontpage');
		}else{
			res.redirect('/home/edit:'+req.params.id);
		}
	});
});



router.get('/delete/:id', function(req, res){

	userModel.get(req.params.id, function(result){

		if(result != ""){
			res.render('home/delete', result);
		}else{
			res.redirect('/home/userlist');
		}
	});
});

router.post("/delete/:id", function(req, res){

	var user = {
		id: req.params.id,
		uname: req.body.uname,
		password: req.body.password,
		type: req.body.type
	};

	userModel.delete(user, function(status){

		if(status){
			res.redirect('/home/userlist');
		}else{
			res.redirect('/home/delete:'+req.params.id);
		}
	});
});

module.exports = router;






