/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n, board) {
  var solution = undefined; //fixme
  //for every point in the board
  //try to place a rook there,
  //  if rookconflict detected, remove back from the board
  //continue until all rooks for placed
  //return board
  var board = board || new Board({n: n});
  for(var i = 0; i < n; i++) {
    for(var j = 0; j < n; j++) {
      board.togglePiece(i, j);
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(i,j);
      }
    }
  }
  // console.dir(board);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board));
  return board.rows();
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var outcomes = [];
  var iterateBoard = function(currentBoard, rounds){

    if (rounds === 0) {   //base case
      outcomes.push(currentBoard.rows());
    } else {
      var newBoard = new Board(currentBoard.rows());  //create a copy of currentBoard

      for (var i=0; i<n; i++){
        newBoard.togglePiece(n - rounds, i);
        if (!newBoard.hasAnyRooksConflicts()){    //recursive case when no conflict
          iterateBoard(newBoard, rounds - 1);
        }
        newBoard.togglePiece(n-rounds, i);    //remove to continue checking next slot
      }
    }

  };

  iterateBoard(new Board({n: n}), n);
  console.log('Number of solutions for ' + n + ' rooks:', outcomes.length);
  return outcomes.length;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = board || new Board({n: n});
  for(var i = 0; i < n; i++) {
    for(var j = 0; j < n; j++) {
      board.togglePiece(i, j);
      if (board.hasAnyQueensConflicts()) {
        board.togglePiece(i,j);
      }
    }
  }
  // console.dir(board);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board));
  return board.rows();
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
