import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';

import express from 'express';
import { GraphQLError } from 'graphql';

import typeDefs from "./typeDefs/index.js";
import resolvers from "./resolvers/index.js";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from "dotenv";





/*
mongodb+srv://sheng:masmas113@cluster0.ljj0j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

*/

/*
    MONGO_URI=mongodb+srv://sheng:masmas113@cluster0.ljj0j.mongodb.net/sheng2025?retryWrites=true&w=majority
    PORT=3000
*/

(async()=>{
    const app = express();
    const PORT = 8080;
    try{
        await mongoose.connect(
            "mongodb+srv://sheng:masmas113@cluster0.ljj0j.mongodb.net/sheng2025?retryWrites=true&w=majority"
          )
        app.disable("x-powered-by");
        const server = new ApolloServer({
            typeDefs,
            resolvers,
            context: ({ req, res }) => ({ req, res }),
            playground: true,
            
        })    
        await server.start();
        app.get("/health", (req,res)=>{
            res.status(200).send("Long live the server!!")
        })
        app.use(
            '/graphql',
            cors(), // Configure CORS as needed
            express.json(),
            expressMiddleware(server) // Use the integration's middleware
        );
        app.listen(PORT,()=>{
            console.log(`Server is running on port: ${PORT}`)
        })
    }catch(e){
        console.log(e)
        if(e!== undefined){
            console.log("Woops, error")
            console.log(e);
        }else{
            console.log("Smooth sailing, captiain")
        }
    }
})()



