import classNames from 'classnames';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import React from 'react';
import { intlShape, injectIntl } from 'react-intl';

import Input from '../forms/input.jsx';
import searchIcon from './image/icon_search.svg';
import styles from './course-search.css';


class CourseSearch extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSearch',
            'handleChange',
            'handleKeyDown'
        ]);
    }

    componentWillUnmount() {
        document.onkeydown = null;
    }

    handleKeyDown(e) {
        if (e && e.keyCode == 13) {
           this.handleSearch();
        }
    }
    // call onUpdateProjectTitle if it is defined (only defined when gui
    // is used within scratch-www)
    handleSearch () {
        if (this.props.onSearch) {
            this.props.onSearch();
        }
    }

    handleChange (e) {
        if (this.props.onInputTextChange) {
            this.props.onInputTextChange(e.target.value)
        }
    }
    render () {
        return (
            <div className={styles.searchBar}>
                <div className={styles.searchBtn}
                     onClick={this.handleSearch}
                >
                    <img
                        className={styles.searchIcon}
                        draggable={false}
                        src={searchIcon}
                    />
                </div>
                <Input
                    className={classNames(styles.titleField, this.props.className)}
                    placeholder={this.props.placeholder}
                    type="text"
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    value={this.props.value}
                >
                </Input>
            </div>
        );
    }
}

CourseSearch.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    intl: intlShape.isRequired,
    onSearch: PropTypes.func,
};

const mapStateToProps = state => ({
    projectTitle: state.scratchGui.projectTitle
});

const mapDispatchToProps = () => ({});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(CourseSearch));
