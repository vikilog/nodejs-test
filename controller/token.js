const passport = require('passport');

module.exports=async (req, res, next) => {
    console.log('token');
   // verify token
    passport.authenticate('jwt',{session:false})
       return next();
    
}