import React from 'react';
import { Card, CardHeader, CardBody
} from 'reactstrap';

import './PathfindingVisualizer.css';

import { getShortestPathNodes, dijkstra, aStar, breadthFirstSearch, depthFirstSearch, algorithms 
} from './SearchAlgorithms';
import { recursiveDevision
} from './MazeAlgorithms';

import Menu from './Menu';
import Node from './Node';

const ROW_COUNT = 24;
const COL_COUNT = 50;

class PathfindingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            mouseIsDown: false,
            drawWall: null,
            startNode: [12, 10],
            targetNode: [12, 40],
            placingStart: false,
            placingTarget: false,
        };
    }

    rebuildGrid = () => {
        const grid = [];
        for (let r = 0; r < ROW_COUNT; r++) {
            const curRow = [];
            for (let c = 0; c < COL_COUNT; c++) {
                curRow.push(this.createNode(r, c, false));
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
                curRow.push(this.createNode(r, c, oldGrid[r][c].isWall));
            }
            grid.push(curRow);
        }
        return grid;
    }

    createNode = (row, col, isWall) => {
        return {
            row,
            col,
            distance: Infinity,
            rootDistance: Infinity,
            isStart: row === this.state.startNode[0] && col === this.state.startNode[1],
            isTarget: row === this.state.targetNode[0] && col === this.state.targetNode[1],
            isWall: isWall,
            previousNode: null,
        }
    }

    placeStartNode = () => { this.setState({placingStart: true}); }
    
    placeTargetNode = () => { this.setState({placingTarget: true}); }

    setStartNode = (row, col) => {
        this.setState({
            startNode: [row, col],
            placingStart: false,
        });
        this.clearPath();
    }

    setTargetNode = (row, col) => {
        this.setState({
            targetNode: [row, col],
            placingTarget: false,
        });
        this.clearPath();
    }

    setWallNode = (row, col, wall) => {
        const grid = this.state.grid;
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
                if(node.className === 'node node-visited' || node.className === 'node node-path' || node.className === 'node node-visited-instant') {
                    node.className = 'node';
                }
            }
        }
        this.setState({grid: this.softRebuildGrid()})
    }

    clearWalls = () => {
        this.setState({grid: this.rebuildGrid()});
    }

    clearGrid = () => {
        this.clearPath();
        this.clearWalls();
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
                        if(!node.isStart && !node.isTarget) document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-path';
                    }
                    return;
                }
                const node = visitedNodes[i];
                if(!node.isStart && !node.isTarget) document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited-instant';
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
                    if(!node.isStart && !node.isTarget) document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
                }, 5 * i);
            }
        }
    }

    animatePath = (shortestPath) => {
        for (let i = 0; i < shortestPath.length; i++) {
            setTimeout(() => {
                const node = shortestPath[i];
                if (!node.isStart && !node.isTarget) document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-path';
            }, 50 * i)
        }
    }

    genRecursiveDevision = () => {
        this.clearWalls();
        const maze = recursiveDevision(ROW_COUNT, COL_COUNT);
        console.log(maze);

        for (let r = 0; r < maze.length; r++) {
            for (let c = 0; c < maze[0].length; c++) {
                if (maze[r][c]) this.setWallNode(r, c, maze[r][c]);
            }
        }
    }

    componentDidMount () {
        const grid = this.rebuildGrid();
        this.setState({grid: grid});
    }

    handleMouseDown(row, col, isWall) {
        if (this.state.placingStart) {
            this.setStartNode(row, col);
            return;
        }

        if (this.state.placingTarget) {
            this.setTargetNode(row, col);
            return;
        }

        this.setWallNode(row, col, !isWall);
        this.setState({
            mouseIsDown: true,
            drawWall: !isWall,
        });
    }

    handleMouseUp() {
        this.setState({
            mouseIsDown: false,
            drawWall: null,
        });
    }

    handleMouseEnter(row, col, isWall) {
        if (this.state.mouseIsDown && (!isWall === this.state.drawWall)) {
            this.setWallNode(row, col, !isWall);
        }
    }

    render () {
        const grid = this.state;
        console.log(grid);

        return (
            <div>
                <Card>
                    <CardHeader>
                        <Menu
                        pathfinder={this}
                        ></Menu>
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
                                                mousePressed={(row, col, isWall) => this.handleMouseDown(row, col, isWall)}
                                                mouseEntered={(row, col, isWall) => this.handleMouseEnter(row, col, isWall)}
                                                ></Node>
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