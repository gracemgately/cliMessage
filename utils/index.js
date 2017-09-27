module.exports =
    {
        contactOrganizer: function (contactList) {
            let organizedArray = [];
            const contactObject = {};

            contactList.forEach(element => {
                if (isNaN(parseInt(element))) organizedArray.push([element])
                else organizedArray[organizedArray.length - 1].push(element)
            });

            organizedArray.forEach(element => {
                contactObject[element[0]] = element.slice(1)
            });

            return contactObject
        }, 
        contactNames: function(allContacts){
            return Object.keys(allContacts)
        },
        messagesOrganizer: function(allMessagesFromDBQuery, sender){
            var organizedArray = [];
            allMessagesFromDBQuery.forEach(message => {
                if (message[0] === '1') {
                    let newMessage = 'me: ' + message.slice(1).trim();
                    organizedArray.push(newMessage)
                }
                else if (message[0] === '0'){
                    let newMessage = sender + ': ' + message.slice(1).trim();
                    organizedArray.push(newMessage);
                }
            })
            return organizedArray;
        }
    }