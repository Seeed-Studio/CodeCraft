import bindAll from 'lodash.bindall';
import React from 'react';
import Box from '../box/box.jsx';
import styles from './hardwareProducts-item.css';
import iconSpinner from './icon_spinner.gif';
import classNames from 'classnames';
import { FormattedMessage, injectIntl } from 'react-intl';
import Ellipsis from '../ellipsis/index.js';

class HardwareProductsItem extends React.PureComponent {
    constructor(props) {
        super(props);
        bindAll(this, [
            'handleClick',
        ]);
        this.state = {
            
        }
    }

    componentDidMount() {
        
    }

    handleClick(e, hardwareProductClassInfo) {
        e.preventDefault();
        if (!this.props.disabled) {
            this.props.onSelect(hardwareProductClassInfo);
        }
    }

    render() {
        const { hardwareProductClassInfo, id } = this.props;
        let cosUrl = hardwareProductClassInfo.hardwareProductsCoverFile.cosUrl;
        return (
            hardwareProductClassInfo && <Box
                className={classNames(
                    styles.hardwareItem,
                    this.props.className
                )}
                id={`hardwareProductItem_${id}`}
                onClick={cosUrl?
                    (e) => this.handleClick(e, hardwareProductClassInfo):null}
            >
                <Box className={styles.hardwareItemImageContainerWrapper}>
                    {
                        cosUrl ?
                            <Box className={styles.hardwareItemImageContainer}>
                                <img
                                    className={styles.hardwareItemImage}
                                    src={`https://`+cosUrl}
                                />
                            </Box>
                            :
                            <Box
                                className={styles.hardwareItemImageLoadingContainer}>
                                <img
                                    className={styles.hardwareItemImageLoading}
                                    src={iconSpinner}
                                />
                            </Box>
                    }
                </Box>
                <div className={classNames(styles.featuredMargin, styles.hardwareItemName)}>
                    <Ellipsis tooltip lines={2} parentId={`hardwareProductItemName_${id}`}>{hardwareProductClassInfo.hardwareProductsName}</Ellipsis>
                </div>
            </Box>
        );
    }
}

HardwareProductsItem.defaultProps = {
    disabled: false
};

export default injectIntl(HardwareProductsItem);
