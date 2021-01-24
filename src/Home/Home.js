import React from 'react';

/**
 * Represents the home tab component.
 * 
 * @author Jake Waclawski
 */
class Home extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }

    /**
     * Renders the home tab component.
     * 
     * @returns a <div> element representing the component
     */
    render () {
        return (
            <div>
                <h1>Algorithm Visualizer</h1>
                <h3>Jake Waclawski</h3>
                <a href="https://github.com/jmw3638/Pathfinder">GitHub</a><br />
                <button onClick={() => this.props.changeTab("Pathfinding Visualizer")}>Pathfinding Visualizer</button>
                <button onClick={() => this.props.changeTab("Sorting Visualizer")}>Sorting Visualizer</button>
            </div>
        );
    }
}

export default Home;