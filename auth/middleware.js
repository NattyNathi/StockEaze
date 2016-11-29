
// route middleware to verify if user has logged in
module.exports = function(req, res, next) {

	// proceed if user has logged in
	if (req.isAuthenticated())
		return next();
	// redirect to signin if not logged in or session expired
	res.redirect('/');
}