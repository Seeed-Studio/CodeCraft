import React from 'react';
import bindAll from 'lodash.bindall';
import {connect} from 'react-redux';

import {intlShape, injectIntl} from 'react-intl';
import {
    defaultProjectTitleMessages
} from '../reducers/project-title';

/* Higher Order Component to get and set the project title
 * @param {React.Component} WrappedComponent component to receive project title related props
 * @returns {React.Component} component with project loading behavior
 */
const TitledHOC = function (WrappedComponent) {
    class TitledComponent extends React.Component {
        constructor (props) {
            super(props);
            bindAll(this, [
                'handleUpdateProjectTitle'
            ]);
            this.state = {
                projectTitle: this.props.intl.formatMessage(defaultProjectTitleMessages.defaultProjectTitle)
            };
        }

        componentDidMount(){
            const projectTitle = this.props.projectTitle;
            if(!!projectTitle 
                && projectTitle !==''){
                this.setState({projectTitle: projectTitle});
            }
        }

        handleUpdateProjectTitle (newTitle) {
            this.setState({projectTitle: newTitle});
        }
        render () {
            const {
                /* eslint-disable no-unused-vars */
                intl,
                projectTitle,
                /* eslint-enable no-unused-vars */
                ...componentProps
            } = this.props;
            return (
                <WrappedComponent
                    projectTitle={this.state.projectTitle}
                    onUpdateProjectTitle={this.handleUpdateProjectTitle}
                    {...componentProps}
                />
            );
        }
    }

    TitledComponent.propTypes = {
        intl: intlShape.isRequired
    };
    const mapStateToProps = state => ({
        projectTitle: state.scratchGui.projectTitle
    });
    const mapDispatchToProps = () => ({});
    return injectIntl(connect(
        mapStateToProps,
        mapDispatchToProps
    )(TitledComponent));
};

export {
    TitledHOC as default
};
