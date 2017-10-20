//LIBRARIES
const blessed = require('blessed');

//UTILS
const { colorGenerator } = require('./utils')


const createMessageBox = (message, senderOrRecipient) => {
    //create screen object with CSR (change-scroll-region)
    const screen = blessed.screen({
        smartCSR: true
    });

    //title
    screen.title = 'cliMessage testing';

    //TODO:
    //figure out how to make box size correspond to 
    //length of message

    //create box
    const box = blessed.box({
        top: 'top',
        left: 'left',
        width: '25%',
        height: '25%',
        content: message,
        tags: true,
        border: {
            type: 'line'
        },
        style: {
            fg: colorGenerator('text', senderOrRecipient),
            bg: colorGenerator('box', senderOrRecipient),
            border: {
                fg: '#f0f0f0'
            },
        }
    });


    // Append our box to the screen.
    screen.append(box);

    // Quit on Escape, q, or Control-C.
    screen.key(['escape', 'q', 'C-c'], function (ch, key) {
        return process.exit(0);
    });

    // Focus our element.
    box.focus();

    // Render the screen.
    screen.render();
};

//process command-line arguments
const getArgs = (textObj) => {
    process.argv.forEach((val, index) => {
        if (index === 2) textObj.message = val;
        else if (index === 3) textObj.senderOrRecipient = val;
    });
};

//pass the command-line arguments to the messageBox function
const getCmdLineArgsAndCreateBox = () => {
    let textObj = {};
    getArgs(textObj);
    createMessageBox(textObj.message, textObj.senderOrRecipient);
};

getCmdLineArgsAndCreateBox();








