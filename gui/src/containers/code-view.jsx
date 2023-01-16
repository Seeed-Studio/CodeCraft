import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { producePythonCode } from '../lib/microbit-util.js';
import codeEditor from '../lib/code-editor/code-editor.js';
import mouse from '../lib/mouse.js';
import names from '../lib/libraries/devices/control-names';

import CodeViewComponent from '../components/code-view/code-view.jsx';
import { setVisible } from '../reducers/code-view';


const TOOLBOX_R_GAP = 136;

/**
 * 获取microbit积木代码
 * Get microbit block code
 */
const getmicrobitCode = (code) => {
    return producePythonCode(code);
}

/**
 * 获取当前日期
 * Get current date
 * @param {*} inputTime 
 */
const currentDate = () => {
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '' + m + '' + d + '' + h + '' + minute + '' + second;
};

class CodeView extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'setMonacoContainer',
            '_codeEditorInit',
            'setContainer',
            // 'onMouseDown',
            // 'onMouseUp',
            'onClose',
            'resetStyle',
            'handleExportWorkspaceCode'
        ]);
        this.monacoContainer = null;
        this.container = null;
        this.lastX = 0;
    }

    setContainer(e) {
        this.container = e;
    }

    setMonacoContainer(e) {
        this.monacoContainer = e;
        this._codeEditorInit();
    }

    _codeEditorInit() {
        codeEditor.init(this.monacoContainer);
    }

    // onMouseDown(e) {
    //     mouse.setEvent(e);
    //     mouse.start();
    //     this.lastX = mouse.getDisplacementX();

    //     let supWidth = parseInt(window.getComputedStyle(this.container).width);
    //     let workspaceWidth = parseInt(window.getComputedStyle(document.getElementById("workspace")).width);

    //     document.onmousemove = (e) => {
    //         mouse.setEvent(e);
    //         let displacementX = mouse.getDisplacementX();
    //         let offsetX = this.lastX - displacementX;
    //         let containerWidth = supWidth + offsetX;
    //         if (containerWidth > (workspaceWidth - TOOLBOX_R_GAP)) {
    //             containerWidth = workspaceWidth - TOOLBOX_R_GAP;
    //         }
    //         this.container.style.width = `${containerWidth}px`;
    //     };

    //     document.onmouseup = () => {
    //         mouse.stop();
    //         document.onmousemove = null;
    //         this.lastX = mouse.getDisplacementX();
    //     }
    // }

    // onMouseUp(e) {
    //     mouse.stop();
    //     document.onmousemove = null;
    // }

    onClose() {
        this.props.setVisible(false);
    }

    resetStyle() {
        this.container.removeAttribute('style');
    }

    componentDidUpdate(prevProps) {
        if (this.props.visible !== prevProps.visible) {
            this.resetStyle();
        }
    }

    async handleExportWorkspaceCode() {
        let {
            editingTarget
        } = this.props;
        let code = codeEditor.getValue();
        let targetDeviceId = editingTarget ? editingTarget.getDeviceId() : 1000;
        if (targetDeviceId == 1004) {
            code = await getmicrobitCode(code);
        }
        let downloadLink = document.createElement('a');
        document.body.appendChild(downloadLink);
        let url = window.URL.createObjectURL(new Blob([code], { type: "application/octet-stream" }));
        let filename = `codecraft_user_${currentDate()}.py`
        downloadLink.href = url;
        downloadLink.download = filename;
        downloadLink.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(downloadLink);
    }

    render() {

        let {
            editingTarget
        } = this.props;
        let targetDeviceId = editingTarget ? editingTarget.getDeviceId() : 1000;
        if (targetDeviceId == -1) {
            targetDeviceId = 1000;
        }
        let codeLanguage = names[targetDeviceId].codelanguage;
        return (
            <CodeViewComponent
                {...this.props}
                // onMouseDown={this.onMouseDown}
                // onMouseUp={this.onMouseUp}
                setContainer={this.setContainer}
                setMonacoContainer={this.setMonacoContainer}
                onClose={this.onClose}
                codeLanguage={codeLanguage}
                onExportWorkspaceCode={this.handleExportWorkspaceCode}
            />
        );

    }
}

const mapStateToProps = state => ({
    visible: state.scratchGui.codeView.visible,
    editingTarget: state.scratchGui.vm.editingTarget,
    activeMainTabIndex: state.scratchGui.mainTab.activeMainTabIndex,
});
const mapDispatchToProps = dispatch => ({
    setVisible: v => dispatch(setVisible(v)),
});




export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CodeView);