
/** Check low stock level for a specified clinic */
exports.checkLowStock = function(params) {
    con.query(' UPDATE inventories \
                SET StockCount = StockCount + ? \
                WHERE clinics_ClinicID = ? \
                AND item_ItemID = ?', 
                [count, clinicid, itemid],
                function(err, res){
                    if(err){
                        console.log('got error')
                        cb(err);
                    }else{
                        console.log('updated successfuly: ' + JSON.stringify(res));
                    }
    });
} 
