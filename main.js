
const RANDOM_CELLS_COUNT = 400;
const GRID_SIZE = 48;
const CELLS = []

function mountGrid() {
  const grid = document.getElementById("grid")
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      const div = document.createElement("div");
      div.className = "dead-cell"
      const id = `cell:${i}:${j}`
      div.id = id
      CELLS.push(id)
      grid.appendChild(div)
    }
  }
}

/**
 * keep this for later
 */
function setEventListener(id) {
  document.getElementById(id).addEventListener('click', (e) => {
    if (e.target.className === "live-cell") {
      e.target.className = "dead-cell"
    } else {
      e.target.className = "live-cell"
    }
  })
}

function flipCellState(id) {
  const cell = document.getElementById(id)
  if (cell) {
    if (cell && cell.className === "live-cell") {
      cell.className = "dead-cell"
    } else {
      cell.className = "live-cell"
    }
  }
}

function selectRandomCells(initialCells = 5) {
  const shuffled = CELLS.slice().sort(() => 0.5 - Math.random()); // Shuffle the array
  return shuffled.slice(0, initialCells);
}

function isCellAlive(cellID) {
  const cell = document.getElementById(cellID)
  if (cell && cell.className === "live-cell") {
    return true
  }
}

function findLiveCells() {
  const liveCells = []
  for (let i = 0; i < CELLS.length; i++) {
    if (isCellAlive(CELLS[i])) {
      liveCells.push(CELLS[i])
    }
  }
  return liveCells
}

function findSurroundingCells(cellID) {
  const surroundingCells = []
  let [, colum, row] = cellID.split(':')
  colum = Number(colum)
  row = Number(row)
  if ((colum + 1) <= (GRID_SIZE - 1)) {
    surroundingCells.push(`cell:${colum + 1}:${row}`) // cell on top
  }

  if ((colum - 1) >= 0) {
    surroundingCells.push(`cell:${colum - 1}:${row}`) // cell on top
  }

  if ((row - 1) >= 0) {
    surroundingCells.push(`cell:${colum}:${row - 1}`) // cell on right
  }

  if ((row + 1) <= (GRID_SIZE - 1)) {
    surroundingCells.push(`cell:${colum}:${row + 1}`) // cell on left
  }

  // ------------------

  if ((colum - 1) >= 0 && (row - 1)  >= 0) {
    surroundingCells.push(`cell:${colum - 1}:${row - 1}`)
  }

  if ((colum - 1) >= 0 && (row + 1)  <= (GRID_SIZE - 1)) {
    surroundingCells.push(`cell:${colum - 1}:${row + 1}`)
  }

  if ((colum + 1) <= (GRID_SIZE - 1) && (row - 1)  >= 0) {
    surroundingCells.push(`cell:${colum + 1}:${row - 1}`)
  }

  if ((colum + 1) <= (GRID_SIZE - 1) && (row + 1)  >= 0) {
    surroundingCells.push(`cell:${colum + 1}:${row + 1}`)
  }

  return surroundingCells
}

function updateGridState(cells) {
  for (let i = 0; i < cells.length; i++) {
    flipCellState(cells[i])
  }
}

function updateGeneration(generation) {
  const generationElem = document.getElementById('generation')
  if (generationElem) {
    generationElem.innerHTML = `<h2> generation: ${generation} </h2>`
  }
}

function main() {
  // mount grid
  mountGrid()

  const initialCells = selectRandomCells(RANDOM_CELLS_COUNT)
  for (let i = 0; i < initialCells.length; i ++) {
    flipCellState(initialCells[i])
  }

  let generation = 0
  const runRound = () => {
    if (true) {
      updateGeneration(generation)
      let cellToBeUpdated = []
      for (let i = 0; i < CELLS.length; i++) {
        const cellID = CELLS[i]
        const surroundingCells = findSurroundingCells(cellID)
        if (isCellAlive(cellID)) {
          const surroundingLiveCells = surroundingCells.filter(c => isCellAlive(c))
          if (surroundingLiveCells.length < 2) {
              cellToBeUpdated.push(cellID)
              continue
          }
          if (surroundingLiveCells.length >= 2 && surroundingLiveCells.length <= 3) {
            continue
          }
          if (surroundingLiveCells.length > 3) {
            cellToBeUpdated.push(cellID)
            continue
          }
        } else {
          const surroundingLiveCells = surroundingCells.filter(c => isCellAlive(c))
          if (surroundingLiveCells.length === 3) {
            cellToBeUpdated.push(cellID)
            continue
        }
        }

      }

      updateGridState(cellToBeUpdated)
      cellToBeUpdated = []
    }
    generation += 1
  }
  
  setInterval(runRound, 70)
}

main()