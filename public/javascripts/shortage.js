
var loadShortageClinics = function() {
    var items = [];

    /** api call to get stock items from server */
    $.ajax({
        type: "GET",
        url: 'http://localhost:3000/api/shortage',
        dataType: "json",
        success: function(res){
            /** create list entries array */
            $.each(res, function(i, item){
                items.push('<li class="list-group-item">' + item.Name + '</li>');
            }); 
            /** append list to ul */
            $('#shortageListId').append(items.join(''));
        } ,
        error: function(res){
            console.log('error');
        }
    });

    console.log('dynamic list: ' + items);
}