const express = require('express')
const router = express.Router()

const { localFileUpload, imagesUpload, videoUpload, imageSizeReducer } = require('../controller/fileUpload')

router.post('/localFileUpload',localFileUpload)
router.post('/imagesUpload',imagesUpload)
router.post('/videoUpload',videoUpload)
router.post('/imageSizeReducer',imageSizeReducer)

module.exports = router