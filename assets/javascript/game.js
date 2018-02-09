var wins = 0;
var currentWord = "";
var remainingLettersNumber = 12;
var guessedLetters = [];
var wordList = ['cat', 'horse', 'dog', 'sheep', 'goat', 'chicken', 'camel', 'goose', 'honeybee', 'goldfish', 'rabbit'];
var status = "New"; // status of the game 1)New 2) Playing
var correctGuessedLetters = [];
var allowKeys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' '];

document.onkeyup = function (event) {
    //starting from here
    var palyerCurrentLetter = event.key;
    displayMessage("");
    if (allowKeys.indexOf(palyerCurrentLetter) !== -1) {
        //allow only alphabet and Space Bar keys
        if (palyerCurrentLetter === " " && status !== "Playing") {  
            //1- sapace bar to start when status is New. game started A) first time B) after winning C) after losing the game
            status = "Playing";
            currentWord = createRandomWord(wordList);
            console.log("Current word: "+currentWord);
            displayCurrentWord(currentWord);
            document.getElementById("itemimage").setAttribute("src","assets/images/AnimalCategory.jpg");
            document.getElementById("winner").innerHTML="";
            document.getElementById("instruction").innerHTML="";
        }
        if(palyerCurrentLetter!==" " && status==="Playing"){
            // real key pressed game is here
            checkLetter(palyerCurrentLetter,currentWord)
            console.log("currentWord.length:"+currentWord.length);
            console.log("correctGuessedLetters.length:"+correctGuessedLetters.length);
            // Checking for winner
            if(currentWord.length===correctGuessedLetters.length){
                winner();
            }
        }
    }
    else {
        // wrong key pressed.
        displayMessage("You pressed a wrong key.");
    }
};

function displayMessage(message){
    document.getElementById("message").innerHTML=message;
}
function createRandomWord(wordList){
    var randomIndex=Math.floor((Math.random()*wordList.length)+0)
    return wordList[randomIndex];
 }
 function displayCurrentWord(currentWord){
    var finalString="";
    for(var i=0;i<currentWord.length;i++)
    {
        var aletter=currentWord[i];
        if(correctGuessedLetters.indexOf(aletter)===-1){
           finalString+="- ";
        }
        else{
            finalString+=aletter+" ";
        }
    }
    document.getElementById("currentword").innerHTML=finalString;
    document.getElementById("guessesremaining").innerHTML=remainingLettersNumber;
    document.getElementById("guessedletters").innerHTML=guessedLetters.join();
}
function checkLetter(palyerCurrentLetter, currentWord) {
   // console.log("palyerCurrentLetter: " + palyerCurrentLetter);
    if (correctGuessedLetters.indexOf(palyerCurrentLetter) === -1) { 
         //checking for multiple letter
        var index = currentWord.indexOf(palyerCurrentLetter);
        while (index !== -1) {
            correctGuessedLetters.push(palyerCurrentLetter);
            index = currentWord.indexOf(palyerCurrentLetter, index + 1); //search for the next one if exist.
        }
    }
    if (currentWord.indexOf(palyerCurrentLetter) === -1 && guessedLetters.indexOf(palyerCurrentLetter) === -1) {
        remainingLettersNumber--;
        guessedLetters.push(palyerCurrentLetter);
    }
    displayCurrentWord(currentWord);
    if(remainingLettersNumber===0)
    {
        lost();
    }
}
function lost(){
    displayMessage("You Lost.");
    status="New";
    remainingLettersNumber=12;
    guessedLetters=[];
    correctGuessedLetters=[];
    document.getElementById("instruction").innerHTML="Press <strong> SPACE BAR</strong> to get started.";
}
function winner(){
    wins++;
    document.getElementById("wins").innerHTML=wins;
    status="New";
    document.getElementById("itemimage").setAttribute("src","assets/images/"+currentWord+".jpg");
    document.getElementById("winner").innerHTML="You are Winner!!!";
    playWinner();
    currentWord="";
    remainingLettersNumber=12;
    guessedLetters=[];
    correctGuessedLetters=[];
    document.getElementById("instruction").innerHTML="Press <strong> SPACE BAR</strong> to get started.";
}
function playWinner()
    {
        var sound=new Audio("assets/horse.ogg");
        sound.msAudioCategory="SoundEffect";
        sound.load();
        sound.play();
    }

