/**
 * Created by techmaster on 3/11/17.
 */
const cellWidth = 80 //Width of each cell rectangle


/**
 * Capture user input in main html page, return JSON object
 */
function getUserInput() {
  let userInput = {}
  userInput.boardSize = $("select#selectBoardSize option:checked").val()
  userInput.runMode = $("input[name=runMode]:checked").val()
  return userInput
}

/**
 * Handle event when user clicks on button RUN
 */
function runSimulation() {
  const userInput = getUserInput()

  nqSimulator.setUpChessBoard(userInput.boardSize)


  switch (userInput.runMode) {
    case "Demo":
      nqSimulator.demoChessBoard()
      break;
    case "Batch":
      nqSimulator.runBatchNQueen()
      break;

    case "Manual":

  }
}


class ChessNQueenSimulator {
  constructor() {
    this.chessBoard = null
  }

  setUpChessBoard(boardSize) {
    //Adjust size of SVG
    $("#svg").attr("width", boardSize * cellWidth + 80);
    $("#svg").attr("height", boardSize * cellWidth + 80);
    this.chessBoard = new ChessBoard(Snap("#svg"), boardSize, cellWidth)
    this.chessBoard.drawBoard()
  }

  demoChessBoard() {
    this.chessBoard.placeNewPieceAt('QB', 3, 2)
    this.chessBoard.placeNewPieceAt('NW', 0, 1)
    this.chessBoard.placeNewPieceAt('BB', 2, 2)

    this.chessBoard.dimCell(6, 6)
    this.chessBoard.flashCell(3, 4)
    this.chessBoard.showDangerousPosition(2, 7)
    this.chessBoard.drawLine(0, 0, 6, 6)


    //After 2 seconds remove some pieces then add RockBlack
    setTimeout(function () {
      this.chessBoard.removePiece(3, 2)
      this.chessBoard.removePiece(0, 0)
      this.chessBoard.placeNewPieceAt('RB', 0, 3)
      this.chessBoard.movePiece(2, 2, 7, 7)
    }, 1000)
  }


  runBatchNQueen() {
    let boardSize = this.chessBoard.boardSize
    let nQueen = new NQueen()

    this.batchResult = nQueen.solve(boardSize)
    this.currentShownSolution = 0

    this.displayQueenSolution(this.batchResult[this.currentShownSolution])


    let buttons = $("<input id='btnPrev' class='btn' type='button' value='Prev' onClick='nqSimulator.showPrevSolution()'> " +

      "<span id='solutionIndex'> " + `${this.currentShownSolution} - ${this.batchResult.length}` + " </span>" +

      "<input id='btnNext' class='btn' type='button' value='Next' onclick='nqSimulator.showNextSolution()'>")
    $('#buttonGroup').append(buttons)
  }

  displayQueenSolution(solution){
    this.chessBoard.removeAllPieces()
    for (let rowIndex = 0; rowIndex < this.chessBoard.boardSize; rowIndex++) {
      this.chessBoard.placeNewPieceAt('QB', rowIndex, solution[rowIndex])
    }
  }

  showPrevSolution() {
    if (this.currentShownSolution > 0) {
      this.currentShownSolution--
      this.displayQueenSolution(this.batchResult[this.currentShownSolution])

      $('#solutionIndex').text(` ${this.currentShownSolution} - ${this.batchResult.length} `)
    }
  }

  showNextSolution() {
    if (this.currentShownSolution < this.batchResult.length-1) {
      this.currentShownSolution++
      this.displayQueenSolution(this.batchResult[this.currentShownSolution])

      $('#solutionIndex').text(` ${this.currentShownSolution} - ${this.batchResult.length} `)
    }
  }
}

/**
 * This is global variable
 * @type {ChessNQueenSimulator.constructor}
 */
const nqSimulator = new ChessNQueenSimulator()




