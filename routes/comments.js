var express     = require("express");
var router      = express.Router({mergeParams: true});
var Campground  = require("../models/campground");
var Comment     = require("../models/comment");
var middleware  = require("../middleware");

// new
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
        } else {
            console.log(campground);
            res.render("comments/new", {campground: campground});
        }
    })
});

// create

router.post("/", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
            res.redirect("/campgrounds");
        } else {
            console.log(req.body.comment);
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong");
                    console.log(err)
                } else {
                    comment.author.username = req.user.username;
                    comment.author.id = req.user._id;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Comment added successfully!");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    })
});

// edit route

router.get("/:comment_id/edit", middleware.isCommentOwned, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});           
    });
});

// update route

router.put("/:comment_id", middleware.isCommentOwned, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/"+req.params.id)
        }
    });
});

// Destroy

router.delete("/:comment_id", middleware.isCommentOwned, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           req.flash("error", "Comment could not be deleted!");
           res.redirect("/campgrounds");
       } else {
           req.flash("success", "Comment deleted successfully!");
           res.redirect("/campgrounds");
       }
    });
});

module.exports = router;