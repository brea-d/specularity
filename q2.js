let canvas;
let video;
let videoX;
let videoY;

let addCommentButtonX;
let addCommentButtonY;
let resetButtonX;
let resetButtonY;

let smileQuestionSpanX;
let smileQuestionSpanY;
let smileQuestionInputX;
let smileQuestionInputY;

let smileQuestionAnswersFieldHeaderX;
let smileQuestionAnswersFieldHeaderY;
let smileQuestionAnswersFieldX;
let smileQuestionAnswersFieldY;

let lastQuestionAnswerFieldHeaderX;
let lastQuestionAnswerFieldHeaderY;
let lastQuestionAnswerFieldX;
let lastQuestionAnswerFieldY;

let smileQuestionAnswersFieldCounter = 0;
let vibeState = false; // "false" means we start with bad vibes
let smileQuestionAnswers;

let fadeSmileQuestionAnswersFieldInAndOutInterval;

let initialQuestions = [
    "What did you think of when you woke up today?"
]

let currentQuestionIndex = 0; // Keeps track of the current question index

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);

    // div parent to position in front of bg image
    canvas.parent('sketch-holder');

    setupVideo();
    setupCommentButton();
    setupResetButton();
    setupSmileQuestionSpan();
    setupSmileQuestionInput();
    setupSmileQuestionAnswersFieldHeader();
    setupSmileQuestionAnswersField();
    setupLastQuestionAnswerFieldHeader();
    setupLastQuestionAnswerField();
    
}

function draw() {
    if (vibeState == true) {
        goodVibes();
    } else {
        badVibes();

    }

    
}



function draw() {
  if (vibeState == true) {
      goodVibes();
  } else {
      badVibes();
      
      
    

  }


  
}





// After answering what made one smile
function goodVibes() {
    background(255);
    canvas.class(''); // remove greyscale class

    document.getElementById('smileQuestionAnswersField').style.display = 'block';
    document.getElementById('smileQuestionAnswersFieldHeader').style.display = 'block';
    document.getElementById('resetButton').style.display = 'block';
    document.getElementById('lastQuestionAnswerFieldHeader').style.display = 'block';
    document.getElementById('lastQuestionAnswerField').style.display = 'block';

    document.getElementById('addCommentButton').style.display = 'none';
    document.getElementById('smileQuestionSpan').style.display = 'none';
    document.getElementById('smileQuestionInput').style.display = 'none';

    image(video, videoX, videoY);
}

// Before answering what made one smile - greyscale
function badVibes() {
    // initial bg grey color
    // background(50);
    // canvas.class('greyscale');

    // custom bg image
    document.getElementById('sketch-holder').style.backgroundImage="url(assets/bg-test-1.png)";
    document.getElementById('sketch-holder').style.backgroundSize = "window.innerHeight, window.innerWidth";

    document.getElementById('addCommentButton').style.display = 'block';
    document.getElementById('smileQuestionSpan').style.display = 'block';
    document.getElementById('smileQuestionInput').style.display = 'block';

    document.getElementById('smileQuestionAnswersField').style.display = 'none';
    document.getElementById('smileQuestionAnswersFieldHeader').style.display = 'none';
    document.getElementById('lastQuestionAnswerField').style.display = 'none';
    document.getElementById('resetButton').style.display = 'none';
    document.getElementById('lastQuestionAnswerFieldHeader').style.display = 'none';

    image(video, videoX, videoY);
}

//webcam

function setupVideo() {
    video = createCapture(VIDEO);
    video.size(windowWidth/2.5, windowHeight/2.5);
    // video.size(1000, 562);
    video.hide();

    videoX = (windowWidth - video.width) / 2
    videoY = (windowHeight - video.height) / 2

}

function setupCommentButton() {
    // Add comment button centered below video
    addCommentButton = createButton("Submit");
    addCommentButtonX = videoX * 1.5;
    addCommentButtonY = videoY + video.height + 100;
    addCommentButton.position(addCommentButtonX, addCommentButtonY);
    addCommentButton.mouseClicked(addCommentHandler);
    addCommentButton.id("addCommentButton");
}

function setupResetButton() {
    // Reset button centered below video
    resetButton = createButton("Reset");
    resetButtonX = addCommentButtonX;
    resetButtonY = addCommentButtonY;
    resetButton.position(resetButtonX, resetButtonY);
    resetButton.mouseClicked(resetHandler);
    resetButton.id("resetButton");
}

function setupSmileQuestionSpan() {
    // Question above add comment button - cycles through array
    smileQuestionSpan = createSpan(initialQuestions[currentQuestionIndex]);
    smileQuestionSpanX = addCommentButtonX - windowWidth/20;
    smileQuestionSpanY = addCommentButtonY - 100;
    smileQuestionSpan.position(smileQuestionSpanX, smileQuestionSpanY);
    smileQuestionSpan.id("smileQuestionSpan");
  }

function setupSmileQuestionInput() {
    // Answer input field next to question
    smileQuestionInput = createInput();
    smileQuestionInputX = smileQuestionSpanX + 40;
    smileQuestionInputY = smileQuestionSpanY + 40;
    smileQuestionInput.position(smileQuestionInputX, smileQuestionInputY);
    smileQuestionInput.id('smileQuestionInput');
    textAlign(CENTER);

}

