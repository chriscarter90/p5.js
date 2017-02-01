var rows = 25;
var cols = 25;
var maze, runner;
var startNode, endNode;

function drawPath(path, colWidth, rowHeight) {
  noStroke();

  fill(255, 0, 0);
  ellipse(startNode.x * colWidth + colWidth/2,
    startNode.y * rowHeight + rowHeight/2,
    rowHeight/3);

  fill(0, 255, 0);
  ellipse(endNode.x * colWidth + colWidth/2,
    endNode.y * rowHeight + rowHeight/2,
    rowHeight/3);

  for (var i = 0; i < path.length - 1; i++) {
    var secondNode = path[i];
    var firstNode  = path[i + 1];

    fill(0, 0, 255);

    if (firstNode.y > secondNode.y) {
      triangle(
        firstNode.x * colWidth + colWidth/3,
        firstNode.y * rowHeight + rowHeight/6,
        firstNode.x * colWidth + (2 * colWidth)/3,
        firstNode.y * rowHeight + rowHeight/6,
        secondNode.x * colWidth + colWidth/2,
        secondNode.y * rowHeight + (5 * rowHeight)/6
      );
    } else if (firstNode.y < secondNode.y) {
      triangle(
        firstNode.x * colWidth + colWidth/3,
        firstNode.y * rowHeight + (5 * rowHeight)/6,
        firstNode.x * colWidth + (2 * colWidth)/3,
        firstNode.y * rowHeight + (5 * rowHeight)/6,
        secondNode.x * colWidth + colWidth/2,
        secondNode.y * rowHeight + rowHeight/6
      );
    } else if (firstNode.x > secondNode.x) {
      triangle(
        firstNode.x * colWidth + colWidth/6,
        firstNode.y * rowHeight + rowHeight/3,
        firstNode.x * colWidth + colWidth/6,
        firstNode.y * rowHeight + (2 * rowHeight)/3,
        secondNode.x * colWidth + (5 * colWidth)/6,
        secondNode.y * rowHeight + rowHeight/2
      );
    } else {
      triangle(
        firstNode.x * colWidth + (5 * colWidth)/6,
        firstNode.y * rowHeight + rowHeight/3,
        firstNode.x * colWidth + (5 * colWidth)/6,
        firstNode.y * rowHeight + (2 * rowHeight)/3,
        secondNode.x * colWidth + colWidth/6,
        secondNode.y * rowHeight + rowHeight/2
      );
    }
  }
}

function setup() {
  createCanvas(900, 900);
  background(255);

  var rowHeight = 900 / rows;
  var colWidth  = 900 / cols;

  // Maze generation
  maze = new Maze(rows, cols);
  maze.generate();
  maze.show(rowHeight, colWidth);

  // Maze runner
  startNode = createVector(0, 0);
  endNode = createVector(rows - 1, cols - 1);

  runner = new Runner(maze, startNode, endNode);
  var path = runner.findPath();
  drawPath(path, colWidth, rowHeight);
}

function draw() {

}
