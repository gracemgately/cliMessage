const osascript = require('node-osascript');

const fetchContacts = [
    'tell application "Contacts"',
    'set listOfContacts to {}',
    'repeat with eachContact in (get every person)',
    'repeat with eachPhoneNum in (get phones of eachContact)',
    'if label of eachPhoneNum is "mobile" then',
    'copy name of eachContact to the end of listOfContacts',
    'copy value of eachPhoneNum to the end of listOfContacts', 
    'end if',
    'end repeat',
    'end repeat',
    'return listOfContacts', 
    'end tell',
].join('\n')


osascript.execute( 
    fetchContacts, function(err, result, raw){
        if (err) return console.error(err)
        console.log(result)
});





