import classNames from 'classnames';
import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import Prompt from '../prompt-special/prompt.jsx';
import LibraryItem from './extension-item.jsx';
import Modal from '../../containers/modal.jsx';
import Box from '../box/box.jsx';
import Divider from '../divider/divider.jsx';
import Filter from '../filter/filter.jsx';
import TagButton from '../../containers/tag-button.jsx';
import analytics from '../../lib/analytics';
import { toasts } from '../toast-special/toast.jsx'
import styles from './library.css';


const messages = defineMessages({
    filterPlaceholder: {
        id: 'gui.library.filterPlaceholder',
        defaultMessage: 'Search',
        description: 'Placeholder text for library search field'
    },
    allTag: {
        id: 'gui.library.allTag',
        defaultMessage: 'All',
        description: 'Label for library tag to revert to all items after filtering by tag.'
    },
    operateFail: {
        defaultMessage: 'Failed',
        description: '',
        id: 'gui.connectModal.operateFail'
    }
});

const ALL_TAG = { tag: 'all', intlLabel: messages.allTag };
const tagListPrefix = [ALL_TAG];

class LibraryComponent extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'handleBlur',
            'handleClose',
            'handleFilterChange',
            'handleFilterClear',
            'handleFocus',
            'handleMouseEnter',
            'handleMouseLeave',
            'handleSelect',
            'setFilteredDataRef',
            'handleDeleteExtension',
            'handlePromptOk',
            'handlePromptCanel'
        ]);
        this.state = {
            filterQuery: '',
            selectedTag: ALL_TAG.tag,
            isOpenDelConfirm: false
        };
        this.pageNum = 0;
        this.pageSize = 20;
    }
 
    componentDidUpdate(prevProps, prevState) {
        if (prevState.filterQuery !== this.state.filterQuery ||
            prevState.selectedTag !== this.state.selectedTag) {
            this.scrollToTop();
        }
    }
 
    handleBlur(id) {
        this.handleMouseLeave(id);
    }
    handleFocus(id) {
        this.handleMouseEnter(id);
    }
    handleSelect(id) {
        this.handleClose();
        this.props.onItemSelected(this.getFilteredData()[id]);
    }

    isCurrExtensionUsed(extensionId) {
        //当前为设备角色
        let target = this.props.vm.runtime._editingTarget;
        if( target.getType() == 'device'){
            return this.isCurrExtensionUsedWithInTarget(target, extensionId);
        }
        //当前为非设备角色
        let targets = this.props.vm.runtime.targets || [];
        if (targets.length > 0) {
            targets = targets.filter(t => t.getType() == 'sprite')
        }
        for (let index = 0; index < targets.length; index++) {
            let target = targets[index];
            if (this.isCurrExtensionUsedWithInTarget(target, extensionId)) {
                return true;
            }
        }
        return false;
    }

    isCurrExtensionUsedWithInTarget(target, extensionId) {
        console.log("target : ", target)
        if (target.blocks &&
            target.blocks._blocks) {
            let defBlocks = Object.values(target.blocks._blocks) || [];
            for (let index = 0; index < defBlocks.length; index++) {
                let item = defBlocks[index];
                if (item.opcode.indexOf(extensionId) != -1) {
                    return true;
                }
            }
        }
        return false;
    }


    handleDeleteExtension(id) {
        const extensionId = this.getFilteredData()[id].extensionId;
        const isCurrExtensionUsed = this.isCurrExtensionUsed(extensionId);
        const message = (
            <Box className={styles.toastStyle}>
                <span>
                    <FormattedMessage
                        defaultMessage="The extension is being used and cannot be removed for the time being."
                        description=""
                        id="gui.extensionLibrary.inUsedPromptMessage"
                    />
                </span>
            </Box>
        )
        if (!isCurrExtensionUsed) {
            this.setState({
                extensionId,
                isOpenDelConfirm: true
            });
        } else {
            toasts.showCustom(message);
        }
    }

    handlePromptOk() {
        let extensionId = this.state.extensionId + "";
        this.setState({
            extensionId: null,
            isOpenDelConfirm: false
        }, () => {
            this.handleClose();
            this.props.onDeleteExtension(extensionId);
        });
    }

    handlePromptCanel() {
        this.setState({
            extensionId: null,
            isOpenDelConfirm: false
        });
    }
    handleClose() {
        this.props.onRequestClose();
        analytics.pageview(`/${this.props.id}/search?q=${this.state.filterQuery}`);
    }

    handleMouseEnter(id) {
        if (this.props.onItemMouseEnter) this.props.onItemMouseEnter(this.getFilteredData()[id]);
    }
    handleMouseLeave(id) {
        if (this.props.onItemMouseLeave) this.props.onItemMouseLeave(this.getFilteredData()[id]);
    }
    handleFilterChange(event) {
        this.setState({
            filterQuery: event.target.value,
            selectedTag: ALL_TAG.tag
        });
    }
    handleFilterClear() {
        this.setState({ filterQuery: '' });
    }
    getFilteredData() {
        if (this.state.selectedTag === 'all') {
            if (!this.state.filterQuery) return this.props.data;
            return this.props.data.filter(dataItem => (
                (dataItem.tags || [])
                    // Second argument to map sets `this`
                    .map(String.prototype.toLowerCase.call, String.prototype.toLowerCase)
                    .concat(dataItem.name.toLowerCase())
                    .join('\n') // unlikely to partially match newlines
                    .indexOf(this.state.filterQuery.toLowerCase()) !== -1
            ));
        }
        return this.props.data.filter(dataItem => (
            dataItem.tags &&
            dataItem.tags
                .map(String.prototype.toLowerCase.call, String.prototype.toLowerCase)
                .indexOf(this.state.selectedTag) !== -1
        ));
    }
    scrollToTop() {
        this.filteredDataRef.scrollTop = 0;
    }
    setFilteredDataRef(ref) {
        this.filteredDataRef = ref;
    }

    render() {

        let messages = defineMessages({
            promptTextMessage: {
                defaultMessage: 'Are you sure you want to delete it? After deleting, you will not be able to use the building blocks of the extension.',
                description: '',
                id: 'gui.extensionLibrary.delPromptMessage'
            }
        });

        const promptTitle = (
            <FormattedMessage
                defaultMessage="Promt"
                description=""
                id="gui.extensionLibrary.delPromptLabel"
            />
        );
        // const promptTextMessage = (
        //     <FormattedMessage
        //         defaultMessage="删除后将不可使用该扩展的积木，是否确定要删除？"
        //         description=""
        //         id="gui.extensionLibrary.delPromptMessage"
        //     />
        // );
        const promptCancelText = (
            <FormattedMessage
                defaultMessage="Cancel"
                description=""
                id="gui.extensionLibrary.delCancel"
            />
        );

        const promptOkText = (
            <FormattedMessage
                defaultMessage="Ok"
                description=""
                id="gui.extensionLibrary.delOk"
            />
        );

        return (!this.props.isRemindSave &&
            <Modal
                className={classNames(styles.libraryWrapper, styles.extensionLibrarySize)}
                contentLabel={this.props.title}
                id={this.props.id}
                showClose={true}
                cancelable={true}
                onRequestClose={this.handleClose}>

                <Box className={styles.libraryHeaer}>
                    {this.props.title}
                </Box>

                <div
                    className={classNames(
                        styles.libraryScrollGrid,
                        {
                            [styles.withFilterBar]: this.props.filterable || this.props.tags
                        },
                        styles.extensionsHeight
                    )}
                    ref={this.setFilteredDataRef}
                >
                    {this.getFilteredData().map((dataItem, index) => {
                        const scratchURL = dataItem.md5 ?
                            `https://cdn.assets.scratch.mit.edu/internalapi/asset/${dataItem.md5}/get/` :
                            dataItem.rawURL;
                        return (
                            <LibraryItem
                                bluetoothRequired={dataItem.bluetoothRequired}
                                collaborator={dataItem.collaborator}
                                description={dataItem.description}
                                disabled={dataItem.disabled}
                                extensionId={dataItem.extensionId}
                                featured={dataItem.featured}
                                selected={dataItem.selected}
                                iconURL={scratchURL}
                                id={index}
                                insetIconURL={dataItem.insetIconURL}
                                internetConnectionRequired={dataItem.internetConnectionRequired}
                                key={`item_${index}`}
                                name={dataItem.name}
                                onBlur={this.handleBlur}
                                onFocus={this.handleFocus}
                                onMouseEnter={this.handleMouseEnter}
                                onMouseLeave={this.handleMouseLeave}
                                onSelect={this.handleSelect}
                                onDeleteExtension={this.handleDeleteExtension}
                            />
                        );
                    })}
                    {[1, 2, 3, 4].map((item, index) => {
                        return <div key={index} className={styles.fullPositionExtension}></div>
                    })}
                </div>
                {
                    this.state.isOpenDelConfirm &&
                    <Prompt
                        id={"delExtension"}
                        showClose={true}
                        isDefaultLeft={true}
                        contentLabel={"Extension deletion confirmation"}
                        label={promptTitle}
                        message={this.props.intl.formatMessage(messages.promptTextMessage)}
                        cancelLabel={promptCancelText}
                        okLabel={promptOkText}
                        onOk={this.handlePromptOk}
                        onCancel={this.handlePromptCanel}
                    />
                }
            </Modal>
        );
    }
}

LibraryComponent.propTypes = {
    data: PropTypes.arrayOf(
        /* eslint-disable react/no-unused-prop-types, lines-around-comment */
        // An item in the library
        PropTypes.shape({
            // @todo remove md5/rawURL prop from library, refactor to use storage
            md5: PropTypes.string,
            name: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.node
            ]).isRequired,
            rawURL: PropTypes.string
        })
        /* eslint-enable react/no-unused-prop-types, lines-around-comment */
    ),
    filterable: PropTypes.bool,
    id: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
    onItemMouseEnter: PropTypes.func,
    onItemMouseLeave: PropTypes.func,
    onItemSelected: PropTypes.func,
    onRequestClose: PropTypes.func,
    tags: PropTypes.arrayOf(PropTypes.shape(TagButton.propTypes)),
    title: PropTypes.string.isRequired
};

LibraryComponent.defaultProps = {
    filterable: true
};

export default injectIntl(LibraryComponent);
