var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var userServices= require('../services/user-services.js');

var userSchema=new Schema({
    name:{type: String,required:'FirstName is required'},
    username:{type: String,required:'USerName is required'},
    email:{type: String,required:'Email is required'},
    password:{type: String,required:'password is required'},
    created:{type: Date, default:Date.now}
});

userSchema.path('email').validate(function(value,next){
    userServices.findUser(value,function(err,user){
        if(err){
            console.log(err);
            return next(false);
        }
        next(!user);
    });
},'That EMail already exists');

var User=mongoose.model('User',userSchema);
module.exports={
        User:User
}