//you need to install mongoose AND mongodb
//this is a common pattern

import mongoose from 'mongoose';

//you need the uri to connect to the database, its private so fetch it from env
const MONGODB_URI = process.env.MONGODB_URI;

//attempt to retrieve connection if connection was created not to long ago
let cached = (global as any).mongoose || { conn: null, promise: null }


export async function connectToDB(){
    //if the cache is connected we can just return it
    if (cached.conn) return cached.conn;

    //if we dont have the password, we cant access
    if(!MONGODB_URI) throw new Error('MongoDB_URI is missing');

    //you either connect to an existing connection(promise) or create a new connection
    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
        dbName: 'Evently',
        bufferCommands: false,
    })

    cached.conn = await cached.promise;

    return cached.conn;
}