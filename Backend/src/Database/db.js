import moongose from 'mongoose'
import { DB_NAME } from '../constant.js'

const connectDB = async () => {
    try {
        const connect = await moongose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (error) {
        console.log("MONGODB ERROR", error);
        process.exit(1)
    }
}






export default connectDB;