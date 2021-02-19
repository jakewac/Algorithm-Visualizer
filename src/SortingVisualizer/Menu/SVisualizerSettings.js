import React from 'react';
import MenuButton from '../../NavBar/MenuButton';

import { sortAlgorithms } from '../Algorithms/SortAlgorithms';

/**
 * Represents the settings bar in the menu of the sorting visualizer
 * component.
 * 
 * @author Jake Waclawski
 */
class SVisualizerSettings extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            // Currently selected sorting algorithm
            curAlgorithm: null,
        };
    }

    /**
     * Gets the current algorithm for the information text as a string.
     * 
     * @returns the string
     */
    getCurrentAlgorithmText() {
        if (!this.state.curAlgorithm) return "Select an Algorithm";
        return this.state.curAlgorithm;
    }

    /**
     * Renders the settings bar component.
     * 
     * @returns a <div> element representing the settings bar
     */
    render () {

        return (
            <div className="sv-menu-bar">
                <MenuButton
                buttonText="Randomize"
                clickFunction={() => this.props.sorter.reGenerateArray()}>
                    <div className="sv-menu-dropdown-content-item"
                    onClick={() => this.props.sorter.reGenerateArray(10)}
                    >Small Array</div>
                    <div className="sv-menu-dropdown-content-item"
                    onClick={() => this.props.sorter.reGenerateArray(50)}
                    >Medium Array</div>
                    <div className="sv-menu-dropdown-content-item"
                    onClick={() => this.props.sorter.reGenerateArray(100)}
                    >Large Array</div>
                </MenuButton>
                <MenuButton
                buttonText="Algorithm"
                clickFunction={() => null}>
                    <div className="sv-menu-dropdown-content-item"
                    onClick={() => this.setState({curAlgorithm: sortAlgorithms.SELECTION})}
                    >Selection Sort</div>
                    <div className="sv-menu-dropdown-content-item"
                    onClick={() => this.setState({curAlgorithm: sortAlgorithms.INSERTION})}
                    >Insertion Sort</div>
                    <div className="sv-menu-dropdown-content-item"
                    onClick={() => this.setState({curAlgorithm: sortAlgorithms.MERGE})}
                    >Merge Sort</div>
                </MenuButton>
                <MenuButton
                buttonText="Sort"
                clickFunction={() => this.props.sorter.visualizeSort(this.state.curAlgorithm)}>
                    <div className="sv-menu-dropdown-content-item"
                    onClick={() => this.props.sorter.visualizeSort(this.state.curAlgorithm, 500)}
                    >Very Slow</div>
                    <div className="sv-menu-dropdown-content-item"
                    onClick={() => this.props.sorter.visualizeSort(this.state.curAlgorithm, 100)}
                    >Slow</div>
                    <div className="sv-menu-dropdown-content-item"
                    onClick={() => this.props.sorter.visualizeSort(this.state.curAlgorithm, 50)}
                    >Fast</div>
                    <div className="sv-menu-dropdown-content-item"
                    onClick={() => this.props.sorter.visualizeSort(this.state.curAlgorithm, 10)}
                    >Very Fast</div>
                </MenuButton>
                <div className="sv-curalg dropdown-animate">{this.getCurrentAlgorithmText()}</div>
            </div>
        );
    }
}

export default SVisualizerSettings;