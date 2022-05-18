import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import VM from '../../../vm/';

import { handleFileUpload, costumeUpload } from '../lib/file-uploader.js';
import analytics from '../lib/analytics';
import { connect } from 'react-redux';

import costumeLibraryContent from '../lib/libraries/costumes.json';
import spriteTags from '../lib/libraries/sprite-tags';
import LibraryComponent from '../components/library-special/library.jsx';

import {
    closeCostumeLibrary
} from '../reducers/modals';

const messages = defineMessages({
    libraryTitle: {
        defaultMessage: 'Choose a Costume',
        description: 'Heading for the costume library',
        id: 'gui.costumeLibrary.chooseACostume'
    }
});


class CostumeLibrary extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleItemSelected',
            'handLibraryTalSelect',
            'handleNewCostume',
            'handleFileUploadClick',
            'handleCostumeUpload',
            'setFileInput'
        ]);
    }
    handLibraryTalSelect(tabInfo){
        console.log("tabInfo : " + JSON.stringify(tabInfo));
    }
    handleItemSelected (item) {
        const split = item.md5.split('.');
        const type = split.length > 1 ? split[1] : null;
        const rotationCenterX = type === 'svg' ? item.info[0] : item.info[0] / 2;
        const rotationCenterY = type === 'svg' ? item.info[1] : item.info[1] / 2;
        const vmCostume = {
            name: item.name,
            rotationCenterX,
            rotationCenterY,
            bitmapResolution: item.info.length > 2 ? item.info[2] : 1,
            skinId: null
        };
        this.props.vm.addCostume(item.md5, vmCostume);
        analytics.event({
            category: 'library',
            action: 'Select Costume',
            label: item.name
        });
    }

    handleFileUploadClick() {
        this.fileInput.value = null;
        this.fileInput.click();
    }
    setFileInput(input) {
        this.fileInput = input;
    }

    handleNewCostume(costume) {
        this.props.vm.addCostume(costume.md5, costume);
    }

    handleCostumeUpload(e) {
        const storage = this.props.vm.runtime.storage;
        handleFileUpload(e.target, (buffer, fileType, fileName) => {
            costumeUpload(buffer, fileType, fileName, storage, this.handleNewCostume);
        });
        this.props.onRequestCloseCostumeLibrary();
    }

    render () {
        return (
            <LibraryComponent
                data={costumeLibraryContent}
                id="costumeLibrary"
                tags={spriteTags}
                title={this.props.intl.formatMessage(messages.libraryTitle)}
                libraryType= "custom"
                onItemSelected={this.handleItemSelected}
                onRequestClose={this.props.onRequestClose}
                onLibraryTabSelect = {this.handLibraryTalSelect}
                fileAccept=".svg, .png, .jpg, .jpeg, .SVG, .PNG, .JPG, JPEG"
                fileInput={this.setFileInput}
                onUpload={this.handleCostumeUpload}
                onFileUploadClick={this.handleFileUploadClick}
                vm={this.props.vm}
            />
        );
    }
}

CostumeLibrary.propTypes = {
    intl: intlShape.isRequired,
    onRequestClose: PropTypes.func,
    costumeFileInput: PropTypes.func,
    onCostumeUpload: PropTypes.func,
    onFileUploadClick: PropTypes.func,
    onRequestCloseCostumeLibrary: PropTypes.func.isRequired,
    vm: PropTypes.instanceOf(VM).isRequired
};


const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    onRequestCloseCostumeLibrary: () => {
        dispatch(closeCostumeLibrary());
    }
});


export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(CostumeLibrary));
