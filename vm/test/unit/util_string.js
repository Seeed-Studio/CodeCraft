const test = require('tap').test;
const StringUtil = require('../../src/util/string-util');

test('splitFirst', t => {
    t.deepEqual(StringUtil.splitFirst('asdf.1234', '.'), ['asdf', '1234']);
    t.deepEqual(StringUtil.splitFirst('asdf.', '.'), ['asdf', '']);
    t.deepEqual(StringUtil.splitFirst('.1234', '.'), ['', '1234']);
    t.deepEqual(StringUtil.splitFirst('foo', '.'), ['foo', null]);
    t.end();
});

test('withoutTrailingDigits', t => {
    t.strictEqual(StringUtil.withoutTrailingDigits('boeing747'), 'boeing');
    t.strictEqual(StringUtil.withoutTrailingDigits('boeing747 '), 'boeing747 ');
    t.strictEqual(StringUtil.withoutTrailingDigits('boeing𝟨'), 'boeing𝟨');
    t.strictEqual(StringUtil.withoutTrailingDigits('boeing 747'), 'boeing ');
    t.strictEqual(StringUtil.withoutTrailingDigits('747'), '');
    t.end();
});

test('unusedName', t => {
    t.strictEqual(
        StringUtil.unusedName(
            'name',
            ['not the same name']
        ),
        'name'
    );
    t.strictEqual(
        StringUtil.unusedName(
            'name',
            ['name']
        ),
        'name2'
    );
    t.strictEqual(
        StringUtil.unusedName(
            'name',
            ['name30']
        ),
        'name'
    );
    t.strictEqual(
        StringUtil.unusedName(
            'name',
            ['name', 'name2']
        ),
        'name3'
    );
    t.strictEqual(
        StringUtil.unusedName(
            'name',
            ['name', 'name3']
        ),
        'name2'
    );
    t.strictEqual(
        StringUtil.unusedName(
            'boeing747',
            ['boeing747']
        ),
        'boeing2' // Yup, this matches scratch-flash...
    );
    t.end();
});
