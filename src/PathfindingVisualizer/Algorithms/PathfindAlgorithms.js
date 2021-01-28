import PriorityQueue from "../../Utils/utils";

// Pathfinding algorithms
export const pathfindAlgorithms = {
    DIJKSTRA: "Dijkstra",
    ASTAR: "A* (A-Star)",
    BFS: "Breadth First Search",
    DFS: "Depth First Search",
    DEV: "Development Algorithm",
}

export function devAlg(grid, start, target) {
    const visitedNodes = [];
    return visitedNodes;
}

/**
 * Executes a Dijkstra's algorithm search.
 * 
 * @param {Array} grid grid of nodes
 * @param {Object} start start node
 * @param {Object} target target node
 * 
 * @returns an array of visited nodes in order
 */
export function dijkstra(grid, start, target) {
    const visitedNodes = [];
    const unvisitedNodes = getAllNodes(grid);

    start.distance = 0;

    while (unvisitedNodes.length !== 0) {
        unvisitedNodes.sort((a, b) => a.distance - b.distance);
        const curNode = unvisitedNodes.shift();

        if (curNode.isVisited || curNode.isWall) continue;
        if (curNode === target || curNode.distance === Infinity) return visitedNodes;

        const unvisitedNeighbors = getUnvisitedNeighbors(curNode, grid);
        for (const neighbor of unvisitedNeighbors) {
            const tentativeDistance = curNode.distance + neighbor.cost;
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
 * 
 * @returns an array of visited nodes in order
 */
export function aStar(grid, start, target) {
    const visitedNodes = [];
    const unvisitedNodes = new PriorityQueue();
    unvisitedNodes.enqueue(start, 0);
    start.distance = 0;
    start.rootDistance = 0;
    while (!unvisitedNodes.isEmpty()) {
        const curNode = unvisitedNodes.dequeue().element;

        if (curNode.isWall) continue;
        if (curNode.isVisited) continue;

        curNode.isVisited = true;
        visitedNodes.push(curNode);

        if (curNode.distance === Infinity) return visitedNodes;
        if (curNode === target) return visitedNodes;

        const unvisitedNeighbors = getUnvisitedNeighbors(curNode, grid);
        for (const neighbor of unvisitedNeighbors) {
            const manhattanD = 2 * (Math.abs(target.row - neighbor.row) + (Math.abs(target.col - neighbor.col)));
            neighbor.rootDistance = Math.min(neighbor.rootDistance, curNode.rootDistance + neighbor.cost);
            const minDistance = Math.min(neighbor.distance, neighbor.rootDistance + manhattanD);
            if (minDistance !== neighbor.distance) {
                neighbor.distance = minDistance;
                neighbor.previousNode = curNode;
                if (unvisitedNodes.contains(neighbor)) unvisitedNodes.setPriority(neighbor, minDistance);
            }
            if (!unvisitedNodes.contains(neighbor)) unvisitedNodes.enqueue(neighbor, neighbor.distance);
        }
    }
    return visitedNodes;
}

/**
 * Executes Breadth First Search (BFS) algorithm search.
 * 
 * @param {Array} grid grid of nodes
 * @param {Object} start start node
 * @param {Object} target target node
 * 
 * @returns an array of visited nodes in order
 */
export function breadthFirstSearch(grid, start, target) {
    const visitedNodes = [];
    const unvisitedNodes = [start];
    start.distance = 0;
    while (unvisitedNodes.length !== 0) {
        const curNode = unvisitedNodes.shift();

        if (curNode.isWall) continue;
        if (curNode.isVisited) continue;

        curNode.isVisited = true;
        visitedNodes.push(curNode);

        if (curNode === target) return visitedNodes; 

        const unvisitedNeighbors = getUnvisitedNeighbors(curNode, grid);
        for (const neighbor of unvisitedNeighbors) {
            unvisitedNodes.push(neighbor);
            neighbor.previousNode = curNode;
        }
    }
    return visitedNodes;
}

/**
 * Executes a Depth First Search (DFS) algorithm search.
 * 
 * @param {Array} grid grid of nodes
 * @param {Object} start start node
 * @param {Object} target target node
 * 
 * @returns an array of visited nodes in order
 */
export function depthFirstSearch(grid, start, target) {
    const visitedNodes = [];
    const unvisitedNodes = [start];
    start.distance = 0;
    while (unvisitedNodes.length !== 0) {
        const curNode = unvisitedNodes.pop();

        if (curNode.isWall) continue;
        if (curNode.isVisited) continue;

        curNode.isVisited = true;
        visitedNodes.push(curNode);

        if (curNode === target) return visitedNodes;

        const unvisitedNeighbors = getUnvisitedNeighbors(curNode, grid);
        for (const neighbor of unvisitedNeighbors) {
            unvisitedNodes.push(neighbor);
            neighbor.previousNode = curNode;
        }
    }
    return visitedNodes;
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
 * @param {boolean} diagonal are we allowing diagonal neighbors
 * 
 * @returns an array containing all unvisited neighbors
 */
function getUnvisitedNeighbors(node, grid, diagonal) {
    const neighbors = [];
    const {row, col} = node;
    
    if (diagonal && row > 0 && col > 0) neighbors.push(grid[row - 1][col - 1]); // North West    
    if (col > 0) neighbors.push(grid[row][col - 1]); // West
    if (diagonal && row < grid.length - 1 && col > 0) neighbors.push(grid[row + 1][col - 1]); // South West
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // South
    if (diagonal && row < grid.length - 1 && col < grid[row].length - 1) neighbors.push(grid[row + 1][col + 1]); // South East
    if (col < grid[row].length - 1) neighbors.push(grid[row][col + 1]); // East
    if (diagonal && row > 0 && col < grid[row].length - 1) neighbors.push(grid[row - 1][col + 1]); // North East
    if (row > 0) neighbors.push(grid[row - 1][col]); // North

    return neighbors.filter(neighbor => !neighbor.isVisited);
}