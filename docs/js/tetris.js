(function($){

var ID = "#" + (new Date()).getTime() + "&" + parseInt(Math.random() * 1000000);
// var domain = "remote.renoat.net";
// var port = 8989;
// var webSocket = io.connect('http://' + domain + ':' + port);

console.log = function(){}


var milkcocoa = new MilkCocoa('iceiul7ul3d.mlkcca.com');
var ds = milkcocoa.dataStore('remote-tetris');

var ready = false;

ds.on('send', function(response){
	if(ID !== response.value.ID) {
    return;
  }

  switch (response.value.type) {
    case 'onController':
    console.log('RUN: ' + response.value.type);
      init();
      break;
    case 'onTop':
    console.log('RUN: ' + response.value.type);
      (!ready)? startGame() : onTop();
      break;
    case 'onRight':
    console.log('RUN: ' + response.value.type);
      (!ready)? startGame() : onRight();
      break;
    case 'onBottom':
    console.log('RUN: ' + response.value.type);
      (!ready)? startGame() : onBottom();
      break;
    case 'onLeft':
    console.log('RUN: ' + response.value.type);
      (!ready)? startGame() : onLeft();
      break;
    case 'onButton_a':
    console.log('RUN: ' + response.value.type);
      (!ready)? startGame() : onButton_a();
      break;
    case 'onButton_b':
    console.log('RUN: ' + response.value.type);
      (!ready)? startGame() : onButton_b();
      break;
  }
});

$("#top").click(function(){
  ds.send({ID: location.hash, type: 'onTop'});
  return false;
});

$("#right").click(function(){
  ds.send({ID: location.hash, type: 'onRight'});
  return false;
});

$("#bottom").click(function(){
  ds.send({ID: location.hash, type: 'onBottom'});
  return false;
});

$("#left").click(function(){
  ds.send({ID: location.hash, type: 'onLeft'});
  return false;
});

$("#A").click(function(){
  ds.send({ID: location.hash, type: 'onButton_a'});
  return false;
});

$("#B").click(function(){
  ds.send({ID: location.hash, type: 'onButton_b'});
  return false;
});

//ds.send({ID: ID, type: 'onController'});



/*
	canvas
-------------------------------------------------------*/
var canvas;
var context;

var canvasWidth = 300;
var canvasHeight = 500;


/*
	block
-------------------------------------------------------*/
var rectWidth = 20;
var rectHeight = 20;

/*
	stage
-------------------------------------------------------*/

var stage = [];

var stageWidth = canvasWidth / rectWidth;
var stageHeight = canvasHeight / rectHeight;


/*
	frameRate
-------------------------------------------------------*/

var frameRate = 1000 / 60;

var emptyBlock = [];

var gameOverFlg = false;


/*
	blockList
-------------------------------------------------------*/
var blockList =
[
	/*
		■ : 0
	-------------------------*/
	[
		[
			[1, 1],
			[1, 1]
		]
	],


	/*
		L : 1
	-------------------------*/
	[
		[
			[2, 2],
			[0, 2],
			[0, 2]
		],
		[
			[2, 2, 2],
			[2, 0, 0]
		],
		[
			[2, 0],
			[2, 0],
			[2, 2]
		],
		[
			[0, 0, 2],
			[2, 2, 2]
		]
	],


	/*
		J : 2
	-------------------------*/
	[
		[
			[3, 3],
			[3, 0],
			[3, 0]
		],
		[
			[3, 0, 0],
			[3, 3, 3]
		],
		[
			[0, 3],
			[0, 3],
			[3, 3]
		],
		[
			[3, 3, 3],
			[0, 0, 3]
		]
	],

	/*
		T : 3
	-------------------------*/
	[
		[
			[4, 4, 4],
			[0, 4, 0]
		],
		[
			[4, 0],
			[4, 4],
			[4, 0]
		],
		[
			[0, 4, 0],
			[4, 4, 4]
		],
		[
			[0, 4],
			[4, 4],
			[0, 4]
		]
	],

	/*
		| : 4
	-------------------------*/
	[
		[
			[5],
			[5],
			[5],
			[5]
		],
		[
			[5, 5, 5, 5]
		]
	],

	/*
		|_
		  | : 5
	-------------------------*/
	[
		[
			[0, 6, 6],
			[6, 6, 0]
		],
		[
			[6, 0],
			[6, 6],
			[0, 6]
		]
	],

	/*
		|_
		  | : 6
	-------------------------*/
	[
		[
			[7, 7, 0],
			[0, 7, 7]
		],
		[
			[0, 7],
			[7, 7],
			[7, 0]
		]
	],

	/*
		 : 7
	-------------------------*/
	[
		[
			[8, 0, 8],
			[0, 8, 0]
		],
		[
			[8, 0],
			[0, 8],
			[8, 0]
		],
		[
			[0, 8, 0],
			[8, 0, 8]
		],
		[
			[0, 8],
			[8, 0],
			[0, 8]
		]
	]
];



var currentBlock = parseInt(Math.random() * 5);
var currentRotation = 0;

var block = blockList[currentBlock][currentRotation];

var blockNum = parseInt(blockList.length);


var lengthX = block[0].length;
var lengthY = block.length;



/*
	timer
-------------------------------------------------------*/
var timer;


/*
	currentPoint
-------------------------------------------------------*/
var currentX = parseInt(rectWidth / 2 - lengthX * 1.5);
var currentY = 0;


var on = true;

/*
	imageData
-------------------------------------------------------*/

var bmpData = [];

var currentColor = currentBlock + 1;

/*
	gameSpeed
-------------------------------------------------------*/
var gameSpeed = 0.02;

/*
	body
-------------------------------------------------------*/
var body;


var score;

var currentScore = 0;


var gameOverText;



$(function(){
	$("#QRCode").append(showQRCode(location.href + ID));

	body = document.querySelector("body");
	score = document.querySelector("#score");
	gameOverText = document.querySelector("p.gameOver");
	gameOverText.style.display = "none";

	score.innerHTML = currentScore;

	body.addEventListener("keydown", onKey, false);

	canvas = document.querySelector("canvas");
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;

	context = canvas.getContext("2d");

	var colorAngle = parseInt(Math.random() * 360);
	var colorRadius = parseInt(360 / (blockNum + 1));


	for(var i = 0; i < blockNum + 1; i ++)
	{
		var angle = parseInt((colorAngle + i * colorRadius) % 360);
		bmpData[i] = createRect(angle);
	}

	shuffleArray(bmpData);

	for(i = 0; i < stageHeight; i ++)
	{
		stage[i] = [];
		for(var j = 0; j < stageWidth; j ++)
		{
			stage[i][j] = 0;
		}
	}


	context.fillStyle = getRGB(parseInt(Math.random() * 360), 0.5, 0.8);

	canvas.addEventListener("click", toggle, false);

	$("#canvasArea").hide();

	//timer = setInterval(update, frameRate);

});

function init(){
	$("#QRCode").hide();
	$("#canvasArea").show();
	//timer = setInterval(update, frameRate);
}

function startGame(){
	$("#ready").fadeOut();
	timer = setInterval(update, frameRate);
	ready = true;
}


function update()
{
	context.clearRect(0, 0, canvasWidth, canvasHeight);

	setStage();
	drawBlock();

	if(checkEdge(block, currentX, currentY))
	{
		currentY += gameSpeed;
	}
	else
	{
		clearInterval(timer);

		accumulate();
		flushBlock();

		if(gameOverFlg)
		{
			gameOver();
			gameOverText.style.display = "block";
			return;
		}

		currentBlock = parseInt(Math.random() * blockNum);
		block = blockList[currentBlock][0];
		currentRotation = 0;

		lengthX = block[0].length;
		lengthY = block.length;

		currentX = parseInt(rectWidth / 2 - lengthX * 1.5);
		currentY = 0;

		currentColor = currentBlock + 1;

		timer = setInterval(update, frameRate);
	}
}





function drawBlock()
{
	for(var i = 0; i < lengthX; i ++)
	{
		for(var j = 0; j < lengthY; j ++)
		{
			if(block[j][i])
			{
				var num = parseInt(block[j][i]);
				context.drawImage(bmpData[num], (i + currentX) * rectWidth, (j + currentY) * rectHeight);
			}
		}
	}
}



function setStage()
{
	for(var i = 0; i < stageHeight; i ++)
	{
		for(var j = 0; j < stageWidth; j ++)
		{
			if(stage[i][j])
			{
				var num = parseInt(stage[i][j]);
				context.drawImage(bmpData[num], j * rectWidth, i * rectHeight);

			}
		}
	}
}



function toggle(event)
{
	on = !on;
	if(on)
	{
		timer = setInterval(update, frameRate);
	}
	else
	{
		clearInterval(timer);
	}
}






/*--------------------------------------------------------

	checkEdge

--------------------------------------------------------*/
function checkEdge(targetBlock, dx, dy)
{
	clearInterval(timer);

	var targetLengthX = targetBlock[0].length;
	var targetLengthY = targetBlock.length;


	if(dx < 0 || dy < 0 || stageWidth < (dx + targetLengthX) || stageHeight < (dy + targetLengthY))
	{
		timer = setInterval(update, frameRate);
		return false;
	}

	for(var i = 0; i < targetLengthY; i ++)
	{
		for(var j = 0; j < targetLengthX; j ++)
		{
			if(targetBlock[i][j] && stage[i + Math.ceil(dy)][j + Math.ceil(dx)])
			{
				timer = setInterval(update, frameRate);
				return false;
			}
		}
	}

	timer = setInterval(update, frameRate);

	return true;
}



/*--------------------------------------------------------

	accumulate

--------------------------------------------------------*/
function accumulate()
{
	for(var i = 0; i < stageHeight; i ++)
	{
		for(var j = 0; j < stageWidth; j ++)
		{
			if(block[i - parseInt(currentY)] && block[i - parseInt(currentY)][j - parseInt(currentX)])
			{
				stage[i][j] = currentColor;
				if(i == 0)
				{
					gameOverFlg = true;
					return;
				}
			}
		}
	}
}



/*--------------------------------------------------------

	key

--------------------------------------------------------*/
function onKey(event){
	var nextRotation;
	var nextBlock;

	switch(event.keyCode)
	{
		//左
		case 37:
			onLeft();
			break;

		//右
		case 39:
			onRight();
			break;

		//↓
		case 40:
			onBottom();
			break;

		//a
		case 65:
			onButton_a();
			break;

		case 83:
			onButton_b();
			break;
	}
}


function onTop(){

}

function onLeft(){
	if(checkEdge(block, currentX - 1, Math.round(currentY))){
		currentX --;
	}
}

function onRight(){
	if(checkEdge(block, currentX + 1, Math.round(currentY))){
		currentX ++;
	}
}

function onBottom(){
	if(checkEdge(block, currentX, Math.ceil(currentY)))
	{
		currentY = Math.ceil(currentY);
	}
}

function onButton_a(){
	var nextRotation;
	var nextBlock;

	if(currentBlock == 1 || currentBlock == 2 || currentBlock == 3 || currentBlock == 7)
	{
		nextRotation = (currentRotation + 1) % 4;
		nextBlock = blockList[currentBlock][nextRotation];

		if(checkEdge(nextBlock, currentX, Math.ceil(currentY)))
		{
			currentRotation = nextRotation;
			block = nextBlock;
			lengthX = block[0].length;
			lengthY = block.length;
		}
	}
	else if(currentBlock == 4)
	{
		nextRotation = (currentRotation)? 0 : 1;
		nextBlock = blockList[currentBlock][nextRotation];

		var nextX = (nextRotation)? currentX - 2 : currentX + 2;
		var nextY = (nextRotation)? Math.ceil(currentY + 2) : Math.ceil(currentY - 2);

		if(checkEdge(nextBlock, nextX, nextY))
		{
			currentRotation = nextRotation;
			block = nextBlock;
			lengthX = block[0].length;
			lengthY = block.length;
			currentX = nextX;
			currentY = nextY;
		}
	}
	else if(currentBlock == 5 || currentBlock == 6)
	{
		nextRotation = (currentRotation + 1) % 2;
		nextBlock = blockList[currentBlock][nextRotation];

		if(checkEdge(nextBlock, currentX, Math.ceil(currentY)))
		{
			currentRotation = nextRotation;
			block = nextBlock;
			lengthX = block[0].length;
			lengthY = block.length;
		}
	}
}

function onButton_b(){
	var nextRotation;
	var nextBlock;
	if(currentBlock == 1 || currentBlock == 2 || currentBlock == 3 || currentBlock == 7)
	{
		nextRotation = (0 > currentRotation - 1)? 3 : currentRotation - 1;
		nextBlock = blockList[currentBlock][nextRotation];

		if(checkEdge(nextBlock, currentX, Math.ceil(currentY)))
		{
			currentRotation = nextRotation;
			block = nextBlock;
			lengthX = block[0].length;
			lengthY = block.length;
		}
	}
	else if(currentBlock == 4)
	{
		nextRotation = (currentRotation)? 0 : 1;
		nextBlock = blockList[currentBlock][nextRotation];

		var nextX = (nextRotation)? currentX - 2 : currentX + 2;
		var nextY = (nextRotation)? Math.ceil(currentY + 2) : Math.ceil(currentY - 2);

		if(checkEdge(nextBlock, nextX, nextY))
		{
			currentRotation = nextRotation;
			block = nextBlock;
			lengthX = block[0].length;
			lengthY = block.length;
			currentX = nextX;
			currentY = nextY;
		}
	}
	else if(currentBlock == 5 || currentBlock == 6)
	{
		nextRotation = (currentRotation - 1 < 0)? 1 : currentRotation - 1;
		nextBlock = blockList[currentBlock][nextRotation];

		if(checkEdge(nextBlock, currentX, Math.ceil(currentY)))
		{
			currentRotation = nextRotation;
			block = nextBlock;
			lengthX = block[0].length;
			lengthY = block.length;
		}
	}
}





/*--------------------------------------------------------

	flushBlock

--------------------------------------------------------*/
function flushBlock()
{
	for(var i = 0; i < stageHeight; i ++)
	{
		var rows = true;
		for(var j = 0; j < stageWidth; j ++)
		{
			if(stage[i][j] == 0)
			{
				rows = false;
			}
		}

		if(rows)
		{
			currentScore += 1;
			score.innerHTML = currentScore;

			if(currentScore % 10 == 0)
			{
				gameSpeed += 0.02;
			}

			stage.splice(i, 1);

			var emptyArray = [];
			for(var k = 0; k < stageWidth; k ++)
			{
				emptyArray[k] = 0;
			}

			stage.unshift(emptyArray);
		}
	}
}



/*--------------------------------------------------------

	createRect

--------------------------------------------------------*/
function createRect(angle)
{
	var rectCanvas = document.createElement("canvas");
	var rectContext = rectCanvas.getContext("2d");

	var gradient = rectContext.createLinearGradient(0, 0, rectWidth, rectHeight);

	var img = new Image();

	gradient.addColorStop(0, getRGB(angle, 0.6, 1));
	gradient.addColorStop(1, getRGB(angle, 1, 0.9));

	rectContext.fillStyle = gradient;

	rectContext.fillRect(0, 0, rectWidth, rectHeight);

	img.src = rectCanvas.toDataURL();

	rectCanvas = rectContext = null;

	return img;
}


/*--------------------------------------------------------

	gameOver

--------------------------------------------------------*/

function gameOver()
{
	clearInterval(timer);
	body.removeEventListener("keydown", onKey, false);
}


/*--------------------------------------------------------

	shuffleArray

--------------------------------------------------------*/
function shuffleArray(array)
{
	var length = array.length;
	for(var i = 0; i < length; i ++)
	{
		var num = parseInt(Math.random() * length);
		var temp = array[i];
		array[i] = array[num];
		array[num] = temp;
	}
}

/*--------------------------------------------------------

	hsv → RGB

--------------------------------------------------------*/
function getRGB(h, s, v)
{

	if (s == 0) return String("rgb(" + parseInt(v * 255) + "," + parseInt(v * 255) + "," + parseInt(v * 255) + ")");
	else
	{
		var r;
		var g;
		var b;
		var hi = (h / 60) >> 0;
		var f = (h / 60 - hi);
		var p = v * (1 - s);
		var q = v * (1 - f * s);
		var t = v * (1 - (1 - f) * s);
		if (hi == 0) r = parseInt(v * 255), g = parseInt(t * 255), b = parseInt(p * 255);
		else if (hi == 1) r = parseInt(q * 255), g = parseInt(v * 255), b = parseInt(p * 255);
		else if (hi == 2) r = parseInt(p * 255), g = parseInt(v * 255), b = parseInt(t * 255);
		else if (hi == 3) r = parseInt(p * 255), g = parseInt(q * 255), b = parseInt(v * 255);
		else if (hi == 4) r = parseInt(t * 255), g = parseInt(p * 255), b = parseInt(v * 255);
		else if (hi == 5) r = parseInt(v * 255), g = parseInt(p * 255), b = parseInt(q * 255);
		return String("rgb(" + r + "," + g + "," + b + ")");
	}
}

})(jQuery);
