import { config } from 'dotenv';
import {MongoClient} from 'mongodb';
config();

export default function database(){

const URI= process.env.URI;
let mongoClient;
let collection;
let sessionCollection;

async function createClient(){

try{
	mongoClient=new  MongoClient(URI);
await mongoClient.connect();
console.log("connected to database");
return mongoClient;
}

catch(e){
	
console.log(e);

process.exit()

}

}

async function createDB(){

try{
	
mongoClient= await createClient();
let db= mongoClient.db("chat-app");
console.log("created database");
collection = db.collection("chat-users");
console.log("created collection");
sessionCollection= db.collection("sessions");
console.log("created session collection");

}catch(e){

console.log(e);
process.exit();

}

}


async function createUser(){



}

return {

createClient,
createDB ,

}
    
}