var sql = require('./BaseModel');
const path = require('path');
const mkdirp = require('mkdirp')
const uuidv4 = require('uuid/v4');
const fs = require('fs');
var Task = function (task) {
    this.task = task.task;
};

Task.uploadIimage = function uploadIimage(req) {
    return new Promise(function (resolve, reject) {
        var multer = require('multer');
        var filePathSub = '';
        var Storage = multer.diskStorage({
            destination: function (req, file, callback) {
                const userPath = req.body.upload_url;
                const subPath = '../public_images/' + userPath;
                const filePath = path.join(__dirname, subPath);
                filePathSub = userPath;
                mkdirp.sync(filePath)
                callback(null, filePath);
            },
            filename: function (req, file, callback) {
                callback(null, uuidv4() + req.body.file_type);
            }
        });
        var upload = multer({
            storage: Storage
        }).single("files");
        upload(req, {}, function (err) {
            if (!req.file) {
                const require = {
                    data: { comment_photo_url: '' },
                    error: [{ message: 'Can not find photo upload.' }],
                    upload_result: false,
                };
                resolve(require);
            } else {
                const comment_photo_url = filePathSub + "/" + req.file.filename
                const require = {
                    comment_photo_url: comment_photo_url,
                    error: [{ message: 'Upload photo complete.' }],
                    upload_result: true,
                };
                resolve(require);
            }
        });
    });
}

Task.deleteImage = function deleteImage(req) {
    return new Promise(function (resolve, reject) {
        const filePath = path.join(__dirname, "../public_images/" + req.body.delete_path);
        fs.unlink(filePath, (err) => {
            if (err) {
                const require = {
                    data: { comment_photo_url: '' },
                    error: [{ message: 'Can not find photo delete.' }],
                    upload_result: false,
                };
                resolve(require);
            } else {
                const require = {
                    data: [],
                    error: [{ message: 'Delete photo complete.' }],
                    upload_result: true,

                };
                console.log('res', require);
                resolve(require);
            }
        });
    });
}
module.exports = Task;

