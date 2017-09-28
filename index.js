const chalk = require('chalk'); //colors for terminal output
const clear = require('clear'); //clearing the terminal
const CLI = require('clui'); // CLI tables/spinners
const Spinner = CLI.Spinner;
const figlet = require('figlet'); //ASCII text/art
const inquirer = require('inquirer'); //interactive CLI
const Preferences = require('preferences'); //encrypted prefs
const git = require('simple-git')(); //git commands in node
const touch = require('touch');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

//FILES
const allContactsAndNumbers = require('./scripts/names');
const utilities = require('./utils')
const getPreviousMessages = require('./scripts/bashMessages')
const sendMessage = require('./scripts/sendMessage')

//OTHER IMPORTANT THINGS
const contactBook = utilities.contactOrganizer(allContactsAndNumbers);

//clear terminal at the start
clear();

//welcome header
console.log(
    chalk.magenta(
        figlet.textSync('cliMessage', {horizontalLayout: 'full'})
    )
);

function selectContact(callback){
    const choosePerson = [
        {
            name: 'send to',
            type: 'list',
            message: 'send message to:',
            choices: utilities.contactNames(contactBook),
            default: utilities.contactNames(contactBook)[0]
        }
    ]

    inquirer.prompt(choosePerson).then(answers => {
        //the person you're sending the message to
        return answers['send to'];
    })
    .then(person => {
        //the options for the number you'll choose 
        //which is associated with that person
        const chooseNumber = [
            {
                name: 'which number?',
                type: 'list',
                message: 'choose their number:',
                choices: contactBook[person],
                default: contactBook[person][0]
            }
        ]
        
        return inquirer.prompt(chooseNumber).then(answers => {
            return ([answers['which number?'], person]);
        })
    })
    .then(([phoneNumber, person])=> {
        //fetch the previous messages between you and that phoneNumber
        //from the sqlite database in user library
        //TBD!!!!! NOT WORKING!!!ASYNCHRONOUS NOONONNOO
        getPreviousMessages(phoneNumber); 
        return [phoneNumber, person];
    })
    .then(([phoneNumber, person]) => {
        return fs.readFileAsync('./scripts/prevMessages.txt', 'utf8', (err, data) =>{
            if (err) throw err;
            else return data
        })
        .then(data => {
            return [phoneNumber, person, data]
        });
    })
    .then(([phoneNumber, person, data]) => {
        data = data.split('\n')
        //display the previous five messages between you and sender
        const lastFiveMessages = utilities.messagesOrganizer(data, person).slice(-5);
        lastFiveMessages.forEach(message => {
            if (message.slice(0,2) === 'me') console.log(chalk.yellow.bold(message));
            else console.log(chalk.green.bold(message));
        })

        //write the message you want to send to the contact's phoneNumber
        const writeMessage = [
            {
                name: 'write a message',
                type: 'input',
                message: 'send message',
            }
        ]

        return inquirer.prompt(writeMessage).then(answers => {
            return([phoneNumber, answers['write a message']]);
        })
    })
    .then(([phoneNumber, messageToSend]) => {
        //send the message to the contact
        sendMessage(phoneNumber, messageToSend)
    })
    .catch(error => console.error(error))

};

selectContact(() => {
  console.log('args', arguments);
});

