
// var canvas;
// var context;
// var images = {};
// var totalResources = 6;
// var numResourcesLoaded = 0;
// var fps = 30;
// var x = 300;
// var y = 600;
// var breathInc = 0.5;
// var breathDir = 1;
// var breathAmt = 0;
// var breathMax = 1;
// var breathInterval = setInterval(updateBreath, 1000 / fps);                   
// var fpsInterval = setInterval(updateFPS, 1000);
// var numFramesDrawn = 0;
// var curFPS = 0;
// var spawnLine = 25;
// var spawnRate = 100;
// var fallingRate = 100;
// var lastSpawn = -1;
// var poop = [];
// var charParts = [];
// var charStartTime = 0;
// var charEndTime = 0;
// var acceleration = 0.0003;
// var characcel = 0.0001;
// var charVelocity = 0;
// var keyFlag = false;
// var charPosition = 0;
// var elapsedCharTime = 0;
// var time = 0;
// var charstop = true;
// var velocity = 1;
// var gameover = false;
// var globalID;
// var currentScore = 0;
// var bestScore = 0;
// var gameStart = false;
// var canvasdiv;
// var level = 1;
// var interval;
// var leftflag = false;
// var rightflag = false;
// var mouseX = 0;



// function showScoreboard() {
//   $( "#dialog" ).dialog();
// }

// window.onload = init;

// function init(){
// 	document.addEventListener('keydown', whatKey);
// 	document.addEventListener('keyup', handleKeyUp);
//   document.getElementById('soundoff').addEventListener('click', function() {
//     checked = document.getElementById('soundoff').checked;
//     if(checked)
//     {
//       document.getElementById('soundStatus').innerHTML = "Uncheck to turn sound on";
//       document.getElementById('instrumental').pause();
//     }
//     else {
//       document.getElementById('soundStatus').innerHTML = "Check to turn sound off";
//       document.getElementById('instrumental').play();
//     }
//   });
//   document.getElementById('play').addEventListener('click', function() { 
//     var element = document.getElementById("play");
//     element.parentNode.removeChild(element);
//     checked = document.getElementById('soundoff').checked;
//     if(checked) {
//       document.getElementById('instrumental').currentTime = 0;
//       document.getElementById('instrumental').pause();
//     }
//     else {
//       document.getElementById('instrumental').currentTime = 0;
//       document.getElementById('instrumental').play();
//     }
    
//     if(document.cookie != "")
//     {
//       var cookie_array = document.cookie.split(";"); 
//       bestScore = (cookie_array[0]).split("=")[1];
//     }
//     interval = setInterval(raiseLevel, 4000);
//     prepareCanvas(document.getElementById("canvasDiv"), 600, 600); 
//   });

//   // for mobile

//   document.addEventListener('touchstart', handleTouchStart);
//   document.addEventListener('touchend', handleTouchEnd);
// }

// function raiseLevel() {
//   if(spawnRate == 30) {
//     clearInterval(interval);
//   }
//   level++;
//   spawnRate -= 5;
//   document.getElementById('levelup').currentTime = 0;
//   document.getElementById('levelup').play();
// }

// function updateFPS() {
	
// 	curFPS = numFramesDrawn;
// 	numFramesDrawn = 0;
// }		
// function prepareCanvas(canvasDiv, canvasWidth, canvasHeight)
// {
// 	// Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
// 	canvas = document.createElement('canvas');
// 	canvas.setAttribute('width', canvasWidth);
// 	canvas.setAttribute('height', canvasHeight);
// 	canvas.setAttribute('id', 'canvas');
// 	canvasDiv.appendChild(canvas);
//   canvasdiv = canvasDiv;
	
// 	if(typeof G_vmlCanvasManager != 'undefined') {
// 		canvas = G_vmlCanvasManager.initElement(canvas);
// 	}
// 	context = canvas.getContext("2d"); // Grab the 2d canvas context
// 	// Note: The above code is a workaround for IE 8and lower. Otherwise we could have used:
// 	//     context = document.getElementById('canvas').getContext("2d");
// 	// context.fillStyle = "red";
// 	// context.fill();
	
// 	loadImage("leftleg");
// 	loadImage("rightleg");
// 	loadImage("leftarm");
// 	loadImage("rightarm");
// 	loadImage("body");
// 	loadImage("head");
// 	loadImage("poop");

// 	createCharObject();
// }

// function loadImage(name) {

//   images[name] = new Image();
//   images[name].onload = function() { 
// 	  resourceLoaded();
//   }
//   images[name].src = "images/" + name + ".png";
// }

// function resourceLoaded() {

//   numResourcesLoaded += 1;
//   if(numResourcesLoaded === totalResources) {
//   		animatenow();
//     }
// }


