import React from 'react';

/**
 * Represents the algorithm stats text above the grid of the pathfinding
 * visualizer component.
 * 
 * @author Jake Waclawski
 */
class PathfindStats extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }

    /**
     * Renders the algorithm stats component.
     * 
     * @returns a <div> element representing the stats text
     */
    render () {

        return (
            <div className="pv-stats">
                <div className="pv-stats-item">
                    <div>Visited Nodes:</div>
                    <div id="pv-stats-visited" className="pv-stats-text">0</div>
                </div>
                <div className="pv-stats-item">
                    <div>Path Nodes:</div>
                    <div id="pv-stats-path" className="pv-stats-text">0</div>
                </div>
                <div className="pv-stats-item">
                    <div>Path Cost:</div>
                    <div id="pv-stats-weighted" className="pv-stats-text">0</div>
                </div>
            </div>
        );
    }
}

export default PathfindStats;