import React from 'react';
import { Card, CardHeader, CardBody
} from 'reactstrap';

import './PathfindingVisualizer.css';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';

import Menu from './Menu';
import Node from './Node';

const ROW_COUNT = 24;
const COL_COUNT = 50;

const START_NODE = [12, 10];
const TARGET_NODE = [12, 40];

class PathfindingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            mouseIsDown: false,
            drawWall: null,
        };
    }

    buildGrid = () => {
        const grid = [];
        for (let r = 0; r < ROW_COUNT; r++) {
            const curRow = [];
            for (let c = 0; c < COL_COUNT; c++) {
                curRow.push(this.createNode(r, c));
            }
            grid.push(curRow);
        }
        return grid;
    }

    createNode = (row, col) => {
        return {
            row,
            col,
            distance: Infinity,
            isStart: row === START_NODE[0] && col === START_NODE[1],
            isTarget: row === TARGET_NODE[0] && col === TARGET_NODE[1],
            isWall: false,
            previousNode: null,
        }
    }

    toggleWallNode = (row, col) => {
        const grid = this.state.grid;
        const node = this.state.grid[row][col];
        const newNode = {
            ...node,
            isWall: !node.isWall,
        };
        grid[row][col] = newNode;
        this.setState({grid: grid});
    }

    clearPath = () => {
        for (let r = 0; r < ROW_COUNT; r++) {
            for (let c = 0; c < COL_COUNT; c++) {
                const node = document.getElementById(`node-${r}-${c}`);
                if(node.className === 'node node-visited' || node.className === 'node node-path') {
                    node.className = 'node';
                }
            }
        }
    }

    clearWalls = () => {
        this.setState({grid: this.buildGrid()});
    }

    clearGrid = () => {
        this.clearPath();
        this.clearWalls();
    }

    visualize = () => {
        this.clearPath();

        const grid = this.state.grid;

        const start = grid[START_NODE[0]][START_NODE[1]];
        const target = grid[TARGET_NODE[0]][TARGET_NODE[1]];
        const visitedNodes = dijkstra(grid, start, target);
        const shortestPath = getNodesInShortestPathOrder(target);

        this.animateSearch(visitedNodes, shortestPath);
    }

    animateSearch = (visitedNodes, shortestPath) => {
        for (let i = 1; i <= visitedNodes.length; i++) {
            if (i === visitedNodes.length) {
                setTimeout(() => {
                    this.animatePath(shortestPath);
                }, 5 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodes[i];
                if(!node.isTarget) document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
            }, 5 * i);
        }
    }

    animatePath = (shortestPath) => {
        for (let i = 1; i < shortestPath.length - 1; i++) {
            setTimeout(() => {
                const node = shortestPath[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-path';
            }, 50 * i)
        }
    }

    componentDidMount () {
        const grid = this.buildGrid();
        this.setState({grid: grid});
    }

    handleMouseDown(row, col, isWall) {
        this.toggleWallNode(row, col);
        this.setState({
            mouseIsDown: true,
            drawWall: isWall,
        });
    }

    handleMouseUp() {
        this.setState({
            mouseIsDown: false,
            drawWall: null,
        });
    }

    handleMouseEnter(row, col, isWall) {
        if (this.state.mouseIsDown && (isWall === this.state.drawWall)) {
            this.toggleWallNode(row, col);
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