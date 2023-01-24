var express = require('express');
var router = express.Router();
let controller = require('../controller');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const multer=require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

router.get('/', function(req, res, next) {
    res.send('Welcome to the API');
});

router.post('/upload',upload.single('file'),controller.file.upload);

router.post('/signup',passport.authenticate('signup',{session:false}), controller.auth.signup);
router.post('/login',async (req,res,next)=>{
    passport.authenticate('login',async(err,user,info)=>{
        try {
            if (err || !user) {
              const error = new Error('An error occurred.');
  
              return next(error);
            }
  
            req.login(
              user,
              { session: false },
              async (error) => {
                if (error) return next(error);
  
                const body = { _id: user._id, email: user.email };
                const token = jwt.sign({ user: body }, 'TOP_SECRET');
  
                res.token=token;
                return next();
              }
            );
          } catch (error) {
            return next(error);
          }
    })(req,res,next)
},controller.auth.login);

module.exports = router;