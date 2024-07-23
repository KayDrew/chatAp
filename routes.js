import {config} from 'dotenv';
import crypto from 'crypto';
config();

export default function routes(){

let email;
let password;
let name;
let surname;
let comfirmPassword;

function signup(req,res){
email= req.body.email;
name= req.body.name;
surname= req.body.surname;

console.log(email+":"+name+":"+surname);

if(email && name && surname && password){

res.redirect("/");

}

else{
res.redirect("/signup");

}

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

}

}