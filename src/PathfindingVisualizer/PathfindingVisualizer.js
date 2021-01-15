import React from 'react';

import './PathfindingVisualizer.css';

import { getShortestPathNodes, dijkstra, aStar, breadthFirstSearch, depthFirstSearch, pathfindAlgorithms
} from './PathfindAlgorithms';
import { recursiveDevision
} from './MazeAlgorithms';
import PathfindMenu from './PathfindMenu';
import Node from './Node';

// Number of rows in the grid
const ROW_COUNT = 29;
// Number of columns in the grid
const COL_COUNT = 71;
// Initial cost of weighted nodes
const INIT_COST = 15;
// Initial coordinates of the start node [row, col]
const INIT_START = [14, 10];
// Initial coordinates of the target noe [row, col]
const INIT_TARGET = [14, 60];
// Speed between visited node animations in miliseconds
const SPEED = 5;

// Node class types
const nodeTypes = {
    NODE: 'node',
    WALL: 'node wall',
    WEIGHT: 'node weight',
    START: 'node start',
    TARGET: 'node target',
    VISITED: 'node visited',
    VISITED_WEIGHT: 'node visited-weight',
    VISITED_WEIGHT_INSTANT: 'node visited-weight-instant',
    PATH: 'node path',
    PATH_WEIGHT: 'node path-weight',
    VISITED_INSTANT: 'node visited-instant',
}

/**
 * Represents the pathfinding visualizer component.
 * 
 * @author Jake Waclawski
 */
