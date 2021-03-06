var app = require('../../app');
var passport = require('passport');
var isLoggedIn = require('../utils/auth')
var ObjectId = require('mongodb').ObjectID

app.get("/profile", isLoggedIn, function(req, res) {
  var moment = require("moment")
  res.render("profile.ejs", {user:req.user})
})

app.get("/logout", function(req, res) {
  req.logout()
  res.redirect("/")
})

app.get("/login", function(req, res) {
  res.render("login.ejs", { message: req.flash("loginMessage"),user:req.user })
})

app.post(
  "/login",
  passport.authenticate("local-login", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true
  })
)

app.get("/signup", function(req, res) {
  res.render("signup.ejs", { message: req.flash("signupMessage"),user:req.user })
})

app.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true
  })
)

app.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["public_profile", "email"] })
)

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/profile",
    failureRedirect: "/"
  })
)

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
)

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/profile",
    failureRedirect: "/"
  })
)

//Logged in

// locally --------------------------------
app.get("/connect/local", function(req, res) {
  res.render("connect-local.ejs", { message: req.flash("loginMessage") })
})
app.post(
  "/connect/local",
  passport.authenticate("local-signup", {
    successRedirect: "/profile", // redirect to the secure profile section
    failureRedirect: "/connect/local", // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  })
)

// facebook -------------------------------

app.get(
  "/connect/facebook",
  passport.authorize("facebook", { scope: ["public_profile", "email"] })
)

app.get(
  "/connect/facebook/callback",
  passport.authorize("facebook", {
    successRedirect: "/profile",
    failureRedirect: "/"
  })
)

// google ---------------------------------

// send to google to do the authentication
app.get(
  "/connect/google",
  passport.authorize("google", { scope: ["profile", "email"] })
)

// the callback after google has authorized the user
app.get(
  "/connect/google/callback",
  passport.authorize("google", {
    successRedirect: "/profile",
    failureRedirect: "/"
  })
)

// Unlink

// local -----------------------------------
app.get("/unlink/local", isLoggedIn, function(req, res) {
  var user = req.user
  user.local.email = undefined
  user.local.password = undefined
  user.save(function(err) {
    res.redirect("/profile")
  })
})

// facebook -------------------------------
app.get("/unlink/facebook", isLoggedIn, function(req, res) {
  var user = req.user
  user.facebook.token = undefined
  user.save(function(err) {
    res.redirect("/profile")
  })
})

// google ---------------------------------
app.get("/unlink/google", isLoggedIn, function(req, res) {
  var user = req.user
  user.google.token = undefined
  user.save(function(err) {
    res.redirect("/profile")
  })
})
