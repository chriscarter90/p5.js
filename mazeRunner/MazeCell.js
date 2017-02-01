function MazeCell(_row, _col) {
  this.row = _row;
  this.col = _col;
  this.visited = false;
  // top, right, bottom, left
  this.walls = [true, true, true, true];

  this.show = function(rowHeight, colWidth) {
    stroke(0);
    strokeWeight(2);

    if (this.walls[0]) {
      line(this.col * colWidth,
        this.row * rowHeight,
        (this.col + 1) * colWidth,
        this.row * rowHeight);
    }

    if (this.walls[1]) {
      line((this.col + 1) * colWidth,
        this.row * rowHeight,
        (this.col + 1) * colWidth,
        (this.row + 1) * rowHeight);
    }

    if (this.walls[2]) {
      line(this.col * colWidth,
        (this.row + 1) * rowHeight,
        (this.col + 1) * colWidth,
        (this.row + 1) * rowHeight);
    }

    if (this.walls[3]) {
      line(this.col * colWidth,
        this.row * rowHeight,
        this.col * colWidth,
        (this.row + 1) * rowHeight);
    }
  }

  this.visit = function() {
    this.visited = true;
  }
}
