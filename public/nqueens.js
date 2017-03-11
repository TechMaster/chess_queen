/**
 * Created by techmaster on 3/11/17.
 */

const chessBoard = new ChessBoard(Snap("#svg"), boardSize, cellWidth)
chessBoard.drawBoard();

chessBoard.placeNewPieceAt('QB', 3, 2)
chessBoard.placeNewPieceAt('NW', 0, 1)
chessBoard.placeNewPieceAt('BB', 2, 2)
/*chessBoard.highlightCell(0, 0, function (cell) {
  cell.attr({
    stroke: "#0000FF",
    strokeWidth: 3
  })
})

chessBoard.dimCell(6, 6)

chessBoard.flashCell(3, 4)*/

chessBoard.showDangerousPosition(2, 7)

chessBoard.drawLine(0,0, 6,6)

/*
//After 2 seconds remove some pieces then add RockBlack
setTimeout(function () {
  chessBoard.removePiece(3, 2)
  chessBoard.removePiece(0, 0)
  chessBoard.placeNewPieceAt('RB', 0, 3)
  chessBoard.movePiece(2, 2, 7, 7)
}, 1000)*/


class NQueen {

}