import React from 'react';
import bindAll from 'lodash.bindall';

import { connect } from 'react-redux';

import classNames from 'classnames';
import styles from './serial-chart-modal.css';
import iconClose from './image/icon_close.png'
import iconDownload from './image/icon_download.svg'
import ReactEcharts from 'echarts-for-react';
import { CSVLink } from "react-csv";
import { defineMessages, injectIntl } from 'react-intl';

import {
    closeSerialChartModal,
} from '../../reducers/modals';

const localMessages = defineMessages({
    serialChart: {
        defaultMessage: 'Serial Plotter',
        description: '串口图表',
        id: 'gui.serialChart.serialChart'
    },
    download: {
        defaultMessage: 'Download',
        description: '下载',
        id: 'gui.serialChart.download'
    },
});


class SerialChartModal extends React.Component {

    constructor(props) {
        super(props);

        bindAll(this, [
            'handleClose',
            'handleDownload',
            'handlePrintResponse',
            'handleResize',
        ]);

        this.xAxis = [];
        this.list1 = [];
        this.list2 = [];
        this.list3 = [];
        this.list4 = [];
        this.list5 = [];
        this.dataObjList = [];

        this.option = {
            tooltip: { trigger: 'none' },
            grid: {
                top: '10',
                left: '10',
                right: '10',
                bottom: '10',
                height: '175',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                axisLine: { lineStyle: { color: 'rgba(232,239,247,1)' } },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['rgba(232,239,247,1)']
                    }
                },
                axisLabel: {
                    show: false,
                },
                boundaryGap: false,
                data: this.xAxis
            },
            yAxis: {
                type: 'value',
                axisLine: { lineStyle: { color: 'rgba(232,239,247,1)' } },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['rgba(232,239,247,1)']
                    }
                },
                axisLabel: {
                    color: 'rgba(173,180,208,1)',
                    fontWeight: '400',
                    fontSize: 12
                }
            },
            series: [{
                type: 'line',
                lineStyle: {
                    color: 'rgba(255,192,51,1)'
                },
                showSymbol: false,
                data: this.list1
            },
            {
                type: 'line',
                lineStyle: {
                    color: 'rgba(109,207,104,1)'
                },
                showSymbol: false,
                data: this.list2
            },
            {
                type: 'line',
                lineStyle: {
                    color: 'rgba(75,159,240,1)'
                },
                showSymbol: false,
                data: this.list3
            },
            {
                type: 'line',
                lineStyle: {
                    color: 'rgba(197,109,243,1)'
                },
                showSymbol: false,
                data: this.list4
            },
            {
                type: 'line',
                lineStyle: {
                    color: 'rgba(255,118,134,1)'
                },
                showSymbol: false,
                data: this.list5
            }
            ]
        };

        this.state = {
            dataObjList: this.dataObjList,
            downloadDate: null,
            modalWidth: 0
        }

        this.serialChart = props.intl.formatMessage(localMessages.serialChart);
        this.download = props.intl.formatMessage(localMessages.download);
    }

    componentDidMount() {
        this.props.vm.on('print-response',this.handlePrintResponse);
        window.addEventListener('resize',this.handleResize);
        this.resize();
    }

    componentWillUnmount() {
        this.props.vm.removeListener('print-response',this.handlePrintResponse);
        window.removeEventListener('resize',this.handleResize);
    }

    resize(){
        let clientWidth = document.documentElement.clientWidth;
        let deviceAndStageWrapper = document.getElementById('deviceAndStageWrapper');
        let width = clientWidth - deviceAndStageWrapper.clientWidth;
        
        if(width-130>0){
            this.setState({
                modalWidth: width-130,
            })
        }
    }

    handleResize() {
        this.resize();
    }

    addData(data) {
        let length = this.xAxis.length;
        if(length<100){
            this.xAxis.push('测试最大长度测试最');
        }
        
        this.list1.push(data[0]);
        this.list2.push(data[1]);
        this.list3.push(data[2]);
        this.list4.push(data[3]);
        this.list5.push(data[4]);
        this.dataObjList.push(data);

        if (length>=100) {
            this.list1.shift();
            this.list2.shift();
            this.list3.shift();
            this.list4.shift();
            this.list5.shift();
            this.dataObjList.shift();
        }
    }


    dealData(data) {
        this.addData(data);
        if (!this.refs.echarts) {
            return
        }
        let echarts_instance = this.refs.echarts.getEchartsInstance();
        let option = {
            xAxis: {
                data: this.xAxis
            },
            series: [{
                data: this.list1
            },
            {
                data: this.list2
            },
            {
                data: this.list3
            },
            {
                data: this.list4
            },
            {
                data: this.list5
            }
            ]
        };
        if (echarts_instance) {
            this.setState({
                dataObjList: this.dataObjList,
            })
            echarts_instance.setOption(option)
        }
        var div = document.getElementById('scrollView');
        div.scrollTop = div.scrollHeight;
    }

    handlePrintResponse(data) {
        this.dealData(data);
    }

    handleClose() {
        this.props.closeSerialChartModalState();
    }

    handleDownload() {
        this.setState({
            downloadDate: new Date()
        })
    }

    keepTwoPoint(number) {
        if(number==null){
            return 'null'
        }
        if(typeof number !== 'number'){
            return number;
        }
        if(Number.isInteger(number)){
            return number;
        }else {
            return number.toFixed(2);
        }
    }

    getRandom() {
        let number = Math.floor(Math.random()*1000); 
        return this.appendZero(number,3);
    }

    appendZero(number,n) {
        return (Array(n).join(0) + number).slice(-n);
    }

    render() {
        const {
            dataObjList,
            downloadDate,
            modalWidth
        } = this.state;

        let date = downloadDate;
        if(date==null){
            date = new Date();
        }

        let year = date.getFullYear();
        let month = this.appendZero(date.getMonth()+1,2);
        let day = this.appendZero(date.getDate(),2);
        let hour = this.appendZero(date.getHours(),2);
        let minute = this.appendZero(date.getMinutes(),2);
        let second = this.appendZero(date.getSeconds(),2);

        let filename = 'codecraft-' + year+month+day+hour+minute+second +'-' + this.getRandom() +'.csv'

        return (
            <div className={styles.modal} style={{ width: modalWidth+'px' }}>
                <div className={styles.top}>
                    <div className={styles.title}>{this.serialChart}</div>
                    <CSVLink 
                        className={styles.downloadBtn} 
                        data={dataObjList}
                        onClick={this.handleDownload}
                        filename={filename}
                    >
                        <img className={styles.downloadIcon} src={iconDownload}></img>
                        <span className={styles.downloadText}>{this.download}</span>
                    </CSVLink>
                </div>
                <div className={styles.closeBtn} onClick={this.handleClose}>
                    <img className={styles.closeIcon} src={iconClose}></img>
                </div>
                <ReactEcharts
                    className={styles.echarts}
                    style={{ width: modalWidth-62+'px',height: '195px' }}
                    option={this.option}
                    ref='echarts'
                />

                <div id='scrollView' className={styles.dataContainer}>
                    {
                        dataObjList
                            .map((item, i) => (
                            <div 
                                key={i}
                                className={classNames(styles.dataItem, i%2==0 ? styles.even : styles.odd)} >
                                    （{this.keepTwoPoint(item[0])}, {this.keepTwoPoint(item[1])}, {this.keepTwoPoint(item[2])}, {this.keepTwoPoint(item[3])}, {this.keepTwoPoint(item[4])}）
                            </div>
                            ))
                    }
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({
    closeSerialChartModalState: () => {
        dispatch(closeSerialChartModal());
    },
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(SerialChartModal));
