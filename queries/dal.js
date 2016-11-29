var sqldb = require('./sql');
dbcon = sqldb.dbconnection;

/////////////////////////////////////////////////////////////////////////
/**
 * database access table: countries
 */
var countryList = [];

var country = {
    name: null,
    clinicID: null
}

/** Creates new clinic entry to the db invoking stored procedure */
exports.createClinic = function(con, data, cb){
    con.query('CALL createClinic', function(err, res){
        if(err){
            //pass error on a callback
            cb(err);
        }else{
            console.log('clinic created successfuly: ' + res);
        }
    });
}

/////////////////////////////////////////////////////////////////////////

/**
 * @desc Retrieves stock level of selected medication
 * @param {string} medName name of medication
 * @param {function} cb 2 argument callback function
 */
exports.getStockLevel = function(medName, cb){
    //cb handle error
    if(!medName){
        cb(new Error('Invalid medication name'), medName);
    }else{
        //process data
        //medName = results;

        //return results through callback
        cb(null, medName);
    }
};