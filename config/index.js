const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const mongoDb = process.env.MONGODB_URI;
        //console.log("monoDB uri is:", mongoDb);

        if(!mongoDb){
            throw new error("mongodb uri  variable is not defined!!!!");
        }
        const link = await mongoose.connect(mongoDb);
        console.log("EntryApp Database connected");
       // console.log(`MONODB connected: ${link.connection.host}`);
    } catch(error){
        console.log("error in Db is:", error);
        process.exit(1);
    }
};
module.exports = connectDB;