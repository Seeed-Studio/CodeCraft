import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './toast.less';

export default class ToastComponent extends Component {
  render() {
    return (
      <ToastContainer
        position="top-center"
        autoClose={1400}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
        closeButton={false}
        className={"toastContainer"}
      />
    );
  }
}

const Msg = (props) => (
  <div className={'toastContent'}>
    {props.type === 'success' && <img src={require('./icon_success.png')} alt="" className={'toastImg'} />}
    {props.type === 'error' && <img src={require('./icon_fail.png')} alt="" className={'toastImg'} />}
    {props.type === 'loading' && <img src={require('./double-ring.gif')} alt="" className={'toastImg'} />}
    {props.type === 'warning' && <img src={require('./icon_attention.png')} alt="" className={'toastImg'} />}
    <div className={'toastText'}>{props.text}</div>
  </div>
)

const success = (props) => {
  toast(<Msg text={props} type={'success'} />);
}

const error = (props) => {
  toast(<Msg text={props} type={'error'} />);
}

const loading = (props) => {
  toast(<Msg text={props} type={'loading'} />);
}

const warning = (props) => {
  toast(<Msg text={props} type={'warning'} />);
}

const showCustom = (content) => {
  toast(content);
}

const showDfToast = (text) => {
  const dfToast = (
    <div className={'dfToastStyle'}>
      <span>{text}</span>
    </div>
  );
  showCustom(dfToast)
}

export const toasts = {
  success,
  error,
  loading,
  warning,
  showCustom,
  showDfToast
}