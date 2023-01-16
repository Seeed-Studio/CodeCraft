import makeToolboxXMLForStage from './toolbox-stage-xml.js';

/**
 * @param {Object} toolbox 
 * 
 * {
 *     type,
 *     targetId,
 *     deviceId,
 *     isStage,
 *     extension,
 * } 
 * 
 * @returns {string} - a ScratchBlocks-style XML document for the contents of the toolbox.
 */
const makeToolboxXML = function (toolbox) {
    const {
        type,
        targetId,
        deviceId,
        isStage,
        extension,
    } = toolbox;
    // stage mode
    if ('sprite' === type) {
        return makeToolboxXMLForStage(isStage, targetId, extension.xml);
    }
    // device mode
    else {
        return require(`./toolbox-${deviceId}-xml.js`).default(extension);
    }
};

export default makeToolboxXML;