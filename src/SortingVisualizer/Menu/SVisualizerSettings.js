import React from 'react';

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
            // Is the randomize button dropdown open?
            randomizeDropdownHidden: true,
            // Is the algorithm button dropdown open?
            algorithmDropdownHidden: true,
            // Is the visualize button dropdown open?
            visualizeDropdownHidden: true,
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
                <div className="randomize-dropdown dropdown-animate">
                    <div className="sv-menu-bar-button" 
                    onClick={() => this.props.sorter.reGenerateArray()}
                    onMouseEnter={() => this.setState({randomizeDropdownHidden: false})}>
                    <span>Randomize</span></div>
                    <div className="sv-menu-dropdown-content randomize-drop-content dropdown-animate"
                    hidden={this.state.randomizeDropdownHidden}
                    onClick={() => this.setState({randomizeDropdownHidden: true})}>
                        <div className="sv-menu-dropdown-content-item"
                        onClick={() => this.props.sorter.reGenerateArray(10)}
                        >Small Array</div>
                        <div className="sv-menu-dropdown-content-item"
                        onClick={() => this.props.sorter.reGenerateArray(50)}
                        >Medium Array</div>
                        <div className="sv-menu-dropdown-content-item"
                        onClick={() => this.props.sorter.reGenerateArray(100)}
                        >Large Array</div>
                    </div>
                </div>
                <div className="algorithm-dropdown dropdown-animate">
                    <div className="sv-menu-bar-button" 
                    onMouseEnter={() => this.setState({algorithmDropdownHidden: false})}>
                    <span>Algorithm</span></div>
                    <div className="sv-menu-dropdown-content algorithm-drop-content dropdown-animate"
                    hidden={this.state.algorithmDropdownHidden}
                    onClick={() => this.setState({algorithmDropdownHidden: true})}>
                        <div className="sv-menu-dropdown-content-item"
                        onClick={() => this.setState({curAlgorithm: sortAlgorithms.SELECTION})}
                        >Selection Sort</div>
                        <div className="sv-menu-dropdown-content-item"
                        onClick={() => this.setState({curAlgorithm: sortAlgorithms.INSERTION})}
                        >Insertion Sort</div>
                        <div className="sv-menu-dropdown-content-item"
                        onClick={() => this.setState({curAlgorithm: sortAlgorithms.MERGE})}
                        >Merge Sort</div>
                    </div>
                </div>
                <div className="visualize-dropdown dropdown-animate">
                    <div className="sv-menu-bar-button" 
                    onClick={() => this.props.sorter.visualizeSort(this.state.curAlgorithm)}
                    onMouseEnter={() => this.setState({visualizeDropdownHidden: false})}>
                    <span>Sort</span></div>
                    <div className="sv-menu-dropdown-content visualize-drop-content dropdown-animate"
                    hidden={this.state.visualizeDropdownHidden}
                    onClick={() => this.setState({visualizeDropdownHidden: true})}>
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
                    </div>
                </div>
                <div className="sv-curalg dropdown-animate">{this.getCurrentAlgorithmText()}</div>
            </div>
        );
    }
}

export default SVisualizerSettings;