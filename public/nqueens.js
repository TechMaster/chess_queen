/**
 * Created by techmaster on 3/11/17.
 */
var boardSize = 4 //Number of cell at each size of board
var cellWidth = 80 //Width of each cell rectangle

const chessBoard = new ChessBoard(Snap("#svg"), boardSize, cellWidth)
chessBoard.drawBoard()
drawQueenPuzzle(chessBoard)


function demoChessBoard(chessBoard) {
  chessBoard.placeNewPieceAt('QB', 3, 2)
  chessBoard.placeNewPieceAt('NW', 0, 1)
  chessBoard.placeNewPieceAt('BB', 2, 2)

  chessBoard.dimCell(6, 6)
  chessBoard.flashCell(3, 4)
  chessBoard.showDangerousPosition(2, 7)
  chessBoard.drawLine(0, 0, 6, 6)


  //After 2 seconds remove some pieces then add RockBlack
  setTimeout(function () {
    chessBoard.removePiece(3, 2)
    chessBoard.removePiece(0, 0)
    chessBoard.placeNewPieceAt('RB', 0, 3)
    chessBoard.movePiece(2, 2, 7, 7)
  }, 1000)
}

function drawQueenPuzzle(chessBoard){
  let boardSize = chessBoard.boardSize
  let result = queenPuzzle(boardSize, boardSize)
  let firstSolution = result[0]
  for (let rowIndex = 0; rowIndex < boardSize; rowIndex++) {
    chessBoard.placeNewPieceAt('QB', rowIndex, firstSolution[rowIndex])
  }
}