import { DEVICE_TAB_INDEX, STAGE_TAB_INDEX } from '../reducers/main-tab.js';

export default (ScratchBlocks, workspace, deviceId) => {

    switch (deviceId) {
        case -1:
            return ScratchBlocks.Python.workspaceToCode(workspace);
        case 1001:
            return ScratchBlocks.C.workspaceToCode(workspace);
        case 1002:
        case 1006:
        case 1010:
            return ScratchBlocks.Arduino.workspaceToCode(workspace);
        case 1009:
            return ScratchBlocks.ArduinoOpenCat.workspaceToCode(workspace);
        case 1003:
            return ScratchBlocks.Elfbot.workspaceToCode(workspace);
        case 1004:
            return ScratchBlocks.Microbit.workspaceToCode(workspace);
        case 1005:
            return ScratchBlocks.Maixduino.workspaceToCode(workspace);
        case 1007:
            return ScratchBlocks.MPython.workspaceToCode(workspace);
        case 1008:
            return ScratchBlocks.Powering.workspaceToCode(workspace);
        default:
            return '# not code';
    }

}