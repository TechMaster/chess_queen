/**
 * Written by cuong@techmaster.vn
 */
class NQueen {
  constructor(N) {
    this.N = N //Board size
  }

  solve() {
    let solutions = []
    for (let row = 0; row < this.N; row++) {
      solutions = this.scanRow(row, solutions)
    }
    return solutions;
  }

  /**
   * Find all possible solutions from row 0 to N-1
   * @param row
   */
  scanRow(row, solutions) {
    //At the first row simply add all cells
    if (row === 0) {
      for (let col = 0; col < this.N; col++) {
        solutions.push([col]);
      }
      return solutions
    }

    let newSolutions = []
    //Scan through all solution to check if we can find good cell to place queen at new row
    for (let i = 0; i < solutions.length; i++) {

      //scan through each cell in same row
      for (let col = 0; col < this.N; col++) {
        if (!this.checkConflict(solutions[i], row, col)) { //find a cell to place queen that is not conflict with solution
          newSolutions.push(solutions[i].concat(col))  //Add cell to new solution
        }
      }
    }
    return newSolutions
  }

  /**
   * return true if conflict
   * @param solution
   * @param row
   * @param col
   * @returns {boolean}
   */
  checkConflict(solution, row, col) {
    for (let rowIndex = 0; rowIndex < solution.length; rowIndex++) {
      if (solution[rowIndex] === col ||
        solution[rowIndex] + rowIndex === col + row ||
        solution[rowIndex] - rowIndex === col - row) {
        return true
      }
    }
    //console.log('not conflict', solution, row, col)
    return false
  }

}


let queenSolver = new NQueen(5)

console.log(queenSolver.solve())
