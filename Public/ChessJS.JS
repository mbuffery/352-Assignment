var numOfCol = 8,
numOfRow = 8,
WHITE_TEAM = new Array(),
BLACK_TEAM = new Array(),
allPieces = new Array(),
ctx = null,
Board = null,
BLOCK_SIZE = 100;

var greySquare = '#878787',
whiteSquare = '#ffffff',
outLine = '#fb0006';

var serverStatus = false,
endGame = false;


var blackTurn = 0,
whiteTurn = 1,
white = "White's Turn",
black = "Black's Turn",
SELECT_LINE_WIDTH = 5,
ROOK = 'Rook';

//Linking the server with the game
var socket = io();

//First socket.on updates the turn from the Server
socket.on('sendWhiteTurn', function(data)
{
  if (serverStatus == true)
  {
    white = data;

    if (endGame == false)
    {
      if(currTurn == 1)
      {
        document.getElementById("teamTurn").innerHTML = white;
        console.log("turn data is Working!");
      }
    }
  }
});

socket.on('sendBlackTurn', function(data)
{
  if (serverStatus == true)
  {
    black = data;

    if (endGame == false)
    {
      if(currTurn == 1)
      {
        document.getElementById("teamTurn").innerHTML = white;
        console.log("turn data is Working!");
      }
    }
  }
});


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

    document.getElementById("teamTurn").innerHTML = white;

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
    constructor(name, row, col, status, imgSrc, type) {
      this.name = name;
      this.row = row;
      this.col = col;
      this.status = status;
      this.imgSrc = imgSrc;
      this.type = type;
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
    var whiteLRook = new Piece("whiteLRook", 0, 0, 'IN_PLAY', 'whiteRook.png', 'Rook');
    var whiteRRook = new Piece("whiteRRook", 0, 7, 'IN_PLAY', 'whiteRook.png', 'Rook');

    var whiteLKnight = new Piece("whiteLKnight", 0, 1, 'IN_PLAY', 'whiteKnight.png', 'Knight');
    var whiteRKnight = new Piece("whiteRKnight", 0, 6, 'IN_PLAY', 'whiteKnight.png', 'Knight');

    var whiteLBishop = new Piece("whiteLBishop", 0, 2, 'IN_PLAY', 'whiteBishop.png', 'Bishop');
    var whiteRBishop = new Piece("whiteRBishop", 0, 5, 'IN_PLAY', 'whiteBishop.png', 'Bishop');

    var whiteQueen = new Piece("whiteQueen", 0, 3, 'IN_PLAY', 'whiteQueen.png', 'Queen');
    var whiteKing = new Piece("whiteKing", 0, 4, 'IN_PLAY', 'whiteKing.png', 'King');

    var whitePawn1 = new Piece("whitePawn1", 1, 0, 'IN_PLAY', 'whitePawn.png', 'Pawn');
    var whitePawn2 = new Piece("whitePawn2", 1, 1, 'IN_PLAY', 'whitePawn.png', 'Pawn');
    var whitePawn3 = new Piece("whitePawn3", 1, 2, 'IN_PLAY', 'whitePawn.png', 'Pawn');
    var whitePawn4 = new Piece("whitePawn4", 1, 3, 'IN_PLAY', 'whitePawn.png', 'Pawn');
    var whitePawn5 = new Piece("whitePawn5", 1, 4, 'IN_PLAY', 'whitePawn.png', 'Pawn');
    var whitePawn6 = new Piece("whitePawn6", 1, 5, 'IN_PLAY', 'whitePawn.png', 'Pawn');
    var whitePawn7 = new Piece("whitePawn7", 1, 6, 'IN_PLAY', 'whitePawn.png', 'Pawn');
    var whitePawn8 = new Piece("whitePawn8", 1, 7, 'IN_PLAY', 'whitePawn.png', 'Pawn');

    //Creates Black pieces
    var blackLRook = new Piece("blackLRook", 7, 0, 'IN_PLAY', 'blackRook.png', 'Rook');
    var blackRRook = new Piece("blackRRook", 7, 7, 'IN_PLAY', 'blackRook.png', 'Rook');

    var blackLKnight = new Piece("blackLKnight", 7, 1, 'IN_PLAY', 'blackKnight.png', 'Knight');
    var blackRKnight = new Piece("blackRKnight", 7, 6, 'IN_PLAY', 'blackKnight.png', 'Knight');

    var blackLBishop = new Piece("blackLBishop", 7, 2, 'IN_PLAY', 'blackBishop.png', 'Bishop');
    var blackRBishop = new Piece("blackRBishop", 7, 5, 'IN_PLAY', 'blackBishop.png', 'Bishop');

    var blackQueen = new Piece("blackQueen", 7, 3, 'IN_PLAY', 'blackQueen.png', 'Queen');
    var blackKing = new Piece("blackKing", 7, 4, 'IN_PLAY', 'blackKing.png', 'King');

    var blackPawn1 = new Piece("blackPawn1", 6, 0, 'IN_PLAY', 'blackPawn.png', 'Pawn');
    var blackPawn2 = new Piece("blackPawn2", 6, 1, 'IN_PLAY', 'blackPawn.png', 'Pawn');
    var blackPawn3 = new Piece("blackPawn3", 6, 2, 'IN_PLAY', 'blackPawn.png', 'Pawn');
    var blackPawn4 = new Piece("blackPawn4", 6, 3, 'IN_PLAY', 'blackPawn.png', 'Pawn');
    var blackPawn5 = new Piece("blackPawn5", 6, 4, 'IN_PLAY', 'blackPawn.png', 'Pawn');
    var blackPawn6 = new Piece("blackPawn6", 6, 5, 'IN_PLAY', 'blackPawn.png', 'Pawn');
    var blackPawn7 = new Piece("blackPawn7", 6, 6, 'IN_PLAY', 'blackPawn.png', 'Pawn');
    var blackPawn8 = new Piece("blackPawn8", 6, 7, 'IN_PLAY', 'blackPawn.png', 'Pawn');

    //pushes all created pieces to white or black team
    WHITE_TEAM.push(whiteLRook, whiteRRook, whiteLKnight, whiteRKnight, whiteLBishop, whiteRBishop, whiteQueen, whiteKing, whitePawn1, whitePawn2, whitePawn3, whitePawn4, whitePawn5, whitePawn6, whitePawn7, whitePawn8);

    BLACK_TEAM.push(blackLRook, blackRRook, blackLKnight, blackRKnight, blackLBishop, blackRBishop, blackQueen, blackKing, blackPawn1, blackPawn2, blackPawn3, blackPawn4, blackPawn5, blackPawn6, blackPawn7, blackPawn8);

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
            //returns the piece name

            numSelectedPieces = 1;
            return piece.name;
          }
          else
          { //No piece selected, retuns nothing
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
            //returns the piece name

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
      //selectedField uses all clickedSquare data which is x,y(row, col)
      selectedField = clickedSquare;
      //if one piece is selelcted and selectedPiece does not equal null
      if (numSelectedPieces == 1 && selectedPiece != null)
      {
        //cretes border around the selcted piece to indicate that its been selected
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
      y = e.clientY - canvas.offsetTop,
      moveToField = screenToBlock(x, y);
      //DO the switch case here
      //just call the function here
      //removeSelection feature
      if (currTurn == 1)
      { //if the selectedPiece = where it will move next
        if (selectedPiece.row == moveToField.row && selectedPiece.col == moveToField.col)
        {
          //redraw the entire square and piece all set selelcted piece back to null
          drawSquare(moveToField.col, moveToField.row);
          Render();
          currTurn = 1;
          selectedPiece = null;


        }
      }
      else if (currTurn == 0)
      {
        if (selectedPiece.row == moveToField.row && selectedPiece.col == moveToField.col)
        {
          //redraw the entire square and piece all set selelcted piece back to null
          drawSquare(moveToField.col, moveToField.row);
          Render();
          currTurn = 0;
          selectedPiece = null;
        }
      }
      if (currTurn == 1)
      { //if it is friendly piece, call checkIfFriendlyPiece and make the currTurn = 1;
        if (checkIfFriendlyPiece(moveToField))
        {
          currTurn = 1;

        } //Checks for whether it is a enemy piece.
        else if (checkIfEnemyPiece(moveToField) == true)
        {
          WHITE_TEAM[WHITE_TEAM.indexOf(selectedPiece)].row = moveToField.row;
          WHITE_TEAM[WHITE_TEAM.indexOf(selectedPiece)].col = moveToField.col;
          drawSquare(moveToField.col, moveToField.row);
          drawSquare(selectedField.col, selectedField.row);
          Render();
          currTurn = currTurn - 1;
          selectedPiece = null;
          numSelectedPieces = 0;
          document.getElementById("teamTurn").innerHTML = black;
          socket.emit('sendBlackTurn', black);

        }
        else
        { // empty square
          WHITE_TEAM[WHITE_TEAM.indexOf(selectedPiece)].row = moveToField.row;
          WHITE_TEAM[WHITE_TEAM.indexOf(selectedPiece)].col = moveToField.col;
          drawSquare(selectedField.col, selectedField.row);
          Render();
          currTurn = currTurn - 1;
          selectedPiece = null;
          numSelectedPieces = 0;
          document.getElementById("teamTurn").innerHTML = black;

          socket.emit('sendCurrTurn', currTurn);
        }
      }
      else if (currTurn == 0)
      { //if it is friendly piece, call checkIfFriendlyPiece and make the currTurn = 1;
        if (checkIfFriendlyPiece(moveToField))
        {
          currTurn = 0;

        } //Checks for whether it is a enemy piece.
        else if (checkIfEnemyPiece(moveToField) == true)
        {
          BLACK_TEAM[BLACK_TEAM.indexOf(selectedPiece)].row = moveToField.row;
          BLACK_TEAM[BLACK_TEAM.indexOf(selectedPiece)].col = moveToField.col;
          drawSquare(moveToField.col, moveToField.row);
          drawSquare(selectedField.col, selectedField.row);
          Render();
          currTurn = currTurn + 1;
          selectedPiece = null;
          numSelectedPieces = 0;
          document.getElementById("teamTurn").innerHTML = white;
          socket.emit('sendCurrTurn', currTurn);
        }
        else
        { // empty square
          BLACK_TEAM[BLACK_TEAM.indexOf(selectedPiece)].row = moveToField.row;
          BLACK_TEAM[BLACK_TEAM.indexOf(selectedPiece)].col = moveToField.col;
          drawSquare(selectedField.col, selectedField.row);
          Render();
          currTurn = currTurn + 1;
          selectedPiece = null;
          numSelectedPieces = 0;
          document.getElementById("teamTurn").innerHTML = white;
          socket.emit('sendCurrTurn', currTurn);
        }
      }
    }
  }
  //look up regex for giving piece movement


  //
  function checkIfFriendlyPiece (moveToField)
  {
    //if white turn
    if (currTurn == 1)
    { //finds a white team piece that fits the the statement, return true otherwise return false
      if(WHITE_TEAM.find(function(piece) {
        if (moveToField.row == piece.row && moveToField.col == piece.col && piece.status == "IN_PLAY")
        {
          return true;
        } else {
          return false;
        }
      })){
        return true;
      } else{
        return false;
      }
    }else
    {
      if(BLACK_TEAM.find(function(piece) {
        if (moveToField.row == piece.row && moveToField.col == piece.col && piece.status == "IN_PLAY")
        {
          return true;
        } else {
          return false;
        }
      })){
        return true;
      } else{
        return false;
      }
    }


  }

  // deletes the piece if it is used by
  function checkIfEnemyPiece (moveToField)
  {
    //white turn
    if (currTurn == 1)
    {
      //any black piece selected that equals the moveToField will have their status changed to dead
      if(BLACK_TEAM.find(function(piece) {
        if (moveToField.row == piece.row && moveToField.col == piece.col)
        {
          //return true
          piece.status = "prettydead";
          console.log("Black enemy piece");
          return true;
        } else {
          return false;
        }
      })) {

        return true;
      } else {

        return false;
      }
    } else if (currTurn == 0) {
      if(WHITE_TEAM.find(function(piece) {
        if (moveToField.row == piece.row && moveToField.col == piece.col)
        {
          piece.status = "prettydead";
          return true;
        } else {
          return false;
        }
      })) {

        return true;
      } else {

        return false;
      }
    }
  }



  function CheckForWinCondition (selectedPiece)
  {
    if (currTurn == 0)
    {
      //if(WHITE_TEAM)
    }
    else if (currTurn == 1)
    {

    }
  }

  function canPawnMoveToBlock (selectedPiece)
  {
    if (currTurn == 0)
    {
      selectedPiece.row + 1
    }
    else if (currTurn == 1)
    {

    }
  }
  var resetButton = document.getElementById("");

  //TODO:
  // * add individual piece movement
  // * Look at filter array
  // * add a win situation
  // * setup online server
