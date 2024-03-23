// // Flash Message 
// // ejs page kisi bhi type ki info dine hai that called flash message they are like alert warning and description
// // npm i connect-flash
// // put connect flash in a app.use  
// // create flash in any route 
// // any different route try to  app use 
// // expression is must to use to flash message 

// // flash message mean server kisi route par kor data banana and us route ka kisi aur route par use karna

// var express = require('express');
// var router = express.Router();
// const userModel = require('./users');

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index');
// });

// // Flash message  🔰❤️

// // router.get('/failed', function(req, res, next) {
// //   //  if login done then go to the dashboard
// //   // if not done then go to another route like error and then failed
// //   // flash allow you this route use in another route 
// //   req.flash("naam", "kasima");
// //   req.flash("name", "Aahil");
// //   res.send("Bangaya")
// // });
// // router.get('/checkkaro', function(req, res, next) { 
// //   console.log(req.flash("naam"), req.flash("name"));
// //   res.send("check on terminal")
// // });

// // Mongo Db intermidiate 👩‍💻
// router.get("/create", async function(req, res){
//   let userdata = await userModel.create({
//       username : "sualiha",
//       NickName : "dyuyuyiy",
//       description: "Kallu Farigh nikkami   ",
//       categories : ['roohafz','laddo' ,'pagal'],
//   })
//   res.send(userdata)
//   })
// // how to find the insensitive q1
//   router.get("/find", async function(req, res){ // findOne sai array mai data show hota hai 
//     var regex =  new RegExp("^SUAliha$", 'i');  //these for insensitive case  || ^ - shuruaat aisi ho  $ - end aisa ho . this for exact search
//     let find = await userModel.find({username :regex})
//     res.send(find)
//   })

//   router.get("/finder", async function(req, res){
//   // how to on categories base on value  q2
//   // let user = await userModel.find({categories:{$all: ['laddo', 'roohafz']} });

//   // Q3 how to find on date base 
//   let date = new Date("2024-1-18");
//   let date1 = new Date("2024-4-19");
// let data = await userModel.find({datecreated : { $gte: date, $lte: date1}});

//   // res.send(user) // hi from q2
//   // res.send(data);
//   })

//   // Q4 filet existence on field in mongoose 
//   router.get("/four",async function(req, res){
//   let fourth= await userModel.find({categories: {$exists: true}});
//   res.send(fourth)
//   })

// router.get("/user", async function(req, res){
//   let user = await userModel.find({
//     $expr: {
//       $and: [
//         { $gte: [{ $strLenCP : 'NickName' }, 0]},
//         { $gte: [{ $strLenCP : 'NickName' }, 1]}
//       ]
//     }
//   });
//   res.send(user);
// })
  
// module.exports = router; 
// Authentication and authancator 

// passport 
// passport local for local storage 
// passport local mongoose mongoose is si encryped and decryped code 
// install thse packages 
// npm i passport passport-local passport-local-mongoose  mongoose express-session

// write application.js code first in app.js file and write it after view engine and befor logger
// setup user.js then properly
// in idex.js try register first and then other codes as well 
var express = require('express');
var router = express.Router();
const userModel = require('./users');
const passport = require('passport');
const localStrategy = require('passport-local');
passport.use(new localStrategy(userModel.authenticate()));

router.get('/',function(req, res){
  res.render('index');
});

router.get('/profile', isLoggedIn, function(req, res){
  res.render('profile');
});

router.post('/register',function(req, res){
  var userdata = new userModel({
    username : req.body.username,
    secret: req.body.secret
  });

userModel.register(userdata, req.body.password)
.then(function(registereduser){
  passport.authenticate("local")(req, res, function(){
    res.redirect('/profile');
  })

})

});

router.post("/login", passport.authenticate("local",{
  successRedirect: "/profile",
  failureRedirect: "/login"
}), function(req, res){ })

router.get("/logout", function(req, res, next){
  req.logout(function(err){
    if (err) { return next(err); }
    res.redirect("/");
  });

})
function isLoggedIn(req, res, next){
   if (req.isAuthenticated()){ 
    return next();
  }
  res.redirect("/");
}
module.exports = router;
