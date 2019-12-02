var User = require("../models/User");
var Character = require("../models/Character");

var userController = {};

function saveCharacterInfo(user){
	var info = {id: user._id, name: user.name, level:1, hp:100, mp:100, atk:10, def:10, luk:10, exp:0}
	//console.log(info);
	var character = new Character(info);
		
	character.save(function(err){
		if(err)
		{
			if(err.code == 11000)
			{
				console.log("Character does not exist");
			}
			console.log("Failed save");
		}
		else
		{
			console.log("Success save char");
		}
	})
}

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
			saveCharacterInfo(user);
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
        	console.log("login success");
			Character.findOne({id:user._id}, function(err, character){
				if(err) console.log("505Error");
				else if(!character) return res.status(404).json({error : 'character not found'});
				else{
					console.log("character upload");
					res.render("../views/Users/login", {character: character});
				}		
			})

		}
    });
}




module.exports = userController;