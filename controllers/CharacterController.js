var Character = require("../models/Character");

var characterController = {};

function enemyState(min, max){
	return Math.round(Math.random() * (max - min) + min);
}

function updateEnemy(enemy){
	console.log("enemy : " + enemy);
	var character = new Character(enemy);
		
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
			console.log("Success save enemy");
		}
	})
}

function randomWithProbability() {
	var notRandomNumbers = [1, 1, 1, 1, 1, 1, 1, 1, 1, 2];
	var idx = Math.floor(Math.random() * notRandomNumbers.length);
	//console.log(notRandomNumbers[idx]);
	return notRandomNumbers[idx];
}

function enemySort(enemy){
	switch (enemy){
    case 1 :
        return "dumy"
    case 2 :
		return "slime"
    default :
        console.log("Error");
	}
}

function makeEnemy(){
	var enemy = randomWithProbability();
	var enemyInfo = {};
	
	enemyInfo["id"] = enemy;
	enemyInfo["name"] = enemySort(enemy);
	enemyInfo["level"] = enemyState(1, 10);
	enemyInfo["hp"] = enemyState(10, 100);
	enemyInfo["mp"] = enemyState(10, 100);
	enemyInfo["atk"] = enemyState(1, 10);
	enemyInfo["def"] = enemyState(1, 10);
	enemyInfo["luk"] = enemyState(1, 10);
	enemyInfo["exp"] = enemyState(1, 10);
	
	return enemyInfo;
}


characterController.match = function (req, res) {
	
	var enemyInfo = makeEnemy();
	updateEnemy(enemyInfo);
	
	Character.findOne({
		_id: req.params.id
	}).exec(function (err, character) {
		if (err) console.log(`Error : ${err}`);
		else {
			Character.findOne({
				id: enemyInfo.id
			}, function (err, enemy) {
				if (err) console.log("505Error");
				else if (!enemy) return res.status(404).json({
					error: 'enemy not found'
				});
				else {
					res.render("../views/Users/match", {
						enemy: enemy,
						character: character
					});
				}
			})
		}
	})

}

characterController.fight = function(req, res){
	Character.findOne({
		_id: req.params.id
	}).exec(function (err, character) {
		if (err) console.log(`Error : ${err}`);
		else {
			console.log(req.params.enemyId)
			Character.findOne({
				_id: req.params.enemyId
			}, function (err, enemy) {
				if (err) console.log("505Error");
				else if (!enemy) return res.status(404).json({
					error: 'enemy not found'
				});
				else {
					res.render("../views/Users/fight", {
						enemy: enemy,
						character: character
					});
				}
			})
		}
	})
}

characterController.run = function(req, res){
	Character.findOne({_id:req.params.id}, function(err, character){
		if(err) console.log("505Error");
		else if(!character) return res.status(404).json({error : 'character not found'});
		else{
			Character.remove({
				id: makeEnemy().id
			}, function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("Employee deleted!!");
				}
			});
			res.render("../views/Users/login", {character: character});
		}		
	})
}

characterController.attack = function (req, res) {
	var hit = 0;
	Character.findOne({
		_id: req.params.id
	}, function (err, character) {
		if (err) console.log("505Error");
		else if (!character) return res.status(404).json({
			error: 'character not found'
		});
		else {
			Character.findOne({
				_id: req.params.enemyId
			}, function(err, enemy){
				if(err) console.log("505Err0r");
				else if(!enemy) return res.status(404).json({error: 'enemy not found'})
				else{
					hit = enemy.hp - character.atk;
					Character.findByIdAndUpdate(
						req.params.enemyId, {
							$set: {
								hp: hit
							}
						}, {new: true, useFindAndModify: false}, function(err, enemy){
							if(err){
							   console.log(err);
						   }
							else if(enemy.hp < 0)
							{
								Character.remove({
									_id: enemy._id
								}, function (err) {
									if (err) {
										console.log(err);
									} else {
										console.log("Enemy deleted!!");
										res.render("../views/Users/login", {character: character});
									}
								});
							}
						   else{
							   res.redirect(`/users/fight/${character._id}/${enemy._id}`);
						   }
						}
					)
				}
		});

	}
	})
}





module.exports = characterController;
