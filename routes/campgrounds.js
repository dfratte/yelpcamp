var express     = require("express");
var router      = express.Router();
var Campground  = require("../models/campground")
var middleware  = require("../middleware");

// Get

router.get("/", function(req, res){
    Campground.find(
        {}, 
        function(err, allCampgrounds){
            if(err){
                console.log(err);
            } else {
                allCampgrounds.forEach(function(campground){
                    campground.image = getURL();
                    Campground.findByIdAndUpdate(campground._id, campground, function(err, data){
                       if(err) {
                           console.log("Image error!");
                       } 
                    });
                });
                res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user, page: 'campgrounds'})
            }
    });
});

// Create

router.post("/", middleware.isLoggedIn, function(req, res){
    var name    = req.body.name;
    var price   = req.body.price;
    var image   = req.body.image;
    var desc    = req.body.description;
    var author  = {
        id: req.user._id,
        username: req.user.username
    }
    
    var newCampground = {
        name: name, 
        price: price,
        image: image, 
        description: desc,
        author: author
    };
    
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
    
});

// New

router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");  
});

// Show

router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err)
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// Edit

router.get("/:id/edit", middleware.isCampgroundOwned, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// Update

router.put("/:id", middleware.isCampgroundOwned, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, data){
       if(err) {
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
    
});

// Destroy

router.delete("/:id", middleware.isCampgroundOwned, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds");
       }
    });
});

var pics = [
    "https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807__340.jpg", 
    "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__340.jpg", 
    "https://cdn.pixabay.com/photo/2014/05/03/00/42/vw-camper-336606__340.jpg", 
    "https://cdn.pixabay.com/photo/2017/09/26/13/50/rv-2788677__340.jpg", 
    "https://cdn.pixabay.com/photo/2017/08/04/20/04/camping-2581242__340.jpg"
];

function getURL() {
   return pics[Math.floor(Math.random() * pics.length)];
}

module.exports = router;