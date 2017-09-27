const osascript = require('node-osascript')

var sendMessage = [
    '{targetPhone, targetMessage}',
    'tell application "Messages"',
    'set targetService to 1st service whose service type = iMessage',
    'set targetBuddy to buddy targetPhone of targetService',
    'send targetMessage to targetBuddy',
    'end tell', 
    'tell application "Finder"',
    'set visible of process "Messages" to false',
    'end tell',
].join('\n')

module.exports = (phoneNumber, messageToSend) => {
    osascript.execute(
        sendMessage, { targetPhone: phoneNumber, targetMessage: messageToSend }, function (err, result, raw) {
            if (err) return console.error(err)
        });
};