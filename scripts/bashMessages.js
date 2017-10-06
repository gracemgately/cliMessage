const sys = require('util');
const exec = require('child_process').exec;
const path = require('path');
const Promise = require('bluebird');
let child;

module.exports = (phoneNumber) => {
    return new Promise (
        function (resolve, reject) {
            child = exec(`chmod +x scripts/fetchMessages.sh && bash scripts/fetchMessages.sh ${phoneNumber}`,
                function (error, stdout, stderr) {
                    if (error) reject(error);
                    else resolve (stdout);
                    // Show output in this case the success message
                });
        });
};

