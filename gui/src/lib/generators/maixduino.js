import inject from './maixduino/inject';

export default Blockly => {
    init(Blockly);
    inject(Blockly);
}

const init = Blockly => {
    /**
     * Python code generator.
     * @type {!Blockly.Generator}
     */
    Blockly.Maixduino = new Blockly.Generator('Maixduino');

    /**
     * List of illegal variable names.
     * This is not intended to be a security feature.  Blockly is 100% client-side,
     * so bypassing this list is trivial.  This is intended to prevent users from
     * accidentally clobbering a built-in object or function.
     * @private
     */
    Blockly.Maixduino.addReservedWords(
        // import keyword
        // print(','.join(sorted(keyword.kwlist)))
        // https://docs.python.org/3/reference/lexical_analysis.html#keywords
        // https://docs.python.org/2/reference/lexical_analysis.html#keywords
        'False,None,True,and,as,assert,break,class,continue,def,del,elif,else,' +
        'except,exec,finally,for,from,global,if,import,in,is,lambda,nonlocal,not,' +
        'or,pass,print,raise,return,try,while,with,yield,' +
        // https://docs.python.org/3/library/constants.html
        // https://docs.python.org/2/library/constants.html
        'NotImplemented,Ellipsis,__debug__,quit,exit,copyright,license,credits,' +
        // >>> print(','.join(sorted(dir(__builtins__))))
        // https://docs.python.org/3/library/functions.html
        // https://docs.python.org/2/library/functions.html
        'ArithmeticError,AssertionError,AttributeError,BaseException,' +
        'BlockingIOError,BrokenPipeError,BufferError,BytesWarning,' +
        'ChildProcessError,ConnectionAbortedError,ConnectionError,' +
        'ConnectionRefusedError,ConnectionResetError,DeprecationWarning,EOFError,' +
        'Ellipsis,EnvironmentError,Exception,FileExistsError,FileNotFoundError,' +
        'FloatingPointError,FutureWarning,GeneratorExit,IOError,ImportError,' +
        'ImportWarning,IndentationError,IndexError,InterruptedError,' +
        'IsADirectoryError,KeyError,KeyboardInterrupt,LookupError,MemoryError,' +
        'ModuleNotFoundError,NameError,NotADirectoryError,NotImplemented,' +
        'NotImplementedError,OSError,OverflowError,PendingDeprecationWarning,' +
        'PermissionError,ProcessLookupError,RecursionError,ReferenceError,' +
        'ResourceWarning,RuntimeError,RuntimeWarning,StandardError,' +
        'StopAsyncIteration,StopIteration,SyntaxError,SyntaxWarning,SystemError,' +
        'SystemExit,TabError,TimeoutError,TypeError,UnboundLocalError,' +
        'UnicodeDecodeError,UnicodeEncodeError,UnicodeError,' +
        'UnicodeTranslateError,UnicodeWarning,UserWarning,ValueError,Warning,' +
        'ZeroDivisionError,_,__build_class__,__debug__,__doc__,__import__,' +
        '__loader__,__name__,__package__,__spec__,abs,all,any,apply,ascii,' +
        'basestring,bin,bool,buffer,bytearray,bytes,callable,chr,classmethod,cmp,' +
        'coerce,compile,complex,copyright,credits,delattr,dict,dir,divmod,' +
        'enumerate,eval,exec,execfile,exit,file,filter,float,format,frozenset,' +
        'getattr,globals,hasattr,hash,help,hex,id,input,int,intern,isinstance,' +
        'issubclass,iter,len,license,list,locals,long,map,max,memoryview,min,' +
        'next,object,oct,open,ord,pow,print,property,quit,range,raw_input,reduce,' +
        'reload,repr,reversed,round,set,setattr,slice,sorted,staticmethod,str,' +
        'sum,super,tuple,type,unichr,unicode,vars,xrange,zip'
    );

    /**
     * Order of operation ENUMs.
     * http://docs.python.org/reference/expressions.html#summary
     */
    Blockly.Maixduino.ORDER_ATOMIC = 0;            // 0 "" ...
    Blockly.Maixduino.ORDER_COLLECTION = 1;        // tuples, lists, dictionaries
    Blockly.Maixduino.ORDER_STRING_CONVERSION = 1; // `expression...`
    Blockly.Maixduino.ORDER_MEMBER = 2.1;          // . []
    Blockly.Maixduino.ORDER_FUNCTION_CALL = 2.2;   // ()
    Blockly.Maixduino.ORDER_EXPONENTIATION = 3;    // **
    Blockly.Maixduino.ORDER_UNARY_SIGN = 4;        // + -
    Blockly.Maixduino.ORDER_BITWISE_NOT = 4;       // ~
    Blockly.Maixduino.ORDER_MULTIPLICATIVE = 5;    // * / // %
    Blockly.Maixduino.ORDER_ADDITIVE = 6;          // + -
    Blockly.Maixduino.ORDER_BITWISE_SHIFT = 7;     // << >>
    Blockly.Maixduino.ORDER_BITWISE_AND = 8;       // &
    Blockly.Maixduino.ORDER_BITWISE_XOR = 9;       // ^
    Blockly.Maixduino.ORDER_BITWISE_OR = 10;       // |
    Blockly.Maixduino.ORDER_RELATIONAL = 11;       // in, not in, is, is not,
    //     <, <=, >, >=, <>, !=, ==
    Blockly.Maixduino.ORDER_LOGICAL_NOT = 12;      // not
    Blockly.Maixduino.ORDER_LOGICAL_AND = 13;      // and
    Blockly.Maixduino.ORDER_LOGICAL_OR = 14;       // or
    Blockly.Maixduino.ORDER_CONDITIONAL = 15;      // if else
    Blockly.Maixduino.ORDER_LAMBDA = 16;           // lambda
    Blockly.Maixduino.ORDER_ASSIGNMENT = 17; // = += -= *= /= %= <<= >>= ...
    Blockly.Maixduino.ORDER_NONE = 99;             // (...)

    /**
     * List of outer-inner pairings that do NOT require parentheses.
     * @type {!Array.<!Array.<number>>}
     */
    Blockly.Maixduino.ORDER_OVERRIDES = [
        // (foo()).bar -> foo().bar
        // (foo())[0] -> foo()[0]
        [Blockly.Maixduino.ORDER_FUNCTION_CALL, Blockly.Maixduino.ORDER_MEMBER],
        // (foo())() -> foo()()
        [Blockly.Maixduino.ORDER_FUNCTION_CALL, Blockly.Maixduino.ORDER_FUNCTION_CALL],
        // (foo.bar).baz -> foo.bar.baz
        // (foo.bar)[0] -> foo.bar[0]
        // (foo[0]).bar -> foo[0].bar
        // (foo[0])[1] -> foo[0][1]
        [Blockly.Maixduino.ORDER_MEMBER, Blockly.Maixduino.ORDER_MEMBER],
        // (foo.bar)() -> foo.bar()
        // (foo[0])() -> foo[0]()
        [Blockly.Maixduino.ORDER_MEMBER, Blockly.Maixduino.ORDER_FUNCTION_CALL],

        // not (not foo) -> not not foo
        [Blockly.Maixduino.ORDER_LOGICAL_NOT, Blockly.Maixduino.ORDER_LOGICAL_NOT],
        // a and (b and c) -> a and b and c
        [Blockly.Maixduino.ORDER_LOGICAL_AND, Blockly.Maixduino.ORDER_LOGICAL_AND],
        // a or (b or c) -> a or b or c
        [Blockly.Maixduino.ORDER_LOGICAL_OR, Blockly.Maixduino.ORDER_LOGICAL_OR]
    ];

    Blockly.Maixduino.importFile = function (fileName) {
        Blockly.Maixduino.definitions_[`import_${fileName}`] = `#:::${fileName}`;
    }

    /**
     * Initialise the database of variable names.
     * @param {!Blockly.Workspace} workspace Workspace to generate code from.
     */
    Blockly.Maixduino.init = function (workspace) {
        /**
         * Empty loops or conditionals are not allowed in Python.
         */
        Blockly.Maixduino.INDENT = '    ';
        Blockly.Maixduino.PASS = this.INDENT + 'pass\n';
        // Create a dictionary of definitions to be printed before the code.
        Blockly.Maixduino.definitions_ = Object.create(null);
        // Create a dictionary mapping desired function names in definitions_
        // to actual function names (to avoid collisions with user functions).
        Blockly.Maixduino.initfuncs_ = Object.create(null);
        Blockly.Maixduino.functionNames_ = Object.create(null);

        Blockly.Maixduino.isClearLed = false;

        if (!Blockly.Maixduino.variableDB_) {
            Blockly.Maixduino.variableDB_ =
                new Blockly.Names(Blockly.Maixduino.RESERVED_WORDS_);
        } else {
            Blockly.Maixduino.variableDB_.reset();
        }

        Blockly.Maixduino.variableDB_.setVariableMap(workspace.getVariableMap());

        var defvars = [];

        // Add user variables, but only ones that are being used.
        var variables = Blockly.Variables.allUsedVarModels(workspace);
        for (var i = 0; i < variables.length; i++) {
            defvars.push(this.INDENT + Blockly.Maixduino.variableDB_.getName(variables[i].getId(),
                Blockly.Variables.NAME_TYPE) + ' = 0');
        }
        var variablesCode = defvars.length > 0 ? "class globalvals:\n" + defvars.join('\r\n') : "";
        Blockly.Maixduino.definitions_['variables'] = variablesCode;
    };

    /**
     * Generate code for all blocks in the workspace to the specified language.
     * @param {Blockly.Workspace} workspace Workspace to generate code from.
     * @return {string} Generated code.
     */
    Blockly.Maixduino.workspaceToCode = function (workspace) {
        if (!workspace) {
            // Backwards compatibility from before there could be multiple workspaces.
            console.warn('No workspace specified in workspaceToCode call.  Guessing.');
            workspace = Blockly.getMainWorkspace();
        }
        var code = [];
        this.init(workspace);
        var blocks = workspace.getTopBlocks(true);
        for (var x = 0, block; block = blocks[x]; x++) {
            if (block.category_ !== 'events' && block.type !== 'procedures_definition') continue;
            var line = this.blockToCode(block);
            if (this.isArray(line)) {
                // Value blocks return tuples of code and operator order.
                // Top-level blocks don't care about operator order.
                line = line[0];
            }
            if (line) {
                if (block.outputConnection && this.scrubNakedValue) {
                    // This block is a naked value.  Ask the language's code generator if
                    // it wants to append a semicolon, or something.
                    line = this.scrubNakedValue(line);
                }
                code.push(line);
            }
        }
        code = code.join('\n');  // Blank line between each section.
        code = this.finish(code);
        // Final scrubbing of whitespace.
        code = code.replace(/^\s+\n/, '');
        code = code.replace(/\n\s+$/, '\n');
        code = code.replace(/[ \t]+\n/g, '\n');
        return code;
    };

    /**
     * Prepend the generated code with the variable definitions.
     * @param {string} code Generated code.
     * @return {string} Completed code.
     */
    Blockly.Maixduino.finish = function (code) {
        // Convert the definitions dictionary into a list.
        var imports = [];
        var definitions = [];
        for (var name in Blockly.Maixduino.definitions_) {
            var def = Blockly.Maixduino.definitions_[name];
            if (def.match(/^(from\s+\S+\s+)?import\s+\S+/)) {
                imports.push(def);
            } else {
                definitions.push(def);
            }
        }
        // __inits
        var __inits = [];
        for (var name in Blockly.Maixduino.initfuncs_) {
            __inits.push(Blockly.Maixduino.initfuncs_[name]);
        }

        // __funcNames
        var __funcNames = [];
        for (var name in Blockly.Maixduino.functionNames_) {
            __funcNames.push(`if ${Blockly.Maixduino.functionNames_[name].condition}:`)
            __funcNames.push(`${Blockly.Maixduino.INDENT}${Blockly.Maixduino.functionNames_[name].callback}()`)
        }

        var __clearlcdCode = Blockly.Maixduino.isClearLed ? "lcd.clear()\n" : "";

        // Clean up temporary data.
        delete Blockly.Maixduino.definitions_;
        delete Blockly.Maixduino.initfuncs_;
        delete Blockly.Maixduino.functionNames_;
        delete Blockly.Maixduino.isClearLed;

        Blockly.Maixduino.variableDB_.reset();

        var comment = '# generated by Codecraft for cyberEye\n# codes make you happy\n';
        var allDefs = imports.join('\n') + '\n\n' + definitions.join('\n\n');

        var initfucs = __inits.join('\n');
        var initCode = initfucs;

        var workspaceCode = comment + allDefs.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n\n') + code + '\n' + __clearlcdCode + initCode + "\n";
        var funcNames = __funcNames.join('\n    ') || 'pass';
        var eventProcessCode = `while True:\n    ${funcNames}\n\n`;
        // event process
        if (__funcNames &&
            __funcNames.length > 0) {
            workspaceCode += "\n\n" + eventProcessCode;
        }
        return workspaceCode;
    };

    /**
     * Naked values are top-level blocks with outputs that aren't plugged into
     * anything.
     * @param {string} line Line of generated code.
     * @return {string} Legal line of code.
     */
    Blockly.Maixduino.scrubNakedValue = function (line) {
        return line + '\n';
    };

    /**
     * Encode a string as a properly escaped Python string, complete with quotes.
     * @param {string} string Text to encode.
     * @return {string} Python string.
     * @private
     */
    Blockly.Maixduino.quote_ = function (string) {
        // Can't use goog.string.quote since % must also be escaped.
        string = string.replace(/\\/g, '\\\\')
            .replace(/\n/g, '\\\n');

        // Follow the CPython behaviour of repr() for a non-byte string.
        var quote = '\'';
        if (string.indexOf('\'') !== -1) {
            if (string.indexOf('"') === -1) {
                quote = '"';
            } else {
                string = string.replace(/'/g, '\\\'');
            }
        };
        return quote + string + quote;
    };

    /**
     * Common tasks for generating Python from blocks.
     * Handles comments for the specified block and any connected value blocks.
     * Calls any statements following this block.
     * @param {!Blockly.Block} block The current block.
     * @param {string} code The Python code created for this block.
     * @return {string} Python code with comments and subsequent blocks added.
     * @private
     */
    Blockly.Maixduino.scrub_ = function (block, code) {
        var commentCode = '';
        // Only collect comments for blocks that aren't inline.
        if (!block.outputConnection || !block.outputConnection.targetConnection) {
            // Collect comment for this block.
            var comment = block.getCommentText();
            comment = Blockly.utils.wrap(comment, Blockly.Maixduino.COMMENT_WRAP - 3);
            if (comment) {
                if (block.getProcedureDef) {
                    // Use a comment block for function comments.
                    commentCode += '"""' + comment + '\n"""\n';
                } else {
                    commentCode += Blockly.Maixduino.prefixLines(comment + '\n', '# ');
                }
            }
            // Collect comments for all value arguments.
            // Don't collect comments for nested statements.
            for (var i = 0; i < block.inputList.length; i++) {
                if (block.inputList[i].type == Blockly.INPUT_VALUE) {
                    var childBlock = block.inputList[i].connection.targetBlock();
                    if (childBlock) {
                        var comment = Blockly.Maixduino.allNestedComments(childBlock);
                        if (comment) {
                            commentCode += Blockly.Maixduino.prefixLines(comment, '# ');
                        }
                    }
                }
            }
        }
        /* Format functions in python syntax */
        var blockCode = code;
        var rootBlock = block.getRootBlock();
        if (rootBlock &&
            rootBlock !== block &&
            rootBlock.category_ === 'events') {
            if (!block.outputShape_ || block.outputShape_ == 3) {
                blockCode = this.prefixLines(/** @type {string} */(blockCode), this.INDENT);
            }
        }
        /* ------------------------------- */
        var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
        var nextCode = Blockly.Maixduino.blockToCode(nextBlock);
        return commentCode + blockCode + nextCode;
    };

    /**
     * Gets a property and adjusts the value, taking into account indexing, and
     * casts to an integer.
     * @param {!Blockly.Block} block The block.
     * @param {string} atId The property ID of the element to get.
     * @param {number=} opt_delta Value to add.
     * @param {boolean=} opt_negate Whether to negate the value.
     * @return {string|number}
     */
    Blockly.Maixduino.getAdjustedInt = function (block, atId, opt_delta, opt_negate) {
        var delta = opt_delta || 0;
        if (block.workspace.options.oneBasedIndex) {
            delta--;
        }
        var defaultAtIndex = block.workspace.options.oneBasedIndex ? '1' : '0';
        var atOrder = delta ? Blockly.Maixduino.ORDER_ADDITIVE :
            Blockly.Maixduino.ORDER_NONE;
        var at = Blockly.Maixduino.valueToCode(block, atId, atOrder) || defaultAtIndex;

        if (Blockly.isNumber(at)) {
            // If the index is a naked number, adjust it right now.
            at = parseInt(at, 10) + delta;
            if (opt_negate) {
                at = -at;
            }
        } else {
            // If the index is dynamic, adjust it in code.
            if (delta > 0) {
                at = 'int(' + at + ' + ' + delta + ')';
            } else if (delta < 0) {
                at = 'int(' + at + ' - ' + -delta + ')';
            } else {
                at = 'int(' + at + ')';
            }
            if (opt_negate) {
                at = '-' + at;
            }
        }
        return at;
    };

    /**
     * Generate code representing the statement.  Indent the code.
     * @param {!Blockly.Block} block The block containing the input.
     * @param {string} name The name of the input.
     * @return {string} Generated code or '' if no blocks are connected.
     */
    Blockly.Maixduino.statementToCode = function (block, name) {
        var targetBlock = block.getInputTargetBlock(name);
        var code = this.blockToCode(targetBlock);
        // Value blocks must return code and order of operations info.
        // Statement blocks must only return code.
        // goog.asserts.assertString(code, 'Expecting code from statement block "%s".',
        //     targetBlock && targetBlock.type);
        if (code) {
            code = this.prefixLines(/** @type {string} */(code), '');
        }
        return code;
    };

    /**
     * Prepend a common prefix onto each line of code.
     * @param {string} text The lines of code.
     * @param {string} prefix The common prefix.
     * @return {string} The prefixed lines of code.
     */
    Blockly.Maixduino.prefixLines = function (text, prefix) {
        return prefix + text.replace(/(?!\n$)\n/g, '\n' + prefix);
    };

}


