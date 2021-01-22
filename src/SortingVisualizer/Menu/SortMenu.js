import React from 'react';

import './SortMenu.css';

import SVisualizerSettings from './SVisualizerSettings';

/**
 * Represents the top menu of the sorting visualizer component.
 * 
 * @author Jake Waclawski
 */
class SortMenu extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }
 
    /**
     * Renders the menu component.
     * 
     * @returns a <div> element representing the menu
     */
    render () {
        return (
            <div className="sort-menu">
                <SVisualizerSettings sorter={this.props.sorter} />
            </div>
        );
    }
}

export default SortMenu;