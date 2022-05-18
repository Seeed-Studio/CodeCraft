import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {injectIntl, intlShape, defineMessages} from 'react-intl';
import VM from '../../../vm/';

import analytics from '../lib/analytics';
import spriteLibraryContent from '../lib/libraries/sprites.json';
import spriteTags from '../lib/libraries/sprite-tags';

import LibraryComponent from '../components/library-special/library.jsx';

const messages = defineMessages({
    libraryTitle: {
        defaultMessage: 'Choose a Sprite',
        description: 'Heading for the sprite library',
        id: 'gui.spriteLibrary.chooseASprite'
    }
});

class SpriteLibrary extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleItemSelect',
            'handleMouseEnter',
            'handleMouseLeave',
            'rotateCostume',
            'startRotatingCostumes',
            'stopRotatingCostumes',
            'handLibraryTalSelect'
        ]);
        this.state = {
            activeSprite: null,
            costumeIndex: 0,
            sprites: spriteLibraryContent
        };
    }
    componentWillUnmount () {
        clearInterval(this.intervalId);
    }
    handLibraryTalSelect(tabInfo){
        console.log("tabInfo : " + JSON.stringify(tabInfo));
    }
    handleItemSelect (item) {
        this.props.vm.addSprite(JSON.stringify(item.json))
        .then(()=>{
            const editingTarget = this.props.vm.editingTarget;
            this.props.vm.setEditingTargetForStage(editingTarget.id);
        });
        analytics.event({
            category: 'library',
            action: 'Select Sprite',
            label: item.name
        });
    }
    handleMouseEnter (item) {
        this.stopRotatingCostumes();
        this.setState({activeSprite: item}, this.startRotatingCostumes);
    }
    handleMouseLeave () {
        this.stopRotatingCostumes();
    }
    startRotatingCostumes () {
        if (!this.state.activeSprite) return;
        this.rotateCostume();
        this.intervalId = setInterval(this.rotateCostume, 300);
    }
    stopRotatingCostumes () {
        this.intervalId = clearInterval(this.intervalId);
    }
    rotateCostume () {
        const costumes = this.state.activeSprite.json.costumes;
        const nextCostumeIndex = (this.state.costumeIndex + 1) % costumes.length;
        this.setState({
            costumeIndex: nextCostumeIndex,
            sprites: this.state.sprites.map(sprite => {
                if (sprite.name === this.state.activeSprite.name) {
                    return {
                        ...sprite,
                        md5: sprite.json.costumes[nextCostumeIndex].baseLayerMD5
                    };
                }
                return sprite;
            })
        });
    }
    render () {

        const {
            spriteFileInput,
            onSpriteUpload,
            onFileUploadClick,
        } = this.props;

        return (
            <LibraryComponent
                data={this.state.sprites}
                id="spriteLibrary"
                tags={spriteTags}
                title={this.props.intl.formatMessage(messages.libraryTitle)}
                libraryType="sprite"
                onItemMouseEnter={this.handleMouseEnter}
                onItemMouseLeave={this.handleMouseLeave}
                onItemSelected={this.handleItemSelect}
                onRequestClose={this.props.onRequestClose}
                onLibraryTabSelect={this.handLibraryTalSelect}
                fileAccept=".svg, .png, .jpg, .jpeg, .SVG, .PNG, .JPG, .JPEG"
                fileInput={spriteFileInput}
                onUpload={onSpriteUpload}
                onFileUploadClick={onFileUploadClick}
                vm={this.props.vm}
            />
        );
    }
}

SpriteLibrary.propTypes = {
    intl: intlShape.isRequired,
    spriteFileInput: PropTypes.func,
    onSpriteUpload: PropTypes.func,
    onFileUploadClick: PropTypes.func,
    onRequestClose: PropTypes.func,
    vm: PropTypes.instanceOf(VM).isRequired
};

export default injectIntl(SpriteLibrary);
