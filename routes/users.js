var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Verify = require('./verify');
/*
router.get('/',Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req, res, next) {
    User.find({},function (err,users) {
      if(err) throw err;
      res.status(200).json(users);
    });
});

router.post('/register',function (req,res) {
  console.log(req.body);
  User.register(new User({username:req.body.username,category:req.body.category}),
  req.body.password,function (err,user) {
    if(err) {
      return res.status(500).json({err:err,body:req});
    }
    user.save(function (err,user) {
      passport.authenticate('local')(req,res,function () {
        return res.status(200).json({status:'Registration Successful'});
      });
    });
  });
});
*/
router.post('/login',function (req,res,next) {
  passport.authenticate('local',function (err,user,info) {
    if(err){
      return next(err);
    }
    if(!user) {
      res.status(401);
      return res.json(info);
    }
    req.logIn(user,function (err) {
      if(err) {
        return res.status(500).json({
          message: 'could not log in user'
        });
      }
      if(!(req.body.category === user.category)) {
        return res.status(500).json({
            message: 'Invalid Credentials'
        });
      }
      var token = Verify.getToken(user);
      return res.status(200).json({
        status: 'Login Successful',
        success: true,
        token: token
      });
    });
  })(req,res,next);
});

/*router.get('/logout',function (req,res) {
  req.logout();
  res.status(200).json({
    status: 'Bye'
  });
});*/
module.exports = router;
