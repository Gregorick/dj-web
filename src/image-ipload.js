const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
aws.config.update({
    secretAccessKey: 'SECRETKEY HERE',
    accessKeyId: 'KEYID HERE',
    region: 'region here'
})
const s3 = new aws.S3()
// Middlewares
const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'dj-node',
      acl: 'public-read',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: 'TESTING-META-DATA!'})
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString() + '.jpg')
      }
    })
  })

  module.exports = upload;
