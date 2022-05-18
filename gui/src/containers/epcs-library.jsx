import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {injectIntl, intlShape, defineMessages} from 'react-intl';

import analytics from '../lib/analytics';
import LibraryComponent from '../components/library-epc/library.jsx';

import {connect} from 'react-redux';

import {
    closeEpcsLibrary
} from '../reducers/modals';

import {
    activateDeck
} from '../reducers/cards';

const messages = defineMessages({
    epcsLibraryTitle: {
        defaultMessage: 'My projects',
        description: '',
        id: 'gui.epcs.label'
    }
});

class TipsLibrary extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleItemSelect'
        ]);
    }
    handleItemSelect (item) {
        this.props.onActivateDeck(item.id);
        analytics.event({
            category: 'library',
            action: 'Select How-to',
            label: item.id
        });
    }
    render () {
        const decksLibraryThumbnailData = [];
        // if (!this.props.visible) return null;
        return (
            <LibraryComponent
                id="epcsLibrary"
                data={decksLibraryThumbnailData}
                title={this.props.intl.formatMessage(messages.epcsLibraryTitle)}
                onItemSelected={this.handleItemSelect}
                onRequestClose={this.props.onRequestClose}
                vm={this.props.vm}
                onOpenSelectedProject={this.props.onOpenSelectedProject}
                onOpenLocalSelectedProject={this.props.onOpenLocalSelectedProject}
                onClearLocalProjectItem={this.props.onClearLocalProjectItem}
            />
        );
    }
}

TipsLibrary.propTypes = {
    intl: intlShape.isRequired,
    onActivateDeck: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func,
    visible: PropTypes.bool
};

const mapStateToProps = state => ({
    visible: state.scratchGui.modals.epcsLibrary,
    vm: state.scratchGui.vm
});

const mapDispatchToProps = dispatch => ({
    onActivateDeck: id => dispatch(activateDeck(id)),
    onRequestClose: () => dispatch(closeEpcsLibrary())
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(TipsLibrary));
