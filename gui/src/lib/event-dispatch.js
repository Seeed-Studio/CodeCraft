import { EventEmitter } from "events";

class EventDispatch extends EventEmitter{
    constructor() {
        super();
    }
}

const dispatch01 = new EventDispatch();
const dispatch02 = new EventDispatch();
const dispatch03 = new EventDispatch();

export {
    dispatch01,
    dispatch02,
    dispatch03
}