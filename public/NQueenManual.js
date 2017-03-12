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


    this.scanNextRow(function () {
      //Trên mỗi dòng -> duyệt qua từng solution.
      //Trong mỗi solution -> duyệt qua từng cell trong dòng
      //Ứng với mỗi cell -> duyệt từng quân hậu trong solution

      let currentSolution =  self.solutions[self.solIndex]


      self.queenIndexInSol++  //move to next queen in current solution

      //duyệt đến quân hậu cuối trong một solution
      if (self.queenIndexInSol === currentSolution.length) {
        self.col = 0 //Reset
      }


      //duyệt ô cuối cùng trong dòng cần kiểm tra
      if (self.col == self.N) {
        self.solIndex++ //move to next solution to check
      }

      //duyệt đến solution cuối cùng
      if (self.solIndex === self.solutions.length) {
        self.solIndex = 0
        self.row++ //chuyển sang dòng tiếp theo
        return
      }
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
  scanNextRow(callback) {
    if (this.row === 0) return

    let solution = this.solutions[this.solIndex]  //Get solution
    let currentQueenInSolution = solution[this.queenIndexInSol] //equivalent to col

    //Display all queen in this solution
    for (let i=0; i < solution.length; i++) {
      this.chessBoard.placeNewPieceAt('QB', i, solution[i])
    }

    //Check conflict each cell in row against current solution
    this.chessBoard.placeNewPieceAt('QB', this.row, this.col)


    this.checkConflict(solution, this.row)




  }



  checkConflict(solution, row, col) {

  }

}