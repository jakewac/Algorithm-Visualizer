import React from 'react';

import './PathfindMenu.css';

import PathfindStats from './PathfindStats';
import NodeKey from './NodeKey';
import PVisualizerSettings from './PVisualizerSettings';

/**
 * Represents the menu above the grid of the pathfinding visualizer component.
 * 
 * @author Jake Waclawski
 */
class PathfindMenu extends React.Component {
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
            <div className="pathfind-menu">
                <PVisualizerSettings pathfinder={this.props.pathfinder} />
                <NodeKey pathfinder={this.props.pathfinder} />
                <PathfindStats />
            </div>
        );
    }
}

export default PathfindMenu;