class PathfindingVisualizer extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            // Current state of grid nodes
            grid: [],
            // Current cost of weighted nodes
            weightCost: INIT_COST,
            // Is the mouse down?
            mouseIsDown: false,
            // Current draw mode (0: none, 1: walls, 2: weights)
            drawMode: 0,
            // Are we erasing or drawing walls (null if neither)?
            drawWall: null,
            // Are we erasing or drawing weights (null if neither)?
            drawWeight: null,
            // Are we placing the start node?
            placingStart: false,
            // Are we placing the target node?
            placingTarget: false,
            // Current start node position
            startNode: INIT_START,
            // Current target node position
            targetNode: INIT_TARGET,
        };
    }

    /**
     * Rebuilds the grid with new nodes. Start and target
     * node positions are preserved.
     * 
     * @returns new grid of nodes
     */
    rebuildGrid () {
        const grid = [];
        for (let r = 0; r < ROW_COUNT; r++) {
            const curRow = [];
            for (let c = 0; c < COL_COUNT; c++) {
                curRow.push(this.createNode(r, c, 1, false));
            }
            grid.push(curRow);
        }
        return grid;
    }

    /**
     * Rebuilds the grid with new nodes. Main node types are
     * preserved (start, target, wall, weight).
     * 
     * @returns new grid of nodes
     */
    softRebuildGrid () {
        const oldGrid = this.state.grid;
        const grid = [];
        for (let r = 0; r < ROW_COUNT; r++) {
            const curRow = [];
            for (let c = 0; c < COL_COUNT; c++) {
                curRow.push(this.createNode(r, c, oldGrid[r][c].cost, oldGrid[r][c].isWall));
            }
            grid.push(curRow);
        }
        return grid;
    }

    /**
     * Creates a new node with stored properties.
     * 
     * @param {int} row row on grid
     * @param {int} col column on grid
     * @param {int} cost weight cost of node
     * @param {boolean} isWall is node a wall
     */
    createNode (row, col, cost, isWall) {
        return {
            row: row,
            col: col,
            cost: cost,
            distance: Infinity,
            rootDistance: Infinity,
            isStart: row === this.state.startNode[0] && col === this.state.startNode[1],
            isTarget: row === this.state.targetNode[0] && col === this.state.targetNode[1],
            isWall: isWall,
            previousNode: null,
        }
    }

    /**
     * Updates the visual weight state of a given node.
     * 
     * @param {int} row row of node on grid
     * @param {int} col column of node on grid
     * @param {int} isWeight is new type weight node
     */
    drawWeightNode (row, col, isWeight) {
        const nodeElement = document.getElementById(`node-${row}-${col}`);
        const node = this.state.grid[row][col];

        if (node.isWall || node.isStart || node.isTarget) return;

        if (isWeight) nodeElement.className = nodeTypes.WEIGHT;
        else nodeElement.className = nodeTypes.NODE;
    }

    /**
     * Updates the visual wall state of a given node. 
     * 
     * @param {int} row row of node on grid
     * @param {int} col column of node on grid
     * @param {boolean} isWall is new type wall node
     */
    drawWallNode (row, col, isWall) {
        const nodeElement = document.getElementById(`node-${row}-${col}`);
        const node = this.state.grid[row][col];

        if (node.isStart || node.isTarget) return;

        if (isWall) nodeElement.className = nodeTypes.WALL;
        else nodeElement.className = nodeTypes.NODE;
    }

    /**
     * Updates the state of the grid of nodes. Changes the properties of
     * newly drawn node types according to their current visual state.
     */
    updateGrid () {
        const grid = this.state.grid;

        for (let r = 0; r < grid.length; r++) {
            for (let c = 0; c < grid[0].length; c++) {
                const nodeElement = document.getElementById(`node-${r}-${c}`);
                const node = grid[r][c];

                switch (nodeElement.className) {
                    case nodeTypes.NODE:
                        node.isWall = false;
                        node.cost = 1;
                        break;
                    case nodeTypes.WALL:
                        node.isWall = true;
                        break;
                    case nodeTypes.WEIGHT:
                        node.cost = this.state.weightCost;
                        break;
                    default:
                        break;
                }
            }
        }

        this.setState({grid: grid});
    }

    /**
     * Sets new start node position. Updates state, we are no
     * longer placing the start node.
     * 
     * @param {int} row row on grid
     * @param {int} col column on grid
     */
    setStartNode (row, col) { 
        const grid = this.state.grid;
        const curStart = this.state.grid[this.state.startNode[0]][this.state.startNode[1]];
        const curStartNew = {
            ...curStart,
            isStart: false,
        }
        grid[this.state.startNode[0]][this.state.startNode[1]] = curStartNew;

        this.setState({startNode: [row, col]}); 
        
        const node = this.state.grid[row][col];
        const newNode = {
            ...node,
            isWall: false,
            isStart: true,
        }
        grid[row][col] = newNode;

        this.setState({
            grid: grid,
            placingStart: false,
        });
    }

    /**
     * Sets new target node position. Updates state, we are no
     * longer placing the target node.
     * 
     * @param {int} row row on grid 
     * @param {int} col column on grid
     */
    setTargetNode (row, col) { 
        const grid = this.state.grid;
        const curTarget = this.state.grid[this.state.targetNode[0]][this.state.targetNode[1]];
        const curTargetNew = {
            ...curTarget,
            isTarget: false,
        }
        grid[this.state.targetNode[0]][this.state.targetNode[1]] = curTargetNew;

        this.setState({targetNode: [row, col]}); 
    
        const node = this.state.grid[row][col];
        const newNode = {
            ...node,
            isWall: false,
            isTarget: true,
        }
        grid[row][col] = newNode;
        
        this.setState({
            grid: grid,
            placingTarget: false,
        });
    }

    /**
     * Clears the entire grid.
     */
    clearGrid () {
        this.clearWeights();
        this.clearWalls();
        this.clearPaths();
    }

    /**
     * Clears the grid of all wall nodes.
     */
    clearWalls () { 
        const grid = this.state.grid;
        for (const row of grid) {
            for (const node of row) {
                if (node.isWall) node.isWall = false;
            }
        }
        this.setState({grid: grid});
    }

    /**
     * Clears the grid of all weighted nodes and resets their
     * costs to 1.
     */
    clearWeights () {
        const grid = this.state.grid;

        for (const row of grid) {
            for (const node of row) {
                if (node.cost !== 1) node.cost = 1;
            }
        }

        this.setState({grid: grid});
    }

    /**
     * Clears the visual grid of all path and visited type nodes.
     * Updates the class name of each appropriate node object.
     */
    clearPaths () {
        for (let r = 0; r < ROW_COUNT; r++) {
            for (let c = 0; c < COL_COUNT; c++) {
                const nodeElement = document.getElementById(`node-${r}-${c}`);

                if (nodeElement.className === nodeTypes.VISITED || nodeElement.className === nodeTypes.PATH || nodeElement.className === nodeTypes.VISITED_INSTANT) {
                    nodeElement.className = nodeTypes.NODE;
                }
                else if (nodeElement.className === nodeTypes.VISITED_WEIGHT || nodeElement.className === nodeTypes.PATH_WEIGHT) {
                    nodeElement.className = nodeTypes.WEIGHT;
                }
            }
        }

        this.setState({grid: this.softRebuildGrid()})
    }

    /**
     * Resets the start and target nodes to their initial locations.
     */
    resetStartTarget () {
        this.setStartNode(INIT_START[0], INIT_START[1]);
        this.setTargetNode(INIT_TARGET[0], INIT_TARGET[1]);
    }

    /**
     * Sets new cost of weighted nodes.
     * 
     * @param {int} weight new cost
     */
    setNewWeight (weight) { this.setState({weightCost: weight}); }

    /**
     * Updates the state, we are now placing the start node.
     */
    placeStartNode () { this.setState({placingStart: true}); }
    
    /**
     * Updates the state, we are now placing the target node.
     */
    placeTargetNode () { this.setState({placingTarget: true}); }

    /**
     * Sets the current draw mode.
     * 0: none
     * 1: walls
     * 2: weights
     * 
     * @param {int} mode new draw mode
     */
    setDrawMode (mode) { this.setState({drawMode: mode}); }

    /**
     * Visualizes a given pathfinding algorithm. Uses the current state of
     * the grid of nodes.
     * 
     * @param {pathfindAlgorithms} algorithm pathfinding algorithm
     * @param {boolean} isInstant true if displaying instantly
     */
    visualizePathfind (algorithm, isInstant) {
        this.clearPaths();
        this.updateGrid();

        const grid = this.state.grid;
        const start = grid[this.state.startNode[0]][this.state.startNode[1]];
        const target = grid[this.state.targetNode[0]][this.state.targetNode[1]];

        var visitedNodes = [];
        switch (algorithm) {
            case pathfindAlgorithms.DIJKSTRA:
                visitedNodes = dijkstra(grid, start, target);
                break;
            case pathfindAlgorithms.ASTAR:
                visitedNodes = aStar(grid, start, target);
                break;
            case pathfindAlgorithms.BFS:
                visitedNodes = breadthFirstSearch(grid, start, target);
                break;
            case pathfindAlgorithms.DFS:
                visitedNodes = depthFirstSearch(grid, start, target);
                break;
            default:
                break;
        }
        
        const shortestPath = getShortestPathNodes(target);

        this.animateSearch(visitedNodes, shortestPath, isInstant);
    }

    /**
     * Animates the process of the pathfinding algorithm. Updates the class
     * names of the nodes to change their appearance.
     * 
     * @param {Array} visitedNodes array of visited nodes in order
     * @param {Array} shortestPath array of shortest path nodes in order
     * @param {boolean} isInstant true if displaying instantly
     */
    animateSearch (visitedNodes, shortestPath, isInstant) {
        if (isInstant) {
            for (let i = 0; i <= visitedNodes.length; i++) {
                if (i === visitedNodes.length) {
                    for (let i = 1; i < shortestPath.length - 1; i++) {
                        const node = shortestPath[i];
                        const nodeElement = document.getElementById(`node-${node.row}-${node.col}`);

                        if (!node.isStart && !node.isTarget) {
                            if (node.cost !== 1) nodeElement.className = nodeTypes.PATH_WEIGHT;
                            else nodeElement.className = nodeTypes.PATH;
                        }
                    }
                    return;
                }
                const node = visitedNodes[i];
                const nodeElement = document.getElementById(`node-${node.row}-${node.col}`);

                if(!node.isStart && !node.isTarget) {
                    if (node.cost !== 1) nodeElement.className = nodeTypes.VISITED_WEIGHT_INSTANT;
                    else nodeElement.className = nodeTypes.VISITED_INSTANT;
                }
            }
        } else {
            for (let i = 0; i <= visitedNodes.length; i++) {
                if (i === visitedNodes.length) {
                    setTimeout(() => {
                        this.animatePath(shortestPath);
                    }, SPEED * i);
                    return;
                }
                setTimeout(() => {
                    const node = visitedNodes[i];
                    const nodeElement = document.getElementById(`node-${node.row}-${node.col}`);

                    if(!node.isStart && !node.isTarget) { 
                        if (node.cost !== 1) nodeElement.className = nodeTypes.VISITED_WEIGHT;
                        else nodeElement.className = nodeTypes.VISITED;
                    }
                }, SPEED * i);
            }
        }
    }

    /**
     * Animates the shortest path from the start node to the target node.
     * Updates the class names of the nodes to change their appearance.
     * 
     * @param {Array} shortestPath array of shortest path nodes in order 
     */
    animatePath (shortestPath) {
        for (let i = 0; i < shortestPath.length; i++) {
            setTimeout(() => {
                const node = shortestPath[i];
                const nodeElement = document.getElementById(`node-${node.row}-${node.col}`);

                if (!node.isStart && !node.isTarget) {
                    if (node.cost !== 1) nodeElement.className = nodeTypes.PATH_WEIGHT;
                    else nodeElement.className = nodeTypes.PATH;
                }
            }, 50 * i);
        }
    }

    /**
     * Animates a generated maze.
     */
    animateMaze () {
        this.clearWalls();
        const maze = recursiveDevision(ROW_COUNT, COL_COUNT);

        for (let i = 0; i < maze.length; i++) {
            setTimeout(() => {
                this.drawWallNode(maze[i][0], maze[i][1], true);
            }, 25 * i);
        }
    }

    /**
     * Runs on page load. Rebuilds the grid.
     */
    componentDidMount () {
        const grid = this.rebuildGrid();
        this.setState({grid: grid});
    }

    /**
     * Handles a mouse down event on a node. If we are placing the start or
     * target node, update the node location and return. Otherwise, updates
     * the node based on the current draw mode.
     * 0: none
     * 1: walls
     * 2: weights
     * 
     * @param {int} row row of node on grid
     * @param {int} col column of node on grid
     */
    handleMouseDown (row, col) {
        if (this.state.placingStart) {
            this.setStartNode(row, col);
            return;
        }

        if (this.state.placingTarget) {
            this.setTargetNode(row, col);
            return;
        }

        const grid = this.state.grid;

        switch (this.state.drawMode) {
            case 0:
                break;
            case 1:
                const isWall = grid[row][col].isWall;
                this.drawWallNode(row, col, !isWall);
                this.setState({drawWall: !isWall});
                break;
            case 2:
                const isWeight = grid[row][col].cost !== 1;
                this.drawWeightNode(row, col, !isWeight);
                this.setState({drawWeight: !isWeight});
                break;
            default:
                break;
        }
        this.setState({mouseIsDown: true});
    }

    /**
     * Handles a mouse up event. Sets the state so that nothing
     * can be drawn.
     */
    handleMouseUp () {
        if (!this.state.mouseIsDown) return;

        this.updateGrid();

        this.setState({
            mouseIsDown: false,
            drawWall: null,
            drawWeight: null,
        });
    }

    /**
     * Handles a mouse enter event into a node. If the mouse is not down,
     * return. Otherwise, updates the node based on the current draw mode.
     * 0: none
     * 1: walls
     * 2: weights
     * 
     * @param {int} row row of node on grid
     * @param {int} col column of node on grid
     */
    handleMouseEnter (row, col) {
        if (!this.state.mouseIsDown) return;

        const grid = this.state.grid;

        switch (this.state.drawMode) {
            case 0: 
                break;
            case 1:
                const isWall = grid[row][col].isWall;
                if (isWall !== this.state.drawWall) this.drawWallNode(row, col, !isWall);
                break;
            case 2:
                const isWeight = grid[row][col].cost !== 1;
                if (isWeight !== this.state.drawWeight) this.drawWeightNode(row, col, !isWeight);
                break;
            default:
                break;
        }
    }

    /**
     * Renders the pathfinding visualizer component.
     * 
     * @returns a <div> element representing the component
     */
    render () {
        //console.log(this.state.grid);

        return (
            <div className="pathfind-vis">
                <div className="pathfind-menu">
                    <PathfindMenu pathfinder={this} />
                </div>
                <div 
                className="grid" 
                onMouseUp={() => this.handleMouseUp()}
                onMouseLeave={() => this.handleMouseUp()}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                >
                    {Array.from(this.state.grid).map((row, rowIdx) => {
                        return (
                            <div key={rowIdx} className="grid-row">
                                {Array.from(row).map((node, nodeIdx) => {
                                    const {row, col, cost, isStart, isTarget, isWall} = node;
                                    return (
                                        <Node
                                        key={nodeIdx}
                                        row={row}
                                        col={col}
                                        cost={cost}
                                        isStart={isStart}
                                        isTarget={isTarget}
                                        isWall={isWall}
                                        mousePressed={(row, col) => this.handleMouseDown(row, col)}
                                        mouseEntered={(row, col) => this.handleMouseEnter(row, col)}
                                        />
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default PathfindingVisualizer;