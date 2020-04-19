var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/create', function(req, res, next) {
  res.render('users/create',{title:'Sign Up'});
});
router.post('/create', function(req, res, next) {
  var err=false;
  if(err){
      var vm={
          title:"Sign Up",
          input:req.body, 
          error:'Error Occured'
      }
      delete vm.input.pass;
      return res.render('users/create',vm);
  }

  res.redirect('home');
});
module.exports = router;
