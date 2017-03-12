/**
 * Created by techmaster on 3/11/17.
 */
const cellWidth = 80 //Width of each cell rectangle

const nqBatch = new NQueenBatch()

const nqManual = new NQueenManual()


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

  switch (userInput.runMode) {
    case "Demo":
      nqBatch.setUpChessBoard(userInput.boardSize)
      nqBatch.demoChessBoard()
      break;
    case "Batch":
      nqBatch.setUpChessBoard(userInput.boardSize)
      nqBatch.runBatchNQueen()
      break;

    case "Manual":
      nqManual.setUpChessBoard(userInput.boardSize)
      nqManual.startManualMode()
      break;
  }
}




