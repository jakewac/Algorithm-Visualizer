import React from 'react';
import { Container, Row, Col, Button
} from 'reactstrap';

import './Menu.css';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
 
    render () {
        return (
            <div className="menu">
                <Container>
                    <Row>
                        <Col>
                            <Button color="success">
                                Visualize
                            </Button>
                        </Col>
                        <Col className="title">
                            Pathfinding Visualizer
                        </Col>
                        <Col>
                            <Button color="danger" onClick={() => this.props.clearGrid()}>
                                Clear
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Menu;