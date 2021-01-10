import React from 'react';
import { Container, Row, Col, Button, ButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu
} from 'reactstrap';

import './Menu.css';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
        };
    }

    toggle = () => {
        this.setState({dropdownOpen: !this.state.dropdownOpen});
    }
 
    render () {
        return (
            <div className="menu">
                <Container>
                    <Row>
                        <Col>
                            <Button color="success" onClick={() => this.props.pathfinder.visualize()}>
                                Visualize
                            </Button>
                        </Col>
                        <Col className="title">
                            Pathfinding Visualizer
                        </Col>
                        <Col>
                            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <Button color="danger" onClick={() => this.props.pathfinder.clearGrid()}>Clear</Button>
                                <DropdownToggle split color="danger" />
                                <DropdownMenu>
                                    <DropdownItem onClick={() => this.props.pathfinder.clearGrid()}>Clear All</DropdownItem>
                                    <DropdownItem divider></DropdownItem>
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