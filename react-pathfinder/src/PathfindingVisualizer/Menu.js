import React from 'react';
import { Container, Row, Col, Button, ButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu
} from 'reactstrap';

import './Menu.css';
import { algorithms } from './SearchAlgorithms';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visualizeDropdownOpen: false,
            mazeDropdownOpen: false,
            editDropdownOpen: false,
            clearDropdownOpen: false,
            isInstant: false,
        };
    }

    toggleVisualize = () => { this.setState({visualizeDropdownOpen: !this.state.visualizeDropdownOpen}); }

    toggleMaze = () => { this.setState({mazeDropdownOpen: !this.state.mazeDropdownOpen}); }

    toggleEdit = () => { this.setState({editDropdownOpen: !this.state.editDropdownOpen}); }

    toggleClear = () => { this.setState({clearDropdownOpen: !this.state.clearDropdownOpen}); }

    toggleInstant = () => { this.setState({isInstant: !this.state.isInstant}); }

    getIsInstantText = () => { return this.state.isInstant ? "Instant" : "Visualize"; }
 
    render () {
        return (
            <div className="menu">
                <Container>
                    <Row>
                        <Col className="title">
                            Pathfinding Visualizer
                        </Col>
                        <Col>
                            <Container>
                                <Row>
                                    <Col>
                                        <ButtonDropdown isOpen={this.state.visualizeDropdownOpen} toggle={this.toggleVisualize}>
                                            <Button color="success" onClick={this.toggleVisualize}>{this.getIsInstantText()}</Button>
                                            <DropdownToggle split color="success" />
                                            <DropdownMenu>
                                                <DropdownItem onClick={this.toggleInstant}>Pathfind Mode</DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem onClick={() => this.props.pathfinder.visualizePathfind(algorithms.DIJKSTRA, this.state.isInstant)}>Dijkstra</DropdownItem>
                                                <DropdownItem onClick={() => this.props.pathfinder.visualizePathfind(algorithms.ASTAR, this.state.isInstant)}>A* (A-Star)</DropdownItem>
                                                <DropdownItem onClick={() => this.props.pathfinder.visualizePathfind(algorithms.BFS, this.state.isInstant)}>Breadth First Search</DropdownItem>
                                                <DropdownItem onClick={() => this.props.pathfinder.visualizePathfind(algorithms.DFS, this.state.isInstant)}>Depth First Search</DropdownItem>
                                            </DropdownMenu>
                                        </ButtonDropdown>
                                    </Col>
                                    <Col>
                                        <ButtonDropdown isOpen={this.state.mazeDropdownOpen} toggle={this.toggleMaze}>
                                            <Button color="warning" onClick={this.toggleMaze}>Maze</Button>
                                            <DropdownToggle split color="warning" />
                                            <DropdownMenu>
                                                <DropdownItem onClick={() => this.props.pathfinder.genRecursiveDevision()}>Recursive Devision</DropdownItem>
                                            </DropdownMenu>
                                        </ButtonDropdown>
                                    </Col>
                                    <Col>
                                    <ButtonDropdown isOpen={this.state.editDropdownOpen} toggle={this.toggleEdit}>
                                        <Button color="primary" onClick={this.toggleEdit}>Edit</Button>
                                        <DropdownToggle split color="primary" />
                                        <DropdownMenu>
                                            <DropdownItem onClick={() => this.props.pathfinder.resetStartTarget()}>Reset Start/Target Nodes</DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem onClick={() => this.props.pathfinder.placeStartNode()}>Place Start Node</DropdownItem>
                                            <DropdownItem onClick={() => this.props.pathfinder.placeTargetNode()}>Place Target Node</DropdownItem>
                                        </DropdownMenu>
                                    </ButtonDropdown>
                                    </Col>
                                    <Col>
                                    <ButtonDropdown isOpen={this.state.clearDropdownOpen} toggle={this.toggleClear}>
                                        <Button color="danger" onClick={this.toggleClear}>Clear</Button>
                                        <DropdownToggle split color="danger" />
                                        <DropdownMenu>
                                            <DropdownItem onClick={() => this.props.pathfinder.clearGrid()}>Clear All</DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem onClick={() => this.props.pathfinder.clearWalls()}>Clear Walls</DropdownItem>
                                            <DropdownItem onClick={() => this.props.pathfinder.clearPath()}>Clear Path</DropdownItem>
                                        </DropdownMenu>
                                    </ButtonDropdown>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Menu;