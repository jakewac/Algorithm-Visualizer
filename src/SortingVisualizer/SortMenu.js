import React from 'react';
import { Container, Row, Col, Button, ButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu
} from 'reactstrap';

import './SortMenu.css';

import { sortAlgorithms } from './SortAlgorithms';

/**
 * Represents the top menu of the sorting visualizer component.
 * 
 * @author Jake Waclawski
 */
class SortMenu extends React.Component {
    constructor (props) {
        super(props);
        // Visualize button dropdown status
        this.state = { visualizeDropdownOpen: false };
    }

    /**
     * Toggles the visualize button dropdown.
     */
    toggleVisualize () { this.setState({visualizeDropdownOpen: !this.state.visualizeDropdownOpen}); }
 
    /**
     * Renders the menu component.
     * 
     * @returns a <div> element representing the menu
     */
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
                                        <ButtonDropdown isOpen={this.state.visualizeDropdownOpen} toggle={() => this.toggleVisualize()}>
                                            <Button color="success" onClick={() => this.toggleVisualize()}>Visualize</Button>
                                            <DropdownToggle split color="success" />
                                            <DropdownMenu>
                                                <DropdownItem onClick={() => this.props.sorter.visualizeSort(sortAlgorithms.SELECTION)}>Selection Sort</DropdownItem>
                                                <DropdownItem onClick={() => this.props.sorter.visualizeSort(sortAlgorithms.INSERTION)}>Insertion Sort</DropdownItem>
                                                <DropdownItem onClick={() => this.props.sorter.visualizeSort(sortAlgorithms.MERGE)}>Merge Sort</DropdownItem>
                                            </DropdownMenu>
                                        </ButtonDropdown>
                                    </Col>
                                    <Col>
                                        <Button color="warning" onClick={() => this.props.sorter.reGenerateArray()}>Randomize</Button>
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