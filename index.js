const express = require('express')
const app = express()

require('dotenv').config()
const PORT = process.env || 3000

app.use(express.json())
const fileUpload = require('express-fileupload')
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))

const db = require('./config/database')
db.connect();

const cloudinary = require('./config/cloudinary')
cloudinary.cloudinaryConnect()

const upload = require('./routes/fileUpload')
app.use('/api/v1/upload',upload)

app.listen( PORT, () => {
    console.log(`App is running at port ${PORT}`)
})