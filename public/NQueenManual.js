/**
 * Created by techmaster on 3/12/17.
 */
//--------------
class NQueenManual {

  /**
   * Need to pass chessBoard SVG to animate each step
   * @param chessBoard
   */
  constructor() {

  }

  setUpChessBoard(boardSize) {
    //Adjust size of SVG
    $("#svg").attr("width", boardSize * cellWidth + 80);
    $("#svg").attr("height", boardSize * cellWidth + 80);
    this.chessBoard = new ChessBoard(Snap("#svg"), boardSize, cellWidth)
    this.chessBoard.drawBoard()
  }

  startManualMode() {

    this.N = this.chessBoard.boardSize
    this.solutions = []
    this.tempSolutions = [] //solution at each row
    this.row = 0   //Row to scan conflict
    this.col = 0   //Col to scan conflict. Reset to zero on every row scan, every solution and every queen in each solution
    this.solIndex = 0 //index to scan through solutions in each row
    this.queenIndexInSol = 0 //equivalent to row
    this.algorithmComplete = false

    let buttons = $("<input id='btnStep' class='btn' type='button' value='Step' onclick='nqManual.step()'>")
    $('#buttonGroup').append(buttons)

  }

  step() {
    if (this.row === this.N) {
      this.algorithmComplete = true
      return
    }


    let self = this
    this.scanFirstRow(function () {
      self.row++  // Increase this.row after animation complete
      return
    })


    this.scanRow(function () {

    })
  }

  scanFirstRow(callback) {
    //Quét dòng 0
    if (this.row !== 0) return

    for (let col = 0; col < this.N; col++) {
      this.solutions.push([col]);

    }
    // Begin animate all cells in first row
    let col = 0, self = this
    let timer1 = setInterval(function () {
      self.chessBoard.flashCell(self.row, col)
      col++
      if (col == self.N) {
        clearInterval(timer1)
        callback()
      }
    }, 400)
    // End of animation

  }


  /**
   * Examine solutions[solIndex]
   * @param callback
   */
  scanRow(callback) {
    if (this.row === 0) return

    if (this.row === this.N) {
      console.log('End of algorithm')
    }
    let self = this

    scanSolution(this.solIndex, function() {
      self.solutions = self.tempSolutions
      self.tempSolutions = []
      self.row = self.row + 1
      self.solIndex = 0
      self.chessBoard.removeAllPieces()
    })

    function scanSolution(solutionIndex, endSolutionCallBack) {
      if (solutionIndex === self.solutions.length) {
        endSolutionCallBack()
      }

      let solution = self.solutions[solutionIndex]  //Get solution
      //let currentQueenInSolution = solution[self.queenIndexInSol] //equivalent to col

      //Display all queen in this solution
      for (let i = 0; i < solution.length; i++) {
        self.chessBoard.placeNewPieceAt('QB', i, solution[i])
      }

      setTimeout(function () {
        self.checkConflict(solution, self.row, function () {
          //endCellCallback
          scanSolution(solutionIndex+1, endSolutionCallBack)
        })
      }, 400)
    }

  }


  /**
   * Check conflict in all cells of row for every solution
   * @param solution
   * @param row
   * @param callback run when reach last cell in row
   */
  checkConflict(solution, row, endCellCallback) {
    //Quet tung cell mot
    let col = 0
    let self = this
    testCell(col, function (newCol, result) {
      if (result) {
        console.log('Good cell', row, newCol)
        self.tempSolutions.push(solution.concat(newCol))  //Add new row to temp solution
        console.log(self.tempSolutions)
      }

      if (newCol === self.N - 1) {
        console.log('For this solution, reach last cell in row')
        endCellCallback()
      }

    })


    /**
     * Run callback if no new queen conflicts
     * @param col
     * @param callback: has two parameters
     */
    function testCell(col, callback) {
      self.chessBoard.placeNewPieceAt('QB', row, col) //try to place queen at row, col

      for (let i = 0; i < solution.length; i++) {
        if (solution[i] === col ||
          solution[i] + i === col + row ||
          solution[i] - i === col - row) {

          //new queen conflicts
          let line = self.chessBoard.drawLine(i, solution[i], row, col)

          setTimeout(function () {
            self.chessBoard.removePiece(row, col)
            line.remove()
            self.chessBoard.dimCell(row, col, function () {
              callback(col, false)
              let nextCol = col + 1
              if (nextCol < self.N) {
                testCell(nextCol, callback)
              }

            })
          }, 400)
        } else { //no conflict
          callback(col, true)
          let nextCol = col + 1
          if (nextCol < self.N) {
            testCell(nextCol, callback)
          }
        }

      }

    }


  }

}