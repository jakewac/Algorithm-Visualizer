import React from 'react';
import { Container, Row, Col, Button, ButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu
} from 'reactstrap';

import Node from './Node';
import { pathfindAlgorithms } from './PathfindAlgorithms';

/**
 * Represents the top menu of the pathfinding visualizer component.
 * 
 * @author Jake Waclawski
 */
class PathfindMenu extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            // Visualize button dropdown status
            visualizeDropdownOpen: false,
            // Edit button dropdown status
            editDropdownOpen: false,
            // Maze button dropdown status
            mazeDropdownOpen: false,
            // Clear button dropdown status
            clearDropdownOpen: false,
            // Display path instantly?
            isInstant: false,
        };
    }

    /**
     * Toggles the visualize button dropdown.
     */
    toggleVisualize () { this.setState({visualizeDropdownOpen: !this.state.visualizeDropdownOpen}); }

    /**
     * Toggles the edit button dropdown.
     */
    toggleEdit () { this.setState({editDropdownOpen: !this.state.editDropdownOpen}); }

    /**
     * Toggles the maze button dropdown.
     */
    toggleMaze () { this.setState({mazeDropdownOpen: !this.state.mazeDropdownOpen}); }

    /**
     * Toggles the clear button dropdown.
     */
    toggleClear () { this.setState({clearDropdownOpen: !this.state.clearDropdownOpen}); }

    /**
     * Toggles if the path should be displayed instantly.
     */
    toggleInstant () { this.setState({isInstant: !this.state.isInstant}); }

    /**
     * Get the current text of the visualize button.
     */
    getIsInstantText () { return this.state.isInstant ? "Instant" : "Visualize"; }

    /**
     * Reverts the node state to the instant version.
     * 
     * @param {string} type node key type
     */
    keyAnimationEnded (type) { document.getElementById(`node-${type}`).className = `node ${type}`; }

    startNodeKey (row, col) {
        document.getElementById(`node-${row}-${col}`).className = `node ${row}`;
        this.props.pathfinder.placeStartNode()
    }

    targetNodeKey (row, col) {
        document.getElementById(`node-${row}-${col}`).className = `node ${row}`;
        this.props.pathfinder.placeTargetNode()
    }

    weightNodeKey (row, col) {
        document.getElementById(`node-${row}-${col}`).className = `node ${row}`;
        this.props.pathfinder.setDrawMode(2)
    }

    wallNodeKey (row, col) {
        document.getElementById(`node-${row}-${col}`).className = `node ${row}`;
        this.props.pathfinder.setDrawMode(1)
    }
    
    /**
     * Renders the menu component.
     * 
     * @returns a <div> element representing the menu
     */
    render () {
        return (
            <div className="pathfind-menu">
                <Container>
                    <Row>
                        <Col className="title">
                            Pathfinding Visualizer
                        </Col>
                        <Col>
                            <Container>
                                <Row>
                                    <Col>
                                        <ButtonDropdown isOpen={this.state.visualizeDropdownOpen} toggle={() => this.toggleVisualize()}>
                                            <Button color="success" onClick={() => this.toggleVisualize()}>{this.getIsInstantText()}</Button>
                                            <DropdownToggle split color="success" />
                                            <DropdownMenu>
                                                <DropdownItem onClick={() => this.toggleInstant()}>Pathfind Mode</DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem onClick={() => this.props.pathfinder.visualizePathfind(pathfindAlgorithms.DIJKSTRA, this.state.isInstant)}>Dijkstra</DropdownItem>
                                                <DropdownItem onClick={() => this.props.pathfinder.visualizePathfind(pathfindAlgorithms.ASTAR, this.state.isInstant)}>A* (A-Star)</DropdownItem>
                                                <DropdownItem onClick={() => this.props.pathfinder.visualizePathfind(pathfindAlgorithms.BFS, this.state.isInstant)}>Breadth First Search</DropdownItem>
                                                <DropdownItem onClick={() => this.props.pathfinder.visualizePathfind(pathfindAlgorithms.DFS, this.state.isInstant)}>Depth First Search</DropdownItem>
                                            </DropdownMenu>
                                        </ButtonDropdown>
                                    </Col>
                                    <Col>
                                        <ButtonDropdown isOpen={this.state.editDropdownOpen} toggle={() => this.toggleEdit()}>
                                            <Button color="info" onClick={() => this.toggleEdit()}>Edit</Button>
                                            <DropdownToggle split color="info" />
                                            <DropdownMenu>
                                                <DropdownItem onClick={() => this.props.pathfinder.resetStartTarget()}>Reset Start/Target Nodes</DropdownItem>
                                            </DropdownMenu>
                                        </ButtonDropdown>
                                    </Col>
                                    <Col>
                                        <ButtonDropdown isOpen={this.state.mazeDropdownOpen} toggle={() => this.toggleMaze()}>
                                            <Button color="warning" onClick={() => this.toggleMaze()}>Maze</Button>
                                            <DropdownToggle split color="warning" />
                                            <DropdownMenu>
                                                <DropdownItem onClick={() => this.props.pathfinder.animateMaze()}>Recursive Devision</DropdownItem>
                                            </DropdownMenu>
                                        </ButtonDropdown>
                                    </Col>
                                    <Col>
                                        <ButtonDropdown isOpen={this.state.clearDropdownOpen} toggle={() => this.toggleClear()}>
                                            <Button color="danger" onClick={() => this.toggleClear()}>Clear</Button>
                                            <DropdownToggle split color="danger" />
                                            <DropdownMenu>
                                                <DropdownItem onClick={() => this.props.pathfinder.clearGrid()}>Clear All</DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem onClick={() => this.props.pathfinder.clearWeights()}>Clear Weights</DropdownItem>
                                                <DropdownItem onClick={() => this.props.pathfinder.clearWalls()}>Clear Walls</DropdownItem>
                                                <DropdownItem onClick={() => this.props.pathfinder.clearPaths()}>Clear Path</DropdownItem>
                                            </DropdownMenu>
                                        </ButtonDropdown>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
                <div className="visualizer-info">
                    <div className="key-item">
                        <div className="key-node">
                            <Node type={"start-instant"}
                            row={"start"}
                            col={"instant"}
                            mousePressed={(row, col) => this.startNodeKey(row, col)}
                            animationEnded={(key) => this.keyAnimationEnded(key)}
                            mouseEntered={() => null}
                            />
                        </div>
                        <div className="key-text">Start Node</div>
                    </div>
                    <div className="key-item">
                        <div className="key-node">
                            <Node type={"target-instant"}
                            row={"target"}
                            col={"instant"}
                            mousePressed={(row, col) => this.targetNodeKey(row, col)}
                            animationEnded={(key) => this.keyAnimationEnded(key)}
                            mouseEntered={() => null}
                            />
                        </div>
                        <div className="key-text">Target Node</div>
                    </div>
                    <div className="key-item">
                        <div className="key-node">
                            <Node type={"weight-instant"}
                            row={"weight"}
                            col={"instant"}
                            mousePressed={(row, col) => this.weightNodeKey(row, col)}
                            animationEnded={(key) => this.keyAnimationEnded(key)}
                            mouseEntered={() => null}
                            />
                        </div>
                        <div className="key-text">Weighted Node</div>
                    </div>
                    <div className="key-item">
                        <div className="key-node">
                            <Node type={"wall-instant"}
                            row={"wall"}
                            col={"instant"}
                            mousePressed={(row, col) => this.wallNodeKey(row, col)}
                            animationEnded={(key) => this.keyAnimationEnded(key)}
                            mouseEntered={() => null}
                            />
                        </div>
                        <div className="key-text">Wall Node</div>
                    </div>
                    <div className="key-item">
                        <div className="key-node">
                            <Node type={""}
                            mousePressed={() => null}
                            mouseEntered={() => null}
                            />
                        </div>
                        <div className="key-text">Unvisited Node</div>
                    </div>
                    <div className="key-item">
                        <div className="key-node">
                            <Node type={"visited-instant"}
                            mousePressed={() => null}
                            mouseEntered={() => null}
                            />
                        </div>
                        <div className="key-node">
                            <Node type={"visited-weight-instant"}
                            mousePressed={() => null}
                            mouseEntered={() => null}
                            />
                        </div>
                        <div className="key-text">Visited Nodes</div>
                    </div>
                    <div className="key-item">
                        <div className="key-node">
                            <Node type={"path-instant"}
                            mousePressed={() => null}
                            mouseEntered={() => null}
                            />
                        </div>
                        <div className="key-node">
                            <Node type={"path-weight-instant"}
                            mousePressed={() => null}
                            mouseEntered={() => null}
                            />
                        </div>
                        <div className="key-text">Path Nodes</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PathfindMenu;