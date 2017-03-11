var boardSize = 8 //Number of cell at each size of board
var cellWidth = 80 //Width of each cell rectangle

class ChessBoard {
  constructor(boardSize, cellWidth) {
    this.boardSize = boardSize
    this.cellWidth = cellWidth
    this.snap = Snap("#svg")
    this.chessSymbol = {
      "K": '\u265A',  //King
      "Q": "\u265B",  //Queen
      "R": "\u265C",  //Rook
      "B": "\u265D",  //Bishop
      "N": "\u265E",  //Knight
      "P": "\u265F",  //Pawn
    }

    this.allPieces = [];

    //----------
    this.leftMargin = 20
    this.topMargin = 20
  }

  drawBoard() {
    const black = "#b58863"
    const white = "#f0d9b5"

    //TODO: should group all cell under big SNAP object


    for (let rowIndex = 0; rowIndex < this.boardSize; rowIndex++) {

      for (let colIndex = 0; colIndex < this.boardSize; colIndex++) {

        //Create a cell in chess board
        let [cellX, cellY] = this.computeCellCoordinate(rowIndex, colIndex)
        let rect = this.snap.rect(cellX, cellY, this.cellWidth, this.cellWidth)
        let fillColor = (rowIndex + colIndex) % 2 === 0 ? white : black
        rect.attr({
          class: 'cell',
          id: `${rowIndex}${colIndex}`,  //we use id to select cell
          fill: fillColor,
          stroke: "#000",
          strokeWidth: 1
        });

        if (colIndex === 0) {  //draw left chess board marker 8 down to 1
          let text = (this.boardSize - rowIndex).toString()
          let [leftMarkerX, leftMarkerY] = this.computeLeftMarkerCoordinate(rowIndex)
          let marker = this.snap.text(leftMarkerX, leftMarkerY, text);
          /*marker.snapText.attr({
           'font-size': this.cellWidth * 0.4,
           'fill': '#000000'
           });*/
        }

        if (rowIndex === this.boardSize - 1) { //draw bottom chess board marker
          let text = String.fromCharCode(65 + colIndex)
          let [bottomMarkerX, bottomMarkerY] = this.computeBottomMarkerCoordinate(colIndex)
          let marker = this.snap.text(bottomMarkerX, bottomMarkerY, text);
        }
      }
    }
  }

  computeCellCoordinate(rowIndex, colIndex) {
    return [this.leftMargin + colIndex * this.cellWidth, this.topMargin + rowIndex * this.cellWidth]
  }

  computeLeftMarkerCoordinate(rowIndex) {
    return [0, this.topMargin + (rowIndex + 0.55) * this.cellWidth]
  }

  computeBottomMarkerCoordinate(colIndex) {
    return [this.leftMargin + (colIndex + 0.4) * this.cellWidth, this.topMargin + 20 + this.boardSize * this.cellWidth]
  }

  /**
   * Give rowIndex, colIndex return x, y pixel coordinate of a piece
   * @param rowIndex
   * @param colIndex
   * @returns {[*,*]}
   */
  computePiecePixelCoordinate(rowIndex, colIndex) {
    return [this.leftMargin + (colIndex + 0.1) * this.cellWidth, this.topMargin + (rowIndex + 0.7) * this.cellWidth]
  }

  /**
   * Draw piece at specific position
   * @param symbol
   * @param rowIndex
   * @param colIndex
   * @returns {Piece.constructor}
   */
  placeNewPieceAt(symbol, rowIndex, colIndex) {
    let piece = new Piece(symbol, rowIndex, colIndex)
    let [x, y] = this.computePiecePixelCoordinate(rowIndex, colIndex)
    piece.snapText = this.snap.text(x, y, this.chessSymbol[piece.pieceType])

    piece.snapText.attr({
      'font-size': this.cellWidth * 0.8,
      'fill': piece.side ? '#FFFFFF' : '#000000'
    });

    this.allPieces.push(piece)  //Add piece to existing collection
    return piece;
  }

  //Get piece if it is at position in chess board
  getPiece(atRow, atCol) {
    for (let i = 0; i < this.allPieces.length; i++) {
      let piece = this.allPieces[i];
      if (piece.rowIndex === atRow && piece.colIndex === atCol) {
        return [piece, i]
      }
    }
    return [null, -1]  //Piece is not found
  }

  //Check if piece at fromRow and fromCol first then check if move is legal
  movePiece(fromRow, fromCol, toRow, toCol) {
    if (!this.checkIfMoveIsLegal(fromRow, fromCol, toRow, toCol)) return false

    let [piece, index] = this.getPiece(fromRow, fromCol)
    if (index === -1) return false

    let [toX, toY] = this.computePiecePixelCoordinate(toRow, toCol)
    piece.snapText.animate({x: toX, y: toY}, 1000)
  }

  /**
   * For quick demo i don't check
   * @param fromRow
   * @param fromCol
   * @param toRow
   * @param toCol
   * @returns {boolean}
   */
  checkIfMoveIsLegal(fromRow, fromCol, toRow, toCol) {
    if (fromRow === toRow && fromCol === toCol) return false
    return true
  }

  /**
   * Return true if remove successfully else false if piece does not at position
   * @param atRow
   * @param atCol
   * @returns {boolean}
   */
  removePiece(atRow, atCol) {
    let [piece, index] = this.getPiece(atRow, atCol)
    if (index === -1) return false

    var self = this;  //Need to assign this to self variable to use inside callback function
    piece.snapText.animate({'fill-opacity': 0.0}, 500, mina.linear, function () {
      piece.snapText.remove()
      self.allPieces.splice(index, 1)
    })
    return true
  }

  /**
   * Highlight a cell
   * @param rowIndex
   * @param colIndex
   */
  highlightCell(rowIndex, colIndex) {
    //let cell = this.snap.select(`#${rowIndex}${colIndex}`);
    console.log(this.snap.select("cell"))
  }

  //layoutChessBoard()

  //showDangerousPosition()

  //showGoodPosition()

  //drawCheckMateLine()


}

class Piece {
  //symbol cannot be changed
  //rowIndex and colIndex can be changed
  constructor(symbol, rowIndex, colIndex) {
    this.pieceType = symbol.charAt(0)  //King, Queen, Rook, Bishop, Knight or Pawn
    this.side = symbol.charAt(1) === 'W' //True if White else False
    this.rowIndex = rowIndex
    this.colIndex = colIndex
  }
}

class solveNQueen {

}
//-----------------------------
const chessBoard = new ChessBoard(boardSize, cellWidth)
chessBoard.drawBoard();

chessBoard.placeNewPieceAt('QB', 3, 2)
chessBoard.placeNewPieceAt('NW', 0, 1)
chessBoard.placeNewPieceAt('BB', 2, 2)
chessBoard.highlightCell(0, 0)

//After 2 seconds remove some pieces then add RockBlack
setTimeout(function () {
  chessBoard.removePiece(3, 2)
  chessBoard.removePiece(0, 0)
  chessBoard.placeNewPieceAt('RB', 0, 3)
  chessBoard.movePiece(2, 2, 7, 7)
}, 1000)

