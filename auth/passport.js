
var localStrategy = require('passport-local').Strategy;

module.exports = function(passport, connection){

    //register strategy
    passport.use('local-Register', new localStrategy(
        {passReqToCallback: true}, 
        function(req, email, password, done){
        //check if user already exists if not throw error, else create new
        connection.query(   
            'SELECT * \
            FROM users \
            WHERE username = ?',
            [email], 
            function(err, rows) {
                //handle db error
                if (err)
                    return done(err);

                //handle user already exists warning
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } else {
                    //create a new user object with password hash
                    var newUser = {
                        username: email,
                        password: password
                        //password: bcrypt.hashSync(password, null, null)  // use the generateHash function in our user model
                    };
                //create new user in db   
                connection.query(   
                    'INSERT INTO users ( username, password ) \
                    VALUES (?,?)',
                    [newUser.email, newUser.password],
                    function(err, rows) {
                        console.log('returned user: ' + rows.email);
                        newUser.id = rows.email;
                        return done(null, newUser);
                    });
                }
            });
    }));

    //login strategy
    passport.use('local-login', new localStrategy(
        function(username, password, done){
            connection.query(   
                'SELECT Email, Username, Password, clinics.Name AS Clinic, roles.Name AS Role \
                FROM users \
                INNER JOIN clinics ON users.CLINICS_ClinicID = clinics.ClinicID \
                INNER JOIN users_has_roles ON users.Email = users_has_roles.USERS_Email \
                INNER JOIN roles ON roles.RoleID = users_has_roles.ROLES_RoleID \
                WHERE email = ?',
                [username], 
                function(err, rows){
                    //handle db error
                    if (err){
                        console.log('handle db error');
                        return done(err, null, 'handle db error');
                    }

                    //handle no user exists warning
                    if (!rows.length) {
                        console.log('user not found');
                        //return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                        return done(null, false, 'user not found');
                    }

                    // verify entered password
                    if(password !== rows[0].Password){
                        console.log('wrong password ' + JSON.stringify(rows[0]));
                        return done(null, false, 'wrong password');
                    }
                    return done(null, rows[0]); 
            }); 
    }));

    // serialize user name for session data
    passport.serializeUser(function(user, done) {
        console.log('serializeUser ' + JSON.stringify(user));
        done(null, user.Email);
    });

    // deserialize user name for session data
    passport.deserializeUser(function(email, done) {
        console.log('deserializeUser');
        connection.query('SELECT * FROM users WHERE email = ? ',[email], function(err, rows){
            done(err, rows[0]);
        });
    });
}; 