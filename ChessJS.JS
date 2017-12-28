var numOfCol = 8,
numOfRow = 8,
WHITE_TEAM = new Array(),
BLACK_TEAM = new Array(),
ctx = null,
Board = null,
BLOCK_SIZE = 100;


var greySquare = '#878787',
whiteSquare = '#ffffff'
outLine = '#fb0006';

var positionsOfPieces = null,
selectPiece = null,
IN_PLAY = 0,
TAKEN = 1,
black_team = 0;
white_team = 1;
currentTurn = WHITE_TEAM;

var test;





function draw()
{
	var c = document.getElementById("canvas");
	//checks to see if canvas is supported
	if (canvas.getContext)
	{
		ctx = canvas.getContext("2d");

		//calculates the sqaure size
		BLOCK_SIZE = c.height / numOfRow;

		//draws the board
		DrawBoard();

		//creates all pieces
		CreatePieces();
		/*
		var test = WHITE_TEAM[0];
		console.log(test);
		test.img = WHITE_TEAM[0].img;
		console.log(test.img);
		WHITE_TEAM[0]
		test.img.onload = function ()
		{
			console.log(test);
			ctx.drawImage(test.img, 0, 0);
			console.log(test.img);
		};*/

		WHITE_TEAM[1].img.onload = function(){
			ctx.drawImage(WHITE_TEAM[1].img,// WHITE_TEAM[1].row, WHITE_TEAM[1].col * 100);
		}

		// push sick code ;)
		//Render();


		//all of the black Pieces being set to a new image using the image array above
		//PrintPieces();

		//bRook = new Image();
		//bRook.src = chessImages[8];
		//bRook.onload = drawPieces;


		// when canvas is clicked, calls handleClick function
		c.addEventListener('click', handleClick);

	}else {
		alert("Canvas is not supported")
	}

}

function Render()
{
	 for(i = 0; i < 1; i++){
		 WHITE_TEAM[i].img.onload = function(){

			 ctx.drawImage(WHITE_TEAM[i].img, WHITE_TEAM[i].row, WHITE_TEAM[i].col);
		 }
	 }
}
function getImageCoords(pieceCode, bBlackTeam) {

	var imageCoords =  {
		"x": pieceCode * BLOCK_SIZE,
		"y": (bBlackTeam ? 0 : BLOCK_SIZE)
	};

	return imageCoords;
}

function DrawBoard()
{
	var rowCounter;

	for (rowCounter = 0; rowCounter < numOfRow; rowCounter++)
	{
		drawRow(rowCounter);
	}
	// Draws the outline
	ctx.lineWidth = 3;
	ctx.strokeRect(0, 0,
		numOfRow * BLOCK_SIZE,
		numOfCol * BLOCK_SIZE);
	}


	function drawSquare (rowCounter, squareCounter)
	{
		// Sets the background
		ctx.fillStyle = getSquarColour(rowCounter, squareCounter);

		//draws the squares for background
		ctx.fillRect(rowCounter * BLOCK_SIZE, squareCounter * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);

		ctx.stroke();
	}

	function drawRow(rowCounter)
	{
		var squareCounter;
		//Draws an 8 square radius from left to right
		for (squareCounter = 0; squareCounter < numOfRow; squareCounter++)
		{
			drawSquare(rowCounter, squareCounter);
		}
	}
	function getSquarColour (rowCounter, squareCounter)
	{
		var startColour;

		//create the black and white squares onto the board
		if(rowCounter % 2)
		{
			//creates the whites squares
			startColour = (squareCounter % 2 ? whiteSquare : greySquare);
		}
		else {
			//creates the grey squares
			startColour = (squareCounter % 2 ? greySquare : whiteSquare);
		}

		return startColour;
	}
	//Creates a class piece inheritance, then populate each piece with data
	class Piece{
		constructor(name, row, col, status, imgSrc)
		{
			this.name = name;
			this.row = row;
			this.col = col;
			this.status = status;
			this.img = new Image();
			this.img.src = imgSrc;
		}
	}

	//creates all pieces starting position, status and piece name e.g. whiteRook
	function CreatePieces()
	{
		//Creates White pieces
		var whiteLRook = new Piece("whiteLRook", 0, 0, IN_PLAY, 'whiteRook.png');
		var whiteRRook = new Piece("whiteRRook", 0, 7, IN_PLAY, 'whiteRook.png');

		var whiteLKnight = new Piece("whiteLKnight", 0, 1, IN_PLAY, 'whiteKnight.png');
		var whiteRKnight = new Piece("whiterRKnight", 0, 6, IN_PLAY, 'whiteKnight.png');

		var whiteLBishop = new Piece("whiteLBishop", 0, 2, IN_PLAY, 'whiteBishop.png');
		var whiteRBishop = new Piece("whiteRBishop", 0, 5, IN_PLAY, 'whiteBishop.png');

		var whiteQueen = new Piece("whiteQueen", 0, 4, IN_PLAY, 'whiteQueen.png');
		var whiteKing = new Piece("whiteKing", 0, 3, IN_PLAY, 'whiteKing.png');

		var whitePawn1 = new Piece("whitePawn1", 1, 0, IN_PLAY, 'whitePawn.png');
		var whitePawn2 = new Piece("whitePawn2", 1, 1, IN_PLAY, 'whitePawn.png');
		var whitePawn3 = new Piece("whitePawn3", 1, 2, IN_PLAY, 'whitePawn.png');
		var whitePawn4 = new Piece("whitePawn4", 1, 3, IN_PLAY, 'whitePawn.png');
		var whitePawn5 = new Piece("whitePawn5", 1, 4, IN_PLAY, 'whitePawn.png');
		var whitePawn6 = new Piece("whitePawn6", 1, 5, IN_PLAY, 'whitePawn.png');
		var whitePawn7 = new Piece("whitePawn7", 1, 6, IN_PLAY, 'whitePawn.png');
		var whitePawn8 = new Piece("whitePawn8", 1, 7, IN_PLAY, 'whitePawn.png');

		//Creates Black pieces
		var blackLRook = new Piece("blackLRook", 7, 0, IN_PLAY, 'blackRook.png');
		var blackRRook = new Piece("blackRRook", 7, 7, IN_PLAY, 'blackRook.png');

		var blackLKnight = new Piece("blackLKnight", 7, 1, IN_PLAY, 'blackKnight.png');
		var blackRKnight = new Piece("blackRKnight", 7, 6, IN_PLAY, 'blackKnight.png');

		var blackLBishop = new Piece("blackLBishop", 7, 2, IN_PLAY, 'blackBishop.png');
		var blackRBishop = new Piece("blackRBishop", 7, 5, IN_PLAY, 'blackBishop.png');

		var blackQueen = new Piece("blackQueen", 7, 4, IN_PLAY, 'blackQueen.png');
		var blackKing = new Piece("blackKing", 7, 3, IN_PLAY, 'blackKing.png');

		var blackPawn1 = new Piece("blackPawn1", 6, 0, IN_PLAY, 'blackPawn.png');
		var blackPawn2 = new Piece("blackPawn2", 6, 1, IN_PLAY, 'blackPawn.png');
		var blackPawn3 = new Piece("blackPawn3", 6, 2, IN_PLAY, 'blackPawn.png');
		var blackPawn4 = new Piece("blackPawn4", 6, 3, IN_PLAY, 'blackPawn.png');
		var blackPawn5 = new Piece("blackPawn5", 6, 4, IN_PLAY, 'blackPawn.png');
		var blackPawn6 = new Piece("blackPawn6", 6, 5, IN_PLAY, 'blackPawn.png');
		var blackPawn7 = new Piece("blackPawn7", 6, 6, IN_PLAY, 'blackPawn.png');
		var blackPawn8 = new Piece("blackPawn8", 6, 7, IN_PLAY, 'blackPawn.png');

		WHITE_TEAM.push(whiteLRook, whiteRRook, whiteLKnight, whiteRKnight, whiteLBishop, whiteRBishop, whiteQueen, whiteKing, whitePawn1, whitePawn2, whitePawn3, whitePawn4, whitePawn5, whitePawn6, whitePawn7, whitePawn8);

		BLACK_TEAM.push(blackLRook, blackRRook, blackLKnight, blackRKnight, blackLBishop, blackRBishop, blackQueen, blackKing, blackPawn1, blackPawn2, blackPawn3, blackPawn4, blackPawn5, blackPawn6, blackPawn7, blackPawn8);

	}

	function screenToBlock(x, y) {
		var block =  {
			"row": Math.floor(y / BLOCK_SIZE),
			"col": Math.floor(x / BLOCK_SIZE)
		};
		return block;
	}


function drawPieces()
{



}




































function isPieceClicked(clickedSquare)
{
	var pieceAtSquare = getPieceAtSquare(clickedSquare);

	if (pieceAtSquare !== null)
	{
		selectPiece(pieceAtSquare);
	}
}

function getPieceAtSquare(clickedSquare)
{
	var teams = (currentTurn === BLACK_TEAM ?  Piece.blackTeam : Piece.whiteTeam);

	return getPieceAtSquareForTeam;
}

function handleClick(e)
{
	// or show available squares -> click on allowed square and draw png there
	// delete old one obvsly
	var x = e.clientX - canvas.offsetLeft,
			y = e.clientY - canvas.offsetTop,
	clickedSquare = screenToBlock(x, y);

	if (selectPiece == null)
	{

		//isPieceClicked(clickedSquare);
	}else
	{
		//processMove(clickedSquare);
	}

	//when clicked, it posts the x and y coordinates

}
//TODO: finish setting up the board array with rows and collumns
/*function setUpBoard()
{
Board = new Array(8);
for (var i = 0; i < 8; i++)
{
Board[i] = new Array(8);
}

for (var p  = 0; p < 8; p++)
{
for (var q = 0; q < 8; q++)
{

}
}
}
*/
