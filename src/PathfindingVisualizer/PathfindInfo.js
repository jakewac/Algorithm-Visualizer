import React from 'react';

/**
 * Represents the algorithm info bar in the pathfinding visualizer component.
 * 
 * @author Jake Waclawski
 */
class PathfindInfo extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }

    /**
     * Renders the info bar.
     * 
     * @returns a <div> element representing the info bar
     */
    render () {
        return (
            <div className="pathfind-info">
                <div className="info-item">
                    <div>Algorithm:</div>
                    <div id="algorithm-info-text" className="info-text">None</div>
                </div>
                <div className="info-item">
                    <div>Visited Nodes:</div>
                    <div id="visited-info-text" className="info-text">0</div>
                </div>
                <div className="info-item">
                    <div>Path Nodes:</div>
                    <div id="path-info-text" className="info-text">0</div>
                </div>
                <div className="info-item">
                    <div>Path Cost:</div>
                    <div id="weighted-info-text" className="info-text">0</div>
                </div>
            </div>
        );
    }
}

export default PathfindInfo;