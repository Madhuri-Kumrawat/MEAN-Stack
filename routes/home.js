var express = require('express');
var router = express.Router();
var restrict  =  require('../auth/restrict');

/* GET home page. */
router.get('/',restrict, function(req, res, next) {
  res.render('home', {
     title: 'Dashboard',
     css:'1',
     firstName: req.user?req.user.name:null
     });
});

module.exports = router;