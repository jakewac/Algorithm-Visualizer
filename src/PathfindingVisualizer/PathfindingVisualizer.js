import React from 'react';
import { Card, CardHeader, CardBody
} from 'reactstrap';

import './PathfindingVisualizer.css';

import { getShortestPathNodes, dijkstra, aStar, breadthFirstSearch, depthFirstSearch, algorithms 
} from './SearchAlgorithms';
import { recursiveDevision
} from './MazeAlgorithms';

import PathfindMenu from './PathfindMenu';
import Node from './Node';

const ROW_COUNT = 25;
const COL_COUNT = 63;

const INIT_START = [12, 10];
const INIT_TARGET = [12, 52];

class PathfindingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            mouseIsDown: false,
            drawMode: 0,
            drawWall: null,
            drawWeight: null,
            placingStart: false,
            placingTarget: false,
            startNode: INIT_START,
            targetNode: INIT_TARGET,
        };
    }

    rebuildGrid = () => {
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

    softRebuildGrid = () => {
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

    createNode = (row, col, cost, isWall) => {
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

    setNodeCost = (row, col, cost) => {
        const grid = this.state.grid;
        const node = grid[row][col];

        if (node.isWall || node.isStart || node.isTarget) return;

        if (cost === 1) document.getElementById(`node-${row}-${col}`).className = 'node';
        else document.getElementById(`node-${row}-${col}`).className = 'node node-weight';

        const newNode = {
            ...node,
            cost: cost,
        };
        grid[row][col] = newNode;
        
        this.setState({grid: grid});
    }

    placeStartNode = () => { this.setState({placingStart: true}); }
    
    placeTargetNode = () => { this.setState({placingTarget: true}); }

    setStartNode = (row, col) => { 
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

    setTargetNode = (row, col) => { 
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

    setWallNode = (row, col, wall) => {
        const grid = this.state.grid;
        if (grid[row][col].isStart || grid[row][col].isTarget) return;

        const node = this.state.grid[row][col];
        const newNode = {
            ...node,
            isWall: wall,
        };
        grid[row][col] = newNode;
        
        this.setState({grid: grid});
    }

    clearPath = () => {
        for (let r = 0; r < ROW_COUNT; r++) {
            for (let c = 0; c < COL_COUNT; c++) {
                const node = document.getElementById(`node-${r}-${c}`);
                if (node.className === 'node node-visited' || node.className === 'node node-path' || node.className === 'node node-visited-instant') {
                    node.className = 'node';
                }
                else if (node.className === 'node node-visited-weight' || node.className === 'node node-path-weight') {
                    node.className = 'node node-weight';
                }
            }
        }
        this.setState({grid: this.softRebuildGrid()})
    }

    clearWalls = () => { 
        const grid = this.state.grid;
        for (const row of grid) {
            for (const node of row) {
                if (node.isWall) {
                    const element = document.getElementById(`node-${node.row}-${node.col}`);
                    element.className = 'node';
                    node.isWall = false;
                }
            }
        }
        this.setState({grid: grid});
    }

    clearWeights = () => {
        const grid = this.state.grid;
        for (const row of grid) {
            for (const node of row) {
                if (node.cost !== 1) {
                    const element = document.getElementById(`node-${node.row}-${node.col}`);
                    element.className = 'node';
                    node.cost = 1;
                }
            }
        }
        this.setState({grid: grid});
    }

    clearGrid = () => {
        this.clearPath();
        this.clearWeights();
        this.clearWalls();
    }

    drawStop = () => { this.setState({drawMode: 0}); }

    drawWalls = () => { this.setState({drawMode: 1}); }

    drawWeights = () => { this.setState({drawMode: 2}); }

    resetStartTarget = () => {
        this.setStartNode(INIT_START[0], INIT_START[1]);
        this.setTargetNode(INIT_TARGET[0], INIT_TARGET[1]);
    }

    visualizePathfind = (algorithm, isInstant) => {
        this.clearPath();

        const grid = this.state.grid;
        const start = grid[this.state.startNode[0]][this.state.startNode[1]];
        const target = grid[this.state.targetNode[0]][this.state.targetNode[1]];

        var visitedNodes = null;
        switch (algorithm) {
            case algorithms.DIJKSTRA:
                visitedNodes = dijkstra(grid, start, target);
                break;
            case algorithms.ASTAR:
                visitedNodes = aStar(grid, start, target);
                break;
            case algorithms.BFS:
                visitedNodes = breadthFirstSearch(grid, start, target);
                break;
            case algorithms.DFS:
                visitedNodes = depthFirstSearch(grid, start, target);
                break;
            default:
                break;
        }
        const shortestPath = getShortestPathNodes(target);

        this.animateSearch(visitedNodes, shortestPath, isInstant);
    }

    animateSearch = (visitedNodes, shortestPath, isInstant) => {
        if (isInstant) {
            for (let i = 0; i <= visitedNodes.length; i++) {
                if (i === visitedNodes.length) {
                    for (let i = 1; i < shortestPath.length - 1; i++) {
                        const node = shortestPath[i];
                        if (!node.isStart && !node.isTarget) {
                            if (node.cost !== 1) {
                                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-path-weight';
                            } else {
                                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-path';
                            }
                        }
                    }
                    return;
                }
                const node = visitedNodes[i];
                if(!node.isStart && !node.isTarget) {
                    if (node.cost !== 1) {
                        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited-weight-instant';
                    } else {
                        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited-instant';
                    }
                }
            }
        } else {
            for (let i = 0; i <= visitedNodes.length; i++) {
                if (i === visitedNodes.length) {
                    setTimeout(() => {
                        this.animatePath(shortestPath);
                    }, 5 * i);
                    return;
                }
                setTimeout(() => {
                    const node = visitedNodes[i];
                    if(!node.isStart && !node.isTarget) { 
                        if (node.cost !== 1) {
                            document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited-weight';
                        } else {
                            document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
                        }
                    }
                }, 5 * i);
            }
        }
    }

    animatePath = (shortestPath) => {
        for (let i = 0; i < shortestPath.length; i++) {
            setTimeout(() => {
                const node = shortestPath[i];
                if (!node.isStart && !node.isTarget) {
                    if (node.cost !== 1) {
                        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-path-weight';
                    } else {
                        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-path';
                    }
                }
            }, 50 * i);
        }
    }

    genRecursiveDevision = () => {
        this.clearWalls();
        const maze = recursiveDevision(ROW_COUNT, COL_COUNT);

        for (let i = 0; i < maze.length; i++) {
            setTimeout(() => {
                console.log(maze[i]);
                console.log(maze[i][0]);
                console.log(maze[i][1]);
                this.setWallNode(maze[i][0], maze[i][1], true);
            }, 100 * i);
        }
    }

    componentDidMount () {
        const grid = this.rebuildGrid();
        this.setState({grid: grid});
    }

    handleMouseDown(row, col) {
        if (this.state.placingStart) {
            this.setStartNode(row, col);
            return;
        }

        if (this.state.placingTarget) {
            this.setTargetNode(row, col);
            return;
        }

        switch (this.state.drawMode) {
            case 1:
                const isWall = this.state.grid[row][col].isWall;
                this.setWallNode(row, col, !isWall);
                this.setState({drawWall: !isWall});
                break;
            case 2:
                if (this.state.grid[row][col].cost === 1) {
                    this.setNodeCost(row, col, 5);
                    this.setState({drawWeight: true});
                } else {
                    this.setNodeCost(row, col, 1);
                    this.setState({drawWeight: false});
                }
                break;
            default:
                break;
        }
        this.setState({mouseIsDown: true});
    }

    handleMouseUp() {
        this.setState({
            mouseIsDown: false,
            drawWall: null,
            drawWeight: null,
        });
    }

    handleMouseEnter(row, col) {
        if (!this.state.mouseIsDown) return;
        switch (this.state.drawMode) {
            case 1:
                const isWall = this.state.grid[row][col].isWall;
                if (isWall !== this.state.drawWall) this.setWallNode(row, col, !isWall);
                break;
            case 2:
                if (this.state.drawWeight) this.setNodeCost(row, col, 5);
                if (!this.state.drawWeight) this.setNodeCost(row, col, 1);
                break;
            default:
                break;
        }
    }

    render () {
        console.log(this.state.grid);

        return (
            <div>
                <Card>
                    <CardHeader>
                        <PathfindMenu pathfinder={this} />
                    </CardHeader>
                    <CardBody>
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
                                            const {row, col, isStart, isTarget, isWall} = node;
                                            return (
                                                <Node
                                                key={nodeIdx}
                                                row={row}
                                                col={col}
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
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default PathfindingVisualizer;