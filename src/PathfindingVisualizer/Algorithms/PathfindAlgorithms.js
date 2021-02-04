// Pathfinding algorithms
export const pathfindAlgorithms = {
    DIJKSTRA: "Dijkstra",
    ASTAR: "A* (A-Star)",
    BFS: "Breadth First Search",
    DFS: "Depth First Search",
};

// Heuristic types
export const heuristicTypes = {
    MANHATTAND: "Manhattan Distance",
    DIAGONALD: "Diagonal Distance",
    DIRECT: "Direct Distance", 
};

/**
 * Executes a Dijkstra's algorithm search.
 * 
 * @param {Array} grid grid of nodes
 * @param {Object} start start node
 * @param {Object} target target node
 * @param {boolean} diagonalNeighbors are we allowing diagonal neighbors
 * 
 * @returns an array of visited nodes in order
 */
export function dijkstra(grid, start, target, diagonalNeighbors) {
    const visitedNodes = [];
    const unvisitedNodes = getAllNodes(grid);

    for (const node of getAllNodes(grid)) node.distance = Infinity;
    start.distance = 0;

    while (unvisitedNodes.length !== 0) {
        unvisitedNodes.sort((a, b) => a.distance - b.distance);
        const curNode = unvisitedNodes.shift();

        if (curNode.isVisited || curNode.isWall) continue;
        if (curNode === target || curNode.distance === Infinity) return visitedNodes;

        const unvisitedNeighbors = getUnvisitedNeighbors(curNode, grid, diagonalNeighbors);
        for (const neighbor of unvisitedNeighbors) {
            var neighborCost = neighbor.cost;

            const diagCost = Math.sqrt(2) - 1;
            if (neighbor.isDiagonal) neighborCost += diagCost;
            neighbor.isDiagonal = false;

            const tentativeDistance = curNode.distance + neighborCost;
            if (neighbor.distance > tentativeDistance) {
                neighbor.previousNode = curNode;
                neighbor.distance = tentativeDistance;
            }
        }

        curNode.isVisited = true;
        visitedNodes.push(curNode);
    }

    return visitedNodes;
}

/**
 * Executes an A* (A-Star) algorithm search.
 * 
 * @param {Array} grid grid of nodes
 * @param {Object} start start node
 * @param {Object} target target node
 * @param {boolean} diagonalNeighbors are we allowing diagonal neighbors
 * 
 * @returns an array of visited nodes in order
 */
export function aStar(grid, start, target, diagonalNeighbors) {
    const heuristicType = diagonalNeighbors ? heuristicTypes.DIAGONALD : heuristicTypes.MANHATTAND;
    const visitedNodes = [];
    const unvisitedNodes = [];

    for (const node of getAllNodes(grid)) {
        node.startCost = Infinity;
        node.finalCost = Infinity;
    }
    start.startCost = 0;
    start.finalCost = getHeuristic(start, start, target, heuristicType);
    unvisitedNodes.push(start);

    while (unvisitedNodes.length !== 0) {
        unvisitedNodes.sort((a, b) => a.finalCost - b.finalCost);
        const curNode = unvisitedNodes.shift();

        if (curNode.isVisited || curNode.isWall) continue;
        if (curNode === target) return visitedNodes;

        const unvisitedNeighbors = getUnvisitedNeighbors(curNode, grid, diagonalNeighbors);
        for (const neighbor of unvisitedNeighbors) {
            var neighborCost = neighbor.cost
            const diagCost = Math.sqrt(2) - 1;
            if (neighbor.isDiagonal) neighborCost += diagCost;
            neighbor.isDiagonal = false;
            
            const tentativeStartCost = curNode.startCost + neighborCost;
            
            if (tentativeStartCost < neighbor.startCost) {
                neighbor.previousNode = curNode;

                neighbor.startCost = tentativeStartCost;
                neighbor.finalCost = neighbor.startCost + getHeuristic(neighbor, start, target, heuristicType);

                if (!unvisitedNodes.includes(neighbor)) unvisitedNodes.push(neighbor);
            }
        }

        curNode.isVisited = true;
        visitedNodes.push(curNode);
    }

    return visitedNodes;
}

/**
 * Executes Breadth First Search (BFS) algorithm search.
 * 
 * @param {Array} grid grid of nodes
 * @param {Object} start start node
 * @param {Object} target target node
 * @param {boolean} diagonalNeighbors are we allowing diagonal neighbors
 * 
 * @returns an array of visited nodes in order
 */
export function breadthFirstSearch(grid, start, target, diagonalNeighbors) {
    const visitedNodes = [];
    const unvisitedNodes = [start];
    start.distance = 0;
   
    while (unvisitedNodes.length !== 0) {
        const curNode = unvisitedNodes.shift();

        if (curNode.isVisited || curNode.isWall) continue;
        if (curNode === target || curNode.distance === Infinity) return visitedNodes; 

        const unvisitedNeighbors = getUnvisitedNeighbors(curNode, grid, diagonalNeighbors);
        for (const neighbor of unvisitedNeighbors) {
            unvisitedNodes.push(neighbor);
            neighbor.previousNode = curNode;
            neighbor.distance = curNode.distance + 1;
        }

        curNode.isVisited = true;
        visitedNodes.push(curNode);
    }
    return visitedNodes;
}

