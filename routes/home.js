var express = require('express');
var router = express.Router();
var restrict  =  require('../auth/restrict');
var course  = require('../services/course-service');

/* GET home page. */
router.get('/',restrict, function(req, res, next) {
  res.render('home', {
     title: 'Dashboard',
     css:'1',
     firstName: req.user?req.user.name:null
     });
});
/** Courses API  */
router.get('/api/courses',restrict,function(req,res,next){
  course.getCourses(function(err,courses){
    if(err){
      return res.status(500).json({error:'Failed to retrive courses'});
    }
    res.json(courses);
  });
});
/** Course DEtail API  */
router.get('/api/course-details/:courseId',restrict,function(req,res,next){
  course.getCourseDetails(req.params.courseId,function(err,course){
    if(err){
      return res.status(500).json({error:'Failed to retrive course'});
    }
    res.json(course);
  });
});



module.exports = router;