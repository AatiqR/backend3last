// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;


// Mongo Db intermidiate ⭐

// const mongoose = require('mongoose');
// mongoose.connect("mongodb://127.0.0.1:27017/testingendgame2")
// const userSchema = mongoose.Schema({
//     username : String,
//     NickName : String,
//     description: String,
//     categories : {
//         type: Array,
//         default: []
//     },
//     datecreated : {
//         type: Date,
//         default: Date.now()
//     }
// })
// module.exports = mongoose.model("user", userSchema);

// Authentication

const mongoose = require('mongoose');
const plm = require("passport-local-mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/testingendgame2");

const userSchema = mongoose.Schema({
    username : String,
    password : String,
    secret: String
})
userSchema.plugin(plm);
module.exports = mongoose.model("user", userSchema)
