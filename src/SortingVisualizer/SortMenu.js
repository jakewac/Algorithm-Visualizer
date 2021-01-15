import React from 'react';
import { Container, Row, Col, Button, ButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu
} from 'reactstrap';

import { sortAlgorithms } from './SortAlgorithms';

import './SortMenu.css';

class SortMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visualizeDropdownOpen: false,
        };
    }

    toggleVisualize = () => { this.setState({visualizeDropdownOpen: !this.state.visualizeDropdownOpen}); }
 
    render () {
        return (
            <div className="sort-menu">
                <Container>
                    <Row>
                        <Col className="title">
                            Sorting Visualizer
                        </Col>
                        <Col>
                            <Container>
                                <Row>
                                    <Col>
                                        <ButtonDropdown isOpen={this.state.visualizeDropdownOpen} toggle={this.toggleVisualize}>
                                            <Button color="success" onClick={this.toggleVisualize}>Visualize</Button>
                                            <DropdownToggle split color="success" />
                                            <DropdownMenu>
                                                <DropdownItem onClick={() => this.props.sorter.visualizeSort(sortAlgorithms.SELECTION)}>Selection Sort</DropdownItem>
                                                <DropdownItem onClick={() => this.props.sorter.visualizeSort(sortAlgorithms.INSERTION)}>Insertion Sort</DropdownItem>
                                                <DropdownItem onClick={() => this.props.sorter.visualizeSort(sortAlgorithms.MERGE)}>Merge Sort</DropdownItem>
                                            </DropdownMenu>
                                        </ButtonDropdown>
                                    </Col>
                                    <Col>
                                        <Button color="warning" onClick={this.props.sorter.reGenerateArray}>Randomize</Button>
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

export default SortMenu;