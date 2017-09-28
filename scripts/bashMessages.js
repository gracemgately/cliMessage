const sys = require('util');
const exec = require('child_process').exec;
const path = require('path')
let child;

module.exports = (phoneNumber) => {
    child = exec(`chmod +x scripts/fetchMessages.sh && bash scripts/fetchMessages.sh ${phoneNumber}`,
        function (error, stdout, stderr) {
            if (error) console.error(error)
            return (stdout); // Show output in this case the success message
        });
}

