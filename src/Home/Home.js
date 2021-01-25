import React from 'react';

import { Card, CardHeader, CardBody, CardFooter
} from 'reactstrap';

import './Home.css';

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
                <Card>
                    <CardHeader>
                        <h1>Algorithm Visualizer</h1>
                        <h4>Jake Waclawski</h4>
                        <a href="https://github.com/jmw3638/Pathfinder">GitHub</a><br />
                    </CardHeader>
                    <CardBody>
                        
                    </CardBody>
                    <CardFooter>
                        <div className="home-visualizer-button"
                        onClick={() => this.props.changeTab("Pathfinding Visualizer")}
                        >Pathfinding Visualizer</div>
                        <div className="home-visualizer-button"
                        onClick={() => this.props.changeTab("Sorting Visualizer")}
                        >Sorting Visualizer</div>
                    </CardFooter>
                </Card>
            </div>
        );
    }
}

export default Home;