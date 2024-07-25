import {config} from 'dotenv';
import bcrypt  from 'bcryptjs';
import database from './database.js';
const salt=10;
config();

const data= new database();

export default function routes(){

let email;
let password;
let name;
let surname;
let confirmPassword;
let error="";
const passRegex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const regex = /^([a-zA-Z]{3,})$/;


function signup(req,res){
		
email= req.body.email;
name= req.body.name;
surname= req.body.surname;
password= req.body.password;
confirmPassword= req.body.confirmPassword; 


//trim user input
name= name.trim();
surname= surname.trim();
email= email.trim();
password= password.trim();
confirmPassword= confirmPassword.trim();

//check if user exists
if(data.getEmail(email)){

error="User already exists. Please, login";
res.redirect("/signup");
}

//user does not exist
else{

//check regular expressions 
if(regex.test(name)){

if(regex.test(surname)){
	
//standardise user names and surnames
var b="";
var d="";
var a= name[0].toUpperCase();
var c= surname[0].toUpperCase();


//for names
for(let i=1;i<name.length;++i){
 b+= name[i].toLowerCase();
}

//for surnames
for(let i=1;i<surname.length;++i){
 d+=surname[i].toLowerCase();
}

//assign standardised name and surname
name= a+b;
//console.log(name);
surname= c+d;
//console.log(surname);

if(passRegex.test(password) && passRegex.test(confirmPassword)){
   
if(password===confirmPassword){
	
password =hashPassword(password);

//create a new record for user
data.createUser(name,surname,email,password);

error="";
res.redirect("/");

}

else{

error="Passwords do not match";

res.redirect("/signup");
}

}

else{
password= null;
confirmPassword= null;	
error="Password should contain at least 8 characters and contain at least 1 capital letter, 1 small letter, 1 special character and 1 digit";
res.redirect("/signup");

}

}

else{
surname= null;	
error="Surname should ONLY contain letters";
res.redirect("/signup");
}

}

else{
name= null;
error="Name should ONLY contain letters";
res.redirect("/signup");
}

}

}

function signupPage(req, res){

res.render("signup", {
error
});

}



function  hashPassword(password){
	
	bcrypt.hash(password, salt).then(function (hash){
    password= hash;
 
});


}




async function confirmLogin(req,res){
	
//get user input 	
let loginEmail= req.body.email;
let loginPassword= req.body.password;
let dbEmail;
let dbPassword;

//find user email in database 
dbEmail= await data.getEmail(loginEmail);

//if email  is found
if(dbEmail){	

//find the corresponding password in database 
dbPassword= await data.getPassword(dbEmail);

//compare user password  to database  password 
bcrypt.compare(dbPassword,loginPassword).then(function(result){

//if they match 	
if(result){	

res.res.redirect("/");

}

//if they don't  match
else{

error="Incorrect email or password";
res.redirect("/login");
}

});

}

//user email could not be found
else{
error="User does not exist. You must create an account to proceed. ";
res.redirect("/login");

}

}


function login(req,res){

res.render("login",{error});

}

function getEmail(){

return email;
}

function  getPassword(){

return password;
}

function  getName(){

return name;
}

function  getSurname(){

return surname;

}

return{
signup,
getEmail,
getPassword,
getName,
getSurname,
signupPage,
confirmLogin,
login,

}

}