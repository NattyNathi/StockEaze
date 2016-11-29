signinPage = (function(){
    
    var authSubmit = function(e){
        console.log('wer submiting form');
        console.log($("#loginForm").serialize());
        e.preventDefault();
        $.ajax({
            type: "POST",
            data: $("#loginForm").serialize(),
            url: 'http://localhost:3000/signin',
            success: function(res){
                localStorage.setItem('clinicName', res.clinic);
                window.location.replace(res.redirect);
            },
            error: function(res){
                console.log('error');
            }
        });
    };

    /**
     * @type {function}
     * @desc binds relative events to their handler functions
     */
    var functionBinds = function(){
        $("#loginForm").submit(authSubmit);
    }

    /**
     * @type {function}
     * @desc loads initial data model values and binds event handler functions to relative
     *       events.
     */
    var init = function(){
        functionBinds();
    }

    /**
     * @type {object}
     * @desc module's exposed api
     */
    return{
        init : init,
    };

})();