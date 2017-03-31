var mongoose = require('mongoose');

var Users = mongoose.model('Users',{
    email: {
        type: String,
        required: true, 
        minlength: 1,
        trim: true,   
    }
});

// var newUser = new Users({
//     email: ' usmanzaheer1995  ',
// });

// newUser.save().then((doc)=>{
//     console.log(JSON.stringify(doc,undefined,2));
// }, (err)=>{
//     console.log("Could not store in Users collection ",err);
// });

module.exports = {Users};