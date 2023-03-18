
/*############################################################################################################################################################################
#                                                                                                                                                                            #
#                                                                        Loris Egli | Janek Bont                                                                             #
#                                                                           Lernbeurteilung 1                                                                                #
#                                                                               Modul 152                                                                                    #
#                                                                                                                                                                            #
#                                                                  Erklärung der Vergleichsoperatoren                                                                        #
#                                                                                                                                                                            #
############################################################################################################################################################################*/

/*###########################################################################
#                                                                           #
#                    Customizable Variables for the Tasks                   #
#                                                                           #
###########################################################################*/

//unlimited questions
//Question | Answer
//for Aufgabe 1
var questions = [
    ["Du darfst bis 50 Franken ausgeben ist x <= 50", "true"],
    ["Eine Woche hat 7 Tage ist x >= 7", "false"],
    ["Du bist mindestens 18 Jahre alt ist x >= 18", "true"],
    ["Du hast weniger als 5 Fehlstunden ist x < 5", "true"],
    ["Er hat mehr als 12 Bücher gelesen x <= 12", "false"],
    ["Du hast mehr als 50 Kilometer zurückgelegt ist x > 50", "true"],
    ["Es ist 0 Grad ist x != 0", "false"],
    ["Du hast genau 10 Punkte erreicht ist x == 10", "true"],
    ["Du hast genau 7 Tage Urlaub genommen ist x == 7", "true"],
    ["Die Anzahl der Schüler in einer Klasse ist größer als 30 ist x <= 30", "false"],
    ["Du hast weniger als 5 Fehler gemacht ist x < 5", "true"],
    ["Das Alter des Kindes ist kleiner als 6 Jahre ist x < 6", "true"],
    ["Die Anzahl der Studenten in der Hochschule ist größer als 2'000 ist x < 2'000", "false"],
    ["Das Gebäude ist älter als 100 Jahre ist x != 100", "false"],
    ["Der Flug hat mehr als 8 Stunden Dauer ist x == 8", "false"],
    ["Die Anzahl der Wörter in dem Text ist kleiner als 500 ist x < 500", "true"],
    ["Die Anzahl der Bestellungen ist gleich 10 ist x == 10", "true"],
    ["Der Verein hat mehr als 100 Mitglieder ist x <= 100", "false"],
    ["Das Auto hat weniger als 100.000 Kilometer gelaufen ist x < 100,000", "true"]

];


//unlimited statements - only 6 will randomly be chosen. Every reload it will choose new ones
//Statement | Answer
//for Aufgabe 2
var connectsAll = [
    ["wenn x 50 beträgt", "if (x == 50)"],
    ["Wenn x nicht 50 beträgt", "if (x != 50)"],
    ["Wenn x unter 50 liegt", "if (x < 50)"],
    ["Wenn x über 50  liegt", "if (x > 50)"],
    ["Wenn x bis und mit 50 sein kann ", "if (x <= 50)"],
    ["Wenn x mindestens 50 sein muss ", "if (x >= 50)"],
    ["Wenn x eine positive Zahl ist", "if (x > 0)"],
    ["Wenn x eine negative Zahl ist", "if (x < 0)"],
    ["Wenn x nicht unter Null sein darf", "if (x >= 0)"],
    ["Wenn x nicht über Null sein darf", "if (x <= 0)"],
    ["Wenn x gleich 500 ist", "if (x == 500)"],
    ["Wenn x ungleich 500 ist", "if (x != 500)"],
    ["Wenn x kleiner als 500 ist", "if (x < 500)"],
    ["Wenn x größer als 500 ist", "if (x > 500)"],
    ["Wenn x kleiner oder gleich 500 ist", "if (x <= 500)"],
    ["Wenn x größer oder gleich 500 ist", "if (x >= 500)"]
];


/*###########################################################################
#                                                                           #
#                        Set all the global variables                       #
#                                                                           #
###########################################################################*/

//get the canvas and the context
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//set the currentScene to the first scene
var currentScene = 1;

/*###########################################################################
#                                                                           #
#                             Variables Scene 2                             #
#                                                                           #
###########################################################################*/
//set the variables for the box
var xBox = 400;
var yBox = 270;
var draggingBox = false;
var heightBox = 100;
var widthBox = 200;


var questionsCounter = 0;
var FinishedTheGame = false;

/*###########################################################################
#                                                                           #
#                             Variables Scene 3                             #
#                                                                           #
###########################################################################*/
//Statement | Answer | xStatement | yStatement | xAnswer | yAnswer
//max 6 Statements
var connects = [
    ["","","","","",""],
    ["","","","","",""],
    ["","","","","",""],
    ["","","","","",""],
    ["","","","","",""],
    ["","","","","",""]
];

