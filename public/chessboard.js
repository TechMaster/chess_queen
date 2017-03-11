class ChessBoard {
  constructor(svg, boardSize, cellWidth) {
    this.boardSize = boardSize
    this.cellWidth = cellWidth
    this.snap = svg
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
        let cell = this.snap.rect(cellX, cellY, this.cellWidth, this.cellWidth)
        let fillColor = (rowIndex + colIndex) % 2 === 0 ? white : black
        cell.attr({
          class: 'cell',
          id: `c${rowIndex}-${colIndex}`,  //we use id to select cell
          fill: fillColor,
          stroke: "#000000",
          strokeWidth: 1
        });


        if (colIndex === 0) {  //draw left chess board marker 8 down to 1
          let text = (this.boardSize - rowIndex).toString()
          let [leftMarkerX, leftMarkerY] = this.computeLeftMarkerCoordinate(rowIndex)
          let marker = this.snap.text(leftMarkerX, leftMarkerY, text);
          marker.attr({
            class: 'Lmarker'
          })
        }

        if (rowIndex === this.boardSize - 1) { //draw bottom chess board marker
          let text = String.fromCharCode(65 + colIndex)
          let [bottomMarkerX, bottomMarkerY] = this.computeBottomMarkerCoordinate(colIndex)
          let marker = this.snap.text(bottomMarkerX, bottomMarkerY, text);
          marker.attr({
            class: 'Bmarker'
          })
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
   * Generic function to highlight a cell using high light function
   * @param rowIndex
   * @param colIndex
   */
  highlightCell(rowIndex, colIndex, highlightFunc) {
    let cell = this.snap.select(`#c${rowIndex}-${colIndex}`)
    highlightFunc(cell)
  }

  /**
   * Attract user to this cell by flashing it
   * @param rowIndex
   * @param colIndex
   */
  flashCell(rowIndex, colIndex) {
    this.highlightCell(3, 4, function (cell) {
      cell.animate({'fill-opacity': 0.0}, 300, mina.linear, function () {
        cell.animate({'fill-opacity': 1.0}, 300, mina.linear)
      })
    })
  }

  /**
   * Make cell looker darker like disabled cell
   * @param rowIndex
   * @param colIndex
   */
  dimCell(rowIndex, colIndex) {
    this.highlightCell(6, 6, function (cell) {
      cell.animate({'fill-opacity': 0.0}, 300, mina.linear, function () {
        cell.animate({'fill-opacity': 1.0, fill: "#666666"}, 300, mina.linear)
      })
    })
  }

  /**
   * Flashing Red several times to indicate this is dangerous cell
   * @param rowIndex
   * @param colIndex
   */
  showDangerousPosition(rowIndex, colIndex) {
    let count = 5
    let originalFillColor

    this.highlightCell(rowIndex, colIndex, function (cell) {
      originalFillColor = cell.attr('fill')
      function animateFill() {
        if (count > 0 && count % 2 ===1) {
          cell.animate({fill: '#FF0000'}, 300, mina.linear, animateFill)
        } else {
          cell.animate({fill: originalFillColor}, 300, mina.linear, animateFill)
        }
        count--;
      }

      animateFill();

    })
  }

  /**
   * Draw dash line
   * @param fromRow
   * @param fromCol
   * @param toRow
   * @param toCol
   */
  drawLine(fromRow, fromCol, toRow, toCol) {
    let [cellXFrom, cellYFrom] = this.computeCellCoordinate(fromRow, fromCol)
    let [cellXTo, cellYTo] = this.computeCellCoordinate(toRow, toCol)
    let cellHalfWidth = this.cellWidth / 2
    let line = this.snap.line(cellXFrom + cellHalfWidth, cellYFrom + cellHalfWidth, cellXTo + cellHalfWidth, cellYTo + cellHalfWidth)
    line.attr({
      stroke: "#0000AA",
      strokeWidth: 1,
      'stroke-dasharray': "5, 5"
    })
  }

  //layoutChessBoard()



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

