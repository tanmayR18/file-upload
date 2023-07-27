const mongoose = require('mongoose')
const nodemailer = require('nodemailer')

require('dotenv').config()

const fileSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type:String,
    },
    tags: {
        type: String,
    },
    email: {
        type: String
    }
})

// TO send the mail
fileSchema.post('save', async function (doc) {
    try{
        console.log("DOC ",doc)

        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })

        //send mail 
        let info = await transporter.sendMail({
            from: `Tanmay Rane - Frontend Developer`,
            to: doc.email,
            subject: "New file uploaded on Cloudinary",
            html: `<h2>Hello sir</h2> <p>File Uploaded View here: <a href="${doc.imageUrl}">${doc.imageUrl}</a></p>`
        })

        console.log("INFO", info)

    } catch (err) {
        console.log("Error while sending mail")
        console.error(err)
        // return res.status(500).json({
        //     success: false,
        //     message: "Erroe while sending mail",
        //     error: err
        // })
    }
})



const File = mongoose.model('File',fileSchema)
module.exports = File;