//randomly choose 6 statements and fill them into the connects array
//copy the connectsAll array into a new array so the connectsAll array will not be changed
var connectsAllCopy = [];
for(var i = 0; i < connectsAll.length; i++){
    connectsAllCopy[i] = [];
    connectsAllCopy[i][0] = connectsAll[i][0];
    connectsAllCopy[i][1] = connectsAll[i][1];
}


for(var i = 0; i < 6; i++){
    var random = Math.floor(Math.random() * connectsAllCopy.length);
    
    //load the random statement into the connects array
    connects[i][0] = connectsAllCopy[random][0];
    connects[i][1] = connectsAllCopy[random][1];

    //remove the the statement from the connectsAll array
    connectsAllCopy.splice(random, 1);
}   

//set the variables for the connecting
var IsConnecting = false;
var connectedCounter = 0;

//set Variables for the Connecting Line
var LineStartX = 0;
var LineStartY = 0;
var LineEndX = 0;
var LineEndY = 0;

//array for the connected lines
var connectedLines = [];

//is the game finished?
var FinishedTheGameConnect = false;
var boxesSet = false;


/*############################################################################################################################################################################
#                                                                                                                                                                            #
#                                                                   When loaded, add Eventlisteners                                                                          #
#                                                                                                                                                                            #
############################################################################################################################################################################*/

