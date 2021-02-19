import React from 'react';

import { Modal, ModalHeader, ModalBody
} from 'reactstrap';

/**
 * Represents the pathfind algorithm info modal.
 * 
 * @author Jake Waclawski
 */
class PAlgorithmInfo extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            modalOpen: false,
            curAlgorithm: null,
        };
    }

    toggle = () => { 
        // if (this.state.curAlgorithm !== null) 
        this.setState({modalOpen: !this.state.modalOpen});
    }

    /**
     * Renders the modal.
     * 
     * @returns a <div> element representing the modal
     */
    render () {

        return (
            <div className="pv-curalg dropdown-animate" onClick={this.toggle}>
                {this.props.children}
                <Modal className="pv-curalg-modal" isOpen={this.state.modalOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        {this.props.children}
                    </ModalHeader>
                    <ModalBody>
                        Info
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default PAlgorithmInfo;