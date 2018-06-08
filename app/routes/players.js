var app = require('../../app')
var isLoggedIn = require('../utils/auth')
var Players = require('../models/Players')

app.get("/teambuild" ,function(req, res){
    Players.find({}, function(err, players){
        if(err) {
            res.status(500).send(err)
        } else {
            res.render("players.ejs", {
                user: req.user,
                players: players
            })
        }
    })
})