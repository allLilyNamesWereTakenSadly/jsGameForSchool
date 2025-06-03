/*Lily Swan-Tuomi
May 29 2025
Create a game which will go through different scenes where the gameplay is controlling a vehicle with different options for vehicle and terrain*/
var scenes = "menu";//this will change scenes throughout the game, it will start at menu as it is the first scene to be shown
var vehicle = "";//this will be used to select a vehicle, it will be empty to show whether a vehicle has been selected
var terrain = "";//simillar to the vehicle variable above, this will be used to check if a terrain has been selected
var playerY = 1;//this will be used to see which lane the player is on, it will start at 1 as arrays start counting at 0, so the player will spawn in the middle
//arrays are used as they are similar to java arrays however, I double checked with https://www.w3schools.com/js/js_arrays.asp
var lanesY = [200,250,300];//these will be the points of the lanes that will be used
//var speed = 5;//this will be used to control the speed of the obstacles
//var vspeed = 2;
//var lane = 1; //w
var enter = "";//this will be used to check if player has selected both a vehicle and a terrain, checking the enter status of the game as both must be selected
var score = 0;//this will be used to count the score of the player per each game
var highScore = 0;//this will be used to create a high score
//var obstacles = [];//
//var  obsxPos;
//var obsYPos;
//var rNum;
//var obs = [];
var sObs = [];//(selected obstacle) to show which obstacle has been selected randomly to be displayed 
var sObsLane = [];//to find and control the lane of the obstacle
var sObsXPos = [];//to find the x-coord of the obstacle to check for collision with the player
var msg = "";//to display a message for context at the beggining of each game
var endMsg = "";//to display and ending message when game is over
//functions work differently for different versions https://www.w3schools.com/js/js_functions.asp
//https://www.geeksforgeeks.org/p5-js-setup-function/
function setup(){//this is a function to set up the canvas on which the game will be displayed
  createCanvas(400,400);//this is the size of kahn academys canvas so it should also be the size of this canvas
}
function displayMenu(){//this will be used to display the menu (first scene) of the game, when called
   // score = 0;//this will reset
    background(255, 219, 233);//setting the background color
    textSize(40); //creating the text size for what is to be shown until the text size should change
    fill(255,255,255);//creating color for the aforementioned text
    text("Game!!",110,140);//displaying game title
    
    textSize(25);//changing text size as the rest of the text should not be as big as the title
    text("Click to start!!",100,250);//telling user what to do
    textSize(20);//making text smaller
    text("use up and down arrow or w and s to play",10,325);//giving instructions on what to do
};
function displaySelect(){//to display a menu for user to select vehicle and terrain
    background(181, 223, 255);//changing background colour to further indicate change
    textSize(30);//setting text size
    text("Selections!!",95,50);//indicating what scene the user is on and hinting at what user should do

  //creating box to choose car
    fill(255, 242, 255);
    rect(30,100,85,85);
    fill(255, 194, 194);
    text("Car",48,155);
    //box to choose motorcycle
    fill(255, 242, 255);
    rect(130,100,85,85);
    fill(255, 194, 194);
    text("M",150,157);
    //box to choose skateboard
    fill(255, 242, 255);
    rect(230,100,85,85);
    fill(255, 194, 194);
    text("Sk8",250,157);
    //box to choose museum heistas terrain theme
    fill(255, 242, 255);
    rect(30,220,85,85);
    fill(255, 194, 194);
    text("Mu",48,273);
    //box to choose Assassins Creed: Odyssey terrain theme
    fill(255, 242, 255);
    rect(130,220,85,85);
    fill(255, 194, 194);
    text("ac",133,273);
    //box to choose haunted terrain theme
    fill(255, 242, 255);
    rect(230,220,85,85);
    fill(255, 194, 194);
    text("scary",240,273);
    //box to show whether user has chosen both terrain and vehicle or still needs to do so based on prompt
    fill(255, 242, 255);
    rect(38,323,274,54);
    fill(255, 194, 194);
    text(enter,72,363);
    
};
function lanes(){//this will be used to display each lane in the game
  //making museum themed lanes and background 
    if(terrain === "museum"){
    background(217, 240, 255);//making background
    //first lane
    fill(236, 191, 255);
    rect(0,230,400,80);
    
    //second lane
    fill(236, 191, 255);
    rect(0,311,400,80);
      
    //third lane
    fill(236, 191, 255);
    rect(0,150,400,80);
    }
  //making ancient Greece themed lanes individually
    if(terrain === "greece"){
        background(0, 116, 232);
    fill(191, 255, 254);
    rect(0,230,400,80);
    
    
    fill(191, 255, 254);
    rect(0,311,400,80);
    
    fill(191, 255, 254);
    rect(0,150,400,80);
    }
  //making haunted themed lanes individually
    if(terrain === "scary"){
    background(0, 52, 143);
    fill(255, 219, 242);
    rect(0,230,400,80);
    
    
    fill(255, 219, 242);
    rect(0,311,400,80);
    
    fill(255, 219, 242);
    rect(0,150,400,80);
    }
    
};
function playerIcon(y){//this will be used to control the players y-coord position and icon
  //creating the car icon  
  if (vehicle === "car"){
        fill(227, 32, 97);
        rect(60,y,40,40);//creating the icon so that x = 60 so that the vehicle stays in the same place while not looking idle and y to change based on later user input
    }else if (vehicle === "motorcycle"){//creating icon so that vehicle can be motorcycle
        fill(29, 235, 201);
        rect(60,y,40,40);
    }else if (vehicle === "skateboard"){//creating vehicle so that it is a skateboard
        fill(255, 240, 74);
        rect(60,y,40,40);
    }
};

