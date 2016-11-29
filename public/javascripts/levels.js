
var levelsPage = (function(){
    /**
     * @type {function}
     * @desc attach stock invetory levels to list. inventory is obtained from an api call
     * @arg {string} clinic name of clinic   
     */
    var loadStockInventory = function(clinic) {
        var items = [];

        $.ajax({
            type: "GET",
            url: 'http://localhost:3000/api/inventory?clinic=' + clinic,
            dataType: "json",
            success: function(res){
                $.each(res, function(i, item){
                    items.push('<li class="list-group-item"><span class="badge">' + item.StockCount + '</span>' + item.Name + '</li>');
                });
                $('#inventoryListId').append(items.join(''));
            } ,
            error: function(res){
                console.log('error');
            }
        });
    };

    /**
     * @type {function}
     * @desc loads initial data 
     */
    var init = function(clinic){
        loadStockInventory(clinic);
    }

    /**
     * @type {object}
     * @desc module's exposed api
     */
    return{
        init : init,
    };

})();