var UploadModel = require('../models/UploadModel');
var UserModel = require('../models/UserModel');


var Task = function (task) {
    this.task = task.task;
};

Task.uploadIimage = async function uploadIimage(data, result) {
    var user = await UploadModel.uploadIimage(data);
    if (data.body.delete_path) {
        await UploadModel.deleteImage(data);
    }
    if (user.comment_photo_url != '') {
        var arr = data.body
        arr["user_image"] = user.comment_photo_url
        await UserModel.updateImageNameByUserCode(arr);
    }
    result(user);
}

Task.deleteImage = async function deleteImage(data, result) {
    var user = await UploadModel.deleteImage(data);
    result(user);
}

module.exports = Task;