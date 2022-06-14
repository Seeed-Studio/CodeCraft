import React from 'react';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import { connect } from 'react-redux';
import { changeOnlineStatus } from '../reducers/net-status';

const NetStatusHOC = function (WrappedComponent) {
  class NetStatusListener extends React.Component {
    constructor(props) {
      super(props);
      bindAll(this, [

      ]);
    }

    componentDidMount() {
      const { onChangeOnlineStatus } = this.props;
      if (navigator.onLine) {
        onChangeOnlineStatus(true);
      } else {
        onChangeOnlineStatus(false);
      }

      // 在页面加载时不能做判断，只有在变化时才能判断
      window.addEventListener('online', function () {
        onChangeOnlineStatus(true);
      });
      window.addEventListener('offline', function () {
        onChangeOnlineStatus(false);
      });
    }

    render() {
      const { isOnline, onChangeOnlineStatus, ...props } = this.props;
      return (
        <WrappedComponent
          {...props}
        />
      );
    }

  }

  const mapStateToProps = state => ({
    isOnline: state.scratchGui.netStatus.isOnLine
  });
  const mapDispatchToProps = dispatch => ({
    onChangeOnlineStatus: isOnline => {
      dispatch(changeOnlineStatus(isOnline));
    }
  });
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(NetStatusListener);
}

export {
  NetStatusHOC as default
};