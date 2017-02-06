var rows = 25;
var cols = 25;
var rowHeight, colWidth;
var maze, runner;
var startNode, endNode;

function setup() {
  createCanvas(900, 900);
  background(255);

  frameRate(16);

  rowHeight = 900 / rows;
  colWidth  = 900 / cols;

  // Maze generation
  maze = new Maze(rows, cols);
  maze.generate();

  // Maze runner
  startNode = createVector(0, 0);
  endNode = createVector(rows - 1, cols - 1);

  runner = new Runner(maze, startNode, endNode);
}

function draw() {
  background(255);
  maze.show(rowHeight, colWidth);

  if (runner.finished) {
    runner.draw(rowHeight, colWidth);
  } else {
    runner.findPath();
    runner.draw(rowHeight, colWidth);
  }
}
