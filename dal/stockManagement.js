
/** increase (n) number of specified stock from specific clinic */
exports.addStockItem = function(itemName, count, clinicName, con, cb) {
    con.query(' UPDATE inventories \
                INNER JOIN clinics ON clinics_ClinicID = ClinicID \
                INNER JOIN item ON ITEM_ItemID = ItemID \
                SET StockCount = StockCount + ? \
                WHERE clinics.Name = ? \
                AND item.Name = ?', 
                [count, clinicName, itemName],
                function(err, res){
                    if(err){
                        cb(err, res);
                    }else{
                        cb(err, res);
                    }
    });
}

/** Reduce (n) number of specified stock from specific clinic */
exports.removeStockItem = function(itemid, count, clinicid, con, cb) {
    con.query(' UPDATE inventories \
                SET StockCount = StockCount - ? \
                WHERE clinics_ClinicID = ? \
                AND item_ItemID = ?', 
                [count, clinicid, itemid],
                function(err, res){
                    if(err){
                        console.log('got error')
                        cb(err, res);
                    }else{
                        cb(err, res);
                    }
    });
}

/** Get levels of specific stock from specific clinic */
exports.getStockLevel = function(itemName, clinicName, con, cb) {
    con.query(' SELECT StockCount \
                FROM inventories \
                INNER JOIN clinics ON clinics_ClinicID = ClinicID \
                INNER JOIN item ON ITEM_ItemID = ItemID \
                WHERE clinics.Name = ? \
                AND item.Name = ?', 
                [clinicName, itemName], function(err, res){
                    if(err){
                        cb(err, res);
                    }else{
                        cb(err, res);
                    }
                });
}

/** Get all inventories of stocked items from specific clinic */
exports.getInventoryLevel = function(clinicName, con, cb) {
    con.query(' SELECT StockCount, item.Name \
                FROM inventories \
                INNER JOIN clinics ON clinics_ClinicID = ClinicID \
                INNER JOIN item ON ITEM_ItemID = ItemID \
                WHERE clinics.Name = ?', 
                [clinicName], function(err, res){
                    if(err){
                        cb(err, res);
                    }else{
                        cb(err, res);
                    }
                });
}

/** Get list of all low stocked clinics */
exports.getAllLowStockClinics = function(con, cb) {
    con.query(' SELECT DISTINCT countries.Name,clinics.Name  \
                FROM countries \
                INNER JOIN clinics ON clinics.ClinicID = countries.CLINICS_ClinicID \
                INNER JOIN inventories ON inventories.CLINICS_ClinicID = clinics.ClinicID \
                WHERE StockCount < 5', 
                function(err, res){
                    if(err){
                        cb(err, res)
                    }else{
                        cb(err, res)
                    }
                });
}

/** Get list of all stocked items */
exports.getAllStockItems = function(con, cb){
    con.query('SELECT Name FROM item ', function(err, res){
        if(err){
            cb(err, res);
        }else{
            cb(err, res);
        }
    });
} 

/** Get all listed clinics */
exports.getAllClinics = function(con, cb) {
    con.query('SELECT Name FROM clinics ', function(err, res){
        if(err){
            cb(err, res);
        }else{
            cb(err, res);
        }
    });
}

/** Get all listed countries */
exports.getAllCountries = function(con, cb) {
    con.query('SELECT Name FROM countries ', function(err, res){
        if(err){
            cb(err, res);
        }else{
            cb(err, res);
        }
    });
}

/** Get all listed clinics with countries */
exports.getAllClinicsCountries = function(con, cb) {
    con.query(
        'SELECT IF(StockCount < 5, true, false) AS Alert,clinics.Name AS clinName, countries.Name AS couName \
        FROM clinics \
        INNER JOIN countries \
        ON clinics.ClinicID = countries.CLINICS_ClinicID \
        INNER JOIN inventories \
        ON inventories.CLINICS_ClinicID = clinics.ClinicID \
        GROUP BY clinics.Name, countries.Name', 
            function(err, res){
            if(err){
                cb(err, res);
            }else{
                cb(err, res);
            }
        });
}
