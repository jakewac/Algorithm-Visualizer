import React from 'react';
import { Container, Row, Col, Button, ButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu
} from 'reactstrap';

import './Menu.css';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visualizeDropdownOpen: false,
            clearDropdownOpen: false,
        };
    }

    toggleVisualize = () => {
        this.setState({visualizeDropdownOpen: !this.state.visualizeDropdownOpen});
    }

    toggleClear = () => {
        this.setState({clearDropdownOpen: !this.state.clearDropdownOpen});
    }
 
    render () {
        return (
            <div className="menu">
                <Container>
                    <Row>
                        <Col>
                            <ButtonDropdown isOpen={this.state.visualizeDropdownOpen} toggle={this.toggleVisualize}>
                                <Button color="success" onClick={this.toggleVisualize}>Visualize</Button>
                                <DropdownToggle split color="success" />
                                <DropdownMenu>
                                    <DropdownItem onClick={() => this.props.pathfinder.visualizeDijkstra()}>Dijkstra</DropdownItem>
                                    <DropdownItem onClick={() => this.props.pathfinder.visualizeAStar()}>A* (A-Star)</DropdownItem>
                                    <DropdownItem onClick={() => this.props.pathfinder.visualizeBFS()}>Breadth First Search</DropdownItem>
                                    <DropdownItem onClick={() => this.props.pathfinder.visualizeDFS()}>Depth First Search</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={() => this.props.pathfinder.instantPath()}>Instant</DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>
                        </Col>
                        <Col className="title">
                            Pathfinding Visualizer
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
            </div>
        );
    }
}

export default Menu;