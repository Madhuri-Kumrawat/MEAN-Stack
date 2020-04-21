var bcrypt=require('bcrypt-nodejs');

module.exports=function(){
    var passport=require('passport');
    var passportLocal=require('passport-local');
    var userService=require('../services/user-services');

    //pass new instance of the passport local strategy which takes a function to verify the password
    passport.use(new passportLocal.Strategy({passwordField:'pass'},function(username,pass,next){
        userService.findUser(username,function(err,user){
            if(err){
                return next(err);
            }
            //user doesn't exist in database
            if(!user){
                return next(null,null); //Either Email or Password is incorrect
            }
            bcrypt.compare(pass,user.password,function(err,same){
                if(err){
                    return next(err);
                }
                if(!same){
                    return next(null,null);
                }
            });

            next(null,user); //no error and valid user
        });
    }));
    passport.serializeUser(function(user,next){
        next(null,user.email);//serialized version of user-here , it's just email
    });
    passport.deserializeUser(function(username,next){
        userService.findUser(username,function(err,user){
            next(err,user);//serialized version of user-here , it's just email
        });
    });
}