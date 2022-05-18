import React, {Component, PropTypes} from 'react';
 
export default class Progress extends Component {
  constructor(props) {
    super(props)
  }
 
  render() {
    let percentageNum = (this.props.percentageNum*100);
    //这个支持css样式响应式的
    let leftPercentage = (1-this.props.percentageNum)*(-100);
    let content = {
      display:"flex",
      fontSize:"0.72rem",
    }
    let progress = {
      //不支持样式响应式,可以写死
      // width:"450px"
      //这个支持css样式响应式的
        width:"70%",
        height:"1rem",
        background:"#dedede",
        position: "relative",
        margin:"auto 1rem",
        overflow: "hidden",
      };
    let progressDiv = {
        width:"100%",
        height:"1rem",
        background:"#027EF0",
        position: "absolute",
      //这个支持css样式响应式的
        left:`${leftPercentage}%`,
      };
    let progressItem ={
        position: "absolute",
        width:"auto",
        height:"1rem",
        right:"1rem",
        lineHeight: "1rem",
        fontSize: "0.72rem",
        color: "#7B7B7B",
      };
    return (
      <div style={content}>
        <div>{this.props.uploading}</div>
        <div style={progress}>
          <div style={progressDiv}></div>
          <div style={progressItem}>{percentageNum.toFixed(2)}%</div>
        </div>
      </div>
    )
  }
}