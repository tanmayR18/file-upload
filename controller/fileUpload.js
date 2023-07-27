const File = require('../models/File')
const cloudinary = require('cloudinary').v2

exports.localFileUpload = async(req, res) => {
    try{
        const file = req.files.file;
        console.log("FIle info",file)

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.'[1])}`
        file.mv(path, (err) => {
            if(err){
                console.log('Error while moving the file',err)
            }
        })

        res.json({
            success: true,
            message: "Local file uploaded Successfully"
        })
    } catch(err) {
        console.log("Not able to upload the file on the server")
        console.error(err)
    }
}

function isFileTypeSupported(type, supportedType) {
    return supportedType.includes(type)
}

async function uploadFileToCloudinary(file, folder, quality){

    const options = { 
        folder,
        resource_type: "auto"
    }

    if(quality){
        options.quality = quality
    }

    return await cloudinary.uploader.upload(file.tempFilePath, options)
}

//Handler for image upload

exports.imagesUpload = async (req, res) => {
    try{

        //data fetch
        const { name, email, tags} = req.body
        // console.log(name, email, tags)

        // console.log("Image FIles", req.files)

        const file = req.files.imageFile
        console.log(file)

        //validation
        const supportedTypes = ['jpg', 'jpeg', 'png']
        const fileType = file.name.split('.')[1].toLowerCase()

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File format not supported',
            })
        }

        //upload to the cloudinary
        const response = await uploadFileToCloudinary(file, 'naruto');
        console.log(response)

        //Entry into the db
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })


        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image successfully uploaded to cloudinary"
        })

    } catch(err){
        console.error(err)
        res.status(400).json({
            success: false,
            message: "error while uploading the file to cloudinary",
            error: err
        })
    }
}


//video upload

exports.videoUpload = async (req, res) => {
    try{

        //data fetch
        const { name, email, tags} = req.body
        console.log(name, email, tags)

        const file = req.files.videoFile
        console.log(file)

        //validation
        const supportedTypes = ['mp4', 'mov']
        const fileType = file.name.split('.')[1].toLowerCase()

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File format not supported',
            })
        }

        //upload to the cloudinary
        const response = await uploadFileToCloudinary(file, 'naruto');
        console.log(response)

        //Entry into the db
        const fileData = await File.create({
            name,
            tags,
            email,
            videoUrl:response.secure_url
        })


        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Video successfully uploaded to cloudinary"
        })

    } catch(err){
        console.error(err)
        res.status(400).json({
            success: false,
            message: "error while uploading the file to cloudinary",
            error: err
        })
    }
}


//handler for image size reducer

exports.imageSizeReducer = async (req, res) => {
    try{

        //data fetch
        const { name, email, tags} = req.body
        console.log(name, email, tags)

        const file = req.files.imageFile
        console.log(file)

        //validation
        const supportedTypes = ['jpg', 'jpeg', 'png']
        const fileType = file.name.split('.')[1].toLowerCase()

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File format not supported',
            })
        }

        //upload to the cloudinary
        const response = await uploadFileToCloudinary(file, 'naruto',40);
        console.log(response)

        //Entry into the db
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })


        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image successfully uploaded to cloudinary"
        })

    } catch(err){
        console.error(err)
        res.status(400).json({
            success: false,
            message: "error while uploading the file to cloudinary",
            error: err
        })
    }
}