// function updateBreath() { 
				
//   if (breathDir === 1) {  // breath in
// 	breathAmt -= breathInc;
// 	if (breathAmt < -breathMax) {
// 	  breathDir = -1;
// 	}
//   } else {  // breath out
// 	breathAmt += breathInc;
// 	if(breathAmt > breathMax) {
// 	  breathDir = 1;
// 	}
//   }
// }


// function createCharObject() {
// 	var xCoord = 300;
//     var yCoord = 600;

//     var head = {
//         x: xCoord - 5 ,
//         y: yCoord - 47
//     }
//     charParts.push(head);
//     var body = {
//         x: xCoord,
//         y: yCoord - 25
//     }
//     charParts.push(body);
//     var rightleg = {
//         x: xCoord + 7 ,
//         y: yCoord - 10
//     }
//     charParts.push(rightleg);
//     var rightarm = {
//         x: xCoord + 8 ,
//         y: yCoord - 26
//     }
//     charParts.push(rightarm);
//     var leftleg = {
//         x: xCoord - 7 ,
//         y: yCoord - 10
//     }
//     charParts.push(leftleg);
//     var leftarm = {
//         x: xCoord - 8 ,
//         y: yCoord - 26
//     }
//     charParts.push(leftarm);
// }

// function collisionDetection() {
// 	var i;
// 	for(i = 0; i < poop.length/2; i++)
// 	{
// 		if(poop[i].y + 38 > charParts[0].y+3 &&
//        poop[i].y + 38 < 600 &&
//        poop[i].x+19 > charParts[0].x-13 &&
//        poop[i].x-12 < charParts[0].x+10) {
// 			gameover = true;
// 		}
// 	}

	
// }

// function spawnRandomObject() {
//     var spawnx = Math.random() * (canvas.width - 30);

//     // create the new object
//     var object = {
//         // set x randomly but at least 15px off the canvas edges
//         x: spawnx,
//         // set y to start on the line where objects are spawned
//         y: spawnLine,

//         t: Date.now()
//     }

//     // add the new object to the objects[] array
//     poop.push(object);
// }

// function resetGame() {
//    document.getElementById('dying').pause();
//    context.clearRect(0, 0, canvas.width, canvas.height);
//    gameover = false;
//    poop = [];
//    document.getElementById('playagain').parentNode.removeChild(document.getElementById('playagain'));
//    document.getElementById('gameover').parentNode.removeChild(document.getElementById('gameover'));
//    document.getElementById('canvasDiv').style.opacity = 1;
//    currentScore = 0;
//    charParts = [];
//    createCharObject();
//    interval = setInterval(raiseLevel, 4000);
//    level = 1;
//    spawnRate = 80;
//    animatenow();
// }


// function animatenow() {

//     // get the elapsed time
//     time = Date.now();

//     // see if its time to spawn a new object
//     if (time > (lastSpawn + spawnRate)) {
//         lastSpawn = time;
//         spawnRandomObject();
//     }

//     // clear the canvas so all objects can be 
//     // redrawn in new positions
//     context.clearRect(0, 0, canvas.width, canvas.height);

//     var head = charParts[0];
//     var body = charParts[1];
//     var rightleg = charParts[2];
//     var rightarm = charParts[3];
//     var leftleg = charParts[4];
//     var leftarm = charParts[5];

//     if((head.x < 12.5 && charVelocity > 0) ||
//        (head.x > 570 && charVelocity < 0) ||
//        (head.x >= 13 && head.x <= 570) ) {
//       head.x = head.x + charVelocity;
//       body.x = body.x + charVelocity;
//       rightleg.x = rightleg.x + charVelocity;
//       rightarm.x = rightarm.x + charVelocity;
//       leftleg.x = leftleg.x + charVelocity;
//       leftarm.x = leftarm.x + charVelocity;
//     }
  
// 	  context.drawImage(images["leftarm"], leftarm.x, leftarm.y - breathAmt );
// 		context.drawImage(images["leftleg"], leftleg.x, leftleg.y);
// 		context.drawImage(images["rightarm"], rightarm.x, rightarm.y - breathAmt);
// 		context.drawImage(images["rightleg"], rightleg.x, rightleg.y);
// 		context.drawImage(images["body"], body.x, body.y);
// 		context.drawImage(images["head"], head.x, head.y - breathAmt);

//     context.lineWidth = 1;
//     context.fillStyle = "#ad2323";
//     context.lineStyle = "#ad2323";
//     context.font = "28px sans-serif";
//     context.fillText(bestScore, 10, 20);
//     context.fillText(currentScore, 10, 60);
//     context.fillText("Level " + level,canvas.width - 120, 20 );
		
