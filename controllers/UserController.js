var User = require("../models/User");

var userController = {};


userController.main = function(req, res){
	res.render("../views/Users/main");
}

userController.list = function(req, res){
	User.find({}).exec(function(err, users){
		if(err){
			console.log(`Error : ${err}`);
		}
		else{
			res.render("../views/Users/index", {users: users});
		}
	})
}

userController.create = function(req, res){
	res.render("../views/Users/create");
}

userController.save = function(req, res){
	var user = new User(req.body);
	
	user.save(function(err){
		if(err){
			var e = "";
			if(err.code == 11000){
				e = "User already exists";
				console.log(e);
			}
			console.log("Failed save");
			res.redirect("/users/create");
		}
		else
		{
			console.log("Success save");
			res.redirect("/users");
		}
	})
}

userController.check = function(req, res){
	var id = req.body.id;
	var password = req.body.password
    User.findOne({id: id, password: password}, function(err, user){
        if(err) console.log("505Error");
        else if(!user) return res.status(404).json({error: 'user not found'});
		else
		{
        	console.log("success");
			res.render("../views/Users/login", {
				user: user
			});
		}
    });
}



module.exports = userController;