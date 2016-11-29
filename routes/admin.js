var express = require('express');
var router = express.Router();
var isLoggedIn = require('../auth/middleware');

module.exports = function(passport){
    //clinic list
    router.get('/', function(req, res, next) {
        res.render('adhome', { title: 'Signin'});
    }); 

    router.get('/newclinic', function(req, res, next) {
        res.render('signin', { title: 'Signin'});
    });

    router.get('/newitem', isLoggedIn, function(req, res, next) {
        res.render('view', { title: 'View'});
    });

    router.get('/newadmin', isLoggedIn, function(req, res, next) {
        res.render('shortage', { title: 'Shortage'});
    });

    return router;
};

