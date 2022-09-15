const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const User = require('../models/users');
const Keys =  require('./keys');


module.exports = (passport) => {

    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = Keys.secreOrKey;

    passport.use(new JwtStrategy(opts, (jwt_payload, done) =>{

        User.findById(jwt_payload.id, (err, user)=>{
            
            if(err){
                return done(err, false);
            }
            if(user){
                return done(null, user);
            }else{
                return done(null, false);
            }

        });

    }));


}