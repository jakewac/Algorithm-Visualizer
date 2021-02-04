import React from 'react';

import { pathfindAlgorithms } from '../Algorithms/PathfindAlgorithms';
import { mazeAlgorithms } from '../Algorithms/MazeAlgorithms';

/**
 * Represents the settings bar in the menu of the pathfinding visualizer
 * component.
 * 
 * @author Jake Waclawski
 */
class PVisualizerSettings extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            // Currently selected pathfinding algorithm
            curAlgorithm: null,
            // Are we allowing diagonal neighbor nodes?
            diagonalNeighbors: false,
            // Current path animation speed
            curSpeed: 15,
            // Is the maze button dropdown open?
            mazeDropdownHidden: true,
            // Is the clear button dropdown open?
            clearDropdownHidden: true,
            // Is the edit button dropdown open?
            editDropdownHidden: true,
            // Is the algorithm button dropdown open?
            algorithmDropdownHidden: true,
            // Is the pathfind button dropdown open?
            pathfindDropdownHidden: true,
        };
    }

    /**
     * Gets the current algorithm for the information text as a string.
     * 
     * @returns the string
     */
    getCurrentAlgorithmText () {
        if (!this.state.curAlgorithm) return "Select an Algorithm";
        return this.state.curAlgorithm;
    }

    /**
     * Changes the current diagonal node neighbor setting.
     */
    changeDiagonalMovement () {
        document.getElementById("diagmove-bool").style.backgroundColor = !this.state.diagonalNeighbors ? "rgb(100, 255, 100)" : "rgb(255, 100, 100)";
        this.setState({diagonalNeighbors: !this.state.diagonalNeighbors});
    }

    /**
     * Updates the pathfinder with the current diagonal node neighbor setting.
     */
    changeWeightCost () {
        let cost = document.getElementById("ns-weightcost").value;
        if (!cost && cost !== 0) cost = 5;

        this.props.pathfinder.setNewWeight(parseInt(cost));
    }

    /**
     * Updates the currently selected animation speed option.
     * 
     * @param {string} id element id
     * @param {int} speed new speed
     */
    changeVisualizeSpeed (id, speed) {
        this.setState({curSpeed: speed});

        document.getElementById("vslow-bool").style.backgroundColor = "rgb(255, 100, 100)";
        document.getElementById("slow-bool").style.backgroundColor = "rgb(255, 100, 100)";
        document.getElementById("fast-bool").style.backgroundColor = "rgb(255, 100, 100)";
        document.getElementById("vfast-bool").style.backgroundColor = "rgb(255, 100, 100)";
        document.getElementById("instant-bool").style.backgroundColor = "rgb(255, 100, 100)";
        
        document.getElementById(id).style.backgroundColor = "rgb(100, 255, 100)";
    }

    /**
     * Renders the settings bar component.
     * 
     * @returns a <div> element representing the settings bar
     */
    render () {

        return (
            <div className="pv-menu-bar">
                <div className="maze-dropdown dropdown-animate">
                    <div className="pv-menu-bar-button" 
                    onMouseEnter={() => this.setState({mazeDropdownHidden: false})}>
                    <span>Maze</span></div>
                    <div className="pv-menu-dropdown-content maze-drop-content dropdown-animate"
                    hidden={this.state.mazeDropdownHidden}
                    onClick={() => this.setState({mazeDropdownHidden: true})}>
                        <div className="pv-menu-dropdown-content-item"
                        onClick={() => this.props.pathfinder.animateMaze(mazeAlgorithms.RECURSIVE_DEVISION)}
                        >Recursive Devision</div>
                        <div className="pv-menu-dropdown-content-item"
                        onClick={() => this.props.pathfinder.animateMaze(mazeAlgorithms.RANDOM_WALL)}
                        >Random Wall</div>
                        <div className="pv-menu-dropdown-content-item"
                        onClick={() => this.props.pathfinder.animateMaze(mazeAlgorithms.RANDOM_WEIGHT)}
                        >Random Weight</div>
                        <div className="pv-menu-dropdown-content-item"
                        onClick={() => this.props.pathfinder.animateMaze(mazeAlgorithms.RANDOM_WALL_WEIGHT)}
                        >Random Wall/Weight</div>
                    </div>
                </div>
                <div className="clear-dropdown dropdown-animate">
                    <div className="pv-menu-bar-button" 
                    onClick={() => this.props.pathfinder.clearGrid()}
                    onMouseEnter={() => this.setState({clearDropdownHidden: false})}>
                    <span>Clear</span></div>
                    <div className="pv-menu-dropdown-content clear-drop-content dropdown-animate"
                    hidden={this.state.clearDropdownHidden} 
                    onClick={() => this.setState({clearDropdownHidden: true})}>
                        <div className="pv-menu-dropdown-content-item"
                        onClick={() => this.props.pathfinder.clearWalls()}
                        >Clear Walls</div>
                        <div className="pv-menu-dropdown-content-item"
                        onClick={() => this.props.pathfinder.clearWeights()}
                        >Clear Weights</div>
                        <div className="pv-menu-dropdown-content-item"
                        onClick={() => this.props.pathfinder.clearPaths()}
                        >Clear Path</div>
                        <div className="pv-menu-dropdown-content-item"
                        onClick={() => this.props.pathfinder.resetStartTarget()}
                        >Reset Start/Target</div>
                    </div>
                </div>
                <div className="edit-dropdown dropdown-animate">
                    <div className="pv-menu-bar-button" 
                    onMouseEnter={() => this.setState({editDropdownHidden: false})}>
                    <span>Edit</span></div>
                    <div className="pv-menu-dropdown-content edit-drop-content dropdown-animate"
                    hidden={this.state.editDropdownHidden} >
                        <div className="pv-menu-dropdown-content-item"
                        onClick={() => this.changeDiagonalMovement()}>
                            <div id="diagmove-bool" className="bool-setting" />
                        Diagonal Movement</div>
                        <div className="pv-menu-dropdown-content-item">
                            <input id="ns-dmultiplier" className="number-setting" placeholder="A* Multiplier" type="number" />
                        </div>
                        <div className="pv-menu-dropdown-content-item">
                            <input id="ns-weightcost" className="number-setting" onChange={() => this.changeWeightCost()} placeholder="Weight Cost" type="number" min="0" max="999" />
                        </div>
                        <div className="pv-menu-dropdown-content-item">
                            <input id="ns-holeamount" className="number-setting" placeholder="Hole Multiplier" type="number" />
                        </div>
                    </div>
                </div>
                <div className="algorithm-dropdown dropdown-animate">
                    <div className="pv-menu-bar-button"
                    onMouseEnter={() => this.setState({algorithmDropdownHidden: false})}
                    onClick={() => this.setState({curAlgorithm: null})}>
                    <span>Algorithm</span></div>
                    <div className="pv-menu-dropdown-content alg-drop-content dropdown-animate"
                    hidden={this.state.algorithmDropdownHidden}>
                        <div className="pv-menu-dropdown-content-item"
                        onClick={() => this.setState({curAlgorithm: pathfindAlgorithms.DIJKSTRA})}
                        >Dijkstra</div>
                        <div className="pv-menu-dropdown-content-item"
                        onClick={() => this.setState({curAlgorithm: pathfindAlgorithms.ASTAR})}
                        >A* (A-Star)</div>
                        <div className="pv-menu-dropdown-content-item"
                        onClick={() => this.setState({curAlgorithm: pathfindAlgorithms.BFS})}
                        >Breadth First Search</div>
                        <div className="pv-menu-dropdown-content-item"
                        onClick={() => this.setState({curAlgorithm: pathfindAlgorithms.DFS})}
                        >Depth First Search</div>
                    </div>
                </div>
                <div className="pathfind-dropdown dropdown-animate">
                    <div className="pv-menu-bar-button" 
                    onMouseEnter={() => this.setState({pathfindDropdownHidden: false})}
                    onClick={() => this.props.pathfinder.visualizePathfind(this.state.curAlgorithm, this.state.diagonalNeighbors, this.state.curSpeed)}
                    onMouseUp={() => this.setState({pathfindDropdownHidden: true})}>
                    <span>Pathfind</span></div>
                    <div className="pv-menu-dropdown-content pathfind-drop-content dropdown-animate"
                    hidden={this.state.pathfindDropdownHidden}>
                        <div className="pv-menu-dropdown-content-item"
                        onClick={() => this.changeVisualizeSpeed("vslow-bool", 250)}>
                            <div id="vslow-bool" className="bool-setting" />
                        Very Slow</div>
                        <div className="pv-menu-dropdown-content-item"
                        onClick={() => this.changeVisualizeSpeed("slow-bool", 50)}>
                            <div id="slow-bool" className="bool-setting" />
                        Slow</div>
                        <div className="pv-menu-dropdown-content-item"
                        onClick={() => this.changeVisualizeSpeed("fast-bool", 15)}>
                            <div id="fast-bool" className="bool-setting" />
                        Fast</div>
                        <div className="pv-menu-dropdown-content-item"
                        onClick={() => this.changeVisualizeSpeed("vfast-bool", 5)}>
                            <div id="vfast-bool" className="bool-setting" />
                        Very Fast</div>                    
                        <div className="pv-menu-dropdown-content-item"
                        onClick={() => this.changeVisualizeSpeed("instant-bool", 0)}>
                            <div id="instant-bool" className="bool-setting" />
                        Instant</div>
                    </div>
                </div>
                <div className="pv-curalg dropdown-animate">{this.getCurrentAlgorithmText()}</div>
            </div>
        );
    }
}

export default PVisualizerSettings;