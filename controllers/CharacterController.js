var Character = require("../models/Character");

var characterController = {};

function randomWithProbability() {
	var notRandomNumbers = [1, 1, 1, 1, 2];
	var idx = Math.floor(Math.random() * notRandomNumbers.length);
	console.log(notRandomNumbers[idx]);
	return notRandomNumbers[idx];
}


characterController.match = function (req, res) {
	Character.findOne({
		_id: req.params.id
	}).exec(function (err, character) {
		if (err) console.log(`Error : ${err}`);
		else {
			Character.findOne({
				id: randomWithProbability()
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

characterController.attack = function (req, res) {

	Character.findOne({
		id: req.params.id
	}, function (err, character) {
		if (err) console.log("505Error");
		else if (!character) return res.status(404).json({
			error: 'character not found'
		});
		else {
			Character.findByIdAndUpdate(
				req.params.enemyId, {
					$set: {
						hp: character.atk
					}
				}, {
					new: true
				},
				function (err, enemy) {
					if (err) {
						console.log(err);
					} else {
						res.redirect(`/users/match/${req.params.id}`);
					}
				}
			)
		}
	})

}





module.exports = characterController;
