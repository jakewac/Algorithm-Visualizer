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
            <div>
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
                            <Button color="danger">
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