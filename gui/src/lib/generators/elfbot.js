import injectElfbot from './elfbot/inject';

export default Blockly => {
    init(Blockly);
    injectElfbot(Blockly);
}

const init = Blockly => {
    /**
     * Python code generator.
     * @type {!Blockly.Generator}
     */
    Blockly.Elfbot = new Blockly.Generator('Python');


    /**
     * List of illegal variable names.
     * This is not intended to be a security feature.  Blockly is 100% client-side,
     * so bypassing this list is trivial.  This is intended to prevent users from
     * accidentally clobbering a built-in object or function.
     * @private
     */
    Blockly.Elfbot.addReservedWords(
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
    Blockly.Elfbot.ORDER_ATOMIC = 0;            // 0 "" ...
    Blockly.Elfbot.ORDER_COLLECTION = 1;        // tuples, lists, dictionaries
    Blockly.Elfbot.ORDER_STRING_CONVERSION = 1; // `expression...`
    Blockly.Elfbot.ORDER_MEMBER = 2.1;          // . []
    Blockly.Elfbot.ORDER_FUNCTION_CALL = 2.2;   // ()
    Blockly.Elfbot.ORDER_EXPONENTIATION = 3;    // **
    Blockly.Elfbot.ORDER_UNARY_SIGN = 4;        // + -
    Blockly.Elfbot.ORDER_BITWISE_NOT = 4;       // ~
    Blockly.Elfbot.ORDER_MULTIPLICATIVE = 5;    // * / // %
    Blockly.Elfbot.ORDER_ADDITIVE = 6;          // + -
    Blockly.Elfbot.ORDER_BITWISE_SHIFT = 7;     // << >>
    Blockly.Elfbot.ORDER_BITWISE_AND = 8;       // &
    Blockly.Elfbot.ORDER_BITWISE_XOR = 9;       // ^
    Blockly.Elfbot.ORDER_BITWISE_OR = 10;       // |
    Blockly.Elfbot.ORDER_RELATIONAL = 11;       // in, not in, is, is not,
    //     <, <=, >, >=, <>, !=, ==
    Blockly.Elfbot.ORDER_LOGICAL_NOT = 12;      // not
    Blockly.Elfbot.ORDER_LOGICAL_AND = 13;      // and
    Blockly.Elfbot.ORDER_LOGICAL_OR = 14;       // or
    Blockly.Elfbot.ORDER_CONDITIONAL = 15;      // if else
    Blockly.Elfbot.ORDER_LAMBDA = 16;           // lambda
    Blockly.Elfbot.ORDER_NONE = 99;             // (...)

    /**
     * List of outer-inner pairings that do NOT require parentheses.
     * @type {!Array.<!Array.<number>>}
     */
    Blockly.Elfbot.ORDER_OVERRIDES = [
        // (foo()).bar -> foo().bar
        // (foo())[0] -> foo()[0]
        [Blockly.Elfbot.ORDER_FUNCTION_CALL, Blockly.Elfbot.ORDER_MEMBER],
        // (foo())() -> foo()()
        [Blockly.Elfbot.ORDER_FUNCTION_CALL, Blockly.Elfbot.ORDER_FUNCTION_CALL],
        // (foo.bar).baz -> foo.bar.baz
        // (foo.bar)[0] -> foo.bar[0]
        // (foo[0]).bar -> foo[0].bar
        // (foo[0])[1] -> foo[0][1]
        [Blockly.Elfbot.ORDER_MEMBER, Blockly.Elfbot.ORDER_MEMBER],
        // (foo.bar)() -> foo.bar()
        // (foo[0])() -> foo[0]()
        [Blockly.Elfbot.ORDER_MEMBER, Blockly.Elfbot.ORDER_FUNCTION_CALL],

        // not (not foo) -> not not foo
        [Blockly.Elfbot.ORDER_LOGICAL_NOT, Blockly.Elfbot.ORDER_LOGICAL_NOT],
        // a and (b and c) -> a and b and c
        [Blockly.Elfbot.ORDER_LOGICAL_AND, Blockly.Elfbot.ORDER_LOGICAL_AND],
        // a or (b or c) -> a or b or c
        [Blockly.Elfbot.ORDER_LOGICAL_OR, Blockly.Elfbot.ORDER_LOGICAL_OR]
    ];

    Blockly.Elfbot.workspaceToCode = function (workspace) {
        if (!workspace) {
            // Backwards compatibility from before there could be multiple workspaces.
            console.warn('No workspace specified in workspaceToCode call.  Guessing.');
            workspace = Blockly.getMainWorkspace();
        }
        var code = [];
        this.init(workspace);
        var blocks = workspace.getTopBlocks(true);
        for (var x = 0, block; block = blocks[x]; x++) {
            if (block.category_ !== 'events') continue;
            if (block.code) {
                code.push(block.code.head)
            }
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
                line = this.INDENT + line.replace(/\n/g, '\n' + this.INDENT);
                code.push(line);
            }

            if (block.code) {
                code.push(block.code.tail)
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
     * Initialise the database of variable names.
     * @param {!Blockly.Workspace} workspace Workspace to generate code from.
     */
    Blockly.Elfbot.init = function (workspace) {
        /**
         * Empty loops or conditionals are not allowed in Python.
         */
        Blockly.Elfbot.INDENT = '    ';
        Blockly.Elfbot.PASS = this.INDENT + 'pass\n';
        // Create a dictionary of definitions to be printed before the code.
        Blockly.Elfbot.definitions_ = Object.create(null);
        // Create a dictionary mapping desired function names in definitions_
        // to actual function names (to avoid collisions with user functions).
        Blockly.Elfbot.functionNames_ = Object.create(null);

        if (!Blockly.Elfbot.variableDB_) {
            Blockly.Elfbot.variableDB_ =
                new Blockly.Names(Blockly.Elfbot.RESERVED_WORDS_);
        } else {
            Blockly.Elfbot.variableDB_.reset();
        }

        Blockly.Elfbot.variableDB_.setVariableMap(workspace.getVariableMap());

        var defvars = [];
        // Add developer variables (not created or named by the user).
        // var devVarList = Blockly.Variables.allDeveloperVariables(workspace);
        // for (var i = 0; i < devVarList.length; i++) {
        //     defvars.push(Blockly.Elfbot.variableDB_.getName(devVarList[i],
        //         Blockly.Names.DEVELOPER_VARIABLE_TYPE) + ' = None');
        // }

        // Add user variables, but only ones that are being used.
        var variables = Blockly.Variables.allUsedVarModels(workspace);
        for (var i = 0; i < variables.length; i++) {
            defvars.push(this.INDENT + Blockly.Elfbot.variableDB_.getName(variables[i].getId(),
                Blockly.Variables.NAME_TYPE) + ' = None');
        }
        var variablesCode = defvars.length > 0 ? "class globalvals:\n" + defvars.join('\r\n') : "";
        Blockly.Elfbot.definitions_['variables'] = variablesCode;
    };



    /**
     * Prepend the generated code with the variable definitions.
     * @param {string} code Generated code.
     * @return {string} Completed code.
     */
    Blockly.Elfbot.finish = function (code) {
        // Convert the definitions dictionary into a list.
        var imports = [
            'from machine import Pin, ADC, UART',
            'from chproduct import *',
            'from cheventtask import CHEventTask',
            'import select',
            'import elfbot',
        ]

        var definitions = [
            'global enabler',
            'global user_event_tasks',
            'user_event_task_0 = None',
        ];

        for (var name in Blockly.Elfbot.definitions_) {
            var def = Blockly.Elfbot.definitions_[name];
            if (def.match(/^(from\s+\S+\s+)?import\s+\S+/)) {
                imports.push(def);
            } else {
                definitions.push(def);
            }
        }
        // Clean up temporary data.
        delete Blockly.Elfbot.definitions_;
        delete Blockly.Elfbot.functionNames_;
        Blockly.Elfbot.variableDB_.reset();

        var elfbotEnables = [
            // 'elfbot.raw_enable(1, 3, 20)',
            // 'elfbot.raw_enable(2, 1, 20)',
            // 'elfbot.raw_enable(3, 1, 20)',
            // 'elfbot.raw_enable(4, 7, 20)',
        ];

        var allDefs = imports.join('\n') + '\n\n' + definitions.join('\n');
        var allRowEnables = '\n\n' + elfbotEnables.join('\n');

        return (
            allDefs.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n\n\n') +
            code +
            allRowEnables
        )
    };

    /**
     * Naked values are top-level blocks with outputs that aren't plugged into
     * anything.
     * @param {string} line Line of generated code.
     * @return {string} Legal line of code.
     */
    Blockly.Elfbot.scrubNakedValue = function (line) {
        return line + '\n';
    };

    /**
     * Encode a string as a properly escaped Python string, complete with quotes.
     * @param {string} string Text to encode.
     * @return {string} Python string.
     * @private
     */
    Blockly.Elfbot.quote_ = function (string) {
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


    Blockly.Elfbot.statementToCode = function (block, name) {
        var targetBlock = block.getInputTargetBlock(name);
        var code = this.blockToCode(targetBlock);
        return code;
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
    Blockly.Elfbot.scrub_ = function (block, code) {
        var commentCode = '';
        // Only collect comments for blocks that aren't inline.
        if (!block.outputConnection || !block.outputConnection.targetConnection) {
            // Collect comment for this block.
            var comment = block.getCommentText();
            comment = Blockly.utils.wrap(comment, Blockly.Elfbot.COMMENT_WRAP - 3);
            if (comment) {
                if (block.getProcedureDef) {
                    // Use a comment block for function comments.
                    commentCode += '"""' + comment + '\n"""\n';
                } else {
                    commentCode += Blockly.Elfbot.prefixLines(comment + '\n', '# ');
                }
            }
            // Collect comments for all value arguments.
            // Don't collect comments for nested statements.
            for (var i = 0; i < block.inputList.length; i++) {
                if (block.inputList[i].type == Blockly.INPUT_VALUE) {
                    var childBlock = block.inputList[i].connection.targetBlock();
                    if (childBlock) {
                        var comment = Blockly.Elfbot.allNestedComments(childBlock);
                        if (comment) {
                            commentCode += Blockly.Elfbot.prefixLines(comment, '# ');
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
            if (!block.outputShape_) {
                blockCode = this.prefixLines(/** @type {string} */(blockCode), this.INDENT);
            }
        }
        /* ------------------------------- */
        var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
        var nextCode = Blockly.Elfbot.blockToCode(nextBlock);
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
    Blockly.Elfbot.getAdjustedInt = function (block, atId, opt_delta, opt_negate) {
        var delta = opt_delta || 0;
        if (block.workspace.options.oneBasedIndex) {
            delta--;
        }
        var defaultAtIndex = block.workspace.options.oneBasedIndex ? '1' : '0';
        var atOrder = delta ? Blockly.Elfbot.ORDER_ADDITIVE :
            Blockly.Elfbot.ORDER_NONE;
        var at = Blockly.Elfbot.valueToCode(block, atId, atOrder) || defaultAtIndex;

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
}

