import React from 'react';
import { Card, CardHeader, CardBody
} from 'reactstrap';

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
                        Jake Waclawski<br></br>
                        <a href="https://github.com/jmw3638/Pathfinder">GitHub</a>
                    </CardHeader>
                    <CardBody>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default Home;