function Runner(_maze, _start, _end) {
  this.findLowestNode = function(nodeSet, scores) {
    var lowestNode;

    for (var i = 0, lowestScore = Infinity; i < nodeSet.length; i++) {
      var thisNode = nodeSet[i];
      var thisScore = scores[thisNode.x][thisNode.y];
      if (thisScore < lowestScore) {
        lowestScore = thisScore;
        lowestNode = thisNode;
      }
    }

    return lowestNode;
  }

  this.removeNode = function(nodeSet, toRemove) {
    for (var i = 0; i < nodeSet.length; i++) {
      var thisNode = nodeSet[i];
      if (thisNode.x == toRemove.x && thisNode.y == toRemove.y) {
        nodeSet.splice(i, 1);
        break;
      }
    }
  }

  this.addNode = function(nodeSet, toAdd) {
    nodeSet.push(toAdd);
  }

  this.isInSet = function(nodeSet, nodeToFind) {
    for (var i = 0; i < nodeSet.length; i++) {
      var thisNode = nodeSet[i];
      if (thisNode.x == nodeToFind.x && thisNode.y == nodeToFind.y) {
        return true;
      }
    }

    return false;
  }

  this.findPath = function() {
    if (this.openSet.length > 0) {
      // Find the node in the openSet with the lowest f()
      var lowestOpenNode = this.findLowestNode(this.openSet, this.fScores);

      this.current = lowestOpenNode;

      // If we're at the goal, stop
      if (lowestOpenNode.x == this.end.x && lowestOpenNode.y == this.end.y) {
        this.finished = true;
        this.finalPath = this.reconstructPath(this.cameFrom, lowestOpenNode);
      }


      // Remove the lowest from the openSet
      this.removeNode(this.openSet, lowestOpenNode);

      // Add the lowest to the closedSet
      this.addNode(this.closedSet, lowestOpenNode);

      // Get neighbours of the lowest
      var neighbours = this.maze.getNeighboursOf(lowestOpenNode);

      // For each neighbour...
      for (var i = 0, lowestG = Infinity; i < neighbours.length; i++) {
        var thisNeighbour = neighbours[i];

        if (this.isInSet(this.closedSet, thisNeighbour)) {
          continue;
        }

        var thisNeighbourG = this.gScores[lowestOpenNode.x][lowestOpenNode.y] + 1;

        if (!this.isInSet(this.openSet, thisNeighbour)) {
          this.addNode(this.openSet, thisNeighbour);
        } else if (thisNeighbourG >= lowestG) {
          continue;
        }

        lowestG = thisNeighbourG;
        this.cameFrom[thisNeighbour.x] = this.cameFrom[thisNeighbour.x] || {};
        this.cameFrom[thisNeighbour.x][thisNeighbour.y] = lowestOpenNode;

        this.gScores[thisNeighbour.x] = this.gScores[thisNeighbour.x] || {};
        this.gScores[thisNeighbour.x][thisNeighbour.y] = thisNeighbourG;

        this.fScores[thisNeighbour.x] = this.fScores[thisNeighbour.x] || {};
        this.fScores[thisNeighbour.x][thisNeighbour.y] = thisNeighbourG + maze.heuristicScore(thisNeighbour, this.end);
      }
    } else {
      this.finished = true;
      this.finalPath = [];
    }
  }

  this.reconstructPath = function(cameFrom, end) {
    var path = [end];

    while (cameFrom[end.x] && cameFrom[end.x][end.y]) {
      end = cameFrom[end.x][end.y];
      path.push(end);
    }
    return path;
  }

  this.draw = function(rowHeight, colWidth) {
    if (!self.finished) {
      // Draw openSet
      for (var i = 0; i < this.openSet.length; i++) {
        var vect = this.openSet[i];
        fill(0, 255, 0);
        rect((vect.x * colWidth) + 4, (vect.y * rowHeight) + 4,
          colWidth - 8, rowHeight - 8);
      }

      // Construct current path
      var path = [vect];
      while (this.cameFrom[vect.x] && this.cameFrom[vect.x][vect.y]) {
        vect = this.cameFrom[vect.x][vect.y];
        path.push(vect);
      }

      // Draw current path
      for (var i = 0; i < path.length - 1; i++) {
        var vect = path[i];
        var vect2 = path [i + 1]
        stroke(0, 0, 255);
        line((vect.x * colWidth) + colWidth/2, (vect.y * rowHeight) + rowHeight/2,
          (vect2.x * colWidth) + colWidth/2, (vect2.y * rowHeight) + rowHeight/2);
      }
    } else {
      for (var i = 0; i < this.finalPath.length - 1; i++) {
        var vect = this.finalPath[i];
        var vect2 = this.finalPath [i + 1]
        stroke(0, 0, 255);
        line((vect.x * colWidth) + colWidth/2, (vect.y * rowHeight) + rowHeight/2,
          (vect2.x * colWidth) + colWidth/2, (vect2.y * rowHeight) + rowHeight/2);
      }
    }
  }

  this.maze = maze;
  this.start = _start;
  this.end = _end;
  this.closedSet = [];
  this.cameFrom = {};
  this.openSet = [this.start];
  this.current = this.start;
  this.gScores = {
    0: {
      0: 0
    }
  };
  this.finished = false;
  this.finalPath = [];

  this.fScores = {
    0: {
      0: maze.heuristicScore(this.start, this.end)
    }
  };
}