window.onload = function() {
    /*###########################################################################
    #                                                                           #
    #                            Eventlistener | Move                           #
    #                                                                           #
    ###########################################################################*/
    canvas.addEventListener('mousemove', function(event) {
        /*###########################################################################
        #                                                                           #
        #                       Moving the Mouse on Scene 2                         #
        #                                                                           #
        ###########################################################################*/
        if(currentScene == 2){
            if(draggingBox){
                // get the mouse position
                var x = event.x;
                var y = event.y;
                var rect = canvas.getBoundingClientRect();
                x -= rect.left;
                y -= rect.top;

                // calculate the new position of the box
                xBox = x - widthBox/2;
                yBox = y - heightBox/2;
                xText = xBox + 40;
                yText = yBox + 30;

                // calculate the new position of the text
                xText = x - widthBox/2 + 10;
                yText = y - heightBox/2 + 30;

                window.requestAnimationFrame(function(actualTime){
                    loadScene2(canvas, ctx, currentScene, xBox, yBox, widthBox, heightBox);
                });
            }
        }
        /*###########################################################################
        #                                                                           #
        #                       Moving the Mouse on Scene 3                         #
        #                                                                           #
        ###########################################################################*/
        if(currentScene == 3){
            if(IsConnecting){
                // get the mouse position
                var x = event.x;
                var y = event.y;
                var rect = canvas.getBoundingClientRect();
                x -= rect.left;
                y -= rect.top;

                // calculate the new position of the box
                LineEndX = x;
                LineEndY = y;

                window.requestAnimationFrame(function(actualTime){
                    loadScene3(canvas, ctx, currentScene, connects);
                });
            }
        }
    });

    /*###########################################################################
    #                                                                           #
    #                            Eventlistener | Click                          #
    #                                                                           #
    ###########################################################################*/
    canvas.addEventListener('click', function(event) {
        // get the mouse position
        var x = event.x;
        var y = event.y;
        var rect = canvas.getBoundingClientRect();
        x -= rect.left;
        y -= rect.top;

        /*###########################################################################
        #                                                                           #
        #                   Every Click that happens on Scene 1                     #
        #                                                                           #
        ###########################################################################*/
        if (currentScene == 1){
            if(x >= 900 && x <= 980 && y >= 530 && y <= 580) {
                //if Button is clicked load Scene 2
                window.requestAnimationFrame(function(actualTime){
                    currentScene = 2;
                    loadScene2(canvas, ctx, currentScene, xBox, yBox, widthBox, heightBox);
                });
            }
        }

        /*###########################################################################
        #                                                                           #
        #                   Every Click that happens on Scene 2                     #
        #                                                                           #
        ###########################################################################*/
        if (currentScene == 2){
            //check if the Game is finished, if so - reset the Game as long as not the buttons are clicked
            if (!(x >= 20 && x <= 100 && y >= 530 && y <= 580) && !(x >= 900 && x <= 980 && y >= 530 && y <= 580) && FinishedTheGame) {
                //set the Game back to the beginning
                FinishedTheGame = false;
                draggingBox = false;
            }

            //if Button is clicked load Scene 1
            if(x >= 20 && x <= 100 && y >= 530 && y <= 580) {
                currentScene = 1;
            }

            //if Button is clicked load Scene 3
            if(x >= 900 && x <= 980 && y >= 530 && y <= 580) {
                currentScene = 3;
            }

            //if the box is clicked, set draggingBox to the opposite value
            if(x >= xBox && x <= xBox + widthBox && y >= yBox && y <= yBox + heightBox) {
                if(draggingBox == true) {
                    //read from the array if the answer is true or false
                    var answer = questions[questionsCounter][1];

                    //set timer to make the background more and more transparent
                    var i = 0.18;

                    //find center of the box
                    var xBoxCenter = xBox + widthBox/2;
                    var yBoxCenter = yBox + heightBox/2;

                    /*###########################################################################
                    #                                                                           #
                    #                        Statement placed correctly                         #
                    #                                                                           #
                    ###########################################################################*/
                    if(answer == "true" && xBoxCenter >= 50 && xBoxCenter <= 350 && yBoxCenter >= 150 && yBoxCenter <= 500) {
                        //set the xBox and yBox to the original position
                        xBox = 400;
                        yBox = 270;
                        // set the questionsCounter to the next question
                        questionsCounter++;
                    
                        //check if it was the last question
                        if(questionsCounter == questions.length) {
                            //if it was the last question, set the questionsCounter to 0
                            questionsCounter = 0;
                            FinishedTheGame = true;
                        }

                        //if the answer is true, and the box is on the green area, set the backgroundcolor to a seethrough green
                        var interval = setInterval(function() {
                            canvas.style.backgroundColor = "rgba(0, 255, 0, " + i + ")";
                            i -= 0.01;
                            if(i <= 0) {
                                canvas.style.backgroundColor = "rgba(0, 0, 0, 0)";
                                clearInterval(interval);
                            }
                            //stop the interval if another click is made
                            if(draggingBox == true) {
                                i = 0;
                            }

                        }, 10);
                        //loadScene2(canvas, ctx, currentScene, xBox, yBox, widthBox, heightBox);
                    }
                    else if(answer == "false" && xBoxCenter >= 650 && xBoxCenter <= 950 && yBoxCenter >= 150 && yBoxCenter <= 500) {
                        //set the xBox and yBox to the original position
                        xBox = 400;
                        yBox = 270;
                        // set the questionsCounter to the next question
                        questionsCounter++;

                        //check if it was the last question
                        if(questionsCounter == questions.length) {
                            //if it was the last question, set the questionsCounter to 0
                            questionsCounter = 0;
                            FinishedTheGame = true;
                        }

                        //if the answer is true, and the box is on the green area, set the backgroundcolor to a seethrough green
                        var interval = setInterval(function() {
                            canvas.style.backgroundColor = "rgba(0, 255, 0, " + i + ")";
                            i -= 0.01;
                            if(i <= 0) {
                                canvas.style.backgroundColor = "rgba(0, 0, 0, 0)";
                                clearInterval(interval);
                            }
                            //stop the interval if another click is made
                            if(draggingBox == true) {
                                i = 0;
                            }
                        }, 10);
                    }   
                    /*###########################################################################
                    #                                                                           #
                    #                          Statement placed wrong                           #
                    #                                                                           #
                    ###########################################################################*/
                    else if(answer == "false" && xBoxCenter >= 50 && xBoxCenter <= 350 && yBoxCenter >= 150 && yBoxCenter <= 500) {
                        //if the answer is false, and the box is on the green area, set the backgroundcolor to a seethrough red
                        var interval = setInterval(function() {
                            canvas.style.backgroundColor = "rgba(255, 0, 0, " + i + ")";
                            i -= 0.01;
                            if(i <= 0) {
                                canvas.style.backgroundColor = "rgba(0, 0, 0, 0)";
                                clearInterval(interval);
                            }
                            //stop the interval if another click is made
                            if(draggingBox == true) {
                                i = 0;
                            }
                        }, 10);
                    }
                    else if(answer == "true" && xBoxCenter >= 650 && xBoxCenter <= 950 && yBoxCenter >= 150 && yBoxCenter <= 500) {
                        //if the answer is true, and the box is on the red are, set the backgroundcolor to a seethrough red
                        var interval = setInterval(function() {
                            canvas.style.backgroundColor = "rgba(255, 0, 0, " + i + ")";
                            i -= 0.01;
                            if(i <= 0 || draggingBox) {
                                canvas.style.backgroundColor = "rgba(0, 0, 0, 0)";
                                clearInterval(interval);
                            }
                            //stop the interval if another click is made
                            if(draggingBox == true) {
                                i = 0;
                            }
                        }, 10);
                    }  
                }
                //switch the value of draggingBox to the opposite value to make it moving or not moving
                draggingBox = !draggingBox;
            }
        }

        /*###########################################################################
        #                                                                           #
        #                   Every Click that happens on Scene 3                     #
        #                                                                           #
        ###########################################################################*/
        if (currentScene == 3){

            if (!(x >= 20 && x <= 100 && y >= 530 && y <= 580) && FinishedTheGameConnect) {
                //set the Game back to the beginning
                FinishedTheGameConnect = false;
                //clear the connectedLines array
                connectedLines = [];
                connectedCounter = 0;

                //randomly choose 6 statements and fill them into the connects array
                //copy the connectsAll array into a new array so the connectsAll array will not be changed
                var connectsAllCopy = [];
                for(var i = 0; i < connectsAll.length; i++){
                    connectsAllCopy[i] = [];
                    connectsAllCopy[i][0] = connectsAll[i][0];
                    connectsAllCopy[i][1] = connectsAll[i][1];
                }

                for(var i = 0; i < 6; i++){
                    var random = Math.floor(Math.random() * connectsAllCopy.length);
                    
                    //load the random statement into the connects array
                    connects[i][0] = connectsAllCopy[random][0];
                    connects[i][1] = connectsAllCopy[random][1];

                    //remove the the statement from the connectsAll array
                    connectsAllCopy.splice(random, 1);
                }   
            }

            /*###########################################################################
            #                                                                           #
            #                    If it is currently NOT connecting                      #
            #                                                                           #
            ###########################################################################*/
            ConnectY2 = 80;
            ConnectX2 = 50;
            LineEndX = x;
            LineEndY = y;

            if(IsConnecting == false) {
                for(var i = 0; i < connects.length; i++){
                    //check if the click is on a Box on the left side
                    if(x >= ConnectX2 && x <= ConnectX2 + 300 && y >= ConnectY2 && y <= ConnectY2 + 60) {
                        LineStartX = ConnectX2 + 300;
                        LineStartY = ConnectY2 + 30;

                        //if a box is clicked, set the IsConnecting to true
                        IsConnecting = true;

                        //check how many lines are connected and for loop through them
                        for(var i = 0; i < connectedLines.length; i++) {
                            //check if the box is already connected with connectedLines 
                            if(LineStartX == connectedLines[i][0] && LineStartY == connectedLines[i][1]) {
                                //check if this line in connectedLines has "alreadyConnectedCorrect" ind the 4th place
                                if(connectedLines[i][4] == "alreadyConnectedCorrect") {
                                    //if it is, set the IsConnecting to false
                                    IsConnecting = false;
                                    break;
                                }

                                //remove the line from the connectedLines array
                                connectedLines.splice(i, 1);
                                connectedCounter--;
                            }
                        }                        
                    }
                    ConnectY2 += 75;
                }
            }
            /*###########################################################################
            #                                                                           #
            #                      If it is currently connecting                        #
            #                                                                           #
            ###########################################################################*/
            if(IsConnecting == true) {
                for(var i = 0; i < connects.length; i++){
                    //check if the click is on a Box on the right side
                    if(x >= 650 && x <= 950 && y >= ConnectY2 && y <= ConnectY2 + 60) {
                        LineEndX = 650;
                        LineEndY = ConnectY2 + 30;
                        checkIfConnected = true;
                        connectedCounter++;

                        //check how many lines are connected and for loop through them
                        for(var i = 0; i < connectedLines.length; i++) {
                            //check if the box is already connected with connectedLines 
                            if(LineEndX == connectedLines[i][2] && LineEndY == connectedLines[i][3]) {
                                //if the box on the right side is already connected
                                if(connectedLines[i][4] == "alreadyConnectedCorrect") {
                                    //if it is, do not add the line to the connectedLines array and leave the for loop
                                    connectedCounter--;
                                    checkIfConnected = false;
                                    break;
                                }
                                //remove the line from the connectedLines array
                                connectedLines.splice(i, 1);
                                connectedCounter--;                             
                            }
                        }
                        if(checkIfConnected == true){
                            //write the Line into the connectedLines array
                            connectedLines.push([LineStartX, LineStartY, LineEndX, LineEndY, ""]);
                            IsConnecting = false;
                        }
                        
                        /*###########################################################################
                        #                                                                           #
                        #                             Check the Answers                             #
                        #                                                                           #
                        ###########################################################################*/
                        
                        //if all boxes are connected
                        if(connectedCounter == connects.length) {
                            //check if the statements are connected correctly
                            //loop through left box to see if it is connected to the right box on the right side 
                            for(var i = 0; i < connects.length; i++) {
                                //get the connects statements x and y position of the question and the answer
                                var xPosLeft = connects[i][2];
                                var yPosLeft = connects[i][3];

                                var xPosRight = connects[i][4];
                                var yPosRight = connects[i][5];

                                //check if there is a line that connects the question and the answer
                                for(var j = 0; j < connectedLines.length; j++) {

                                    //if the line connects the question and the answer, set the answer to true
                                    if(xPosLeft == connectedLines[j][0] && yPosLeft == connectedLines[j][1] && xPosRight == connectedLines[j][2] && yPosRight == connectedLines[j][3]) {
                                        break;
                                    }

                                    //if the counter is the same as the connects length, remove the line from the connectedLines array
                                    if(j == connectedLines.length -1) {
                                        //search for the line that has x = xPosLeft, y = yPosLeft
                                        for(var k = 0; k < connectedLines.length; k++) {
                                            if(xPosLeft == connectedLines[k][0] && yPosLeft == connectedLines[k][1]) {
                                                connectedLines.splice(k, 1);
                                                connectedCounter--;
                                            }
                                        }
                                    }
                                }
                            }
                            
                            //check if all answers are correct
                            if(connectedCounter == connects.length) {
                                FinishedTheGameConnect = true;
                                boxesSet = false;
                                //reset the boxes on the right side in the connects array
                                for(var i = 0; i < connects.length; i++) {
                                    connects[i][4] = "";
                                    connects[i][5] = "";
                                }
                            }
                            else{
                                //set every connectedLines[i][4] to "alreadyConnectedCorrect"
                                for(var i = 0; i < connectedLines.length; i++) {
                                    connectedLines[i][4] = "alreadyConnectedCorrect";
                                }

                                //if not all answers are correct, set the background to red
                                var p = 0.1;
                                var interval = setInterval(function() {
                                    canvas.style.backgroundColor = "rgba(255, 0, 0, " + p + ")";
                                    p -= 0.02;
                                    if(p <= 0) {
                                        canvas.style.backgroundColor = "rgba(0, 0, 0, 0)"
                                        clearInterval(interval);
                                    }
                                }, 10); 
                            }
                        }
                    }
                    //set the ConnectY2 75 higher to check the next box
                    ConnectY2 += 75;
                }
            }

            //if Button is clicked load Scene 2
            if(x >= 20 && x <= 100 && y >= 530 && y <= 580) {
                currentScene = 2;
            }
        }
        window.requestAnimationFrame(function(actualTime){
            //loadScene + var currentScene
            if(currentScene == 1){
                loadScene1(canvas, ctx, currentScene, xBox, yBox, widthBox, heightBox);
            }
            if(currentScene == 2){
                loadScene2(canvas, ctx, currentScene, xBox, yBox, widthBox, heightBox);
            }
            if(currentScene == 3){
                loadScene3(canvas, ctx, currentScene, xBox, yBox, widthBox, heightBox);
            }
        });
    });
}

