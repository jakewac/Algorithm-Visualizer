import React from 'react';
import { Card, CardHeader, CardBody, NavItem, NavLink, Nav, TabContent, TabPane
} from 'reactstrap'
import classnames from 'classnames';

import Home from './Home';
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';

// Default tab to display on page load
const DEFAULT_TAB = "home";

/**
 * Represents the navigation bar at the top of the page. Each tab
 * contains one component of the project.
 * 
 * @author Jake Waclawski
 */
class NavBar extends React.Component {
    constructor (props) {
        super(props);
        // Current active tab
        this.state = { activeTab: DEFAULT_TAB };
    }

    /**
     * Renders the navigation bar.
     * 
     * @returns a <div> element representing the navigation bar
     */
    render () {
        return (
            <div className="nav-bar">
                <Card>
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
                                <Home />
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