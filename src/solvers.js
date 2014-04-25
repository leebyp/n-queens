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
  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board));
  return board.rows();
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var outcomes = [];
  var iterateBoard = function(currentBoard, row){

    if (row === 0) {   //base case
      outcomes.push(currentBoard.rows());
    } else {
      var newBoard = new Board(currentBoard.rows());  //create a copy of currentBoard

      for (var i=0; i<n; i++){
        newBoard.togglePiece(n - row, i);
        if (!newBoard.hasAnyRooksConflicts()){    //recursive case when no conflict
          iterateBoard(newBoard, row - 1);
        }
        newBoard.togglePiece(n-row, i);    //remove to continue checking next slot
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
  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board));
  return board.rows();
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other

//====================================================

// window.countNQueensSolutions = function(n) {
//   var outcomes = [];
//   var iterateBoard = function(currentBoard, rounds){

//     if (rounds === 0) {   //base case
//       outcomes.push(currentBoard.rows());
//     } else {
//       var newBoard = new Board(currentBoard.rows());  //create a copy of currentBoard

//       for (var i=0; i<n; i++){
//         newBoard.togglePiece(n - rounds, i);
//         if (!newBoard.hasAnyQueensConflicts()){    //recursive case when no conflict
//           iterateBoard(newBoard, rounds - 1);
//         }
//         newBoard.togglePiece(n-rounds, i);    //remove to continue checking next slot
//       }
//     }

//   };

//   iterateBoard(new Board({n: n}), n);
//   console.log('Number of solutions for ' + n + ' rooks:', outcomes.length);
//   return outcomes.length;
// };

//================== n=9, ~9000ms
//====================================================

// window.countNQueensSolutions = function(n){
//   // . place queen on each position in first row
//   //   . place each position on next row
//   //     .if collision at that new location, remove, and do nothing
//   //     .if no collision, continue at each position on next row  
//   var outcomes = [];
//   var iterateBoard = function(currentBoard, row){
//     if (row === n){
//       outcomes.push(currentBoard.rows());
//     } else {
//       var newBoard = new Board(currentBoard.rows());
//       for (var i=0; i<n; i++){
//         newBoard.togglePiece(row, i);
//         if (!newBoard.hasAnyQueenConflictsOn(row, i)){
//           iterateBoard(newBoard, row+1);
//         }
//         newBoard.togglePiece(row, i);
//       }
//     }
//   }
//   iterateBoard(new Board({n:n}), 0);
//   return outcomes.length;
// }

//================== n=9, ~1500ms, only checking for conflicts at new position on board
//====================================================

// window.countNQueensSolutions = function(n){
//   // . place queen on each position in first row
//   //   . place each position on next row
//   //     .if collision at that new location, remove, and do nothing
//   //     .if no collision, continue at each position on next row  
//   var outcomes = [];
//   var iterateBoard = function(currentBoard, row, usedColumns, usedMajor, usedMinor){
//     if (row === n){
//       outcomes.push(currentBoard.rows());
//     } else {
//       var newBoard = new Board(currentBoard.rows());
//       for (var i=0; i<n; i++){
//         newBoard.togglePiece(row, i);
//         if ((!(i in usedColumns) && !((i-row) in usedMajor)) && !((i+row) in usedMinor)){
//           var newUsedColumns = _.clone(usedColumns);
//           newUsedColumns[i] = true;
//           var newUsedMajor = _.clone(usedMajor);
//           newUsedMajor[i-row] = true;
//           var newUsedMinor = _.clone(usedMinor);
//           newUsedMinor[i+row] = true;
//           iterateBoard(newBoard, row+1, newUsedColumns, newUsedMajor, newUsedMinor);
//         }
//         newBoard.togglePiece(row, i);
//       }
//     }
//   };
//   iterateBoard(new Board({n:n}), 0, {}, {}, {});
//   return outcomes.length;
// };

//================== n=9, ~750ms, keeping a log of used columns, major and minor diagonals
//====================================================

// window.countNQueensSolutions = function(n){
//   var outcomes = [];
//   var iterateBoard = function(currentBoard, row, usedColumns, usedMajor, usedMinor){
//     if (row === n){
//       outcomes.push(currentBoard);
//     } else {
//       var newBoard = currentBoard.slice();
//       for (var column=0; column<n; column++){
//         if ((!(column in usedColumns) && !((column-row) in usedMajor)) && !((column+row) in usedMinor)){
//           newBoard[row] = column;
//           var newUsedColumns = _.clone(usedColumns);
//           newUsedColumns[column] = true;
//           var newUsedMajor = _.clone(usedMajor);
//           newUsedMajor[column-row] = true;
//           var newUsedMinor = _.clone(usedMinor);
//           newUsedMinor[column+row] = true;
//           iterateBoard(newBoard, row+1, newUsedColumns, newUsedMajor, newUsedMinor);
//         }
//       }
//     }
//   };
//   iterateBoard(new Array(n), 0, {}, {}, {});
//   return outcomes.length;
// };

//================== n=9, ~230ms, using a simple array instead of the board class, where key = row, value = column
// var board = new Array(n);
// // board.togglePiece
// board[i] = j;
// // board.togglePiece
// board[i] = null;
// key = row
// value = column
//====================================================

// window.countNQueensSolutions = function(n){

//   var outcomes = 0;

//   var iterateBoard = function(row, usedColumns, usedMajors, usedMinors){
//     if (row === n){
//       outcomes++;
//     }
//     for (var column=0; column<n; column++){
//       var bitColumn = 1 << column;
//       if (~(usedColumns | usedMajors | usedMinors) & bitColumn){
//         iterateBoard(row+1, usedColumns | bitColumn, (usedMajors | bitColumn)>>1, (usedMinors | bitColumn) << 1);
//       }
//     }
//   };
//   iterateBoard(0, 0, 0, 0);
//   return outcomes;
// };

//================== n=12 ~65ms, refactored code to exclude board, unused cloned varibles
//================== and bitshifted with numbers to keep track of used spaces
//==================================================== 

// window.countNQueensSolutions = function(n){

//   var outcomes = 0;

//   //if ( n%2 === 0){
//     var iterateBoard = function(row, usedColumns, usedMajors, usedMinors){
//       if (row === n){
//         outcomes++;
//       }
//       for (var column=0; column<n; column++){
//         var bitColumn = 1 << column;
//         if (~(usedColumns | usedMajors | usedMinors) & bitColumn){
//           iterateBoard(row+1, usedColumns | bitColumn, (usedMajors | bitColumn)>>1, (usedMinors | bitColumn) << 1);
//         }
//       }
//     };
//     for (var firstRowColumn=0; firstRowColumn<n/2; firstRowColumn++){
//         var bitColumn = 1 << firstRowColumn;
//         iterateBoard(1, bitColumn, bitColumn>>1, bitColumn << 1);
//     }
//     return outcomes*2;
//   //}

// };

//================== n=12 ~39ms, attempt at using symmetry for even n
//==================================================== 

window.countNQueensSolutions = function(n){

  var outcomes = 0;

  var iterateBoard = function(row, usedColumns, usedMajors, usedMinors){
      if (row === n){
        outcomes++;
      }
      for (var column=0; column<n; column++){
        var bitColumn = 1 << column;
        if (~(usedColumns | usedMajors | usedMinors) & bitColumn){
          iterateBoard(row+1, usedColumns | bitColumn, (usedMajors | bitColumn)>>1, (usedMinors | bitColumn) << 1);
        }
      }
  };

  if ( n%2 === 0){
    for (var firstRowColumn=0; firstRowColumn<n/2; firstRowColumn++){
      var bitColumn = 1 << firstRowColumn;
      iterateBoard(1, bitColumn, bitColumn>>1, bitColumn<<1);
    }
    return outcomes*2;
  }
  else {
    for (var firstRowColumn=0; firstRowColumn<n; firstRowColumn++){
      var bitColumn = 1 << firstRowColumn;
      iterateBoard(1, bitColumn, bitColumn>>1, bitColumn<<1);
    }
    return outcomes;
  }

};

//================== n=12 ~40ms, 
//================== n=13 ~400ms
//================== attempt at using symmetry for even n
//==================================================== 
