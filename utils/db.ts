import mongoose from 'mongoose';

type ConnectionType = { isConnected?: number | Boolean };

const connection: ConnectionType = {};

async function connect() {
  if (connection.isConnected) {
    console.log('already connected');
    return;
  }
  if (mongoose.connections.length > 0) {
    //WE HAVE CONNECTIONS IN CONNECTIONS QUEY 
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('use previous connection');
      return;
    }
    await mongoose.disconnect();
  }
  // You can also use process.env.MONGODB_URI as string but you need to add ! after it to tell TypeScript that the value of this variable is always defined.
  const db = await mongoose.connect(process.env.MONGODB_URI!);
  console.log('new connection');
  connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('not disconnected');
    }
  }
}

const db = { connect, disconnect };
export default db;
// process.env.MONGODB_URI ts error  : The error you're getting is because TypeScript does not know the type of process.env.MONGODB_URI. To fix this, you need to create a global declaration file that tells TypeScript about the process.env object.

// You can create a file called global.d.ts in the root of your project and add the following code:

// Copy code
// declare namespace NodeJS {
//   interface ProcessEnv {
//     MONGODB_URI: string;
//   }
// }
// This tells TypeScript that the process.env object has a property called MONGODB_URI which is a string. Now, when you use process.env.MONGODB_URI in your code, TypeScript will know that it's a string and will not throw an error.



// Copy code
// const db= await mongoose.connect(process.env.MONGODB_URI!)
