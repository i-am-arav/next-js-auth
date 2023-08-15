import mongoose from "mongoose"


export const connect = async () => {
    try{
        mongoose.connect(process.env.MONGO_URI!)   
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('MongoDB Connected Successfuly!!!')
        })  

        connection.on('error', (err) => {
            console.log('Mongo Error' + err);
            process.exit();
        })
    }
    catch(e) {
         console.log('Something Error happened in Mongo Connection')
    }
}

