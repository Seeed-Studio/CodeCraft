const DispatchTestService = require('../fixtures/dispatch-test-service');
const Worker = require('tiny-worker');

const dispatch = require('../../src/dispatch/central-dispatch');
const path = require('path');
const test = require('tap').test;


// By default Central Dispatch works with the Worker class built into the browser. Tell it to use TinyWorker instead.
dispatch.workerClass = Worker;

const runServiceTest = function (serviceName, t) {
    const promises = [];

    promises.push(dispatch.call(serviceName, 'returnFortyTwo')
        .then(
            x => t.equal(x, 42),
            e => t.fail(e)
        ));

    promises.push(dispatch.call(serviceName, 'doubleArgument', 9)
        .then(
            x => t.equal(x, 18),
            e => t.fail(e)
        ));

    promises.push(dispatch.call(serviceName, 'doubleArgument', 123)
        .then(
            x => t.equal(x, 246),
            e => t.fail(e)
        ));

    // I tried using `t.rejects` here but ran into https://github.com/tapjs/node-tap/issues/384
    promises.push(dispatch.call(serviceName, 'throwException')
        .then(
            () => t.fail('exception was not propagated as expected'),
            () => t.pass('exception was propagated as expected')
        ));

    return Promise.all(promises);
};

test('local', t => {
    dispatch.setService('LocalDispatchTest', new DispatchTestService())
        .catch(e => t.fail(e));

    return runServiceTest('LocalDispatchTest', t);
});

test('remote', t => {
    const fixturesDir = path.resolve(__dirname, '../fixtures');
    const worker = new Worker('./test/fixtures/dispatch-test-worker-shim.js', null, {cwd: fixturesDir});
    dispatch.addWorker(worker);

    const waitForWorker = new Promise(resolve => {
        dispatch.setService('test', {onWorkerReady: resolve})
            .catch(e => t.fail(e));
    });

    return waitForWorker
        .then(() => runServiceTest('RemoteDispatchTest', t), e => t.fail(e))
        .then(() => dispatch._remoteCall(worker, 'dispatch', 'terminate'), e => t.fail(e));
});
