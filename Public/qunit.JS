
var newPiece = [];

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
var whiteLRook = new Piece("whiteLRook", 0, 0, 'IN_PLAY', 'whiteRook.png', 'Rook');
var blackLRook = new Piece("blackLRook", 7, 0, 'IN_PLAY', 'blackRook.png', 'Rook');
var whiteLKnight = new Piece("whiteLKnight", 0, 1, 'IN_PLAY', 'whiteKnight.png', 'Knight');
newPiece.push(whiteLRook, blackLRook, whiteLKnight);

console.log(newPiece[0]);
//First Qunit test to show Qunit is working
QUnit.test( "Test1 - Is qunit working", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

//Checks to see if the player spawns in the right position
QUnit.test( "Test3 - Player Creation Check", function( assert ) {
  assert.equal(whiteLRook.col, 0, 'Player spawns in the right position');
  assert.equal(whiteLRook.row, 0,'Player spawns in the right position');
});

// Will fail if it try two of the same piece equals the same col or row, stops ally and enenmy pieces
QUnit.test( "Test4 - Checking if player can spawn in position", function( assert ) {
  assert.equal(whiteLRook.col = blackLRook.col, true, 'Player cant spawn in same position as enenmy piece');
  assert.equal(whiteLRook.row = whiteLKnight.row, true, 'Player cant spawn in same position as ally piece');
});
