const Players = require('../models/Players');
const Nations = require('../models/Nations');

let clubData = [
  { "id": "1", "name": "Arsenal" },
  { "id": "2", "name": "Manchester United" },
  { "id": "3", "name": "Chelsea" },
  { "id": "4", "name": "Manchester City" },
  { "id": "5", "name": "PSG" },
  { "id": "6", "name": "Inter Milan" },
  { "id": "7", "name": "Real Madrid" },
  { "id": "8", "name": "Barcelona" }
]

let positionData = [
  { "id": "1", "name": "Defenders" },
  { "id": "2", "name": "Midfielders" },
  { "id": "3", "name": "Forwards" },
]

class playerController {

  index(req, res, next) {

    let nationList = [];

    Nations.find({}, function (err, nations) {
      if (err) {
        console.error(err);
        return;
      }
      nations.forEach(function (nation) {
        nationList.push(nation);
      });
    });

    const filterList = {
      nationValue : "",
      clubValue : "",
      positionValue : "",
      goalsValue : "",
      isCaptainValue : "",
    }

    Players.find({}).populate('nation')
      .then((players) => {
        res.render('players', {
          title: 'The list of Players',
          filterList : filterList,
          nationList: nationList,
          players: players,
          clubList: clubData,
          positionList: positionData,
          userId: req.user
        });
      }).catch(next)
  }

  create = async (req, res, next) => {
    try {
      // Tìm nation tương ứng với nationName
      const nation = await Nations.findOne({ name: req.body.nationValue });
      const name = req.body.nameValue;
      const image = req.body.imageValue;
      const club = req.body.clubValue;
      const position = req.body.positionValue;
      const goals = req.body.goalsValue;
      const isCaptain = req.body.isCaptainValue;

      // Tạo đối tượng player mới
      const player = new Players({
        name,
        image,
        club,
        position,
        goals,
        isCaptain,
        nation: nation.image // Sử dụng ID của nation tìm được ở trên
      });
      await player.save()
        .then(() => res.redirect('/players'))
        .catch(error => {
          console.log(error)
        });
    } catch (error) {
      console.log(error);
    }
  };

  formEdit(req, res, next) {

    let nationList = [];

    Nations.find({}, function (err, nations) {
      if (err) {
        console.error(err);
        return;
      }
      nations.forEach(function (nation) {
        nationList.push(nation);
      });
    });

    const playerId = req.params.playerId;
    let viewsData = {};
    Players.findById(playerId)
      .then((player) => {
        res.render('editPlayer', {
          title: 'The detail of Player',
          player: player,
          clubList: clubData,
          positionList: positionData,
          nationList: nationList,
          userId: req.user
        });
      })
      .catch(next);
  }

  edit = async (req, res, next) => {

    const nation = await Nations.findOne({ name: req.body.nation });
    const name = req.body.name;
    const image = req.body.image;
    const club = req.body.club;
    const position = req.body.position;
    const goals = req.body.goals;
    const isCaptain = req.body.isCaptain;
    // Tạo đối tượng player mới
    const player = {
      name,
      image,
      club,
      position,
      goals,
      isCaptain,
      nation: nation.image // Sử dụng ID của nation tìm được ở trên
    };

    await Players.updateOne({ _id: req.params.playerId }, player)
      .then(() => {
        res.redirect('/players')
      })
      .catch(next)
  }

  delete(req, res, next) {
    Players.findByIdAndDelete({ _id: req.params.playerId })
      .then(() => res.redirect('/players'))
      .catch(next);
  }

  filter = async (req, res, next) => {

    let nation = req.body.nationValue;
    let club = req.body.clubValue;
    let position = req.body.positionValue;
    let goals = req.body.goalsValue;
    let captain = req.body.isCaptainValue;

    const filterList = {
      nationValue : nation,
      clubValue : club,
      positionValue : position,
      goalsValue : goals,
      isCaptainValue : captain,
    }

    let nationList = [];

    Nations.find({}, function (err, nations) {
      if (err) {
        console.error(err);
        return;
      }
      nations.forEach(function (nation) {
        nationList.push(nation);
      });
    });

    await Players.find({}).populate('nation')
      .then((players) => {

        if (club) {
          players = players.filter((element) => element["club"] === club);
        }
        if (position) {
          players = players.filter((element) => element["position"] === position);
        }
        if (goals) {
          players = players.filter((element) => {
            goals = Number(goals);
            let goal = element["goals"];
          if(goals === 0){

            if(goal >= 0 && goal <= 3){
              return true
            } else {
              return false
            }

          }else if(goals === 3) {

            if(goal > 3 && goal <= 5){
              return true
            } else {
              return false
            }

          }else if(goals === 5) {

            if(goal > 5 && goal <= 10){
              return true
            } else {
              return false
            }
            
          }else if(goals === 10) {

            if(goal > 10 ){
              return true
            } else {
              return false
            }

          }else{
            return true
          }
          });
        }
        if (captain) {
          players = players.filter((element) => String(element["isCaptain"]).toLowerCase() === captain);
        }
        if (nation) {
          nation = nationList.find(element => element.name === nation);
          players = players.filter((element) => element["nation"] === nation.image);
        }

        res.render('players', {
          title: 'The list of Players',
          filterList: filterList,
          nationList: nationList,
          players: players,
          clubList: clubData,
          positionList: positionData,
          userId: req.user
        });
      }).catch(next)
  }
};
module.exports = new playerController;