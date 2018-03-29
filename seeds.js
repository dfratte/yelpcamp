var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name:"First campground!", 
        image:"https://cdn.pixabay.com/photo/2017/11/24/03/04/tent-2974050_960_720.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dignissim cras tincidunt lobortis feugiat. Mattis nunc sed blandit libero volutpat. Nunc mattis enim ut tellus elementum sagittis vitae. Nulla facilisi cras fermentum odio eu feugiat pretium. Id faucibus nisl tincidunt eget. Ligula ullamcorper malesuada proin libero nunc consequat interdum varius. Nunc lobortis mattis aliquam faucibus purus in massa tempor. Ac felis donec et odio pellentesque. Vivamus at augue eget arcu dictum varius."
    },
    {
        name:"Second campground!", 
        image:"https://cdn.pixabay.com/photo/2017/09/01/22/05/recycle-2705682_960_720.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dignissim cras tincidunt lobortis feugiat. Mattis nunc sed blandit libero volutpat. Nunc mattis enim ut tellus elementum sagittis vitae. Nulla facilisi cras fermentum odio eu feugiat pretium. Id faucibus nisl tincidunt eget. Ligula ullamcorper malesuada proin libero nunc consequat interdum varius. Nunc lobortis mattis aliquam faucibus purus in massa tempor. Ac felis donec et odio pellentesque. Vivamus at augue eget arcu dictum varius."
    },
    {
        name:"Third campground!", 
        image:"https://cdn.pixabay.com/photo/2016/11/15/23/43/motorhome-1827832_960_720.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dignissim cras tincidunt lobortis feugiat. Mattis nunc sed blandit libero volutpat. Nunc mattis enim ut tellus elementum sagittis vitae. Nulla facilisi cras fermentum odio eu feugiat pretium. Id faucibus nisl tincidunt eget. Ligula ullamcorper malesuada proin libero nunc consequat interdum varius. Nunc lobortis mattis aliquam faucibus purus in massa tempor. Ac felis donec et odio pellentesque. Vivamus at augue eget arcu dictum varius."
    },
]

function seedDB(){
    // remove all campgrounds
    
    Campground.remove({}, function(err){
        if(err){
            console.log("something went wrong!");    
        }
        console.log("removed campgrounds!");
        
        // add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
               if(err){
                   console.log(err);
               } else {
                   console.log("added campground!");
                   
                   // create comment
                   Comment.create(
                       {
                            text:"Place is great, I wish it had internet",
                            author: "Homer"
                       }, function(err, comment){
                           if(err){
                               console.log(err);
                           } else {
                               campground.comments.push(comment);
                               campground.save();
                               console.log("Created new comment!");
                           }
                       });
               }
            });
        });
    });
    
    
    
    
    // add a few comments
}

module.exports = seedDB;