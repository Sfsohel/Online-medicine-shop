var db = require('./db');


module.exports = {
	get: function(userId, callback){
		var sql = "select * from medicine_info where uploader_id="+userId;
		db.getResults(sql, function(result){

			if(result.length >0){ 
				callback(result[0]);
			}else{
				callback([]); 
			}
		});
	},
    
    getpro: function(userId, callback){
		var sql = "select * from user where id="+userId;
		db.getResults(sql, function(result){

			if(result.length >0){ 
				callback(result[0]);
			}else{
				callback([]); 
			}
		});
	},

	getAll: function(callback){
		var sql = "select * from medicine_info";
		db.getResults(sql, function(results){
			callback(results);
		});
	},

   getcart: function(callback){
		var sql = "select * from cart";
		db.getResults(sql, function(results){
			callback(results);
		});
	},

	validate: function(user, callback){
		var sql = "select * from user where username='"+user.uname+"' and password='"+user.password+"'";
		db.getResults(sql, function(result){

			if(result.length > 0 ){
				callback(result[0]);
			}else{
				callback([]);
			}
		})
	},
     
    

	insert: function(user, callback){
		var sql = "insert into medicine_info values(null, '"+ user.uploader_id+"', '"+ user.medicine_name+"', '"+ user.company_name+"','"+user.production_date+"','"+user.expired_date+ "','"+user.medicine_type+"','"+user.medicine_description+"')"
		db.execute(sql, function(success){
			callback(success);
		});
	},

	cartupdate: function(data, callback){
		var sql = "insert into cart values(null, '"+ data.name+"', '"+ data.id+"')"
		db.execute(sql, function(success){
			callback(success);
		});
	},

	update: function(user, callback){
		var sql = "update medicine_info set uploader_id='"+user.uploader_id+"' , medicine_name='"+user.medicine_name+"', company_name='"+user.company_name+"', production_date='"+user.production_date+"' , expired_date='"+user.expired_date+"',medicine_type='"+user.medicine_type+"',medicine_description='"+user.medicine_description+"' where id="+user.id;
		//console.log(sql);
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(user, callback){
		var sql = "delete from user where id="+user.id;
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}