import { config } from 'dotenv';
import {MongoClient} from 'mongodb';
config();

export default function database(){

const URI= process.env.URI;
let mongoClient;
let collection;

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

return {

createClient,
}
    
}