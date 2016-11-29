

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