import { injectIntl, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';
import styles from './modal.css';
import HardwareProductsList from './hardwareProducts-list.jsx'
import { connect } from 'react-redux';

const HardwareProductsModal = (props) => {

    const label = (
        <FormattedMessage
            defaultMessage="Supported hardware"
            description=""
            id="gui.library.hardwareProducts"
        />
    );

    return (
        <Modal
            id={'hardwareProductsModal'}
            title={label}
            visiableTitle={true}
            showClose={true}
            className={styles.modalContent}
            onRequestClose={props.onCancel}
        >
            <Box className={styles.body}>
                {
                    props.isOnLine ? <HardwareProductsList
                        onRequestClose={props.onCancel}
                    ></HardwareProductsList> :
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

HardwareProductsModal.propTypes = {
    onCancel: PropTypes.func,
};

const mapStateToProps = state => ({
    isOnLine: state.scratchGui.netStatus.isOnLine
});

export default injectIntl(connect(
    mapStateToProps,
)(HardwareProductsModal));
