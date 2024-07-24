import {config} from 'dotenv';
import bcrypt  from 'bcryptjs';
import database from './database.js';
const salt=10;
config();

export default function routes(){

let email;
let password;
let name;
let surname;
let comfirmPassword;
let error="";
const passRegex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const regex = /^([a-zA-Z]{3,})$/;

function signup(req,res){
	
email= req.body.email;
name= req.body.name;
surname= req.body.surname;
password= req.body.password;
comfirmPassword= req.body.confirmPassword; 

//console.log(email+":"+name+":"+surname);

//trim user input
name= name.trim();
surname= surname.trim();
email= email.trim();
password= password.trim();
comfirmPassword= comfirmPassword.trim();


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
console.log(name);
surname= c+d;
console.log(surname);

if(passRegex.test(password) && passRegex.test(comfirmPassword)){

if(password===comfirmPassword){

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
comfirmPassword= null;	
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

console.log(error);

}

function signupPage(req, res){

res.render("signup", {
error
});

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
signupPage

}

}