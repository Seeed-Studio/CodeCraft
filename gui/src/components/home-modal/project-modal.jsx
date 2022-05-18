import { injectIntl, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';
import styles from './modal.css';
import ProjectList from './project-list.jsx'
import { connect } from 'react-redux';

const ProjectModal = (props) => {

    const label = (
        <FormattedMessage
            defaultMessage="Projects"
            description=""
            id="gui.library.projectSample"
        />
    );

    return (
        <Modal
            id={'projectModal'}
            title={label}
            visiableTitle={true}
            showClose={true}
            className={styles.modalContent}
            onRequestClose={props.onCancel}
        >
            <Box className={styles.body}>
                {
                    props.isOnLine ? <ProjectList
                        onRequestClose={props.onCancel}
                    ></ProjectList> :
                        <div style={{ textAlign: 'center', width: '100%' }}>
                            <img src={require('./image/offline.png')} style={{ width: '190px', height: '185px', margin: '100px auto 30px' }} />
                            <div style={{ marginBottom: '100px' }}>
                                <FormattedMessage
                                    defaultMessage="No visible content, please connect to the Internet."
                                    description=""
                                    id="gui.library.connectNet"
                                />
                            </div>
                        </div>
                }
            </Box>
        </Modal>
    );
}

ProjectModal.propTypes = {
    onCancel: PropTypes.func,
};

const mapStateToProps = state => ({
    isOnLine: state.scratchGui.netStatus.isOnLine
});

export default injectIntl(connect(
    mapStateToProps,
)(ProjectModal));