function showObs(){//to show the obstacles multiple times throughout the game
   if (scenes === "game"){//ensuring that this will only be displayed if it is on the proper scene
    if (sObs.length < 2){//checking if there is empty space in the array which will store the obstacles as < 2 obstacles would make no blank space for vehicle to move
       var obType = ["ob1","ob2"];//to randomly choose obstacles
       var chosenType = obType[floor(random(0, obType.length))];//the chosen type of obstacle depends on the randomly chosen index of the array
       var chosenLane = floor(random(0,3));//choosing a random lane for obstacle to appear on it will be 1-3 as even though the lanes are arrays 0-2 this will not function in the same way
       var xPos = 400;//this will make the obstacles start at the edge of the screen so that it starts from a fair distance
      //https://www.w3schools.com/js/js_arrays.asp - to use .push for the array
    sObs.push(chosenType);//adding the chosen type to the selected obstacle array
    sObsXPos.push(xPos);//adding the x position to the obstacle position as it will be different obstacles so it must be removed accordingly or else it will change other obstacles x-coord
    sObsLane.push(chosenLane);//adding the random lane to the lane of the obstacle so that it will be randomly added to the corresponding lane

   }
   for (var i = 0; i < sObs.length; i++){//this will ensure that obstacles are only 2 per time
       sObsXPos[i] -= 5;//this will decrease the x-coord of the obstacle at a rate of 5 per second so that it is a medium difficulty
       var y = lanesY[sObsLane[i]];//the y-coord of the obstacle will now correspond with the randomly chosen lane
       if (terrain === "museum"){//creating different obstacles per terrain theme
       if (sObs[i] === "ob1"){//creating the first obstacle
            fill(255, 0, 0);
       }else if (sObs[i] === "ob2"){//checking if the obstacle is the second one and if so creating the second obstacle
            fill(0, 255, 119);
       }
       }
        if (terrain === "greece"){//checking if terrain is greece
       if (sObs[i] === "ob1"){//checking if it is first obstacle
            fill(255, 0, 242);
       }else if (sObs[i] === "ob2"){//checking if it is second obstacle
            fill(0, 17, 255);
       }
       }
       if (terrain === "scary"){//if obstacle is haunted theme
       if (sObs[i] === "ob1"){//checking if it is first obstacle and making it
            fill(255, 196, 240);
       }else if (sObs[i] === "ob2"){//checking if it is second obstacle and then making it
            fill(136, 0, 255);
       }
       }
       rect(sObsXPos[i],y,40,40);//making the obstacles position and size

       //this is to check for collision of obstacle and player
       var obsX = sObsXPos[i];//obstacle x will be the x-coord of the randomized obstacle
       var obsLane = sObsLane[i];//same as before but with the lane
       if (obsLane === playerY && obsX < 100){
           //checking for collision as players vehicle starts at x = 60 and has a width of 40 it is what needs to be checked for collision as 60 + 40 = 100
           //since obs is the same size then if its less than 100 it is in position for collision as it will overlap
           scenes = "over";//if the vehicle has crashed then it is broken and cannot be used so the game is over so the scene should be switched to over
       }
   }
     
   for (var j = sObs.length - 1; j >= 0; j--){//this will be used to remove used obstacles from the array
     //this checks the oldest thing added (the second thing in array) as it is oldest and needs to go (not the newest that was just added due to opened availability)
       if (sObsXPos[j] < -10){//this will check its x-coord, it will check for -10 as if it were 0 then obstacles would spawn far too quickly, this gives time between new obstacles so player can move
           //https://www.w3schools.com/jsref/jsref_splice.asp 
           sObs.splice(j);//taking away the used selected obstacle
           sObsXPos.splice(j);//taking away the corresponding x-coord (as it will be the same position in array as the obstacle)
           score++;//increasing the score as user has passed an obstacle, it will increase 1 point per group of obstacle x-coord, it needs the y-coord or lane information which is why it goes first
           sObsLane.splice(j);//taking away the lane information of the obstacle
       }
     
   }
   }

};
function hiScore(){//to display users highscore per game
fill(255, 255, 255);
text("score: " + score,50,50);//to display the current score   
var newhiScore = 0;//to calculate highscore
if (scenes === "game"){//this will calculate when the score is being used
if (score > highScore){//if the score is bigger than the highscore then it is the new highscore
    highScore = score;//making the score the new highscore

}
}
    
};
function displayGame(){//to display the actual game that will be played
    background(207, 252, 255);
    lanes();//showing the lanes
    showObs();//showing the obstacles
    noFill();//getting rid of any colours that may change predetermined colours
    hiScore();//showing the high score
    var playerposY = lanesY[playerY];//the player position will be the y-coord of player corresponding with the lane the player is on
    playerIcon(playerposY);//the y postion used will be the players to show the player icon
};
function displayOver(){//to display the game over scene
    background(255, 25, 117);
    if (terrain === "museum"){//checking if the terrain was museum
        endMsg = "You knocked over a\nmultimillion dollar artifact\nhave fun paying the fine!";//displaying an ending message for the museum terrain
    }else if (terrain === "greece"){//checking if terrain is Greece
        endMsg = "you desynced :(\nthe flow of time has changed\nsocrates is now a soundcloud rapper\nwith 2 followers\n";//displaying ending message for this terrain
    }else if (terrain === "scary"){//if the terrain chosen was the haunted terrain
        endMsg = "It's alive! It's alive!\nthou hast awoken the \nmonster\nthou shalt feel its wrath";//displaying the message for this terrain
    }
    textSize(30);
    fill(255, 255, 255);
    text("Game over",115,100);//displaying that game is over
    rect(50,112,297,210);
    fill(97, 230, 217);
    text("Your Score:" + score + "\nHigh score: "+ highScore,55,143);//displaying the score
    textSize(17);
    text(endMsg,50,206);//showing the message
     textSize(30);
    fill(255, 255, 255);
    rect(50,332,299,50);
    fill(83, 230, 220);
    text("Click to Play Again",72,366);//showing user they can play again
};
function displaymsg(){//to display the message scene to provide context for each terrain
    background(251, 239, 252);
    if (terrain === "museum"){//if terrain is museum
        msg = "You have stolen a billion dollar artifact\nto avoid paying more fees\ndon't break anything while escaping";//showing museum message
    }
    else if (terrain === "greece"){//if terrain is greece
        msg = "You traveled back in time congratulations!\nembark on an epic Odyssey\n beware: do not disrupt the space time continuum";//showing corresponding message
    }
    else if (terrain === "scary"){//if terrain is haunted
        msg = "Thou hast been located in a haunted forest\nstrike not the monsters\nlest ye desire them to strike thee";//showing haunted terrain message
    }
    text(msg + "\n Click to confirm",50,50);//displaying the message
};
function reset(){//this will reset things so that if user replays they do not have any unfit values
    playerY = 1;//resetting player y to starting lane
    score = 0;//making score 0, highscore will not be reset so that it can be compared
    sObs = [];//clearing the selected obstacles
    sObsXPos = [];//clearing any x-coord of obstacles
    sObsLane = [];//clearing the lanes of the obstacles
    vehicle = "";//clearing any selected vehicle
    terrain = "";//clearing any selected terrain as none have yet to be selected
    msg = "";//clearing message as terrain has not been chosen
    endMsg = "";//clearing ending message
};

