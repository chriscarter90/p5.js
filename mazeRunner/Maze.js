function Maze(_rows, _cols) {
  this.initialize = function() {
    for (var row = 0; row < this.rows; row++) {
      this.cells[row] = [];
      for (var col = 0; col < this.cols; col++) {
        this.cells[row][col] = new MazeCell(row, col);
      }
    }
  }

  this.show = function(rowHeight, colWidth) {
    for (var row = 0; row < this.rows; row++) {
      for (var col = 0; col < this.cols; col++) {
        this.cells[row][col].show(rowHeight, colWidth);
      }
    }
  }

  this.generate = function() {
    var cellsVisited = 0;
    var stack = [];

    var currentCell = this.cells[0][0];
    currentCell.visit();
    cellsVisited++;

    while (cellsVisited < (this.rows * this.cols)) {
      var unvisitedNeighbours = this.getUnvisitedNeighboursFor(currentCell);

      if (unvisitedNeighbours.length > 0) {
        var chosenNeighbour = unvisitedNeighbours[Math.floor(Math.random() * unvisitedNeighbours.length)];
        stack.push(currentCell);
        this.removeWallBetween(currentCell, chosenNeighbour);
        currentCell = chosenNeighbour;
        currentCell.visit();
        cellsVisited++;
      } else {
        currentCell = stack.pop();
      }
    }
  }

  this.removeWallBetween = function(cell1, cell2) {
    if (cell1.row == cell2.row) {
      if (cell1.col < cell2.col) {
        cell1.walls[1] = cell2.walls[3] = false;
      } else {
        cell1.walls[3] = cell2.walls[1] = false;
      }
    } else {
      if (cell1.row < cell2.row) {
        cell1.walls[2] = cell2.walls[0] = false;
      } else {
        cell1.walls[0] = cell2.walls[2] = false;
      }
    }
  }

  this.getUnvisitedNeighboursFor = function(cell) {
    var neighbours = [];

    var rowAbove = this.cells[cell.row - 1];
    if (rowAbove) {
      var aboveCell = rowAbove[cell.col];
      if (aboveCell && !aboveCell.visited) {
        neighbours.push(aboveCell);
      }
    }

    var rowBelow = this.cells[cell.row + 1];
    if (rowBelow) {
      var belowCell = rowBelow[cell.col];
      if (belowCell && !belowCell.visited) {
        neighbours.push(belowCell);
      }
    }

    var leftCell = this.cells[cell.row][cell.col - 1];
    if (leftCell && !leftCell.visited) {
      neighbours.push(leftCell);
    }

    var rightCell = this.cells[cell.row][cell.col + 1];
    if (rightCell && !rightCell.visited) {
      neighbours.push(rightCell);
    }

    return neighbours;
  }

  this.heuristicScore = function(node1, node2) {
    return (Math.abs(node1.x - node2.x) + Math.abs(node1.y - node2.y));
  }

  this.getNeighboursOf = function(node) {
    var neighbours = [];

    var rowAbove = this.cells[node.y - 1];
    if (rowAbove) {
      var aboveCell = rowAbove[node.x];
      if (aboveCell && !aboveCell.walls[2]) {
        neighbours.push(createVector(node.x, node.y - 1));
      }
    }

    var rowBelow = this.cells[node.y + 1];
    if (rowBelow) {
      var belowCell = rowBelow[node.x];
      if (belowCell && !belowCell.walls[0]) {
        neighbours.push(createVector(node.x, node.y + 1));
      }
    }

    var leftCell = this.cells[node.y][node.x - 1];
    if (leftCell && !leftCell.walls[1]) {
      neighbours.push(createVector(node.x - 1, node.y));
    }

    var rightCell = this.cells[node.y][node.x + 1];
    if (rightCell && !rightCell.walls[3]) {
      neighbours.push(createVector(node.x + 1, node.y));
    }

    return neighbours;
  }

  this.rows = _rows;
  this.cols = _cols;
  this.cells = [];
  this.initialize();
}
