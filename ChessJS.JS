
var numOfCol = 8,
numOfRow = 8,
WHITE_TEAM = new Array(),
BLACK_TEAM = new Array(),
allPieces = new Array(),
ctx = null,
Board = null,
BLOCK_SIZE = 100;


var greySquare = '#878787',
whiteSquare = '#ffffff'
outLine = '#fb0006';

var blackTurn = 0,
whiteTurn = 1,
SELECT_LINE_WIDTH = 5,
ROOK = 'Rook';

var KNIGHT = 'Knight';
var BISHOP = 'Bishop';
var QUEEN = 'Queen';
var KING = 'King';
var PAWN = 'Pawn';

function draw() {
  var c = document.getElementById("canvas");
  //checks to see if canvas is supported
  if (canvas.getContext) {
    ctx = canvas.getContext("2d");

    //calculates the sqaure size
    BLOCK_SIZE = c.height / numOfRow;

    //draws the board
    DrawBoard();

    //creates all pieces
    CreatePieces();

    //Renders all pieces
    Render();

    //document.getElementById("teamTurn").innerHTML = currentTurn;

    // when canvas is clicked, calls handleClick function
    c.addEventListener('click', handleClick);

  } else {
    alert("Canvas is not supported")
  }

}

function Render() {
  //Goes through the entire array and renders the img,row(y) and collums(x);
  WHITE_TEAM.forEach(function(piece) {
    piece.img = new Image();
    piece.img.src = piece.imgSrc;
  });
  BLACK_TEAM.forEach(function(piece) {
    piece.img = new Image();
    piece.img.src = piece.imgSrc;
  });
  //if piece = in play, render the piece in
  WHITE_TEAM.forEach(function(piece) {
    if (piece.status == 'IN_PLAY')
    {
      piece.img.onload = function() {
        ctx.drawImage(piece.img, piece.col * BLOCK_SIZE, piece.row * BLOCK_SIZE);
      }
      allPieces.push(piece);
      //if piece.status = dead then do not render
    } else if (piece.status == 'DEAD')
    {

    }
  });
  BLACK_TEAM.forEach(function(piece) {
    if (piece.status == 'IN_PLAY')
    {
      piece.img.onload = function() {
        ctx.drawImage(piece.img, piece.col * BLOCK_SIZE, piece.row * BLOCK_SIZE);
      }
      allPieces.push(piece);
    } else if (piece.status == 'DEAD')
    {

    }
  });
}