//     // move each object down the canvas
//     for (var i = 0; i < poop.length; i++) {
//         var object = poop[i];
//         object.y = acceleration * Math.pow((time - object.t),2);
//         context.drawImage(images["poop"], poop[i].x, poop[i].y );
//         if(object.y >= 600)
//         {
//         	poop.shift();
//           currentScore++;
//           if(currentScore > bestScore)
//             bestScore = currentScore;
//         }
//     }
//     if(poop.length > 10)
//       collisionDetection();
//     if (!gameover) {
//       globalID = requestAnimationFrame(animatenow);
//     }
// 	  else {
//       cancelAnimationFrame(globalID);
//       document.getElementById('dying').currentTime = 0;
//       document.getElementById('dying').play();
//       var canvasinner = document.getElementById('canvasinnerwrapper');
//       document.getElementById('canvasDiv').setAttribute('style', 'opacity: 0.4');
//       var btn = document.createElement("span");
//       var t = document.createTextNode("Game Over");
//       btn.setAttribute("id", "gameover");
//       btn.appendChild(t);
//       btn.setAttribute("style", "position: absolute; top: 300px; margin-left: auto; margin-right:auto; left:0; right:0; font-family: sans-serif; opacity: 1;");
//       var btn2 = document.createElement("span");
//       var br = document.createElement("br");
//       var t2 = document.createTextNode("Click to Play Again");
//       var t3 = document.createTextNode("(or press Space)");
//       btn2.setAttribute("id", "playagain");
//       btn2.appendChild(t2);
//       btn2.appendChild(br);
//       btn2.appendChild(t3);
//       btn2.setAttribute("style", "position: absolute; top: 350px; margin-left: auto; margin-right:auto; left:0; right:0; font-family: sans-serif; opacity:1; z-index: 5");
//       canvasinner.insertBefore(btn2, canvasinner.childNodes[0]);
//       canvasinner.insertBefore(btn, canvasinner.childNodes[0]);
//       context.clearRect(0, 500, canvas.width, canvas.height);

//       context.drawImage(images["leftarm"], leftarm.x+5, leftarm.y);
//       context.drawImage(images["leftleg"], leftleg.x-10, leftleg.y);
//       context.drawImage(images["rightarm"], rightarm.x-40, rightarm.y);
//       context.drawImage(images["rightleg"], rightleg.x+20, rightleg.y);
//       context.drawImage(images["body"], body.x-20, body.y);
//       context.drawImage(images["head"], head.x, head.y + 20);
//       clearInterval(interval);
//       var cookiedate = new Date( 2118, 10, 24, 12);
//       document.cookie = "maxScore = " + bestScore + "; expires = " + cookiedate.toGMTString();
//       showScoreboard();
//       document.getElementById('playagain').addEventListener("click", resetGame);

//     }
// }

// function newPosition(a,v,t,x)
// {
// 	return a * Math.pow(t,2) + v * t + x;
// }

// function whatKey(evt) {
// 		var head = charParts[0];
//         switch (evt.keyCode) {

//           // Left arrow.
//         case 37:
//           if(head.x >=12.5) {
//             leftflag = true;
//             charVelocity = -7;
//           }
//           // else
//           //   charVelocity = 0;
//           break;

//           // Right arrow.
//         case 39:
//           if(head.x <= 585) {
//             rightflag = true;
//             charVelocity = 7;
//           }
//           // else
//           //   charVelocity = 0;
//           break;
        
//         case 32:
//           if(gameover) {
//             resetGame();
//           }
//         }


// }

// function handleTouchStart(e){
//   mouseX = e.changedTouches[0].pageX;
//   var head = charParts[0];
//   var width = (window.innerWidth)/2;
//   if(mouseX <= width){
//     if(head.x >=12.5) {
//             leftflag = true;
//             charVelocity = -7;
//           }
//   }
//   else {
//     if(head.x <= 585) {
//             rightflag = true;
//             charVelocity = 7;
//           }
//   }
// }

// function handleTouchEnd(e) {
//   mouseX = e.changedTouches[0].pageX;
//   var width = (window.innerWidth)/2;
//   if(mouseX < width) {
//     leftflag = false;
//     if(!leftflag && !rightflag)
//       charVelocity = 0;
//   }
//   if(mouseX >= width) {
//     rightflag = false;
//     if(!leftflag && !rightflag)
//       charVelocity = 0;
//   }
// }


// function handleKeyUp(event){
// 	if(event.which == 37) {
//     leftflag = false;
//     if(!leftflag && !rightflag)
//       charVelocity = 0;
// 	}
//   if(event.which == 39) {
//     rightflag = false;
//     if(!leftflag && !rightflag)
//       charVelocity = 0;
//   }
// }





