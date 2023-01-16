import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import bindAll from 'lodash.bindall';

import Box from '../components/box/box.jsx';
import GraphTrainingModalComponent from '../components/graph-training-modal/graph-training-modal.jsx';

class GraphTrainingModal extends React.Component {

    constructor(props) {
        super(props);
        
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }

    componentWillReceiveProps(nextProps) {
        
    }

    render() {
        
        const {
            ...components
        } = this.props;
        return (
            <GraphTrainingModalComponent
                // loading={fetchingProject || isLoading || loadingStateVisible}
                {...components}
            >
                
            </GraphTrainingModalComponent>
        );
    }
}

GraphTrainingModal.propTypes = {

};

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(GraphTrainingModal);


