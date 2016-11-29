var express = require('express');
var router = express.Router();
var isLoggedIn = require('../auth/middleware');

module.exports = function(passport){
  
  router.get('/', function(req, res, next) {
      res.redirect('/signin');
  }); 

  router.get('/signin', function(req, res, next) {
      res.render('signin', { title: 'Signin'});
  });

router.post('/signin', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
        console.log('user info: ' + JSON.stringify(user));
        if(err){ 
            console.log(err);
            return next(err) 
        }
        if (!user) {
            console.log('user is null');
            return res.render('/');
        }

        req.logIn(user, function(err) {
            if(err){ 
                return next(err); 
            }
            console.log('req.user ' + JSON.stringify(req.user));
            //redirect user based on role
            if(req.user.Role === 'Admin'){
                res.json({
                        status: true,
                        clinic: req.user.Clinic,
                        user: req.user.Username,
                        redirect: 'http://localhost:3000/admin/'
                    });
                //return res.redirect('http://localhost:3000/admin/');
            }else{
                res.json({
                        status: true,
                        clinic: req.user.Clinic,
                        user: req.user.Username,
                        redirect: 'http://localhost:3000/home'
                    });
                //return res.redirect('/home');
            }
        });
    })(req, res, next);
});
    

  router.get('/home',isLoggedIn, function(req, res, next) {
      res.render('home', { title: 'Home'});
  });

  router.get('/levels', isLoggedIn, function(req, res, next) {
      res.render('levels', { title: 'Levels'});
  });

  router.get('/shortage', isLoggedIn, function(req, res, next) {
      res.render('shortage', { title: 'Shortage'});
  });

  return router;
};

