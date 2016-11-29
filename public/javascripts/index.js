

var loadAllClinics = function() {
    var items = [];

    /** api call to get stock items from server */
    $.ajax({
        type: "GET",
        url: 'http://localhost:3000/api/clinic',
        dataType: "json",
        success: function(res){
            /** create list entries array */
            $.each(res, function(i, item){
                items.push('<li><a>' + item.Name + '</a></li>');
            });
            /** append list to ul */
            $('#clinicListId').append(items.join(''));
        } ,
        error: function(res){
            console.log('error');
        }
    });

    console.log('dynamic list: ' + items);
}

var updateCheckedIn = function(){
    $("#checkInId").text(stockUpdateDataModel.clinicName);
}

/**
 * @desc handle user's clinic selection and update model's operation clinic variable
 */
$('#clinicListId').on('click', 'li', function() {
    $("#clinicListId").val($(this).text());
    stockUpdateDataModel.clinicName = $(this).text();
    localStorage.setItem("clinicName", stockUpdateDataModel.clinicName);
    console.log('user has selected site');
    /** Navigate to home page */
    $(location).attr('href', 'http://localhost:3000/home');
   /* $.ajax({
        type: "GET",
        url: 'http://localhost:3000/home',
        success: function(res){
            console.log(JSON.stringify(res));
        } ,
        error: function(res){
            console.log('error');
            console.log(JSON.stringify(res));
        }
    }); */

    /** update ui stock count */
});