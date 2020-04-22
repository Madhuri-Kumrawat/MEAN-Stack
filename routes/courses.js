var express = require('express');
var router = express.Router();
var restrict  =  require('../auth/restrict');

/* GET home page. */
router.get('/',restrict, function(req, res, next) {
  res.render('courses/index', {
     title: 'Courses',
     css:'1',
     firstName: req.user?req.user.name:null,
     visitorNumber:req.session.visitorNumber
     });
});

module.exports = router;