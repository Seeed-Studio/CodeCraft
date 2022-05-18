import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl, intlShape, defineMessages } from 'react-intl';
import ZwbCourseComponent from '../components/zwb-project/zwb-project.jsx';
import { connect } from 'react-redux';

class ZwbProjectSidePane extends React.PureComponent {
    constructor(props) {
        super(props);
        
    }

    render() {
        const homeTipsLibrary = (
            <ZwbCourseComponent
                
            />
        )
        return homeTipsLibrary;
    }
    
}

ZwbProjectSidePane.propTypes = {
    
};

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({
    
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(ZwbProjectSidePane));