/*############################################################################################################################################################################
#                                                                                                                                                                            #
#                                                                          Scene 1 | Erklärungen                                                                             #
#                                                                                                                                                                            #
###################################################################################################################################################################L.E.|J.B.*/

function loadScene1(canvas, ctx, currentScene, xBox, yBox, widthBox, heightBox) {
    //clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //write the title
    ctx.font = "bold 26px Arial";
    ctx.fillText("Erklärung der Vergleichsoperatoren", 270, 50);

    //Description of what Vergleichsoperatoren are
    ctx.font = "20px Arial";
    ctx.fillText("Die Vergleichsoperatoren werden benutzt, um zwei Werte miteinander zu vergleichen (z.B. Wert a und b). ", 50, 120);
    ctx.fillText("Bei einem Vergleich der zwei Werten gibt es entweder true (richtig) oder false (falsch) zurück.", 50, 155);

    /*###########################################################################
    #                                                                           #
    #                   List of the Operators and Explanations                  #
    #                                                                           #
    ###########################################################################*/
    ctx.font = "20px Arial";
    ctx.fillText("Operator", 50, 250);
    ctx.fillText("Beschreibung", 200, 250);
    ctx.fillText("Beispiel", 500, 250);
    
    ctx.fillText("a == b", 50, 300);
    ctx.fillText("a gleich b", 200, 300);
    ctx.fillText("5 == 5", 500, 300);

    ctx.fillText("a != b", 50, 350);
    ctx.fillText("a nicht gleich b", 200, 350);
    ctx.fillText("3 != 5", 500, 350);

    ctx.fillText("a > b", 50, 400);
    ctx.fillText("a grösser als b", 200, 400);
    ctx.fillText("6 > 5", 500, 400);

    ctx.fillText("a < b", 50, 450);
    ctx.fillText("a kleiner als b", 200, 450);
    ctx.fillText("4 < 5", 500, 450);

    ctx.fillText("a >= b", 50, 500);
    ctx.fillText("a grösser oder gleich b", 200, 500);
    ctx.fillText("6 >= 5 | 5 >= 5", 500, 500);

    ctx.fillText("a <= b", 50, 550);
    ctx.fillText("a kleiner oder gleich b", 200, 550);
    ctx.fillText("5 <= 6 | 5 <= 5", 500, 550);

    //Button on the bottom right
    ctx.font = "40px Arial";
    ctx.strokeRect(900,530,80,50);
    ctx.fillText(">", 930, 570);
}

