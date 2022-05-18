/**
 * Created by j_bleach on 2018/8/1.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";

// const audioCtx = new (window.AudioContext || window.webkitAudioContext)(); // 音频上下文

class AudioCanvas extends Component {

    constructor(props) {
        super(props);

        // this.audioCtx = new (window.AudioContext || window.webkitAudioContext)(); // 音频上下文
        // this.analyser = this.audioCtx.createAnalyser();

        this.audioCtx = null; // 音频上下文
        this.analyser = null;

        this.canvasID = props.id; // react ref
        this.canvasCtx = null; // canvas 上下文
        this.animationId = null;
    }

    componentDidMount() {
        this.initCanvas();
    }

    /**
         * @author j_bleach 2018/8/18
         * @describe canvas 配置
         */
    configCanvas() {
        const { height, width, backgroundColor, strokeColor } = this.props;

        const canvas = document.getElementById(this.canvasID);
        this.canvasCtx = canvas.getContext('2d');

        this.canvasCtx.clearRect(0, 0, width, height);
        this.canvasCtx.fillStyle = backgroundColor;
        this.canvasCtx.fillRect(0, 0, width, height);
        this.canvasCtx.lineWidth = 2;
        this.canvasCtx.strokeStyle = strokeColor;
        this.canvasCtx.beginPath();
    }

    /**
     * @author j_bleach 2018/8/18
     * @describe 画布初始化,停止动画
     */
    initCanvas() {
        window.cancelAnimationFrame(this.animationId);
        const { height, width } = this.props;
        this.configCanvas();
        this.canvasCtx.moveTo(0, height / 2);
        this.canvasCtx.lineTo(width, height / 2);
        this.canvasCtx.stroke();
    }

    startAudioAnalyser(stream) {
        if(stream){
            this.initAudioAnalyser(stream);
            this.renderCurve();
        }
    }

    stopAudioAnalyser() {
        if(this.audioCtx){
            this.audioCtx.close();
        }
        window.cancelAnimationFrame(this.animationId);
    }

    initAudioAnalyser(stream) {
        //需要重新初始化上下文
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)(); // 音频上下文
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.fftSize = 1024;
        const source = this.audioCtx.createMediaStreamSource(stream);
        source.connect(this.analyser);
        // this.analyser.connect(this.audioCtx.destination);
    }

    /**
     * @author j_bleach 2018/8/18
     * @describe 动态绘制音频曲线
     */
    renderCurve() {
        const { height, width } = this.props;
        this.animationId = window.requestAnimationFrame(this.renderCurve.bind(this)); // 定时动画
        const bufferLength = this.analyser.fftSize; // 默认为2048
        // const bufferLength = this.analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        this.analyser.getByteTimeDomainData(dataArray);// 将音频信息存储在长度为2048（默认）的类型数组（dataArray）
        this.configCanvas();
        const sliceWidth = Number(width) / bufferLength;
        let x = 0;
        this.canvasCtx.moveTo(x, height / 2);
        // console.log('dataArray',dataArray)
        for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0;
            const y = v * height / 2;
            this.canvasCtx["lineTo"](x, y);
            x += sliceWidth;
        }
        this.canvasCtx.lineTo(width, height / 2);
        this.canvasCtx.stroke();
    }

    /**
     * @author j_bleach 2018/8/18
     * @describe 初始化渲染canvas节点
     */
    renderCanvas() {
        const { height, width } = this.props;
        return <canvas id={this.canvasID} height={height} width={width}
            style={{ width: width, height: height ,borderRadius: 5}} />
    }

    render() {
        const {
            className
        } = this.props;
        return (
            <div className={className}>
                {this.renderCanvas()}
            </div>
        );
    }
}

AudioCanvas.defaultProps = {
    backgroundColor: "rgba(0, 0, 0, 1)",
    strokeColor: "#ffffff",
    width: 200,
    height: 50
};
AudioCanvas.propTypes = {
    backgroundColor: PropTypes.string,
    strokeColor: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
};

export default AudioCanvas;

