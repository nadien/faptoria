var validator = require('validator');
var path = require('path');
var childProcess = require('child_process');
var phantomjs = require('phantomjs');

module.exports = {
    snapshot: function (url, callback) {
        if (validator.isURL(url)) {
            var childArgs = [
                path.join(__dirname, 'phantomjs-script.js'),
                url
            ];

            childProcess.execFile(phantomjs.path, childArgs, function (err, stdout, stderr) {
                if (err) {
                    callback(err);
                } else if (stderr) {
                    callback(new Error(stderr));
                }
                else {
                    callback(null, stdout);
                }
            });
        }
        else {
            callback(new Error('Invalid URL'));
        }
    }
};
