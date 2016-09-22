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



window.findNRooksSolution = function(n) {
  var board = new Board({'n': n});
  //call findSolution for first time
  var findSolution = function(boardState, currentRow) {
    if (n === currentRow) {
      return boardState.rows();
    }
    for (var currentColumn = 0; currentColumn < n; currentColumn++) {
      boardState.togglePiece(currentRow, currentColumn);
      if (!boardState.hasAnyRooksConflicts()) {
        //go on to next level
        return findSolution(boardState, currentRow + 1);
      } else {
        boardState.togglePiece(currentRow, currentColumn);
      }
    }  
  };
  //return answer
  return findSolution(board, 0);
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({'n': n});
  var findSolution = function(boardState, currentRow) {
    if (currentRow === n) {
      solutionCount += 1;
    } else {
      for (var currentColumn = 0; currentColumn < n; currentColumn++) {
        boardState.togglePiece(currentRow, currentColumn);
        if (!boardState.hasAnyRooksConflicts()) {
          findSolution(boardState, currentRow + 1);
          boardState.togglePiece(currentRow, currentColumn);
        } else {
          boardState.togglePiece(currentRow, currentColumn);
        }
      }
    }
  };
  findSolution(board, 0);
  return solutionCount;
  //iterate through the rows
    //iterate through each column
      //togglePiece(row, col)
      //check for conflicts
        //no conflicts?
          //recursively call next level
  //return solutionCount
};

window.dec2bin = function (dec) {
  return (dec >>> 0).toString(2);
};


window.bitwiseCountNRooksSolutions = function(n) {
  //make count
  var count = 0;
  var complete = Math.pow(2, n) - 1;

  //recursive function
  var innerRecurse = function (column) {
    //if colums is all 1s, all columns are filled. Done!
    if (column === complete) {
      count += 1;
      return;
    } else {
      //get all available open column indexs
      var poss = ~(column);
      //set all digits beyond the nth to 0
      while ((poss & complete)) {
        //get the next open column index
        var nextPosition = poss & -poss;
        //set that column index as filled
        poss -= nextPosition;
        //call recursively.
        innerRecurse(column | nextPosition);
      }
    }
  };
  innerRecurse(0);
  return count;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  console.log('we are on the ' + n);
  if (n === 0) {
    return [];
  } 
  var board = new Board({'n': n});
  //call findSolution for first time
  var findSolution = function(boardState, currentRow) {
    if (n === currentRow) {
      return boardState.rows();
    }
    for (var currentColumn = 0; currentColumn < n; currentColumn++) {
      boardState.togglePiece(currentRow, currentColumn);
      if (!boardState.hasAnyQueensConflicts()) {
        //go on to next level
        var sol = findSolution(boardState, currentRow + 1);
        if (sol === undefined) {
          boardState.togglePiece(currentRow, currentColumn);
        } else {
          return sol;
        }
      } else {
        boardState.togglePiece(currentRow, currentColumn);
      }
    }
    return undefined;  
  };
  //return answer
  var ans = findSolution(board, 0);
  if (ans !== undefined) {
    return ans;
  } else {
    return board.rows();
  }
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) { 
    return 1;
  }
  var solutionCount = 0;
  var board = new Board({'n': n});
  var findSolution = function(boardState, currentRow) {
    if (currentRow === n) {
      solutionCount += 1;
    } else {
      for (var currentColumn = 0; currentColumn < n; currentColumn++) {
        boardState.togglePiece(currentRow, currentColumn);
        if (!boardState.hasAnyQueensConflicts()) {
          findSolution(boardState, currentRow + 1);
          boardState.togglePiece(currentRow, currentColumn);
        } else {
          boardState.togglePiece(currentRow, currentColumn);
        }
      }
    }
  };
  findSolution(board, 0);
  return solutionCount;
  //iterate through the rows
    //iterate through each column
      //togglePiece(row, col)
      //check for conflicts
        //no conflicts?
          //recursively call next level
  //return solutionCount
};
