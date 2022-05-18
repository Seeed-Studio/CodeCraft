export default Blockly => {
    // 创建事件代码
    Blockly.Elfbot.createEvent = function (eventname, evalstr, handleCode) {
        var className = Blockly.Elfbot.variableDB_.getDistinctName('USER_EVENT_TASK_0', Blockly.Variables.NAME_TYPE);
        var funcName = className.toLowerCase();
        var codeHead = [
            `class ${className}(CHEventTask):`,
            `    def __init__(self, event_dispatcher, eventname, evalstr, max_queue_len = 100):`,
            `        super().__init__(event_dispatcher, eventname, evalstr, max_queue_len)`,
            `        self._is_user_task = True`,
            `    def _event_handler(self):`,
            `        if self._is_stoped:`,
            `            return`,
        ]
        if (handleCode) codeHead = codeHead.concat(handleCode);

        var codeTail = [
            `${funcName} = ${className}(enabler._rawdata_task._event_dispatcher,"${eventname}","${evalstr}")`,
            `registe_event_task(${funcName})`,
        ]

        return {
            head: codeHead.join('\n'),
            tail: codeTail.join('\n')
        }
    }

    // 当精灵启动
    Blockly.Elfbot['event_elfbot_whenstartup'] = function (block) {
        Blockly.Elfbot.definitions_['import_time'] = 'import time';
        Blockly.Elfbot.definitions_['import_random'] = 'import random';
        var randomInitCode = '        time.sleep(0.001)\n        random.seed(time.ticks_us())'
        var code = Blockly.Elfbot.createEvent(`start`, `rawdata_dict['start'] != 0`, randomInitCode);
        block.code = code;
        return ``;
    };

    // 当按下按钮S
    Blockly.Elfbot['event_elfbot_whenkeysispressed'] = function (block) {
        var code = Blockly.Elfbot.createEvent(`keyval`, `rawdata_dict['keyval'] == 1`);
        block.code = code;
        return ``;
    };

    // 当响度
    Blockly.Elfbot['event_elfbot_whenloudnessgreaterthan'] = function (block) {
        var opt = block.getFieldValue('OPT');
        var sound = Blockly.Elfbot.valueToCode(block, 'LOUDNESS', Blockly.Elfbot.ORDER_NONE) || 0;
        var code = Blockly.Elfbot.createEvent(`micval`,
            `rawdata_dict['micval'] ${opt} ${sound} and rawdata_dict['micval'] !=0`);
        block.code = code;
        return ``;
    };

    // 当光线强度
    Blockly.Elfbot['event_elfbot_whenlightintensitylessthan'] = function (block) {
        var opt = block.getFieldValue('OPT');
        var intensity = Blockly.Elfbot.valueToCode(block, 'INTENSITY', Blockly.Elfbot.ORDER_NONE) || 0;
        var code = Blockly.Elfbot.createEvent(`ligval`,
            `rawdata_dict['ligval'] ${opt} ${intensity} and rawdata_dict['ligval'] !=0`);
        block.code = code;
        return ``;
    };

    // 当检测到悬空
    Blockly.Elfbot['event_elfbot_wheninfrareddetectedoverhead'] = function (block) {
        var code = Blockly.Elfbot.createEvent(
            `irrval`,
            `rawdata_dict['irrval'] < 2000 and rawdata_dict['irrval'] !=0`,
            [`        time.sleep(0.8)`]
        );
        block.code = code;
        return ``;
    };

    // 当检测到不悬空
    Blockly.Elfbot['event_elfbot_wheninfrareddetectedoverheadnot'] = function (block) {
        var code = Blockly.Elfbot.createEvent(`irrval`,
            `rawdata_dict['irrval'] >= 2000 and rawdata_dict['irrval'] !=0`);
        block.code = code;
        return ``;
    };

    // 当检测到物体
    Blockly.Elfbot['event_elfbot_whenultrasonicdetectedobject'] = function (block) {
        var code = Blockly.Elfbot.createEvent(`ultval`,
            `rawdata_dict['ultval'] < 300 and rawdata_dict['ultval'] !=0`);
        block.code = code;
        return ``;
    };

    // 当检测前方无物体
    Blockly.Elfbot['event_elfbot_whenultrasonicdetectedobjectnot'] = function (block) {
        var code = Blockly.Elfbot.createEvent(`ultval`,
            `rawdata_dict['ultval'] >= 300 and rawdata_dict['ultval'] !=0`);
        block.code = code;
        return ``;
    };

    // 当检测前方物体距离
    Blockly.Elfbot['event_elfbot_whenultrasonicdetectedobjectdistance'] = function (block) {
        var num = Blockly.Elfbot.valueToCode(block, 'NUM', Blockly.Elfbot.ORDER_NONE) || 0;
        var opt = block.getFieldValue('OPT');
        var code = Blockly.Elfbot.createEvent(`ultval`,
            `rawdata_dict['ultval'] ${opt} ${num} and rawdata_dict['ultval'] !=0`);
        block.code = code;
        return ``;
    };





    // 当检测到颜色是
    Blockly.Elfbot['event_elfbot_whenlinepatroldetectedcolor'] = function (block) {
        var color = block.getFieldValue("COLOR");
        var code = Blockly.Elfbot.createEvent(`colval`, `rawdata_dict['colval'] == ${color - 1}`);
        block.code = code;
        return ``;
    };

    // 当计时器
    Blockly.Elfbot['event_elfbot_whentimergreaterthan'] = function (block) {
        return ``;
    };

    // 当无线接收到
    Blockly.Elfbot['event_elfbot_broadcast'] = function (block) {
        return ``;
    }

    // 广播
    Blockly.Elfbot['event_elfbot_whenradioreceive'] = function (block) {
        var brocastStr = Blockly.Elfbot.valueToCode(block, 'RECEIVE', Blockly.Elfbot.ORDER_NONE);
        return ``;
    };

    // 停止广播
    Blockly.Elfbot['event_elfbot_stop_broadcast'] = function (block) {
        return ``;
    }

    // 设置广播频道
    Blockly.Elfbot['event_elfbot_set_broadcast_channel'] = function (block) {
        var channel = Blockly.Elfbot.valueToCode(block, 'VALUE', Blockly.Elfbot.ORDER_NONE);
        return ``;
    }








    Blockly.Elfbot['event_whenflagclicked'] = function (block) {
        var funcName = Blockly.Elfbot.variableDB_.getDistinctName('onGreenflag', Blockly.Variables.NAME_TYPE);
        return `def ${funcName}():\n`;
    };

    Blockly.Elfbot['event_whenkeypressed'] = function (block) {
        var funcName = Blockly.Elfbot.variableDB_.getDistinctName('onKeypressed', Blockly.Variables.NAME_TYPE);
        return `def ${funcName}():\n`;
    };

    Blockly.Elfbot['event_whenbroadcastreceived'] = function (block) {
        var funcName = Blockly.Elfbot.variableDB_.getDistinctName('onReceived', Blockly.Variables.NAME_TYPE);
        return `def ${funcName}():\n`;
    }

    Blockly.Elfbot['event_broadcast'] = function (block) {
        return ``;
    }

    Blockly.Elfbot['event_broadcastandwait'] = function (block) {
        return ``;
    }

    Blockly.Elfbot['event_broadcast_menu'] = function (block) {
        var opt = block.getFieldValue('BROADCAST_OPTION');
        return [opt, Blockly.Elfbot.ORDER_ATOMIC];
    }

















}