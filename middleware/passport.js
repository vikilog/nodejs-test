const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../model/user');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use('jwt',
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_KEY,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {
      try {
        console.log('token', token);
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
    'signup',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const user = await UserModel.create({ email, password });
  
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

// ...

passport.use(
    'login',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const user = await UserModel.findOne({ email });
  
          if (!user) {
            return done(null, false, { message: 'User not found' });
          }
  
          const validate = await user.comparePassword(password, user.password);
  
          if (!validate) {
            return done(null, false, { message: 'Wrong Password' });
          }
          return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
            console.log(error);
          return done(error);
        }
      }
    )
  );  