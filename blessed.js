//LIBRARIES
const blessed = require('blessed');

//create screen object with CSR (change-scroll-region)
var screen = blessed.screen({
    smartCSR: true
});

//title
screen.title = 'cliMessage testing';

//TODO:
//write a function that renders box with message:
//if user sends message: white with black text
//recipient message in black with white text

//figure out how to make box size correspond to 
//length of message

//create box
var box = blessed.box({
    top: 'top',
    left: 'left',
    width: '25%',
    height: '25%',
    content: 'message here',
    tags: true,
    border: {
        type: 'line'
    },
    style: {
        fg: 'black',
        bg: 'white',
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