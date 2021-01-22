import React from 'react';

import './NavBar.css';

import Home from '../Home/Home';
import PathfindingVisualizer from '../PathfindingVisualizer/PathfindingVisualizer';
import SortingVisualizer from '../SortingVisualizer/SortingVisualizer';

// Default tab to display on page load
const DEFAULT_TAB = "home-tab";

/**
 * Represents the navigation bar at the top of the page. Each tab
 * contains one component of the project.
 * 
 * @author Jake Waclawski
 */
class NavBar extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
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
            <div className="nav-bar">
                <div className="navbar">
                    <div className="navbar-title"
                    onClick={() => this.changeTab("home-tab")}
                    >Home</div>
                    <div className="navbar-title"
                    onClick={() => this.changeTab("pathfind-tab")}
                    >Pathfinding Visualizer</div>
                    <div className="navbar-title"
                    onClick={() => this.changeTab("sort-tab")}
                    >Sorting Visualizer</div>
                </div>
                <div className="tab-content-holder">
                    <div id="home-tab" className="tab-content">
                        <Home />
                    </div>
                    <div id="pathfind-tab" className="tab-content">
                        <PathfindingVisualizer />
                    </div>
                    <div id="sort-tab" className="tab-content">
                        <SortingVisualizer />
                    </div>
                </div>
            </div>
        );
    }
}

export default NavBar;