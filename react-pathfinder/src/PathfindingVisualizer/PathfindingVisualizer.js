import React from 'react';
import { Card, CardHeader, CardBody
} from 'reactstrap';

import './PathfindingVisualizer.css';

import Menu from './Menu';
import Node from './Node';

const ROW_COUNT = 25;
const COL_COUNT = 50;

class PathfindingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
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
        }
    }

    componentDidMount () {
        const grid = this.buildGrid();
        this.setState({grid});
    }

    render () {
        const grid = this.state;
        console.log(grid);

        return (
            <div>
                <Card>
                    <CardHeader>
                        <Menu></Menu>
                    </CardHeader>
                    <CardBody>
                        <div className="grid">
                            {Array.from(this.state.grid).map((row, rowIdx) => {
                                return (
                                    <div key={rowIdx} className="grid-row">
                                        {Array.from(row).map(node => {
                                            const {row, col} = node;
                                            return (
                                                <Node row={row} col={col}></Node>
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