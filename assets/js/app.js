const log = console.log;
let score = 0;
let streak = 0;
let guessesLeft = 11;

let started = false;

let userInput = [];

let unsolvedDiv = $('#unsolved');
let userInputDiv = $('#userInput');
let userScoreDiv = $('#userScore');
let userStreakDiv = $('#userStreak');
let startMessageDiv = $('#startMessage');
let guessesLeftDiv = $('#guessesLeft');

let word;
let unsolved;
let words = [
    'blue',
    'yellow',
    'red',
    'green',
    'orange',
    'teal',
    'gray',
    'magenta',
    'purple',
    'pink'
]

function pickWord() { //picks a random word and initializes the array
    let choice = words[Math.floor(Math.random() * words.length)];
    word = [];
    unsolved = [];
    userInput = [];
    
    for(let i = 0; i < choice.length; i++) {
        word.push(choice[i]);
        unsolved.push('_');
    }
    unsolvedDiv.text(unsolved.join(' '));
    userInputDiv.text(userInput.join(' '));
    userScoreDiv.text(score);
    userStreakDiv.text(streak);
    guessesLeftDiv.text(guessesLeft);
    //log(word)  
}

let beenUsed = a => { //bool to determine if a letter has already been used
    let usedLetter = userInput.indexOf(a);
    return (usedLetter >= 0) ? true : false;
}

function checkComplete() { //checks if the word has been completed
    let startWord = word.toString();
    let unsolvedWord = unsolved.toString();
    if(startWord === unsolvedWord){ return true } else { return false }
}

function checkForLetter(Arr, char) { //check if users letter exists in word[]
    let checked = [];
    let userGuesses = userInput.length;
    if(userGuesses === 11 && !checkComplete()) {
        score = 0;
        streak = 0;
        guessesLeft = 11;
        pickWord();
        userInputDiv.text(userInput.join(' '));
        unsolvedDiv.text(unsolved.join(' '));
        userScoreDiv.text(score);
        return alert('Too many guesses! Better luck next time!');
    }
    if(beenUsed(char)) { //check if letter has been used already
        return log(`'${char}' has already been used! ${userInput.join(' ')}`);
    }else{
        guessesLeft--;
        userInput.push(char);
        // log(`User Input: ${userInput}`);
        Arr.forEach((ltr, idx) => {
            if(ltr === char) {
                unsolved.splice(idx, 1, char);
                score++;
            }
        });  
    }
    guessesLeftDiv.text(guessesLeft);
    userInputDiv.text(userInput.join(' '));
    unsolvedDiv.text(unsolved.join(' '));
    userScoreDiv.text(score);
    
}

function game(char) { //this runs the game from the event handler
    let wordChecked = checkForLetter(word, char); // an array of booleans indicating whether the word contains a specific letter
    let done = checkComplete();
    if(done) {
        log('You Win!');
        guessesLeft = 11;
        streak++;
        pickWord();
    }
}

document.onkeyup = function (e) { //event handler
    let key = e.key.toLowerCase();
    let code = e.keyCode;
    if(started) {
        if(code > 64 && code < 91) { //check if the key is a letter a-z
            game(key);
        } else {
            log(`${key} ${code} is not a letter`);
        }
    }else{        
        startMessageDiv.text('')
        started = true;
        pickWord();
    }
};