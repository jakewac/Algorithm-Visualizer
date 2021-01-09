import React from 'react';
import { Card, CardHeader, CardBody
} from 'reactstrap';

import './PathfindingVisualizer.css';

import Menu from './Menu';
import Node from './Node';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';

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

    updateGrid = (grid, row, col) => {
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        const newNode = {
            ...node,
            isWall: !node.isWall,
        };

        newGrid[row][col] = newNode;
        return newGrid;
    }

    createNode = (row, col) => {
        return {
            row,
            col,
            isStart: row === START_NODE[0] && col === START_NODE[1],
            isTarget: row === TARGET_NODE[0] && col === TARGET_NODE[1],
            isWall: false,
            previousNode: null,
        }
    }

    clearGrid = () => {
        for (let r = 0; r < ROW_COUNT; r++) {
            for (let c = 0; c < COL_COUNT; c++) {
                document.getElementById(`node-${r}-${c}`).className = 'node';
            }
        }

        const grid = this.buildGrid();
        this.setState({grid: grid});
    }

    visualize = () => {
        const grid = this.state.grid;
        const start = grid[START_NODE[0]][START_NODE[1]];
        const target = grid[TARGET_NODE[0]][TARGET_NODE[1]];

        const visitedNodes = dijkstra(grid, start, target);
        const shortestPath = getNodesInShortestPathOrder(target);

        this.animateSearch(visitedNodes, shortestPath);
    }

    animateSearch = (visitedNodes, shortestPath) => {
        for (let i = 0; i <= visitedNodes.length; i++) {
            if (i === visitedNodes.length) {
                setTimeout(() => {
                    this.animatePath(shortestPath);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodes[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
            }, 10 * i);
        }
    }

    animatePath = (shortestPath) => {
        for (let i = 0; i < shortestPath.length; i++) {
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

    handleMouseDown(row, col) {
        const newGrid = this.updateGrid(this.state.grid, row, col);
        this.setState({grid: newGrid, mouseIsDown: true});
    }

    handleMouseUp() {
        this.setState({mouseIsDown: false});
    }

    handleMouseEnter(row, col) {
        if (!this.state.mouseIsDown) return;
        const newGrid = this.updateGrid(this.state.grid, row, col);
        this.setState({grid: newGrid});
    }

    render () {
        const grid = this.state;
        console.log(grid);

        return (
            <div>
                <Card>
                    <CardHeader>
                        <Menu
                        visualize={this.visualize}
                        clearGrid={this.clearGrid}
                        ></Menu>
                    </CardHeader>
                    <CardBody>
                        <div className="grid">
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
                                                mouseIsDown={this.state.mouseIsDown}
                                                onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                                onMouseUp={() => this.handleMouseUp()}
                                                onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
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