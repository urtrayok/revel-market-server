var UploadController = require('../controllers/UploadController');
module.exports = function (app) {
    app.post('/upload-image', function (req, res) {    //  Not Controller
        UploadController.uploadIimage(req, function (err, task) {
            if (err) {
                res.send(err);
            }
            res.send(task);
        });
    })
    app.post('/delete-image', function (req, res) {
        UploadController.deleteImage(req, function (err, task) {
            if (err) {
                res.send(err);
            }
            res.send(task);
        });
    })
    
}
