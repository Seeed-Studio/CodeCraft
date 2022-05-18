import bindAll from 'lodash.bindall';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import ReactTooltip from 'react-tooltip';

import styles from './coming-soon.css';

class ComingSoonContent extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'setHide',
            'setShow',
            'getContent'
        ]);
        this.state = {
            isShowing: false
        };
    }
    setShow() {
        this.setState({ isShowing: true });
    }
    setHide() {
        this.setState({ isShowing: false });
    }
    getContent() {
        return this.props.content;
    }
    render() {
        return (
            <ReactTooltip
                afterHide={this.setHide}
                afterShow={this.setShow}
                className={classNames(
                    styles.comingSoon,
                    this.props.className,
                    {
                        [styles.show]: (this.state.isShowing),
                        [styles.left]: (this.props.place === 'left'),
                        [styles.right]: (this.props.place === 'right'),
                        [styles.top]: (this.props.place === 'top'),
                        [styles.bottom]: (this.props.place === 'bottom')
                    }
                )}
                getContent={this.getContent}
                id={this.props.tooltipId}
            />
        );
    }
}

ComingSoonContent.propTypes = {
    className: PropTypes.string,
    place: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    tooltipId: PropTypes.string.isRequired
};

ComingSoonContent.defaultProps = {
    place: 'bottom'
};

const Tooptip = props => {

    const {
        place,
        tooltipId,
        className,
        delayHide,
        delayShow,
        children,
        tooltipClassName,
        title = ""
    } = props;

    return (<div className={className}>
            <div
                data-delay-hide={delayHide}
                data-delay-show={delayShow}
                data-effect="solid"
                data-for={tooltipId}
                data-place={place}
                data-tip="tooltip"
            >
                {children}
            </div>

            <ComingSoonContent
                className={tooltipClassName}
                place={place}
                tooltipId={tooltipId}
                content = {title}
            />
        </div>);
}
Tooptip.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    delayHide: PropTypes.number,
    delayShow: PropTypes.number,
    place: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    tooltipClassName: PropTypes.string,
    tooltipId: PropTypes.string.isRequired
};

Tooptip.defaultProps = {
    delayHide: 0,
    delayShow: 0
};

export default Tooptip;