/*############################################################################################################################################################################
#                                                                                                                                                                            #
#                                                                           Scene 2 | Aufgabe 1                                                                              # 
#                                                                              True or False                                                                                 #
#                                                                                                                                                                            #
###################################################################################################################################################################L.E.|J.B.*/

function loadScene2(canvas, ctx, currentScene, xBox, yBox, widthBox, heightBox) {
    //clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //write the title
    ctx.font = "bold 26px Arial";
    ctx.fillText("Aufgabe 1 - Richtig oder Falsch", 300, 50);

    //subTitle
    ctx.font = "20px Arial";
    ctx.fillText("klicke Auf die Aussage in der Mitte und ordne es zu Richtig oder Falsch zu!", 160, 100);
    ctx.fillText("Du kannst jederzeit zur Erklärung zurück um nachzulesen!", 220, 130);

    //display how many questions are left
    ctx.font = "20px Arial";
    ctx.fillText("" + (questionsCounter + 1) + " / " + questions.length, 910, 50);

    //light green box on the left center
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(50, 150, 300, 350);

    //red box on the right center
    ctx.fillStyle = "red";
    ctx.fillRect(650, 150, 300, 350);

    //QuestionBox | Is movable with the mouse 
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.strokeRect(xBox, yBox, widthBox, heightBox);
    ctx.fillStyle = "white";
    ctx.fillRect(xBox, yBox, widthBox, heightBox);
    ctx.fillStyle = "black";

    /*###########################################################################
    #                                                                           #
    #                        Write the Statement in the Box                     #
    #                                                                           #
    ###########################################################################*/
    var text = questions[questionsCounter][0];
    //split the text into words
    var words = text.split(" ");
    //create a line
    var line = "";
    //create an array for the lines
    var lines = [];
    //loop through the words
    for(var i = 0; i < words.length; i++){
        var testLine = line + words[i] + " ";
        //get the stats of the text
        var stats = ctx.measureText(testLine);
        //get the width of the text
        var testWidth = stats.width;

        //if the text of the testline is too long, the line with the previous words is pushed into the lines array
        if(testWidth > (widthBox) && i > 0){
            lines.push(line);
            line = words[i] + " ";
        }else{
            //if the text is not too long, then add it to the line
            line = testLine;
        }
    }

    //push the last line into the lines array
    lines.push(line);

    //calculate the position of the text in the box so that it is centered
    var Ytextmove = 20;

    for(var i = 0; i < lines.length; i++){
        var Xtextmove = (widthBox - ctx.measureText(lines[i]).width) / 2;
        ctx.fillText(lines[i], (xBox + Xtextmove), (yBox + Ytextmove));
        Ytextmove += 20;
    }

    /*###########################################################################
    #                                                                           #
    #                            If the Game is finished                        #
    #                                                                           #
    ###########################################################################*/
    if(FinishedTheGame == true){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "bold 26px Arial";
        ctx.fillText("Du hast die Aufgabe 1 gelöst!", 300, 300);
        ctx.font = "bold 20px Arial";
        ctx.fillText("Weiter gehts unten Rechts!", 340, 350);
        ctx.font = "bold 18px Arial";
        ctx.fillText("Falls du die Aufgaben erneut lösen möchtest, klicke hier!", 240, 380);
    }

    //Button on the bottom left and right
    ctx.color = "black";
    ctx.font = "40px Arial";
    ctx.strokeRect(20,530,80,50);
    ctx.fillText("<", 50, 570);
    ctx.strokeRect(900,530,80,50);
    ctx.fillText(">", 930, 570);    
}

