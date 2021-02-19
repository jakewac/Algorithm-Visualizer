import React from 'react';

import { pathfindAlgorithms } from '../Algorithms/PathfindAlgorithms';
import { mazeAlgorithms } from '../Algorithms/MazeAlgorithms';
import PAlgorithmInfo from './PAlgorithmInfo';
import MenuButton from '../../NavBar/MenuButton';

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
                <MenuButton 
                buttonText="Maze"
                clickFunction={() => null}>
                    <div className="pv-menu-dropdown-content-item"
                    onClick={() => this.props.pathfinder.animateMaze(mazeAlgorithms.RECURSIVE_DEVISION)}>
                        Recursive Devision
                    </div>
                    <div className="pv-menu-dropdown-content-item"
                    onClick={() => this.props.pathfinder.animateMaze(mazeAlgorithms.RANDOM_WALL)}>
                        Random Wall
                    </div>
                    <div className="pv-menu-dropdown-content-item"
                    onClick={() => this.props.pathfinder.animateMaze(mazeAlgorithms.RANDOM_WEIGHT)}>
                        Random Weight
                    </div>
                    <div className="pv-menu-dropdown-content-item"
                    onClick={() => this.props.pathfinder.animateMaze(mazeAlgorithms.RANDOM_WALL_WEIGHT)}>
                        Random Wall/Weight
                    </div>
                </MenuButton>
                <MenuButton
                buttonText="Clear"
                clickFunction={() => this.props.pathfinder.clearGrid()}>
                    <div className="pv-menu-dropdown-content-item"
                    onClick={() => this.props.pathfinder.clearWalls()}>
                        Clear Walls
                    </div>
                    <div className="pv-menu-dropdown-content-item"
                    onClick={() => this.props.pathfinder.clearWeights()}>
                        Clear Weights
                    </div>
                    <div className="pv-menu-dropdown-content-item"
                    onClick={() => this.props.pathfinder.clearPaths()}>
                        Clear Path
                    </div>
                    <div className="pv-menu-dropdown-content-item"
                    onClick={() => this.props.pathfinder.resetStartTarget()}>
                        Reset Start/Target
                    </div>
                </MenuButton>
                <MenuButton
                buttonText="Edit"
                clickFunction={() => null}>
                    <div className="pv-menu-dropdown-content-item"
                    onClick={() => this.changeDiagonalMovement()}>
                        <div id="diagmove-bool" className="bool-setting" />
                        Diagonal Movement
                    </div>
                    <div className="pv-menu-dropdown-content-item">
                        <input id="ns-dmultiplier" className="number-setting" placeholder="A* Multiplier" type="number" />
                    </div>
                    <div className="pv-menu-dropdown-content-item">
                        <input id="ns-weightcost" className="number-setting" onChange={() => this.changeWeightCost()} placeholder="Weight Cost" type="number" min="0" max="999" />
                    </div>
                    <div className="pv-menu-dropdown-content-item">
                        <input id="ns-holeamount" className="number-setting" placeholder="Hole Multiplier" type="number" />
                    </div>
                </MenuButton>
                <MenuButton 
                buttonText="Algorithm"
                clickFunction={() => null}>
                    <div className="pv-menu-dropdown-content-item"
                    onClick={() => this.setState({curAlgorithm: pathfindAlgorithms.DIJKSTRA})}>
                        Dijkstra
                    </div>
                    <div className="pv-menu-dropdown-content-item"
                    onClick={() => this.setState({curAlgorithm: pathfindAlgorithms.ASTAR})}>
                        A* (A-Star)
                    </div>
                    <div className="pv-menu-dropdown-content-item"
                    onClick={() => this.setState({curAlgorithm: pathfindAlgorithms.BFS})}>
                        Breadth First Search
                    </div>
                    <div className="pv-menu-dropdown-content-item"
                    onClick={() => this.setState({curAlgorithm: pathfindAlgorithms.DFS})}>
                        Depth First Search
                    </div>
                </MenuButton>
                <MenuButton 
                buttonText="Pathfind"
                clickFunction={() => this.props.pathfinder.visualizePathfind(this.state.curAlgorithm, this.state.diagonalNeighbors, this.state.curSpeed)}>
                    <div className="pv-menu-dropdown-content-item"
                    onClick={() => this.changeVisualizeSpeed("vslow-bool", 250)}>
                        <div id="vslow-bool" className="bool-setting" />
                        Very Slow
                    </div>
                    <div className="pv-menu-dropdown-content-item"
                    onClick={() => this.changeVisualizeSpeed("slow-bool", 50)}>
                        <div id="slow-bool" className="bool-setting" />
                        Slow
                    </div>
                    <div className="pv-menu-dropdown-content-item"
                    onClick={() => this.changeVisualizeSpeed("fast-bool", 15)}>
                        <div id="fast-bool" className="bool-setting" />
                        Fast
                    </div>
                    <div className="pv-menu-dropdown-content-item"
                    onClick={() => this.changeVisualizeSpeed("vfast-bool", 5)}>
                        <div id="vfast-bool" className="bool-setting" />
                        Very Fast
                    </div>                    
                    <div className="pv-menu-dropdown-content-item"
                    onClick={() => this.changeVisualizeSpeed("instant-bool", 0)}>
                        <div id="instant-bool" className="bool-setting" />
                        Instant
                    </div>
                </MenuButton>
                <PAlgorithmInfo>
                    {this.getCurrentAlgorithmText()}
                </PAlgorithmInfo>
            </div>
        );
    }
}

export default PVisualizerSettings;