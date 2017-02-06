var Utils = (function() {
  return {
    findLowestInSet: function(nodes, scores) {
      var lowestNode;

      for (var i = 0, lowestScore = Infinity; i < nodes.length; i++) {
        var thisNode = nodes[i];
        var thisScore = scores[thisNode.x][thisNode.y];
        if (thisScore < lowestScore) {
          lowestScore = thisScore;
          lowestNode = thisNode;
        }
      }

      return lowestNode;
    },
    removeNode: function(nodes, toRemove) {
      for (var i = 0; i < nodes.length; i++) {
        var thisNode = nodes[i];
        if (thisNode.x == toRemove.x && thisNode.y == toRemove.y) {
          nodes.splice(i, 1);
          break;
        }
      }
    },
    addNode: function(nodes, toAdd) {
      nodes.push(toAdd);
    },
    isInSet: function(nodes, nodeToFind) {
      for (var i = 0; i < nodes.length; i++) {
        var thisNode = nodes[i];
        if (thisNode.x == nodeToFind.x && thisNode.y == nodeToFind.y) {
          return true;
        }
      }

      return false;
    }
  }
}());
