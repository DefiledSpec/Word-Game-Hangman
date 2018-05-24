const log = console.log;
let score = 0;

let userInput = [];
let userGuesses = userInput.length;


let beenUsed = a => {
    let usedLetter = userInput.indexOf(a);
    return (usedLetter >= 0) ? true : false;
}

let word = ['y', 'e', 'l', 'l', 'o', 'w'];
let word2 = ['y', 'e', 'l', 'l', 'o', 'w'];
let unsolved = ['_', '_', '_', '_', '_', '_'];

function checkComplete() {
    let startWord = word.toString();
    let unsolvedWord = word2.toString();
    if(startWord === unsolvedWord){ return true } else { return false }
}

function checkForLetter(Arr, char) {
    let checked = []; 
    if(beenUsed(char)) { 
        return log(`'${char}' has already been used! ${userInput.join(' ')}`);
    }else{
        userInput.push(char);
        log(`User Input: ${userInput}`);
        Arr.forEach((ltr, idx) => {
            if(ltr === char) {
                unsolved.splice(idx, 1, char);
                score++;
            }
        });  
    } 
    
    log(unsolved);
    log(score);
}

function game(char) {
    let done = checkComplete();
    log(done);
    //before we check a letter lets make sure that it hasn't already been used as to not keep incrimenting the score.
    let wordChecked = checkForLetter(word, char); // an array of booleans indicating whether the word contains a specific letter
    // log(wordChecked);
}


let started = false; // this doesn't work set to false to reset the game


log('Press any key to get started!');

document.onkeyup = function (e) {
    let key = e.key.toLowerCase();
    let code = e.keyCode;

    if(started) {
        if(code > 64 && code < 91) { //check if the key is a letter a-z
            // log(`${key} ${code} is a letter`);
            game(key);
        } else {
            log(`${key} ${code} is not a letter`);
        }
    }else{
        log(`Game started.`);
        log(unsolved)
        started = true;
    }
};

