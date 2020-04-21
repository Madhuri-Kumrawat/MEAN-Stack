var express = require('express');
var router = express.Router();

var userServices= require('../services/user-services.js');
var passport=require('passport');
var config = require('../config');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/** GEt SIgn UP Page  */
router.get('/create', function(req, res, next) {
  res.render('users/create',{title:'Sign Up'});
});

/** Register New User  */
router.post('/create', function(req, res, next) {
  userServices.addUser(req.body,function(err){
    if(err){
        var vm={
            title:"Sign Up",
            input:req.body, 
            error:err
        }
        delete vm.input.pass;
        return res.render('users/create',vm);
    } 
    req.login({username:req.body.email,pass:req.body.password},function(err){
      res.redirect('/home');
    });
  });
});

/** Login Route  */
router.post('/login',
function(req,res,next){
  req.session.visitorNumber = 20000;
  if(req.body.rememberMe){
    req.session.cookie.maxAge=config.cookieAge;
  }
  next();
},
passport.authenticate('local',{
  failureRedirect:'/',
  successRedirect:'/home',
  failureFlash:'Invalid username or password'
}),function(req,res,next){
  res.redirect('/home');
});


/** LogOut Route  */
router.get('/logout',function(req,res,next){
  req.logout();
  req.session.destroy();
  res.redirect('/');
});


module.exports = router;
