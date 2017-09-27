const sys = require('util');
const execFile = require('child_process').execFile;
const path = require('path')
let child;

module.exports = (phoneNumber) => {
    child = execFile(path.join(__dirname, '/fetchMessages.sh'),['+'+ phoneNumber],
        function (error, stdout, stderr) {
            if (error) console.error(error)
            console.log('stdout', stdout)
            return (stdout); // Show output in this case the success message
        });
}

