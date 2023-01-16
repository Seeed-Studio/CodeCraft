const path = require('path');
const test = require('tap').test;
const makeTestStorage = require('../fixtures/make-test-storage');
const readFileToBuffer = require('../fixtures/readProjectFile').readFileToBuffer;
const VirtualMachine = require('../../src/index');

const projectUri = path.resolve(__dirname, '../fixtures/monitors.sb2');
const project = readFileToBuffer(projectUri);

test('importing sb2 project with monitors', t => {
    const vm = new VirtualMachine();
    vm.attachStorage(makeTestStorage());

    // Evaluate playground data and exit
    vm.on('playgroundData', e => {
        const threads = JSON.parse(e.threads);
        // All monitors should leave threads running
        t.equal(threads.length, 5);
        // There should be one additional hidden monitor that is in the monitorState but
        // does not start a thread.
        t.equal(vm.runtime._monitorState.size, 6);

        const stage = vm.runtime.targets[0];
        const target = vm.runtime.targets[1];

        // Global variable named "global" is a slider
        let variableId = Object.keys(stage.variables).filter(k => stage.variables[k].name === 'global')[0];
        let monitorRecord = vm.runtime._monitorState.get(variableId);
        t.equal(monitorRecord.opcode, 'data_variable');
        t.equal(monitorRecord.mode, 'slider');
        t.equal(monitorRecord.sliderMin, -200); // Make sure these are imported for sliders.
        t.equal(monitorRecord.sliderMax, 30);
        t.equal(monitorRecord.x, 5); // These are imported for all monitors, just check once.
        t.equal(monitorRecord.y, 59);
        t.equal(monitorRecord.visible, true);

        // Global variable named "global list" is a list
        variableId = Object.keys(stage.variables).filter(k => stage.variables[k].name === 'global list')[0];
        monitorRecord = vm.runtime._monitorState.get(variableId);
        t.equal(monitorRecord.opcode, 'data_listcontents');
        t.equal(monitorRecord.mode, 'list');
        t.equal(monitorRecord.visible, true);

        // Local variable named "local" is hidden
        variableId = Object.keys(target.variables).filter(k => target.variables[k].name === 'local')[0];
        monitorRecord = vm.runtime._monitorState.get(variableId);
        t.equal(monitorRecord.opcode, 'data_variable');
        t.equal(monitorRecord.mode, 'default');
        t.equal(monitorRecord.visible, false);

        // Local list named "local list" is visible
        variableId = Object.keys(target.variables).filter(k => target.variables[k].name === 'local list')[0];
        monitorRecord = vm.runtime._monitorState.get(variableId);
        t.equal(monitorRecord.opcode, 'data_listcontents');
        t.equal(monitorRecord.mode, 'list');
        t.equal(monitorRecord.visible, true);
        t.equal(monitorRecord.width, 102); // Make sure these are imported from lists.
        t.equal(monitorRecord.height, 202);

        // Backdrop name monitor is visible, not sprite specific
        monitorRecord = vm.runtime._monitorState.get('backdropnumbername');
        t.equal(monitorRecord.opcode, 'looks_backdropnumbername');
        t.equal(monitorRecord.mode, 'default');
        t.equal(monitorRecord.visible, true);
        t.equal(monitorRecord.spriteName, null);
        t.equal(monitorRecord.targetId, null);

        // x position monitor is in large mode, specific to sprite 1
        monitorRecord = vm.runtime._monitorState.get(`${target.id}_xposition`);
        t.equal(monitorRecord.opcode, 'motion_xposition');
        t.equal(monitorRecord.mode, 'large');
        t.equal(monitorRecord.visible, true);
        t.equal(monitorRecord.spriteName, 'Sprite1');
        t.equal(monitorRecord.targetId, target.id);

        t.end();
        process.nextTick(process.exit);
    });

    // Start VM, load project, and run
    t.doesNotThrow(() => {
        vm.start();
        vm.clear();
        vm.setCompatibilityMode(false);
        vm.setTurboMode(false);
        vm.loadProject(project).then(() => {
            vm.greenFlag();
            setTimeout(() => {
                vm.getPlaygroundData();
                vm.stopAll();
            }, 100);
        });
    });
});
