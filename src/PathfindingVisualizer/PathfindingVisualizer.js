import React from 'react';

import './PathfindingVisualizer.css';

import { getShortestPathNodes, dijkstra, aStar, breadthFirstSearch, depthFirstSearch, pathfindAlgorithms
} from './PathfindAlgorithms';
import { recursiveDevision
} from './MazeAlgorithms';
import PathfindMenu from './PathfindMenu';
import Node from './Node';

// Number of rows in the grid
const ROW_COUNT = 27;
// Number of columns in the grid
const COL_COUNT = 71;
// Initial cost of weighted nodes
const INIT_COST = 15;
// Initial coordinates of the start node [row, col]
const INIT_START = [13, 10];
// Initial coordinates of the target noe [row, col]
const INIT_TARGET = [13, 60];
// Speed between visited node animations in miliseconds
const VISITED_SPEED = 5;
// Speed between shortest path node animations in miliseconds
const PATH_SPEED = 25;
// Speed between maze wall node animations in miliseconds
const MAZE_SPEED = 10;

// Node class types
const nodeTypes = {
    NODE: 'node',
    NODE_ANIMATED: 'node node-animated',
    WALL: 'node wall',
    WALL_INSTANT: 'node wall-instant',
    WALL_PREVIEW: 'node wall-preview',
    WEIGHT: 'node weight',
    WEIGHT_INSTANT: 'node weight-instant',
    WEIGHT_PREVIEW: 'node weight-preview',
    START: 'node start',
    START_INSTANT: 'node start-instant',
    START_PREVIEW: 'node start-preview',
    TARGET: 'node target',
    TARGET_INSTANT: 'node target-instant',
    TARGET_PREVIEW: 'node target-preview',
    VISITED: 'node visited',
    VISITED_INSTANT: 'node visited-instant',
    VISITED_WEIGHT: 'node visited-weight',
    VISITED_WEIGHT_INSTANT: 'node visited-weight-instant',
    PATH: 'node path',
    PATH_INSTANT: 'node path-instant',
    PATH_WEIGHT: 'node path-weight',
    PATH_WEIGHT_INSTANT: 'node path-weight-instant',
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
            // Are we allowed to draw currently?
            canDraw: true,
            // Current draw mode (0: none, 1: walls, 2: weights)
            drawMode: 0,
            // Are we erasing or drawing walls (null if neither)?
            drawWall: null,
            // Are we erasing or drawing weights (null if neither)?
            drawWeight: null,
            // Current start node position
            startNode: INIT_START,
            // Current target node position
            targetNode: INIT_TARGET,
        };
    }

    /**
     * Rebuilds the grid with new nodes. Start and target
     * node positions are preserved.
     */
    rebuildGrid () {
        const grid = [];
        for (let r = 0; r < ROW_COUNT; r++) {
            const curRow = [];
            for (let c = 0; c < COL_COUNT; c++) {
                const node = this.createNode(r, c, 1, false);
                curRow.push(node);
            }
            grid.push(curRow);
        }
        this.setState({grid: grid});
    }

    /**
     * Rebuilds the grid with new nodes. Main node types are
     * preserved (start, target, wall, weight).
     */
    softRebuildGrid () {
        const oldGrid = this.state.grid;
        const grid = [];
        for (let r = 0; r < ROW_COUNT; r++) {
            const curRow = [];
            for (let c = 0; c < COL_COUNT; c++) {
                const node = this.createNode(r, c, oldGrid[r][c].cost, oldGrid[r][c].isWall)
                curRow.push(node);
            }
            grid.push(curRow);
        }
        this.setState({grid: grid});
    }

    /**
     * Creates a new node with stored properties.
     * 
     * @param {int} row row on grid
     * @param {int} col column on grid
     * @param {int} cost weight cost of node
     * @param {boolean} isWall is node a wall
     * 
     * @returns the new node object
     */
    createNode (row, col, cost, isWall) {
        let curVisual = nodeTypes.NODE;
        if (cost !== 1) curVisual = nodeTypes.WEIGHT;
        if (isWall) curVisual = nodeTypes.WALL;

        return {
            curVisual: curVisual,
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
     * Updates the state of the grid of nodes. Changes the properties of
     * newly drawn node types according to their current visual state.
     */
    updateGridState () {
        const grid = this.state.grid;

        for (let r = 0; r < grid.length; r++) {
            for (let c = 0; c < grid[0].length; c++) {
                const node = grid[r][c];
                const type = this.getNodeVisual(node);

                node.curVisual = nodeTypes.NODE;
                node.isStart = false;
                node.isTarget = false;
                node.isWall = false;
                node.cost = 1;
                
                switch (type) {
                    case nodeTypes.START: 
                    case nodeTypes.START_INSTANT:
                        node.curVisual = nodeTypes.START_INSTANT;
                        node.isStart = true;
                        this.setState({startNode: [node.row, node.col]});
                        break;
                    case nodeTypes.TARGET: 
                    case nodeTypes.TARGET_INSTANT:
                        node.curVisual = nodeTypes.TARGET_INSTANT;
                        node.isTarget = true;
                        this.setState({targetNode: [node.row, node.col]});
                        break;
                    case nodeTypes.WALL: 
                    case nodeTypes.WALL_INSTANT:
                        node.curVisual = nodeTypes.WALL_INSTANT;
                        node.isWall = true;
                        break;
                    case nodeTypes.WEIGHT:
                    case nodeTypes.WEIGHT_INSTANT:
                    case nodeTypes.VISITED_WEIGHT:
                    case nodeTypes.VISITED_WEIGHT_INSTANT:
                    case nodeTypes.PATH_WEIGHT:
                    case nodeTypes.PATH_WEIGHT_INSTANT:
                        node.curVisual = nodeTypes.WEIGHT_INSTANT;
                        node.cost = this.state.weightCost;
                        break;
                    case nodeTypes.VISITED:
                    case nodeTypes.VISITED_INSTANT:
                        node.curVisual = nodeTypes.VISITED_INSTANT;
                        break;
                    case nodeTypes.PATH:
                    case nodeTypes.PATH_INSTANT:
                        node.curVisual = nodeTypes.PATH_INSTANT;
                        break;
                    default:
                        break;
                }
            }
        }

        this.setState({grid: grid});
    }

    /**
     * Updates the visual state of a given node.
     * 
     * @param {Object} node node on grid
     * @param {nodeTypes} type new node type
     */
    updateNodeVisual (node, type) { document.getElementById(`node-${node.row}-${node.col}`).className = type; }

    /**
     * Gets the current node type.
     * 
     * @param {Object} node 
     * 
     * @returns current node element class name
     */
    getNodeVisual (node) { return document.getElementById(`node-${node.row}-${node.col}`).className; }

    /**
     * Sets new start node position. Updates state, we are no
     * longer placing the start node.
     * 
     * @param {Object} node node on grid
     */
    drawStartNode (node) { 
        const curStart = this.state.grid[this.state.startNode[0]][this.state.startNode[1]];

        if (node.isStart || node.isTarget) return;

        this.updateNodeVisual(curStart, nodeTypes.NODE);
        this.updateNodeVisual(node, nodeTypes.START);
    }

    /**
     * Sets new target node position. Updates state, we are no
     * longer placing the target node.
     * 
     * @param {Object} node node on grid
     */
    drawTargetNode (node) { 
        const curTarget = this.state.grid[this.state.targetNode[0]][this.state.targetNode[1]];

        if (node.isStart || node.isTarget) return;

        this.updateNodeVisual(curTarget, nodeTypes.NODE);
        this.updateNodeVisual(node, nodeTypes.TARGET);
    }

    /**
     * Updates the visual wall state of a given node. 
     * 
     * @param {Object} node node on grid
     * @param {boolean} isWall are we drawing (true) or erasing (false)
     */
    drawWallNode (node, isWall) {
        if (node.cost !== 1 || node.isStart || node.isTarget) return;

        if (!isWall) {
            if (this.getNodeVisual(node) === nodeTypes.NODE) return; 
            this.updateNodeVisual(node, nodeTypes.NODE_ANIMATED)
        } else if (this.getNodeVisual(node) !== nodeTypes.WALL_INSTANT) {
            this.updateNodeVisual(node, nodeTypes.WALL);
        }
    }

    /**
     * Updates the visual weight state of a given node.
     * 
     * @param {Object} node node on grid
     * @param {boolean} isWeight are we drawing (true) or erasing (false)
     */
    drawWeightNode (node, isWeight) {
        if (node.isWall || node.isStart || node.isTarget) return;

        if (!isWeight) {
            if (this.getNodeVisual(node) === nodeTypes.NODE) return; 
            this.updateNodeVisual(node, nodeTypes.NODE_ANIMATED);
        } else if (this.getNodeVisual(node) !== nodeTypes.WEIGHT_INSTANT) {
            this.updateNodeVisual(node, nodeTypes.WEIGHT);
        }
    }

    /**
     * Clears the entire grid.
     */
    clearGrid () {
        this.clearWeights();
        this.clearWalls();
        this.clearPaths();
        this.updateGridState();
    }

    /**
     * Clears the grid of all wall nodes.
     */
    clearWalls () { 
        const grid = this.state.grid;
        for (const row of grid) {
            for (const node of row) {
                if (node.isWall) {
                    this.updateNodeVisual(node, nodeTypes.NODE);
                    node.isWall = false;
                }
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
                if (node.cost !== 1) {
                    this.updateNodeVisual(node, nodeTypes.NODE);
                    node.cost = 1;
                }
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
                const node = this.state.grid[r][c];
                const type = this.getNodeVisual(node);

                if (type === nodeTypes.VISITED || 
                    type === nodeTypes.VISITED_INSTANT ||
                    type === nodeTypes.PATH || 
                    type === nodeTypes.PATH_INSTANT) {

                    this.updateNodeVisual(node, nodeTypes.NODE);
                }
                else if (type === nodeTypes.VISITED_WEIGHT || 
                    type === nodeTypes.VISITED_WEIGHT_INSTANT || 
                    type === nodeTypes.PATH_WEIGHT ||
                    type === nodeTypes.PATH_WEIGHT_INSTANT) {
                
                    this.updateNodeVisual(node, nodeTypes.WEIGHT_INSTANT);
                }
            }
        }
    }

    /**
     * Resets the start and target nodes to their initial locations.
     */
    resetStartTarget () {
        const initStart = this.state.grid[INIT_START[0]][INIT_START[1]];
        const initTarget = this.state.grid[INIT_TARGET[0]][INIT_TARGET[1]];

        this.drawStartNode(initStart);
        this.drawTargetNode(initTarget);
        this.updateGridState();
    }

    /**
     * Sets new cost of weighted nodes.
     * 
     * @param {int} weight new cost
     */
    setNewWeight (weight) { this.setState({weightCost: weight}); }

    /**
     * Sets the current draw mode.
     * 
     * 0: none
     * 1: walls
     * 2: weights
     * 3: start
     * 4: target
     * 
     * @param {int} mode new draw mode
     */
    setDrawMode (mode) { 
        if (this.state.drawMode === mode) mode = 0;
        this.setState({drawMode: mode}); 
    }

    /**
     * Visualizes a given pathfinding algorithm. Uses the current state of
     * the grid of nodes.
     * 
     * @param {pathfindAlgorithms} algorithm pathfinding algorithm
     * @param {boolean} isInstant true if displaying instantly
     */
    visualizePathfind (algorithm, isInstant) {
        this.clearPaths();
        this.softRebuildGrid();

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
                    for (let i = 1; i < shortestPath.length; i++) {
                        const node = shortestPath[i];

                        if (node.isStart || node.isTarget) continue;

                        if (node.cost !== 1) this.updateNodeVisual(node, nodeTypes.PATH_WEIGHT_INSTANT);
                        else this.updateNodeVisual(node, nodeTypes.PATH_INSTANT);
                    }
                    setTimeout(() => { this.updateGridState() }, 1);
                    return;
                }
                const node = visitedNodes[i];
                if (node.isStart || node.isTarget) continue;
                
                if (node.cost !== 1) this.updateNodeVisual(node, nodeTypes.VISITED_WEIGHT_INSTANT);
                else this.updateNodeVisual(node, nodeTypes.VISITED_INSTANT);
            }
        } else {
            this.setState({canDraw: false});

            for (let i = 0; i <= visitedNodes.length; i++) {
                if (i === visitedNodes.length) {
                    setTimeout(() => { this.animatePath(shortestPath); }, VISITED_SPEED * i);
                    return;
                }

                const node = visitedNodes[i];
                if (node.isStart || node.isTarget) continue;

                setTimeout(() => {
                    if (node.cost !== 1) this.updateNodeVisual(node, nodeTypes.VISITED_WEIGHT);
                    else this.updateNodeVisual(node, nodeTypes.VISITED);
                }, VISITED_SPEED * i);
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
            const node = shortestPath[i];
            if (node.isStart || node.isTarget) continue;

            setTimeout(() => {
                if (node.cost !== 1) this.updateNodeVisual(node, nodeTypes.PATH_WEIGHT);
                else this.updateNodeVisual(node, nodeTypes.PATH);
            }, PATH_SPEED * i);
        }
        setTimeout(() => { 
            this.updateGridState();
            this.setState({canDraw: true});
        }, PATH_SPEED * shortestPath.length);
    }

    /**
     * Animates a generated maze.
     */
    animateMaze () {
        this.setState({canDraw: false});
        this.clearGrid();
        const maze = recursiveDevision(ROW_COUNT, COL_COUNT);

        for (let i = 0; i < maze.length; i++) {
            setTimeout(() => {
                const node = this.state.grid[maze[i][0]][maze[i][1]];
                this.drawWallNode(node, true);
            }, MAZE_SPEED * i);
        }
        setTimeout(() => {
            this.updateGridState();
            this.setState({canDraw: true});
        }, MAZE_SPEED * maze.length);
    }

    /**
     * Runs on page load. Rebuilds the grid.
     */
    componentDidMount () { this.rebuildGrid(); }

    /**
     * Handles a mouse down event on a node. If we are placing the start or
     * target node, update the node location and return. Otherwise, updates
     * the node based on the current draw mode.
     * 
     * @param {int} row row of node on grid
     * @param {int} col column of node on grid
     */
    handleMouseDown (row, col) {
        if (!this.state.canDraw) return;
        this.setState({mouseIsDown: true});

        const grid = this.state.grid;
        const node = grid[row][col];
        if (node.isStart || node.isTarget) return;

        switch (this.state.drawMode) {
            case 1: // Wall
                const isWall = node.isWall;
                this.drawWallNode(node, !isWall);
                this.setState({drawWall: !isWall});
                break;
            case 2: // Weight
                const isWeight = node.cost !== 1;
                this.drawWeightNode(node, !isWeight);
                this.setState({drawWeight: !isWeight});
                break;
            case 3: // Start
                this.drawStartNode(node);
                this.setState({drawMode: 0});
                break;
            case 4: // Target
                this.drawTargetNode(node);
                this.setState({drawMode: 0});
                break;
            default:
                break;
        }
    }

    /**
     * Handles a mouse up event. Sets the state so that nothing
     * can be drawn.
     */
    handleMouseUp () {
        if (!this.state.mouseIsDown) return;

        this.updateGridState();

        this.setState({
            mouseIsDown: false,
            drawWall: null,
            drawWeight: null,
        });
    }

    /**
     * Handles a mouse enter event into a node. If the mouse is not down,
     * return. Otherwise, updates the node based on the current draw mode.
     * 
     * @param {int} row row of node on grid
     * @param {int} col column of node on grid
     */
    handleMouseEnter (row, col) {
        if (!this.state.canDraw) return;

        const grid = this.state.grid;
        const node = grid[row][col];

        const isWall = node.isWall;
        const isWeight = node.cost !== 1;

        const isPreview = !isWall && !isWeight && !node.isStart && !node.isTarget;

        switch (this.state.drawMode) {
            case 1:
                if (this.state.mouseIsDown && isWall !== this.state.drawWall) {
                    this.drawWallNode(node, !isWall);
                } else if (!this.state.mouseIsDown && isPreview) this.updateNodeVisual(node, nodeTypes.WALL_PREVIEW);
                break;
            case 2:
                if (this.state.mouseIsDown && isWeight !== this.state.drawWeight) {
                    this.drawWeightNode(node, !isWeight);
                } else if (!this.state.mouseIsDown && isPreview) this.updateNodeVisual(node, nodeTypes.WEIGHT_PREVIEW);
                break; 
            case 3:
                if (isPreview) this.updateNodeVisual(node, nodeTypes.START_PREVIEW);
                break;
            case 4:
                if (isPreview) this.updateNodeVisual(node, nodeTypes.TARGET_PREVIEW);
                break;
            default:
                break;
        }
    }

    /**
     * Handles a mouse leave event from a node.
     * 
     * @param {int} row row of node on grid
     * @param {int} col column of node on grid
     */
    handleMouseLeft (row, col) {
        if (this.state.mouseIsDown || this.state.drawMode === 0 || !this.state.canDraw) return;
        
        const node = this.state.grid[row][col];

        if (node.isWall || node.cost !== 1 || node.isStart || node.isTarget) return;

        this.updateNodeVisual(node, node.curVisual);
    }

    /**
     * Handles an animation end event of a node. Updates the class name of the
     * node to the instant class version.
     * 
     * @param {Object} node node on grid
     */
    handleAnimationEnd (node) {
        const type = this.getNodeVisual(node);
        switch (type) {
            case nodeTypes.START:
                this.updateNodeVisual(node, nodeTypes.START_INSTANT);
                break;
            case nodeTypes.TARGET:
                this.updateNodeVisual(node, nodeTypes.TARGET_INSTANT);
                break;
            case nodeTypes.WALL:
                this.updateNodeVisual(node, nodeTypes.WALL_INSTANT);
                break;
            case nodeTypes.WEIGHT:
                this.updateNodeVisual(node, nodeTypes.WEIGHT_INSTANT);
                break;
            case nodeTypes.VISITED:
                this.updateNodeVisual(node, nodeTypes.VISITED_INSTANT);
                break;
            case nodeTypes.VISITED_WEIGHT:
                this.updateNodeVisual(node, nodeTypes.VISITED_WEIGHT_INSTANT);
                break;
            case nodeTypes.PATH:
                this.updateNodeVisual(node, nodeTypes.PATH_INSTANT);
                break;
            case nodeTypes.PATH_WEIGHT:
                this.updateNodeVisual(node, nodeTypes.PATH_WEIGHT_INSTANT);
                break;
            default:
                this.updateNodeVisual(node, nodeTypes.NODE);
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
                                    const {row, col, isStart, isTarget} = node;
                                    return (
                                        <Node key={nodeIdx}
                                        row={row}
                                        col={col}
                                        isStart={isStart}
                                        isTarget={isTarget}
                                        mousePressed={(row, col) => this.handleMouseDown(row, col)}
                                        mouseEntered={(row, col) => this.handleMouseEnter(row, col)}
                                        mouseLeft={(row, col) => this.handleMouseLeft(row, col)}
                                        animationEnded={() => this.handleAnimationEnd(node)}
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