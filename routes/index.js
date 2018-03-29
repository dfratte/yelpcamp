var express     = require("express");
var router      = express.Router();
var User        = require("../models/user");
var passport    = require("passport");

// root route

router.get("/", function(req, res){
    res.render("landing");
});

// Auth routes

router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err) {
            return res.render("register", {"error": err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds"); 
        });
    });
});

// Login routes

router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

// middleware authentication

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}) ,function(req, res){
});

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("error", "Logged you out!");
    res.redirect("/campgrounds");
});

module.exports = router;