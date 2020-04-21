var User=require('../models/user').User;
var bcrypt=require('bcrypt-nodejs');

exports.addUser=function(user,next){

    bcrypt.hash(user.password,null,null,function(err,hash){
        if(err){
            return next(err);
        }
        //user.password is replaced now with hash
        var newUser=new User({
            firstName:user.firstName,
            userName:user.lastName,
            email:user.email.toLowerCase(),
            password:hash
        });
        newUser.save(function(err){
            if(err){
                return next(err);
            }else{
                return next(null);
            }
    
        });
    });
}
exports.findUser=function(email,next){
    User.findOne({email:email.toLowerCase()},function(err,user){
        next(err,user);
    });
};