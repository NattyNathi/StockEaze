var express = require('express');
var router = express.Router();
var smanagement = require('../dal/stockManagement');
var snotification = require('../dal/stockNotification');

module.exports = function(dbcon){
    var currentUserDetails = {};
    //dbcon.end();

    // Countries services
    router.get('/country', function(req, res, next) {

        smanagement.getAllCountries(dbcon, function(err, data){
            if(err){
                res.json({status: false});
            }else{
                res.json(data);
            }
        });

    }); 

    router.post('/country', function(req, res, next) {
        if(!req.body.country){
            currentUserDetails.country = req.body.country;
            res.json({status: true});
        }else{
            res.json({status: false});
        }
    });

    // Clinics services
    router.get('/clinics', function(req, res, next) {
        smanagement.getAllClinicsCountries(dbcon, function(err, data){
            if(err){
                res.json({status: false});
            }else{
                res.json(data);
            }
        });
    }); 

    router.get('/clinic', function(req, res, next) {
        smanagement.getAllClinics(dbcon, function(err, data){
            if(err){
                res.json({status: false});
            }else{
                res.json(data);
            }
        });
    }); 

    router.post('/clinic', function(req, res, next) {
        if(!req.body.clinic){
            currentUserDetails.clinic = req.body.clinic;
            res.json({status: true});
        }else{
            res.json({status: false});
        }
    });

    // Stock Items services

    router.get('/stock', function(req, res, next) {
        smanagement.getAllStockItems(dbcon, function(err, data){
            if(err){
                res.json({status: false});
            }else{
                res.json(data);
            }
        });
    }); 

    router.get('/stock/count', function(req, res, next) {
        if(req.query.name && req.query.clinic){
            smanagement.getStockLevel(req.query.name, req.query.clinic, dbcon, function(err, data){
                if(err){
                    res.json({status: false});
                }else{
                    res.json(data);
                }
            });
        }else{
            res.json({status: false});
        }
    }); 

    router.post('/stock', function(req, res, next) {
        smanagement.addStockItem(req.body.stockName, req.body.stockCount, req.body.clinicName, dbcon, function(err, data){
            if(err){
                console.log(err);
                res.json({status: false});
            }else{
                smanagement.getStockLevel(req.body.stockName, req.body.clinicName, dbcon, function(err, data){
                    if(err){
                        res.json({status: false});
                    }else{
                        res.json(data);
                    }
                });
            }
        });
    });

    // Stock Inventory services

    router.get('/inventory', function(req, res, next) {
        if(req.query.clinic){
            smanagement.getInventoryLevel(req.query.clinic, dbcon, function(err, data){
                if(err){
                    console.log(err);
                    res.json({status: false});
                }else{
                    res.json(data);
                }
            });
        }else{
            res.json({status: false});
        }
    }); 


    // Stock Shortage Clinics services

    router.get('/shortage', function(req, res, next) {
        smanagement.getAllLowStockClinics(dbcon, function(err, data){
            if(err){
                res.json({status: false});
            }else{
                res.json(data);
            }
        });
    }); 

    return router;
};
