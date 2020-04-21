var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.user){
    return res.redirect('/home');
  }
  res.render('index', { title: 'Login',error:req.flash('error') });
});

module.exports = router;
