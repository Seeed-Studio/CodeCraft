class Scratch3ProcedureBlocks {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
    }

    /**
     * Retrieve the block primitives implemented by this package.
     * @return {object.<string, Function>} Mapping of opcode to Function.
     */
    getPrimitives () {
        return {
            procedures_definition: this.definition,
            procedures_call: this.call,
            argument_reporter_string_number: this.argumentReporterStringNumber,
            argument_reporter_boolean: this.argumentReporterBoolean
        };
    }

    definition () {
        // No-op: execute the blocks.
    }

    call (args, util) {
        if (!util.stackFrame.executed) {
            const procedureCode = args.mutation.proccode;
            const paramNamesAndIds = util.getProcedureParamNamesAndIds(procedureCode);

            // If null, procedure could not be found, which can happen if custom
            // block is dragged between sprites without the definition.
            // Match Scratch 2.0 behavior and noop.
            if (paramNamesAndIds === null) {
                return;
            }

            const [paramNames, paramIds] = paramNamesAndIds;

            for (let i = 0; i < paramIds.length; i++) {
                if (args.hasOwnProperty(paramIds[i])) {
                    util.pushParam(paramNames[i], args[paramIds[i]]);
                }
            }

            util.stackFrame.executed = true;
            util.startProcedure(procedureCode);
        }
    }

    argumentReporterStringNumber (args, util) {
        const value = util.getParam(args.VALUE);
        if (value === null) {
            return '';
        }
        return value;
    }

    argumentReporterBoolean (args, util) {
        const value = util.getParam(args.VALUE);
        if (value === null) {
            return false;
        }
        return value;
    }
}

module.exports = Scratch3ProcedureBlocks;