function draw(){//this will act as a main menu that will call each function accordingly
    if (scenes === "menu"){//if the scene is menu (the first scene showed) then it should be shown
        displayMenu();//showing the menu screen
    }else if (scenes === "select"){//if the scene has changed to select
        displaySelect();//showing selections screen
         if(vehicle !== "" && terrain !== ""){//if the vehicle and terrain has been selected
                    enter = "enter";//then the user can enter the game
         }else {//if both selections have not been filled then user cannot enter the game
             enter = "make selections";//telling the user they should still make a selection
         }
    }
         else if (scenes === "message"){//checking if the scene is the message scene
             displaymsg();//displaying message of context
         
    }else if (scenes === "game"){//if scene is the one where the game should be shown
        displayGame();//displaying game scene
    }else if (scenes === "over"){//checking if scene is over scene
        displayOver();//displaying over scene
    }
};
//to make a key pressed function //https://p5js.org/tutorials/organizing-code-with-functions/
function keyPressed(){//to check if a specific key has been pressed
    //keycode from https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-javascript - used to check which key has been pressed
    if (scenes === "game"){//ensuring this will only happen during the game scene
        if ((keyCode === 38 || keyCode === 87) && playerY > 0){ //checking if user has entered either the up arrow key or the 'w' key and their y-coord is not the last lane as they would then be able to infinitley go downwards
            playerY--;//moving players y-coord down by 1
        }else if ((keyCode === 40|| keyCode === 83) && playerY < 2){//checking if user has entered either the down arrow key or 's' and their y-coord is not the highest lane
            playerY++;//increasing players y-coord by 1
        }
    }
   
};

