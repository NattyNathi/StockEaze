//homepage module
var homePage = (function(){
    /**
     * @desc module's data model object to hold current clinic's info
     */
    var dModel = {
        userName: null,
        stockName: null,
        clinicName: null
    };

    /**
     * @desc setter method for the module's clinic info data model'
     */
    var setDataModel = function(stock, clinic, user){
        dModel.stockName = stock;
        dModel.clinicName = clinic;
        dModel.userName = user;
    };

    /**
     * @type {function}
     * @desc attach stocked items to meds type selection dropdown list. list
     *       is obtained from an api call
     */
    var loadStockList = function(){
        var items = [];
        var data;

        //update 'logged into' clinic on ui
        $("#checkInId").text(dModel.clinicName);
        $("#userId").text(dModel.userName);

        $.ajax({
            type: "GET",
            url: 'http://localhost:3000/api/stock',
            dataType: "json",
            success: function(res){
                $.each(res, function(i, item){
                    items.push('<li><a>' + item.Name + '</a></li>');
                });
                console.log(JSON.stringify(items));
                $('#stockListId').append(items.join(''));
            } ,
            error: function(res){
                console.log('error');
            }
        });
    };

    /**
     * @type {function}
     * @desc populate med input field with selected med item name and stock count message.
     *       function bound to event during module init.
     */
    var listSelect = function(){
        $("#stockInputField").val($(this).text());
        dModel.stockName = $(this).text();
        $.ajax({
            type: "GET",
            url: 'http://localhost:3000/api/stock/count?name=' + dModel.stockName + '&clinic=' + dModel.clinicName,
            dataType: "json",
            success: function(res){
                console.log('response ' + JSON.stringify(res));
                var count = res[0].StockCount;
                $("#stockOnHand").text(count.toString() + ' Items in Stock');
            } ,
            error: function(res){
                console.log('error');
                console.log(JSON.stringify(res));
            }
        });
    }

    /**
     * @type {function}
     * @desc increment number of stock items to add into inventory. updates
     *       the displayed stock update count as well
     */
    var plusStockCount = function(){
        var count;

        if(!$("#stockInputField").val()){
            //throw warning
            $('#stockPageHeader').after(
                '<div class="alert alert-warning alert-dismissable in ">'+
                    '<button type="button" class="close" ' + 
                            'data-dismiss="alert" aria-hidden="true">' + 
                        '&times;' + 
                    '</button>' + 
                    'Please select medication first!' + 
                '</div>');
        }else{
            count = parseInt( $("#stockCountText").text(), 10);
            if(count < 0){
                count = 0;
            }
            count++;
            $("#stockCountText").text(count.toString());
            dModel.stockCount = count;
        }
    }

    /**
     * @type {function}
     * @desc decrement number of stock items to add into inventory. updates
     *       the displayed stock update count as well
     */
    var minusStockCount = function(){
        var count;

        if(!$("#stockInputField").val()){
            //throw warning
            $('#stockPageHeader').after(
                '<div class="alert alert-warning alert-dismissable in ">'+
                    '<button type="button" class="close" ' + 
                            'data-dismiss="alert" aria-hidden="true">' + 
                        '&times;' + 
                    '</button>' + 
                    'Please select medication first!' + 
                '</div>');
        }else{
            count = parseInt( $("#stockCountText").text(), 10);
            if(count > 0){
                count = 0;
            }
            count--;
            $("#stockCountText").text(count.toString());
            dModel.stockCount = count;
        }
    }

    /**
     * @type {function}
     * @desc commit the current displayed number of stock item to update against
     *       inventory stock level. if value is negative, it will deduct and add
     *       if value is positive
     */
    var stockUpdate = function(e){
        e.preventDefault(); 
        console.log('clicke submit');

        if(!$("#stockInputField").val()){
            //throw warning
            $('#stockPageHeader').after(
                '<div class="alert alert-warning alert-dismissable in ">'+
                    '<button type="button" class="close" ' + 
                            'data-dismiss="alert" aria-hidden="true">' + 
                        '&times;' + 
                    '</button>' + 
                    'Please select medication first!' + 
                '</div>');
        }else{
            $.ajax({
                type: "POST",
                data: JSON.stringify(dModel),
                contentType: 'application/json',
                url: 'http://localhost:3000/api/stock',
                success: function(res){
                    var count = res[0].StockCount;
                    /** update current stock count and reset the count ui text */
                    $("#stockOnHand").text(count.toString() + ' Items in Stock');
                    count = 0;
                    $("#stockCountText").text(count.toString());
                    dModel.stockCount = count;
                },
                error: function(res){
                    console.log('error');
                }
            });
        }
    }

    /**
     * @type {function}
     * @desc binds relative events to their handler functions
     */
    var functionBinds = function(){
        $('#stockListId').on('click', 'li', listSelect);
        $("#stockPlusBtn").click(plusStockCount);
        $("#stockMinusBtn").click(minusStockCount);
        $("#stockForm").submit(stockUpdate);
    }

    /**
     * @type {function}
     * @desc loads initial data model values and binds event handler functions to relative
     *       events.
     */
    var init = function(stock, clinic, user){
        setDataModel(stock, clinic, user);
        loadStockList();
        functionBinds();
    }

    /**
     * @type {object}
     * @desc module's exposed api
     */
    return{
        init : init,
        setDataModel : setDataModel,
    };
})();
