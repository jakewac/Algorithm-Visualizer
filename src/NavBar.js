import React from 'react';
import classnames from 'classnames';

import './NavBar.css';

import { Card, CardHeader, CardBody, NavItem, NavLink, Nav, TabContent, TabPane
} from 'reactstrap'
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: "sort"
        };
    }

    render () {
        return (
            <div>
                <Card className="nav-bar">
                    <CardHeader>
                        <Nav tabs>
                            <NavItem>
                                <NavLink className={classnames({active: this.state.activeTab === "home"})}
                                onClick={() => this.setState({activeTab: "home"})}
                                >Home
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={classnames({active: this.state.activeTab === "pathfind"})}
                                onClick={() => this.setState({activeTab: "pathfind"})}
                                >Pathfinding Visualizer
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={classnames({active: this.state.activeTab === "sort"})}
                                onClick={() => this.setState({activeTab: "sort"})}
                                >Sorting Visualizer
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </CardHeader>
                    <CardBody>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="home">
                                Jake Waclawski<br></br>
                                <a href="https://github.com/jmw3638/Pathfinder">GitHub</a>
                            </TabPane>
                            <TabPane tabId="pathfind">
                                <PathfindingVisualizer />
                            </TabPane>
                            <TabPane tabId="sort">
                                <SortingVisualizer />
                            </TabPane>
                        </TabContent>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default NavBar;