/**
 * Executes a Depth First Search (DFS) algorithm search.
 * 
 * @param {Array} grid grid of nodes
 * @param {Object} start start node
 * @param {Object} target target node
 * @param {boolean} diagonalNeighbors are we allowing diagonal neighbors
 * 
 * @returns an array of visited nodes in order
 */
export function depthFirstSearch(grid, start, target, diagonalNeighbors) {
    const visitedNodes = [];
    const unvisitedNodes = [start];
    
    while (unvisitedNodes.length !== 0) {
        const curNode = unvisitedNodes.pop();

        if (curNode.isWall || curNode.isVisited) continue;
        if (curNode === target) return visitedNodes;

        const unvisitedNeighbors = getUnvisitedNeighbors(curNode, grid, diagonalNeighbors);
        for (const neighbor of unvisitedNeighbors) {
            unvisitedNodes.push(neighbor);
            neighbor.previousNode = curNode;
        }

        curNode.isVisited = true;
        visitedNodes.push(curNode);
    }
    return visitedNodes;
}

/**
 * Gets the estimated move cost between the current node and the target node.
 * 
 * @param {Object} cur current node
 * @param {Object} start start node
 * @param {Object} target target node
 * @param {int} heuristicType heuristic to use
 */
function getHeuristic(cur, start, target, heuristicType) {
    let dMultiplier = parseInt(document.getElementById("ns-dmultiplier").value);
    if (!dMultiplier) dMultiplier = 1;

    const diagCost = Math.sqrt(2);

    const rowDistance = Math.abs(target.row - cur.row);
    const colDistance = Math.abs(target.col - cur.col);

    const startRowDistance = Math.abs(target.row - start.row);
    const startColDistance = Math.abs(target.col - start.col);

    let heuristic = 0;

    switch (heuristicType) {
        case heuristicTypes.MANHATTAND:
            heuristic = dMultiplier * (rowDistance + colDistance);
            break;
        case heuristicTypes.DIAGONALD:
            heuristic = dMultiplier * (rowDistance + colDistance) + (diagCost - 2 * dMultiplier) * Math.min(rowDistance, colDistance);
            break;
        case heuristicTypes.DIRECT:
            heuristic = Math.sqrt(rowDistance**2 + colDistance**2);
            break;
        default:
            return;
    }

    // In the case of multiple shortest paths, prioritizes nodes closer to the
    // direct, 'as the crow flies', path between the start node and the target node.
    const cross = Math.abs(colDistance * startRowDistance - startColDistance * rowDistance);
    heuristic += (cross * 0.001);

    return heuristic;
}

/**
 * Gets all of the nodes in the grid.
 * 
 * @param {Array} grid grid of nodes
 * 
 * @returns an array containing all of the nodes
 */
function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) nodes.push(node);
    }
    return nodes;
}

/**
 * Gets the shortest path of nodes from the target node to 
 * the start node.
 * 
 * @param {Object} targetNode target node
 * 
 * @returns an array of shortest path nodes in order
 */
export function getShortestPathNodes(targetNode) {
    const nodesInShortestPath = [];
    let currentNode = targetNode;
    while (currentNode !== null) {
        nodesInShortestPath.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPath;
}

/**
 * Gets the total weighted cost of the shortest path.
 * 
 * @param {Object} targetNode target node
 * 
 * @returns the total cost
 */
export function getShortestPathCost(targetNode) {
    const nodesInShortestPath = [];
    let currentNode = targetNode;
    let totalCost = 0;
    while (currentNode !== null) {
        nodesInShortestPath.unshift(currentNode);
        totalCost += currentNode.cost;
        currentNode = currentNode.previousNode;
    }
    return totalCost;
}

/**
 * Gets all unvisited neighbors of a given node.
 * 
 * @param {Object} node node
 * @param {Array} grid grid of nodes
 * @param {boolean} diagonalNeighbors are we allowing diagonal neighbors
 * 
 * @returns an array containing all unvisited neighbors
 */
function getUnvisitedNeighbors(node, grid, diagonalNeighbors) {
    const neighbors = [];
    const {row, col} = node;
    
    if (diagonalNeighbors && row > 0 && col > 0) {
        neighbors.push(grid[row - 1][col - 1]); // North West    
        grid[row - 1][col - 1].isDiagonal = true;;
    }

    if (col > 0) neighbors.push(grid[row][col - 1]); // West

    if (diagonalNeighbors && row < grid.length - 1 && col > 0) {
        neighbors.push(grid[row + 1][col - 1]); // South West
        grid[row + 1][col - 1].isDiagonal = true;;
    }

    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // South

    if (diagonalNeighbors && row < grid.length - 1 && col < grid[row].length - 1) {
        neighbors.push(grid[row + 1][col + 1]); // South East
        grid[row + 1][col + 1].isDiagonal = true;;
    }

    if (col < grid[row].length - 1) neighbors.push(grid[row][col + 1]); // East

    if (diagonalNeighbors && row > 0 && col < grid[row].length - 1) {
        neighbors.push(grid[row - 1][col + 1]); // North East
        grid[row - 1][col + 1].isDiagonal = true;;
    }

    if (row > 0) neighbors.push(grid[row - 1][col]); // North

    return neighbors.filter(neighbor => !neighbor.isVisited);
}