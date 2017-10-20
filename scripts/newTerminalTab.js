const exec = require('child_process').exec;
const path = require('path');
const Promise = require('bluebird');
let child;

module.exports = (command) => {
    return new Promise (
        function (resolve, reject) {
            child = exec(`osascript -e 'tell application "Terminal" to activate' -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down' -e 'tell application "Terminal" to do script "${command}" in front window'`,
                function (error, stdout, stderr) {
                    if (error) reject(error);
                    else resolve (stdout);
                    // Show output in this case the success message
                });
        });
};