function mouseClicked(){//to check if mouse has been clicked
        if (scenes === "menu"){//checking if scenes is the menu scene and mouse has been clicked
        scenes = "select";//then it will move to the select menu
        }else if (scenes === "select"){//to check if scene is on the selections menu and the position of the mouse
            if (mouseX > 30 && mouseX < 115 && mouseY > 100 && mouseY < 185){//if mouse is in range of the car box
                vehicle = "car";//making vehicle car
            }else if (mouseX > 130 && mouseX < 215 && mouseY > 100 && mouseY < 185){//if mouse is in range or motorcycle box
                 vehicle = "motorcycle";//making vehicle motorcycle
            }else if (mouseX > 230 && mouseX < 315 && mouseY > 100 && mouseY < 185){//if mouse was clicked in range of skateboard box
                 vehicle = "skateboard";//making vehicle skateboard as it is what was clicked
            }
            
            if (mouseX > 30 && mouseX < 115 && mouseY > 220 && mouseY < 305){//checking if mouse was clicked in range of museum box
               terrain = "museum";//setting museum as terrain
            }else if (mouseX > 130 && mouseX < 215 && mouseY > 220 && mouseY < 305){//checking if mouse was clicked in range of greece
                terrain = "greece";//setting terrain as greece
            }else if (mouseX > 230 && mouseX < 315 && mouseY > 220 && mouseY < 305){//checking if mouse was clicked in range of haunted terrain
                terrain = "scary";//setting terrain as haunted terrain
            }
            if (enter === "enter"){//checking if user has finalized their choice of both terrain and vehicle
            if (mouseX > 38 && mouseX < 312 && mouseY > 323 && mouseY < 377){//checking if mouse was clicked in range of enter buttton
                    scenes = "message";//making the scene move to message
            }
                               
                }
            
        }
         else if(scenes === "over"){//if mouse was clicked while scene is the over scene
        reset();//resetting what needs to be reset
        scenes = "select";//returning to the selection screen (it will not be the menu scene as there is no use as user has already seen it)
    }
    else if (scenes === "message"){//if mouse was clicked during the message scene
        scenes = "game";//then the scene will be the game scene
    }
};
