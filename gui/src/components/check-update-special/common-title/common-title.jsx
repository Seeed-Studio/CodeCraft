import React from 'react';

const CommonTitle = ({ title }) => {
  return <div style={{ fontSize: '12px', color: '#717582', textAlign: 'left', marginLeft: '-10px', lineHeight: '40px' }}>
    <img src={require('./smalllogo.png')} alt="" style={{ width: '20px', height: '14px', verticalAlign: 'sub', marginRight: '5px' }} />
    <span>Codecraft-{title}</span>
  </div>
}

export default CommonTitle