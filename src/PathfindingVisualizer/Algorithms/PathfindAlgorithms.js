import PriorityQueue from "../../utils";

// Pathfinding algorithms
export const pathfindAlgorithms = {
    DIJKSTRA: "Dijkstra",
    ASTAR: "A* (A-Star)",
    BFS: "Breadth First Search",
    DFS: "Depth First Search",
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
        
        if (!curNode) break;
        if (curNode.isWall) continue;

        if (curNode.distance === Infinity) return visitedNodes;

        curNode.isVisited = true;
        visitedNodes.push(curNode);

        if (curNode === target) return visitedNodes;

        const unvisitedNeighbors = getUnvisitedNeighbors(curNode, grid);
        for (const neighbor of unvisitedNeighbors) {
            neighbor.distance = curNode.distance + neighbor.cost;
            neighbor.previousNode = curNode;
        }
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

        if (curNode.distance === Infinity) return visitedNodes;

        curNode.isVisited = true;
        visitedNodes.push(curNode);

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

        if (curNode.distance === Infinity) return visitedNodes;

        curNode.isVisited = true;
        visitedNodes.push(curNode);

        if (curNode === target) return visitedNodes; 

        const unvisitedNeighbors = getUnvisitedNeighbors(curNode, grid);
        for (const neighbor of unvisitedNeighbors) {
            unvisitedNodes.push(neighbor);
            

            neighbor.distance = curNode.distance + 1;
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

        if (curNode.distance === Infinity) return visitedNodes;
        if (curNode === target) return visitedNodes;

        const unvisitedNeighbors = getUnvisitedNeighbors(curNode, grid);
        for (const neighbor of unvisitedNeighbors) {
            unvisitedNodes.push(neighbor);
            curNode.isVisited = true;
            visitedNodes.push(curNode);

            neighbor.distance = curNode.distance + 1;
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
 * 
 * @returns an array containing all unvisited neighbors
 */
function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {row, col} = node;
    
    if (col > 0) neighbors.push(grid[row][col - 1]); // West
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // South
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // East
    if (row > 0) neighbors.push(grid[row - 1][col]); // North
    
    return neighbors.filter(neighbor => !neighbor.isVisited);
}