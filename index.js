const chalk = require('chalk'); //colors for terminal output
const clear = require('clear'); //clearing the terminal
const CLI = require('clui'); // CLI tables/spinners
const Spinner = CLI.Spinner;
const figlet = require('figlet'); //ASCII text/art
const inquirer = require('inquirer'); //interactive CLI
const Preferences = require('preferences'); //encrypted prefs
const git = require('simple-git')(); //git commands in node
const touch = require('touch');
const fs = require('fs');

//FILES
const allContactsAndNumbers = require('./scripts/names');
const utilities = require('./utils')
const getPreviousMessages = require('./scripts/bashMessages')

//OTHER IMPORTANT THINGS
const contactBook = utilities.contactOrganizer(allContactsAndNumbers);
const previousMessages = fs.readFileSync('./scripts/prevMessages.txt').toString('utf-8').split('\n')

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
    .then(([number, person])=> {
        //fetch the previous messages between you and that number
        //TBD!!!!! NOT WORKING!!!ASYNCHRONOUS NOONONNOO
        getPreviousMessages(number); 
        return [number, person];
    })
    .then(([number, person]) => {
        const lastFiveMessages = utilities.messagesOrganizer(previousMessages, person).slice(-5);
        
        lastFiveMessages.forEach(message => {
            if (message.slice(0,2) === 'me') console.log(chalk.yellow.bold(message));
            else console.log(chalk.green.bold(message));
        })

        //write the message you want to send to the contact's number
        const writeMessage = [
            {
                name: 'write a message',
                type: 'input',
                message: 'send message',
            }
        ]

        return inquirer.prompt(writeMessage).then(answers => {
            return([number, answers['write a message']]);
        })
    })
    .then(([phoneNumber, messageToSend]) => {
        //send the message to the contact
        require('./scripts/sendMessage')(phoneNumber, messageToSend)
    })

};

selectContact(() => {
  console.log('args', arguments);
});