function setupSmileQuestionAnswersFieldHeader() {
    smileQuestionAnswersFieldHeader = createSpan("Today's answers:")
    smileQuestionAnswersFieldHeaderX = smileQuestionSpanX - 70;
    smileQuestionAnswersFieldHeaderY = smileQuestionSpanY - 60;
    smileQuestionAnswersFieldHeader.position(smileQuestionAnswersFieldHeaderX, smileQuestionAnswersFieldHeaderY);
    smileQuestionAnswersFieldHeader.id('smileQuestionAnswersFieldHeader');
}

function setupSmileQuestionAnswersField() {
    // local storage - where the answers are stored
    smileQuestionAnswers = JSON.parse(localStorage.getItem('smileQuestionAnswers')) || [];
    smileQuestionAnswersField = createSpan("");
    smileQuestionAnswersFieldX = smileQuestionAnswersFieldHeaderX + 1;
    smileQuestionAnswersFieldY = smileQuestionAnswersFieldHeaderY + 30;
    smileQuestionAnswersField.position(smileQuestionAnswersFieldX, smileQuestionAnswersFieldY);
    smileQuestionAnswersField.id('smileQuestionAnswersField');
}

//show answer depending on the question displayed 
function showSmileQuestionAnswersCorresponding() {

}

function setupLastQuestionAnswerFieldHeader() {
    lastQuestionAnswerFieldHeader = createSpan("Your answer:")
    lastQuestionAnswerFieldHeaderX = smileQuestionAnswersFieldX;
    lastQuestionAnswerFieldHeaderY = smileQuestionAnswersFieldY + 50;
    lastQuestionAnswerFieldHeader.position(lastQuestionAnswerFieldHeaderX, lastQuestionAnswerFieldHeaderY);
    lastQuestionAnswerFieldHeader.id('lastQuestionAnswerFieldHeader');
}

function setupLastQuestionAnswerField() {
    lastQuestionAnswerField = createSpan("");
    lastQuestionAnswerFieldX = lastQuestionAnswerFieldHeaderX + 1;
    lastQuestionAnswerFieldY = lastQuestionAnswerFieldHeaderY + 30;
    lastQuestionAnswerField.position(lastQuestionAnswerFieldX, lastQuestionAnswerFieldY);
    lastQuestionAnswerField.id('lastQuestionAnswerField');
}

//test 

function addCommentHandler() {
    if (fadeSmileQuestionAnswersFieldInAndOutInterval) {
        clearInterval(fadeSmileQuestionAnswersFieldInAndOutInterval);
    }

    let smileQuestionAnswer = document.getElementById('smileQuestionInput').value.trim();
    if (smileQuestionAnswer === '') {
        alert('Please enter a comment');
        return;
    }

    document.getElementById('lastQuestionAnswerField').innerHTML = smileQuestionAnswer;

    toggleVibeState();

    document.getElementById('smileQuestionInput').value = "";

    // Add the new comment to the array
    smileQuestionAnswers.push({ question: initialQuestions[currentQuestionIndex], answer: smileQuestionAnswer });

    // Save the updated comments back to local storage
    localStorage.setItem('smileQuestionAnswers', JSON.stringify(smileQuestionAnswers));

    if (smileQuestionAnswers.length >= 2) {
        fadeSmileQuestionAnswersFieldInAndOut();
        fadeSmileQuestionAnswersFieldInAndOutInterval = setInterval(fadeSmileQuestionAnswersFieldInAndOut, 5000);
    } else {
        showSingleAnswerInSmileQuestionAnswersField();
    }
}

function resetHandler() {
    toggleVibeState();
    currentQuestionIndex = (currentQuestionIndex + 1) % initialQuestions.length;
    let currentQuestion = initialQuestions[currentQuestionIndex];
    smileQuestionSpan.html(currentQuestion);
    showCorrespondingAnswer(currentQuestion);
}

function showCorrespondingAnswer(question) {
    let answer = smileQuestionAnswers.find(item => item.question === question);
    if (answer) {
        document.getElementById('lastQuestionAnswerField').innerHTML = answer.answer;
    } else {
        document.getElementById('lastQuestionAnswerField').innerHTML = "";
    }
}


//test

function toggleVibeState() {
    vibeState = (!vibeState);
}

// Call this function with "setInterval", e.g., "setInterval(fadeSmileQuestionAnswersFieldInAndOut, 5000);"
// after "setupSmileQuestionAnswersField()" has been called
function fadeSmileQuestionAnswersFieldInAndOut() {
    // Display each comment in the comments section
    let smileQuestionAnswersField = document.getElementById('smileQuestionAnswersField');
    smileQuestionAnswersField.setAttribute("class", "text-fade");
    setTimeout(() => {
        smileQuestionAnswersField.innerHTML = smileQuestionAnswers[smileQuestionAnswersFieldCounter];
        smileQuestionAnswersField.setAttribute("class", "text-show");
    }, 1000)

    smileQuestionAnswersFieldCounter++;

    if (smileQuestionAnswersFieldCounter >= smileQuestionAnswers.length) {
        smileQuestionAnswersFieldCounter = 0;
    }
}

function showSingleAnswerInSmileQuestionAnswersField() {
    let smileQuestionAnswersField = document.getElementById('smileQuestionAnswersField');
    smileQuestionAnswersField.innerHTML = smileQuestionAnswers[0];
}

// From https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}

