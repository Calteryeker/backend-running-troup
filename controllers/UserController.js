const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
  async signup(req, res) {

    const { login, senha } = req.body;
    const senhaHash = bcrypt.hashSync(senha, 10);

    User.collection.insertOne({
      login,
      senha: senhaHash,
      recordes: []
    }, (error, result) => {
      if (error) {
        return res.status(409).send({error: 'Error: Login is not unique!'});
      } else {
        return res.status(200).send(req.body);
      }
    });

  },

  //recover user
  async recUser(req, res){
    const userRecovered = await User.findById(req.userId);

    if(userRecovered){
      return res.status(200).send({user: userRecovered});
    }
      
      return res.status(404).send({error: "Error: User not found!"})
  },

  async saveRecord(req, res){
    const {recorde} = req.body
    await User.updateOne({_id: req.userId}, {$push: { 
      recordes: {
        $each : [recorde],
        $sort : -1,
        $slice : 5}
    }}).then(() => {
       res.status(200)
    })

    return res.send()
  },

  async leaderboard(req, res){
    const users = await User.find({})

    users.sort(function (a,b) {
      const best_a = a.recordes[0]
      const best_b = b.recordes[0]
       
      return best_b - best_a
    })

    const top_10 = []
    users.slice(0,10).map((user) => {
      top_10.push(
        {
          username: user.login,
          pontuacao: user.recordes[0]
        }
      )
    })
    return res.status(200).send(top_10)
  },

  async testLogin(req, res){
    const {login} = req.body;
    if(!await User.findOne({login : login})){
      return res.status(200).send()
    }
    return res.status(409).send()
  },
};