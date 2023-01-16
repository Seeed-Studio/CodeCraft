const EventEmitter = require('events');
// 消息分发器
const dispatcher = new EventEmitter();
// 设置消息分发器事件数据
dispatcher.setMaxListeners(10000);

module.exports = dispatcher;