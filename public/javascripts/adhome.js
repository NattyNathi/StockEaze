
var adhomePage = (function(){
    /**
     * @type {function}
     * @desc attaches clinic + relevant countries in table. list is obtained from an api call   
     */
    var loadClinics = function() {
        var items = [];

        $.ajax({
            type: "GET",
            url: 'http://localhost:3000/api/clinics',
            dataType: "json",
            success: function(res){
                var count = 1,
                    tr = ' ',
                    badge;
                console.log(JSON.stringify(res));
                $.each(res, function(i, item){
                    if(item.Alert){
                        badge = "<span class='label label-danger'>Low</span>"
                    }else{
                        badge = "<span class='label label-success'>Ok</span>"
                    }
                    tr += "<tr><th> " + count + '</td><td>' + item.clinName + '</td><td>' + item.couName + '</td><td>' + badge + '</td></tr>';
                    count++;
                });
                $('#clinicsTableBody').append(tr);
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
    var init = function(){
        loadClinics();
    }

    /**
     * @type {object}
     * @desc module's exposed api
     */
    return{
        init : init,
    };
})();

//ran on every page load
$(document).ready(function() {
    adhomePage.init();
});