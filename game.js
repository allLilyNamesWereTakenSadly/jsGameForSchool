  var scenes = "menu";//this will change scenes
var vehicle = "";
//var vehicles = ["car","motorcycle","skateboard"];
//var setting  = ["mueseum","greece","other"];
var terrain = "";
var playerY = 1;//1 bc 012 1 is middle i might do array for lanes
//arrays are used as they are similar to java arrays however, I double checked with https://www.w3schools.com/js/js_arrays.asp
var lanesY = [150,250,350];//max min starting points for barriers
var speed = 5;//like those increasing
var vspeed = 2;
var lane = 1; //we want this the same as player start point bc yeah
var enter = "";
var score = 0;
var highScore = 0;
var obstacles = [];
var  obsxPos;
var obsYPos;
var rNum;
var obs = [];
var sObs = [];
var sObsLane = [];
var sObsXPos = [];
var msg = "";
var endMsg = "";
//functions work differently for different versions https://www.w3schools.com/js/js_functions.asp
function canvas(){
  createCanvas(400,400);//this is the size of kahn academys canvas
}
function displayMenu(){
    score = 0;
    background(255, 219, 233);
    textSize(40);   
    text("Game!!",110,140);
    
    textSize(25);
    text("Click to start!!",100,250);
    textSize(20);
    text("use up and down arrow or w and s to play",10,325);
};
function displaySelect(){
    background(181, 223, 255);
    textSize(30);
    text("Selections!!",95,50);
    
    fill(255, 242, 255);
    rect(30,100,85,85);
    fill(255, 194, 194);
    text("Car",48,155);
    
    fill(255, 242, 255);
    rect(130,100,85,85);
    fill(255, 194, 194);
    text("M",150,157);
    
    fill(255, 242, 255);
    rect(230,100,85,85);
    fill(255, 194, 194);
    text("Sk8",250,157);
    
    fill(255, 242, 255);
    rect(30,220,85,85);
    fill(255, 194, 194);
    text("Mu",48,273);
    
    fill(255, 242, 255);
    rect(130,220,85,85);
    fill(255, 194, 194);
    text("ac",133,273);
    
    fill(255, 242, 255);
    rect(230,220,85,85);
    fill(255, 194, 194);
    text("scary",240,273);
    
    fill(255, 242, 255);
    rect(38,323,274,54);
    fill(255, 194, 194);
    text(enter,72,363);
    
    //if vehicle status = yes if terrain status = yes enter = "click to enter!"
};
function lanes(){
    if(terrain === "mueseum"){
    background(217, 240, 255);
    fill(236, 191, 255);
    rect(0,230,400,80);
    
    
    fill(236, 191, 255);
    rect(0,311,400,80);
    
    fill(236, 191, 255);
    rect(0,150,400,80);
    }
    if(terrain === "greece"){
        background(0, 116, 232);
    fill(191, 255, 254);
    rect(0,230,400,80);
    
    
    fill(191, 255, 254);
    rect(0,311,400,80);
    
    fill(191, 255, 254);
    rect(0,150,400,80);
    }
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
//double checked function parameters (as they are similar to java methods) with https://www.w3schools.com/js/js_functions.asp
function playerIcon(y){
    if (vehicle === "car"){
        fill(227, 32, 97);
        rect(60,y,40,40);
        //60 bc stays same y bc moves to the three lanes
    }else if (vehicle === "motorcycle"){
        fill(29, 235, 201);
        rect(60,y,40,40);
    }else if (vehicle === "skateboard"){
        fill(255, 240, 74);
        rect(60,y,40,40);
    }
};

function showObs(){
    //var emptySpace = true;
   if (scenes === "game"){
    if (sObs.length < 2){
       var obType = ["ob1","ob2","ob2"];
       var chosenType = obType[floor(random(0, obType.length))];
       var chosenLane = floor(random(0,3));
       var xPos = 400;
    sObs.push(chosenType);
    sObsXPos.push(xPos);
    sObsLane.push(chosenLane);
    
   
   //emptySpace = false;
   }
   for (var i = 0; i < sObs.length; i++){
       sObsXPos[i] -= 5;
       var y = lanesY[sObsLane[i]];
       if (terrain === "mueseum"){
       if (sObs[i] === "ob1"){
            fill(255, 0, 0);
       }else if (sObs[i] === "ob2"){
            fill(0, 255, 119);
       }
       }
        if (terrain === "greece"){
       if (sObs[i] === "ob1"){
            fill(255, 0, 242);
       }else if (sObs[i] === "ob2"){
            fill(0, 17, 255);
       }
       }
       if (terrain === "scary"){
       if (sObs[i] === "ob1"){
            fill(255, 196, 240);
       }else if (sObs[i] === "ob2"){
            fill(136, 0, 255);
       }
       }
       rect(sObsXPos[i],y,40,40);
       
       var obsX = sObsXPos[i];
       var obsLane = sObsLane[i];
       if (obsLane === playerY && obsX < 100){
           //because players vehicle starts at x = 60 and has a width of 40 it is what needs to be checked for collision as 60 + 40 = 100
           //since obs is the same size then if its less than 100 it is in position for collision as it will overlap
           scenes = "over";
       }
   }
     
   for (var j = sObs.length - 1; j >= 0; j--){
       if (sObsXPos[j] < -10){
           //https://www.w3schools.com/jsref/jsref_splice.asp 
           sObs.splice(j);
           sObsXPos.splice(j);
           score++;
           sObsLane.splice(j);
           //emptySpace = true;
       }
     
   }
   }

};
function hiScore(){
fill(255, 255, 255);
text(score,50,50);   
var newhiScore = 0;
if (scenes === "game"){
if (score > highScore){
    highScore = score;

}
}
    
};
function displayGame(){
    background(207, 252, 255);
    lanes();
    showObs();
    noFill();
    hiScore();
    var playerposY = lanesY[playerY];
    playerIcon(playerposY);

    // lane = playerY;
    // playerIcon(playerY);
// }
};
function displayOver(){
    background(255, 25, 117);
    if (terrain === "mueseum"){
        endMsg = "You knocked over a\nmultimillion dollar artifact\nhave fun paying the fine!";
    }else if (terrain === "greece"){
        endMsg = "you desynced :(\nthe flow of time has changed\nsocrates is now a soundcloud rapper\nwith 2 followers\n";
    }else if (terrain === "scary"){
        endMsg = "It's alive! It's alive!\nthou hast awoken the \nmonster\nthou shalt feel its wrath";
    }
    textSize(30);
    fill(255, 255, 255);
    text("Game over",115,100);
    rect(50,112,297,210);
    fill(97, 230, 217);
    text("Your Score:" + score + "\nHigh score: "+ highScore,55,143);
    textSize(17);
    text(endMsg,50,206);
     textSize(30);
    fill(255, 255, 255);
    rect(50,332,299,50);
    fill(83, 230, 220);
    text("Click to Play Again",72,366);
};
function displaymsg(){
    background(251, 239, 252);
    if (terrain === "mueseum"){
        msg = "You have stolen a billion dollar artifact\nto avoid paying more fees\ndon't break anything while escaping";
    }
    else if (terrain === "greece"){
        msg = "You traveled back in time congratulations!\nembark on an epic Odyssey\n beware: do not disrupt the space time continuum";
    }
    else if (terrain === "scary"){
        msg = "Thou hast been located in a haunted forest\nstrike not the monsters\nlest ye desire them to strike thee";
    }
    text(msg + "\n Click to confirm",50,50);
};
function reset(){
    playerY = 1;
    score = 0;
    sObs = [];
    sObsXPos = [];
    sObsLane = [];
    vehicle = "";
    terrain = "";
    msg = "";
    endMsg = "";
};
//so this will like set up changing the scenes 

function draw(){
    if (scenes === "menu"){
        displayMenu();
    }else if (scenes === "select"){
        displaySelect();
         if(vehicle !== "" && terrain !== ""){
                    enter = "enter";
         }else {
             enter = "make selections";
         }
    }
         else if (scenes === "message"){
             displaymsg();
         
    }else if (scenes === "game"){
        displayGame();
    }else if (scenes === "over"){
        displayOver();
    }
};
//to make a key pressed function //https://p5js.org/tutorials/organizing-code-with-functions/
function keyPressed(){
    //keycode from https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-javascript except for this the e. isnt needed because im not checking for a specific function method
    if (scenes === "game"){
        if ((keyCode === 38 || keyCode === 87) && playerY > 0){
            playerY--;
        }else if ((keyCode === 40|| keyCode === 83) && playerY < 2){
            playerY++;
        }
    }
   
};

function mouseClicked(){
        if (scenes === "menu"){
        scenes = "select";
        }else if (scenes === "select"){
            if (mouseX > 30 && mouseX < 115 && mouseY > 100 && mouseY < 185){
                vehicle = "car";
            }else if (mouseX > 130 && mouseX < 215 && mouseY > 100 && mouseY < 185){
                 vehicle = "motorcycle";
            }else if (mouseX > 230 && mouseX < 315 && mouseY > 100 && mouseY < 185){
                 vehicle = "skateboard";
            }
            
            if (mouseX > 30 && mouseX < 115 && mouseY > 220 && mouseY < 305){
               terrain = "mueseum";
            }else if (mouseX > 130 && mouseX < 215 && mouseY > 220 && mouseY < 305){
                terrain = "greece";
            }else if (mouseX > 230 && mouseX < 315 && mouseY > 220 && mouseY < 305){
                terrain = "scary";
            }
            if (enter === "enter"){
            if (mouseX > 38 && mouseX < 312 && mouseY > 323 && mouseY < 377){
                    scenes = "message";
            }
                               
                }
            
        }
         else if(scenes === "over"){
        reset();
        scenes = "select";
    }
    else if (scenes === "message"){
        scenes = "game";
    }
};
