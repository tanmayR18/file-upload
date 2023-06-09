const mongoose = require('mongoose')

require('dotenv')

exports.connect = () => {
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then( () => {
        console.log("Databse connection established")
    })
    .catch( (err) => {
        console.log("Error occured while connecting database")
        console.error(err)
    })
}