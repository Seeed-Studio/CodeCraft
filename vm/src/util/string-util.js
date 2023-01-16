class StringUtil {
    static withoutTrailingDigits(s) {
        let i = s.length - 1;
        while ((i >= 0) && ('0123456789'.indexOf(s.charAt(i)) > -1)) i--;
        return s.slice(0, i + 1);
    }

    static unusedName(name, existingNames) {
        if (existingNames.indexOf(name) < 0) return name;
        name = StringUtil.withoutTrailingDigits(name);
        let i = 2;
        while (existingNames.indexOf(name + i) >= 0) i++;
        return name + i;
    }

    /**
     * Split a string on the first occurrence of a split character.
     * @param {string} text - the string to split.
     * @param {string} separator - split the text on this character.
     * @returns {string[]} - the two parts of the split string, or [text, null] if no split character found.
     * @example
     * // returns ['foo', 'tar.gz']
     * splitFirst('foo.tar.gz', '.');
     * @example
     * // returns ['foo', null]
     * splitFirst('foo', '.');
     * @example
     * // returns ['foo', '']
     * splitFirst('foo.', '.');
     */
    static splitFirst(text, separator) {
        const index = text.indexOf(separator);
        if (index >= 0) {
            return [text.substring(0, index), text.substring(index + 1)];
        }
        return [text, null];

    }

    /**
     * A customized version of JSON.stringify that sets Infinity/NaN to 0,
     * instead of the default (null).
     * Needed because null is not of type number, but Infinity/NaN are, which
     * can lead to serialization producing JSON that isn't valid based on the parser schema.
     * It is also consistent with the behavior of saving 2.0 projects.
     * This is only needed when stringifying an object for saving.
     *
     * @param {!object} obj - The object to serialize
     * @return {!string} The JSON.stringified string with Infinity/NaN replaced with 0
     */
    static stringify(obj) {
        return JSON.stringify(obj, (_key, value) => {
            if (typeof value === 'number' &&
                (value === Infinity || value === -Infinity || isNaN(value))) {
                return 0;
            }
            return value;
        });
    }

    /**
     * 字符转义
     * \n	换行符
     * \r	回车符
     * \t	制表符
     * \b	退格符
     * \f	换页符
     * @param {*} value 
     */
    static escape(value) {
        value = value.replace(/\n/g, "\\n")
        value = value.replace(/\r/g, "\\r")
        value = value.replace(/\t/g, "\\t")
        value = value.replace(/\b/g, "\\b")
        value = value.replace(/\f/g, "\\f")
        return value;
    }

}

module.exports = StringUtil;
