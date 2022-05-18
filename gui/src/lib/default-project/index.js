import {TextEncoder} from 'text-encoding';
import projectData from './project-data';
import project1002Data from './project1002-data';
import project1003Data from './project1003-data';
import project1004Data from './project1004-data';
import project1005Data from './project1005-data';
import project1006Data from './project1006-data';
import project1007Data from './project1007-data';
import project1008Data from './project1008-data';
import project1009Data from './project1009-data';
import project1010Data from './project1010-data';

/* eslint-disable import/no-unresolved */
import popWav from '!arraybuffer-loader!./83a9787d4cb6f3b7632b4ddfebf74367.wav';
import meowWav from '!arraybuffer-loader!./83c36d806dc92327b9e7049a565c6bff.wav';
import backdrop from '!raw-loader!./cd21514d0531fdffb22204e0ec5ed84a.svg';
import costume1 from '!raw-loader!./09dc888b0b7df19f70d81588ae73420e.svg';
import costume2 from '!raw-loader!./3696356a03a8d938318876a593572843.svg';
/* eslint-enable import/no-unresolved */

const encoder = new TextEncoder();
const defaultProject = translator => {
    const projectJson = projectData(translator);
    const project1002Json = project1002Data(translator);
    const project1003Json = project1003Data(translator);
    const project1004Json = project1004Data(translator);
    const project1005Json = project1005Data(translator);
    const project1006Json = project1006Data(translator);
    const project1007Json = project1007Data(translator);
    const project1008Json = project1008Data(translator);
    const project1009Json = project1009Data(translator);
    const project1010Json = project1010Data(translator);

    return [{
        id: 1001,
        assetType: 'Project',
        dataFormat: 'JSON',
        data: JSON.stringify(projectJson)
    },{
        id: 1002,
        assetType: 'Project',
        dataFormat: 'JSON',
        data: JSON.stringify(project1002Json)
    },{
        id: 1003,
        assetType: 'Project',
        dataFormat: 'JSON',
        data: JSON.stringify(project1003Json)
    },{
        id: 1004,
        assetType: 'Project',
        dataFormat: 'JSON',
        data: JSON.stringify(project1004Json)
    },{
        id: 1005,
        assetType: 'Project',
        dataFormat: 'JSON',
        data: JSON.stringify(project1005Json)
    },{
        id: 1006,
        assetType: 'Project',
        dataFormat: 'JSON',
        data: JSON.stringify(project1006Json)
    },{
        id: 1007,
        assetType: 'Project',
        dataFormat: 'JSON',
        data: JSON.stringify(project1007Json)
    },{
        id: 1008,
        assetType: 'Project',
        dataFormat: 'JSON',
        data: JSON.stringify(project1008Json)
    },{
        id: 1009,
        assetType: 'Project',
        dataFormat: 'JSON',
        data: JSON.stringify(project1009Json)
    },{
        id: 1010,
        assetType: 'Project',
        dataFormat: 'JSON',
        data: JSON.stringify(project1010Json)
    }, {
        id: '83a9787d4cb6f3b7632b4ddfebf74367',
        assetType: 'Sound',
        dataFormat: 'WAV',
        data: new Uint8Array(popWav)
    }, {
        id: '83c36d806dc92327b9e7049a565c6bff',
        assetType: 'Sound',
        dataFormat: 'WAV',
        data: new Uint8Array(meowWav)
    }, {
        id: 'cd21514d0531fdffb22204e0ec5ed84a',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(backdrop)
    }, {
        id: '09dc888b0b7df19f70d81588ae73420e',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(costume1)
    }, {
        id: '3696356a03a8d938318876a593572843',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(costume2)
    }];
};

export default defaultProject;