/*############################################################################################################################################################################
#                                                                                                                                                                            #
#                                                                           Scene 3 | Aufgabe 2                                                                              #
#                                                                           Connect Statements                                                                               #
#                                                                                                                                                                            #
###################################################################################################################################################################L.E.|J.B.*/

function loadScene3(canvas, ctx, currentScene, xBox) {
    //clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //write the title on the top middle
    ctx.font = "bold 26px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Aufgabe 2 - Verbinde!", 370, 50);

    ctx.font = "18px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Klicke ein Statement Links und verbinde es mit der dazugehörigen Antwort Rechts", 165, 70);

    //set Variables for where the boxes should be
    var ConnectX = 50;
    var ConnectY = 80;

    /*###########################################################################
    #                                                                           #
    #                   Create Boxes on the Left and Right side                 #
    #                                                                           #
    ###########################################################################*/
    for(var i = 0; i < connects.length; i++){
        //create the box on the left side
        //make a border around the box
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.fillStyle = "white";
        ctx.fillRect(ConnectX, ConnectY, 300, 60);
        ctx.strokeRect(ConnectX, ConnectY, 300, 60);
        
        ctx.font = "18px Arial";
        //write the text in the box on the left side, if the text is too long, then split it up into multiple lines
        var text = connects[i][0];
        //split the text into words
        var words = text.split(" ");
        //create a line
        var line = "";
        //create an array for the lines
        var lines = [];
        //loop through the words
        for(var j = 0; j < words.length; j++){
            var testLine = line + words[j] + " ";
            //get the stats of the text
            var stats = ctx.measureText(testLine);
            //get the width of the text
            var testWidth = stats.width;
            //if the text is too long, then split it up into multiple lines
            if(testWidth > (300) && j > 0){
                lines.push(line);
                line = words[j] + " ";
            }else{
                //if the width of the text it gets pushed into the lines array
                line = testLine;
            }
        }
        //push the last line into the lines array
        lines.push(line);
        //calculate the position of the text in the box so that it is centered
        
        var Ytextmove = (50 - (lines.length * 20)) / 2;
        //Ytextmove needs to be at least 20
        if(Ytextmove < 20){
            Ytextmove = 20;
        }
        //write the text into the box
        for(var j = 0; j < lines.length; j++){
            ctx.fillStyle = "black";
            var Xtextmove = (300 - ctx.measureText(lines[j]).width) / 2 + 5;
            ctx.fillText(lines[j], (ConnectX + Xtextmove), (ConnectY + Ytextmove));
            Ytextmove += 20;
        }

        //add the ConnectX and ConnectY to the Connects array 
        connects[i][2] = (ConnectX + 300);
        connects[i][3] = (ConnectY + 30);

        ConnectY += 75;
    }

    //check if the boxes are already set
    if(boxesSet == false){
        for(var i = 0; i < connects.length; i++){
            if(i == 5){
                boxesSet = true;
            }
            if(i < 6){
                //randomize the position of the ConnectY to randomize the boxes on the right. It is between 80 and 80 + (i * 75). Also make sure that the ConnectY is not the same as the previous one
                var random2 = Math.floor(Math.random() * 6);
                ConnectY = 80 + (random2 * 75)

                for(var j = 0; j < connects.length; j++){
                    //check if ConnectY is already used in the connects array
                    if((ConnectY + 30) == connects[j][5]){
                        //if it is used, then randomize the ConnectY again
                        var random2 = Math.floor(Math.random() * 6);
                        ConnectY = 80 + (random2 * 75)
                        //reset the j variable to 0 so that it checks again if the ConnectY is already used
                        j = -1;
                    }
                }

                //create the box on the left side
                //make a border around the box
                ctx.strokeStyle = "black";
                ctx.lineWidth = 1;
                ctx.strokeRect(ConnectX, ConnectY, 300, 60);

                //write the text in the box on the right side, if the text is too long, then split it up into multiple lines
                var text = connects[i][1];
                //split the text into words
                var words = text.split(" ");
                //create a line
                var line = "";
                //create an array for the lines
                var lines = [];
                //loop through the words
                for(var j = 0; j < words.length; j++){
                    var testLine = line + words[j] + " ";
                    //get the stats of the text
                    var stats = ctx.measureText(testLine);
                    //get the width of the text
                    var testWidth = stats.width;
                    //if the text is too long, then split it up into multiple lines
                    if(testWidth > (300) && j > 0){
                        lines.push(line);
                        line = words[j] + " ";
                    }else{
                        //if the width of the text it gets pushed into the lines array
                        line = testLine;
                    }
                }
                //push the last line into the lines array
                lines.push(line);

                //calculate the position of the text in the box so that it is centered
                var Xtextmove = (300 - ctx.measureText(lines[0]).width) / 2 + 5;
                var Ytextmove = (50 - (lines.length * 20)) / 2;

                //Ytextmove needs to be at least 20
                if(Ytextmove < 20){
                    Ytextmove = 20;
                }

                //write the text into the box
                for(var j = 0; j < lines.length; j++){
                    ctx.fillStyle = "black";
                    ctx.fillText(lines[j], (ConnectX + 500 + Xtextmove), (ConnectY + Ytextmove));
                    Ytextmove += 20;
                }

                //add the ConnectX and ConnectY to the Connects array 
                connects[i][4] = (ConnectX + 600);
                connects[i][5] = (ConnectY + 30);
            }
        }
        //reload to draw the boxes correctly
        window.requestAnimationFrame(function(actualTime){
            loadScene3(canvas, ctx, currentScene, xBox, yBox, widthBox, heightBox);
        });
    }
    else{
        for(var i = 0; i < connects.length; i++){
            //create the box on the right side
            //make a border around the box
            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";
            ctx.fillStyle = "white";
            ctx.fillRect(connects[i][4], connects[i][5] - 30, 300, 60);
            ctx.strokeRect(connects[i][4], connects[i][5] - 30, 300, 60);

            //write the text in the box on the right side, if the text is too long, then split it up into multiple lines
            var text = connects[i][1];
            //split the text into words
            var words = text.split(" ");
            //create a line
            var line = "";
            //create an array for the lines
            var lines = [];
            //loop through the words
            for(var j = 0; j < words.length; j++){
                var testLine = line + words[j] + " ";
                //get the stats of the text
                var stats = ctx.measureText(testLine);
                //get the width of the text
                var testWidth = stats.width;
                //if the text is too long, then split it up into multiple lines
                if(testWidth > (300) && j > 0){
                    lines.push(line);
                    line = words[j] + " ";
                }else{
                    //if the width of the text it gets pushed into the lines array
                    line = testLine;
                }
            }
            //push the last line into the lines array
            lines.push(line);

            //calculate the position of the text in the box so that it is centered
            var Xtextmove = (300 - ctx.measureText(lines[0]).width) / 2 + 5;
            var Ytextmove = (50 - (lines.length * 20)) / 2;

            //Ytextmove needs to be at least 20
            if(Ytextmove < 20){
                Ytextmove = 20;
            }

            //write the text into the box
            for(var j = 0; j < lines.length; j++){
                ctx.fillStyle = "black";
                ctx.fillText(lines[j], (650 + Xtextmove), (connects[i][5] + Ytextmove - 30));
                Ytextmove += 20;
            }
        }
    }

    /*###########################################################################
    #                                                                           #
    #                Draw a Line for connecting, and existing ones              #
    #                                                                           #
    ###########################################################################*/
    if(IsConnecting){
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(LineStartX, LineStartY);
        ctx.lineTo(LineEndX, LineEndY);
        ctx.stroke();
    }
    
    //for every connectedLine, draw a line
    for(var i = 0; i < connectedLines.length; i++){
        if(connectedLines[i][4] == "alreadyConnectedCorrect"){
            ctx.strokeStyle = "green";
            ctx.lineWidth = 5;
        }
        else{
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
        }        
        ctx.beginPath();
        ctx.moveTo(connectedLines[i][0], connectedLines[i][1]);
        ctx.lineTo(connectedLines[i][2], connectedLines[i][3]);
        ctx.stroke();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
    }

    /*###########################################################################
    #                                                                           #
    #                            If the Game is finished                        #
    #                                                                           #
    ###########################################################################*/

    if(FinishedTheGameConnect == true){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "bold 26px Arial";
        ctx.fillText("Du hast die Aufgabe 2 gelöst!", 300, 300);
        ctx.font = "bold 20px Arial";
        ctx.fillText("Zurück gehts unten Links!", 345, 350);
        ctx.font = "bold 18px Arial";
        ctx.fillText("Falls du die noch mehr Aufgaben lösen möchtest, klicke hier!", 230, 380);
    }
    //Button on the bottom left
    ctx.font = "40px Arial";
    ctx.strokeRect(20,530,80,50);
    ctx.fillText("<", 50, 570);
}
// load the first scene after the page has loaded
window.requestAnimationFrame(function(actualTime){
    loadScene1(canvas, ctx, currentScene, xBox, yBox, widthBox, heightBox);
});