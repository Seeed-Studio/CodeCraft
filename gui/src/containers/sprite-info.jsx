import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';

import SpriteInfoComponent from '../components/sprite-info-special/sprite-info.jsx';

class SpriteInfo extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClickVisible',
            'handleClickNotVisible',
            'handlePressVisible',
            'handlePressNotVisible'
        ]);
    }
    handleClickVisible (e) {
        e.preventDefault();
        this.props.onChangeVisibility(true);
    }
    handleClickNotVisible (e) {
        e.preventDefault();
        this.props.onChangeVisibility(false);
    }
    handlePressVisible (e) {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            this.props.onChangeVisibility(true);
        }
    }
    handlePressNotVisible (e) {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            this.props.onChangeVisibility(false);
        }
    }
    render () {
        return (
            <SpriteInfoComponent
                {...this.props}
                onClickNotVisible={this.handleClickNotVisible}
                onClickVisible={this.handleClickVisible}
                onPressNotVisible={this.handlePressNotVisible}
                onPressVisible={this.handlePressVisible}
            />
        );
    }
}

SpriteInfo.propTypes = {
    ...SpriteInfoComponent.propTypes,
    onChangeDirection: PropTypes.func,
    onChangeName: PropTypes.func,
    onChangeSize: PropTypes.func,
    onChangeVisibility: PropTypes.func,
    onChangeX: PropTypes.func,
    onChangeY: PropTypes.func,
    x: PropTypes.number,
    y: PropTypes.number
};

export default SpriteInfo;
