import { connect } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;
async function dbConnect() {
    try {
        await connect(MONGODB_URI, {
            dbName: 'Trades',
        });
        console.log("Pinged your deployment. You succesfully connected to the database!");
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default dbConnect;