function DrawBoard() {
  var rowCounter;

  for (rowCounter = 0; rowCounter < numOfRow; rowCounter++) {
    drawRow(rowCounter);
  }
  // Draws the outline
  ctx.lineWidth = 3;
  ctx.strokeRect(0, 0,
    numOfRow * BLOCK_SIZE,
    numOfCol * BLOCK_SIZE);
  }
  function drawSquare(rowCounter, squareCounter) {
    // Sets the background
    ctx.fillStyle = getSquarColour(rowCounter, squareCounter);

    //draws the squares for background
    ctx.fillRect(rowCounter * BLOCK_SIZE, squareCounter * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);

    ctx.stroke();
  }

  function drawRow(rowCounter) {
    var squareCounter;
    //Draws an 8 square radius from left to right
    for (squareCounter = 0; squareCounter < numOfRow; squareCounter++) {
      drawSquare(rowCounter, squareCounter);
    }
  }

  function getSquarColour(rowCounter, squareCounter) {
    var startColour;

    //create the black and white squares onto the board
    if (rowCounter % 2) {
      //creates the whites squares
      startColour = (squareCounter % 2 ? whiteSquare : greySquare);
    } else {
      //creates the grey squares
      startColour = (squareCounter % 2 ? greySquare : whiteSquare);
    }

    return startColour;
  }

  //Creates a class piece inheritance, then populate each piece with data
  class Piece {
    constructor(name, row, col, status, imgSrc) {
      this.name = name;
      this.row = row;
      this.col = col;
      this.status = status;
      //this.img = new Image();
      this.imgSrc = imgSrc;
    }
  }
  //function to calculate the row and col for mouseclick
  function screenToBlock(x, y) {
    var block = {
      "row": Math.floor(y / BLOCK_SIZE),
      "col": Math.floor(x / BLOCK_SIZE)
    };
    return block;
  }

  //creates all pieces starting position, status and piece name e.g. whiteRook
  function CreatePieces() {
    //Creates White pieces
    //new piece = name, row(y), col(x), status, img name location
    var whiteLRook = new Piece("whiteLRook", 0, 0, 'IN_PLAY', 'whiteRook.png');
    var whiteRRook = new Piece("whiteRRook", 0, 7, 'IN_PLAY', 'whiteRook.png');

    var whiteLKnight = new Piece("whiteLKnight", 0, 1, 'IN_PLAY', 'whiteKnight.png');
    var whiteRKnight = new Piece("whiteRKnight", 0, 6, 'IN_PLAY', 'whiteKnight.png');

    var whiteLBishop = new Piece("whiteLBishop", 0, 2, 'IN_PLAY', 'whiteBishop.png');
    var whiteRBishop = new Piece("whiteRBishop", 0, 5, 'IN_PLAY', 'whiteBishop.png');

    var whiteQueen = new Piece("whiteQueen", 0, 4, 'IN_PLAY', 'whiteQueen.png');
    var whiteKing = new Piece("whiteKing", 0, 3, 'IN_PLAY', 'whiteKing.png');

    var whitePawn1 = new Piece("whitePawn1", 1, 0, 'IN_PLAY', 'whitePawn.png');
    var whitePawn2 = new Piece("whitePawn2", 1, 1, 'IN_PLAY', 'whitePawn.png');
    var whitePawn3 = new Piece("whitePawn3", 1, 2, 'IN_PLAY', 'whitePawn.png');
    var whitePawn4 = new Piece("whitePawn4", 1, 3, 'IN_PLAY', 'whitePawn.png');
    var whitePawn5 = new Piece("whitePawn5", 1, 4, 'IN_PLAY', 'whitePawn.png');
    var whitePawn6 = new Piece("whitePawn6", 1, 5, 'IN_PLAY', 'whitePawn.png');
    var whitePawn7 = new Piece("whitePawn7", 1, 6, 'IN_PLAY', 'whitePawn.png');
    var whitePawn8 = new Piece("whitePawn8", 1, 7, 'IN_PLAY', 'whitePawn.png');

    //Creates Black pieces
    var blackLRook = new Piece("blackLRook", 7, 0, 'IN_PLAY', 'blackRook.png');
    var blackRRook = new Piece("blackRRook", 7, 7, 'IN_PLAY', 'blackRook.png');

    var blackLKnight = new Piece("blackLKnight", 7, 1, 'IN_PLAY', 'blackKnight.png');
    var blackRKnight = new Piece("blackRKnight", 7, 6, 'IN_PLAY', 'blackKnight.png');

    var blackLBishop = new Piece("blackLBishop", 7, 2, 'IN_PLAY', 'blackBishop.png');
    var blackRBishop = new Piece("blackRBishop", 7, 5, 'IN_PLAY', 'blackBishop.png');

    var blackQueen = new Piece("blackQueen", 7, 4, 'IN_PLAY', 'blackQueen.png');
    var blackKing = new Piece("blackKing", 7, 3, 'IN_PLAY', 'blackKing.png');

    var blackPawn1 = new Piece("blackPawn1", 6, 0, 'IN_PLAY', 'blackPawn.png');
    var blackPawn2 = new Piece("blackPawn2", 6, 1, 'IN_PLAY', 'blackPawn.png');
    var blackPawn3 = new Piece("blackPawn3", 6, 2, 'IN_PLAY', 'blackPawn.png');
    var blackPawn4 = new Piece("blackPawn4", 6, 3, 'IN_PLAY', 'blackPawn.png');
    var blackPawn5 = new Piece("blackPawn5", 6, 4, 'IN_PLAY', 'blackPawn.png');
    var blackPawn6 = new Piece("blackPawn6", 6, 5, 'IN_PLAY', 'blackPawn.png');
    var blackPawn7 = new Piece("blackPawn7", 6, 6, 'IN_PLAY', 'blackPawn.png');
    var blackPawn8 = new Piece("blackPawn8", 6, 7, 'IN_PLAY', 'blackPawn.png');

    //pushes all created pieces to white or black team
    WHITE_TEAM.push(whiteLRook, whiteRRook, whiteLKnight, whiteRKnight, whiteLBishop, whiteRBishop, whiteQueen, whiteKing, whitePawn1, whitePawn2, whitePawn3, whitePawn4, whitePawn5, whitePawn6, whitePawn7, whitePawn8);

    BLACK_TEAM.push(blackLRook, blackRRook, blackLKnight, blackRKnight, blackLBishop, blackRBishop, blackQueen, blackKing, blackPawn1, blackPawn2, blackPawn3, blackPawn4, blackPawn5, blackPawn6, blackPawn7, blackPawn8);

  }
  function RemoveSelection(selectedPiece) {
    if (currTurn == 0)
    {
      if (selectedPiece.name == piece.name)
      drawSquare(selectedPiece.col, selectedPiece.row);
      Render(selectedPiece);
      currTurn = currTurn - 2;
    } else if (currTurn == 1)
    {
      drawSquare(selectedPiece.col, selectedPiece.row);
      Render(selectedPiece);
      currTurn = currTurn + 1;
    }
  }

  var selectedPiece = null;
  var numSelectedPieces = 0;
  var selectedField = null;
  var currTurn = 1;

  function handleClick(e) {
    //First Click
    if (selectedPiece == null) {
      var x = e.clientX - canvas.offsetLeft,
      y = e.clientY - canvas.offsetTop,
      //clickedSquare = Row and col
      clickedSquare = screenToBlock(x, y);

      //selectedPiece = go through the entire piece array and links the clickedSquare data to what piece has been clicked.
      //e.g. piece.row and col = selectedPiece.row and col

      //white turn
      if (currTurn == 1)
      {
        //selectedPiece = the selected white piece
        selectedPiece = WHITE_TEAM.find(function(piece)
        {
          if (piece.status == 'IN_PLAY' && piece.row == clickedSquare.row && piece.col == clickedSquare.col)
          {
            numSelectedPieces = 1;
            return piece.name;
          }
          else
          {
            return null;
          }
        });
        //black turn
      }
      else if (currTurn == 0)
      {
        //selectedPiece = the selected black piece
        selectedPiece = BLACK_TEAM.find(function(piece)
        {
          if (piece.status == 'IN_PLAY' && piece.row == clickedSquare.row && piece.col == clickedSquare.col)
          {
            numSelectedPieces = 1;
            return piece.name;
          }
          else
          {
            return null;
          }
        });
      }
      // end of find

      selectedField = clickedSquare;

      if (numSelectedPieces == 1 && selectedPiece != null)
      {
        ctx.lineWidth = SELECT_LINE_WIDTH;
        ctx.strokeStyle = outLine;
        ctx.strokeRect((selectedPiece.col * BLOCK_SIZE) + SELECT_LINE_WIDTH,
        (selectedPiece.row * BLOCK_SIZE) + SELECT_LINE_WIDTH,
        BLOCK_SIZE - (SELECT_LINE_WIDTH * 2),
        BLOCK_SIZE - (SELECT_LINE_WIDTH * 2));
      }
    }
    //Second Click
    else
    {
      var x = e.clientX - canvas.offsetLeft,
      y = e.clientY - canvas.offsetTop;
      moveToField = screenToBlock(x, y);
      //If currTurn is white, moveToField.row and .col = selectedPiece.row and col
      if (currTurn == 1)
      {
        WHITE_TEAM[WHITE_TEAM.indexOf(selectedPiece)].row = moveToField.row;
        WHITE_TEAM[WHITE_TEAM.indexOf(selectedPiece)].col = moveToField.col;

        if(checkIfSquareIsBlocked(selectedPiece) == true)
        {

          drawSquare(moveToField.col, moveToField.row);
        }
        else
        {

        }
        drawSquare(selectedField.col, selectedField.row);
        Render();
        currTurn = currTurn - 1;
        selectedPiece = null;
        numSelectedPieces = 0;

      }
      else if (currTurn == 0)
      {
        BLACK_TEAM[BLACK_TEAM.indexOf(selectedPiece)].row = moveToField.row;
        BLACK_TEAM[BLACK_TEAM.indexOf(selectedPiece)].col = moveToField.col;
        if(checkIfSquareIsBlocked(selectedPiece) == true)
        {
          drawSquare(moveToField.col, moveToField.row);
        }
        else
        {

        }
        drawSquare(selectedField.col, selectedField.row);
        Render();
        currTurn = currTurn + 1;
        selectedPiece = null;
        numSelectedPieces = 0;
      }
    }
    //look up regex for giving piece movement
  }


  function checkIfFriendlyPiece (selectedPiece)
  {
    if (currTurn == 1)
    {
      if (WHITE_TEAM.find(function(piece)
      {
        if (selectedPiece.row == piece.row && selectedPiece.col == piece.col)
        {
          console.log("ally Piece Selected");
          return true;
        }
        else{
          console.log("is not ally piece");
          return false;
        }
      }))
      return true;
    }
  }

