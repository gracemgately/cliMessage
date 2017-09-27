const sys = require('util');
const exec = require('child_process').exec;
let child;

child = exec('touch ./names.js && echo "module.exports=" > ./scripts/names.js && node ./scripts/fetchContacts.js >> ./scripts/names.js;', function (error, stdout, stderr) {
        if (error) console.error(error)
        return (stdout); // Show output in this case the success message
});

