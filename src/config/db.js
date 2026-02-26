const mongoose = require("mongoose")



function connectToDB(){


    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("server is connected to DB")
            // console.log(process.env.MONGO_URI)
        })
        .catch(err => {
            console.log("Error connecting to DB")
            console.error(err)
            process.exit(1) //shutting down server , if error in connecting with db
        })
}

module.exports = connectToDB