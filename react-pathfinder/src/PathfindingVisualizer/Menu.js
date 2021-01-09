import React from 'react';
import { Container, Row, Col, Button
} from 'reactstrap';

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
                            Pathfinding Visualizer
                        </Col>
                        <Col>
                            <Button>
                                Visualize
                            </Button>
                        </Col>
                        <Col>
                            <Button>
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