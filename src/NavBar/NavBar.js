import React from 'react';

import './NavBar.css';

import Home from '../Home/Home';
import PathfindingVisualizer from '../PathfindingVisualizer/PathfindingVisualizer';
import SortingVisualizer from '../SortingVisualizer/SortingVisualizer';
import { NavItem } from 'reactstrap';

// Default tab to display on page load
const DEFAULT_TAB = "Home";

/**
 * Represents the navigation bar at the top of the page. Each tab
 * contains one component of the project.
 * 
 * @author Jake Waclawski
 */
class NavBar extends React.Component {
    constructor (props) {
        super(props);
        this.state = { 
            navigateDropdownHidden: true,
            curTab: DEFAULT_TAB,
        };
    }

    /**
     * Changes the currently displayed tab.
     * 
     * @param {string} tab tab to change to
     */
    changeTab (tab) {
        const elements = document.getElementsByClassName("tab-content");
        for (let i = 0; i < elements.length; i++) elements[i].style.display = "none";
        document.getElementById(tab).style.display = "block";
        this.setState({curTab: tab});
    }

    /**
     * Runs on page load. Sets the current active tab.
     */
    componentDidMount () { document.getElementById(DEFAULT_TAB).style.display = "block"; }

    /**
     * Renders the navigation bar.
     * 
     * @returns a <div> element representing the navigation bar
     */
    render () {
        return (
            <div className="project">
                <div className="navbar">
                    <div className="navigate-dropdown dropdown-animate">
                    <div className="navbar-button" 
                    onClick={() => null}
                    onMouseEnter={() => this.setState({navigateDropdownHidden: false})}>
                    <span>{this.state.curTab}</span></div>
                    <div className="navbar-dropdown-content navigate-drop-content dropdown-animate"
                    hidden={this.state.navigateDropdownHidden}
                    onClick={() => this.setState({navigateDropdownHidden: true})}>
                        <div className="navbar-dropdown-content-item"
                        onClick={() => this.changeTab("Home")}
                        ><span>Home</span></div>
                        <div className="navbar-dropdown-content-item"
                        onClick={() => this.changeTab("Pathfinding Visualizer")}
                        ><span>Pathfinding Visualizer</span></div>
                        <div className="navbar-dropdown-content-item"
                        onClick={() => this.changeTab("Sorting Visualizer")}
                        ><span>Sorting Visualizer</span></div>
                        </div>
                    </div>
                </div>
                <div className="tab-content-holder">
                    <div id="Home" className="tab-content">
                        <Home />
                    </div>
                    <div id="Pathfinding Visualizer" className="tab-content">
                        <PathfindingVisualizer />
                    </div>
                    <div id="Sorting Visualizer" className="tab-content">
                        <SortingVisualizer />
                    </div>
                </div>
            </div>
        );
    }
}

export default NavBar;