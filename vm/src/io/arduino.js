class Arduino {
    constructor (runtime) {
        this.runtime = runtime;
        this.value = {}
    }

    postData (data) {
        //广播事件类型
        // const broadcastVar = this.runtime.getTargetForStage().lookupBroadcastMsg(
        //     data[0]);
        // if (broadcastVar) {
        //     const broadcastOption = broadcastVar.name;
        //     this.runtime.startHats('event_whenbroadcastreceived', {
        //         BROADCAST_OPTION: broadcastOption
        //     });
        // }
        //广播传值类型
        this.value[data[0]]=data[1];
    }

    getValue (id) {
        let value = this.value[id];
        return value?value:0;
    }
}

module.exports = Arduino;
