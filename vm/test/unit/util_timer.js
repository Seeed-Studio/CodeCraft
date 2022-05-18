const test = require('tap').test;
const Timer = require('../../src/util/timer');

test('spec', t => {
    const timer = new Timer();

    t.type(Timer, 'function');
    t.type(timer, 'object');

    t.type(timer.startTime, 'number');
    t.type(timer.time, 'function');
    t.type(timer.start, 'function');
    t.type(timer.timeElapsed, 'function');

    t.end();
});

test('time', t => {
    const timer = new Timer();
    const time = timer.time();

    t.ok(Date.now() >= time);
    t.end();
});

test('start / timeElapsed', t => {
    const timer = new Timer();
    const delay = 100;
    const threshold = 1000 / 60; // 60 hz

    // Start timer
    timer.start();

    // Wait and measure timer
    setTimeout(() => {
        const timeElapsed = timer.timeElapsed();
        t.ok(timeElapsed >= 0);
        t.ok(timeElapsed >= (delay - threshold) &&
             timeElapsed <= (delay + threshold));
        t.end();
    }, delay);
});
