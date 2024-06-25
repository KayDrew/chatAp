
import createErrors from 'http-errors';
import express from 'express';
import { config } from 'dotenv';
import mongo from 'mongodb';
import cookieParser  from 'cookie-parser';
import pluralize from 'pluralize';
import logger from 'morgan';
import { engine } from 'express-handlebars';
import passport from 'passport';
import database from './database.js';
//import routes from './index.js';
import session from 'express-session';
import {ObjectId} from 'mongodb';
import LocalStrategy from 'passport-local';
import FacebookStrategy from 'passport-facebook';


const app= express();


const data= database();
//const route= routes();
app.locals.pluralize;

// view engine setup
app.set('views', 'views');
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(express.static('images'));

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
config();

//session variables
//const MongoDBStore = connectMongoDBSession(session);

/*const store = new MongoDBStore({
uri: process.env.lOCAL_URI,
  collection: 'sessions'
});*/

app.use(session({
resave: true,
secret: process.env.SECRET,
saveUninitialized: false,
cookie: {secure:true},

}));


app.use(passport.authenticate('session'));

  //persist user information in the login session
  passport.serializeUser(function(user, cb) {

	process.nextTick(function() {

  return cb(null,{

    id:user.id,
    username:user.displayName
  });

	});
  
  });

  
  passport.deserializeUser(function(user, cb) {

    process.nextTick(function(){
        return cb(null,user);
    });
  });



passport.use( new FacebookStrategy({

    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: '/oauth2/redirect/facebook',
    //include app secret to prevent malicious attacks/ unauthorised access
    enableProof: true

}, 

function(accessToken, refreshToken,profile,cb){

console.log(profile);


}


)

);




function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  };


app.get("/login/facebook", passport.authenticate('facebook'));

app.get('/oauth2/redirect/facebook',

passport.authenticate('facebook', {failureRedirect:'/', failureMessage:true}),

function(req,res){
 
    res.redirect('/home');
    
});

app.post('/logout', function(req,res){

    req.logOut(

        function(err){
            if(err){
                return next(err);
            }

            res.redirect('/');
            
        }
    );

});

app.get("/",function(req,res){

    res.render("index");
});


app.get("/chat",ensureAuthenticated, function(req,res){
  
    res.render("chat");
});


app.get("/profile", function(req,res){
  
    res.render("profile");
});

app.get("/user/editprofile", function(req,res){
  
  res.render("editProfile");
});

app.get("/login",function(req,res){

    res.render("login");
});

app.get("/signup",function(req,res){

    res.render("signup");
});

app.post("login/username", function(){

});




app.listen(3000, ()=>{
    console.log("Running on port 3000");
    });