// deletes the piece if it is used by
function checkIfSquareIsBlocked (selectedPiece)
{
  if (currTurn == 1)
  {
    if(BLACK_TEAM.find(function(piece)
    {
      if (selectedPiece.row == piece.row && selectedPiece.col == piece.col)
      {
        console.log("black piece selected");
        return true;
      }
      else
      {
        console.log("is not black piece");
        return false;
      }
    }))

      BLACK_TEAM.find(function(piece)
      {
        if (selectedPiece.row == piece.row && selectedPiece.col == piece.col)
        {
          console.log("change state");
          piece.status = "dead";
        }
      });
      return true;

  }else if (currTurn == 0)
  {
    if(WHITE_TEAM.find(function(piece)
    {
      if (selectedPiece.row == piece.row && selectedPiece.col == piece.col)
      {
        console.log("white piece selected");
        return true;
      }
      else
      {
        console.log("is not white piece");
        return false;
      }
    }))

      WHITE_TEAM.find(function(piece)
      {
        if (selectedPiece.row == piece.row && selectedPiece.col == piece.col)
        {
          console.log("change state");
          piece.status = "d";
        }
      });
      return true;

  }
}
//TODO
/*
function checkIfEnemyPiece (selectedPiece)
{
  var enemyPiece = null;
  if (currTurn == 0)
  {
    enemyPiece = BLACK_TEAM.find(function(piece)
    {
      if (piece.status == 'IN_PLAY' && piece.row == clickedSquare.row && piece.col == clickedSquare.col)
      {
        console.log(piece.name)
        return piece.name;
      }
      else
      {
        return null;
      }
    });
  }
  else if (currTurn == 1)
  {

  }
}
*/

function CheckForWinCondition (selectedPiece)
{

}

function canSelectePiecedMoveToSquare(selectedPiece) {
  var pCanMove = false;

  switch (selectedPiece.piece) {

    case ROOK:


    break;

    case KNIGHT:

    // TODO

    break;

    case BISHOP:

    // TODO

    break;

    case QUEEN:

    // TODO

    break;

    case KING:

    // TODO

    break;

    case PAWN:

    pCanMove = canPawnMoveToBlock(selectedPiece);

    break;
  }

  return bCanMove;
}
function canPawnMoveToBlock (selectedPiece)
{
  var moveViaRow;
  var enemy
  if (currTurn == 0)
  {
    selectedPiece.row + 1
  }
  else if (currTurn == 1)
  {

  }
}

//TODO:
// * fix RemoveSelection
// * fix ally piece deleting themself when attacking another allied pieces
// * add individual piece movement
// * add a win situation
// * setup online server
