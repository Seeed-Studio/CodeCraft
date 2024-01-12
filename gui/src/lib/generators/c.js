import grovezero from './grovezero/inject.js';


export default Blockly => {
    init(Blockly);
    grovezero(Blockly);
}

const init = Blockly => {
    Blockly.C = new Blockly.Generator('C');

    Blockly.C.workspaceToCode = function (workspace) {
        if (!workspace) {
            // Backwards compatibility from before there  could be multiple workspaces.
            console.warn('No workspace specified in workspaceToCode call.  Guessing.');
            workspace = Blockly.getMainWorkspace();
        }
        this.init(workspace);
        var blocks = workspace.getTopBlocks(true);
        var callbackCode = '';
        var mainCode = 'void usr_init(void)\n{\n';
        for (var x = 0, block; block = blocks[x]; x++) {
            if (block.category_ === 'events' || block.type === 'procedures_definition') {
                var func = this[block.type];
                mainCode += func.call(block, block);
                //
                var nextBlock = block.getNextBlock();
                var line = this.blockToCode(nextBlock);
                if (this.isArray(line)) {
                    line = line[0];
                }

                if (block.callbackCodeHead) {
                    callbackCode += block.callbackCodeHead;
                    if (line) {
                        if (nextBlock.outputConnection && this.scrubNakedValue) {
                            line = this.scrubNakedValue(line);
                        }
                        callbackCode += line;
                    }
                    callbackCode += block.callbackCodeTail;

                }
            }
        }
        mainCode += '}\n\n';
        var code = callbackCode + mainCode;
        code = this.finish(code)
        code = code.replace(/^\s+\n/, '');
        code = code.replace(/\n\s+$/, '\n');
        code = code.replace(/[ \t]+\n/g, '\n');
        return code;
    };

    Blockly.C.isArray = function (val) {
        return this.typeOf(val) == 'array';
    };

    Blockly.C.typeOf = function (value) {
        var s = typeof value;
        if (s == 'object') {
            if (value) {

                if (value instanceof Array) {
                    return 'array';
                } else if (value instanceof Object) {
                    return s;
                }

                var className = Object.prototype.toString.call(
                    /** @type {!Object} */
                    (value));

                if (className == '[object Window]') {
                    return 'object';
                }


                if ((className == '[object Array]' ||
                    typeof value.length == 'number' &&
                    typeof value.splice != 'undefined' &&
                    typeof value.propertyIsEnumerable != 'undefined' &&
                    !value.propertyIsEnumerable('splice')

                )) {
                    return 'array';
                }

                if ((className == '[object Function]' ||
                    typeof value.call != 'undefined' &&
                    typeof value.propertyIsEnumerable != 'undefined' &&
                    !value.propertyIsEnumerable('call'))) {
                    return 'function';
                }

            } else {
                return 'null';
            }

        } else if (s == 'function' && typeof value.call == 'undefined') {

            return 'object';
        }
        return s;
    };

    Blockly.C.addReservedWords(
        'Blockly,' + // In case JS is evaled in the current window.
        // https://developer.mozilla.org/en/JavaScript/Reference/Reserved_Words
        'break,case,catch,continue,debugger,default,delete,do,else,finally,for,function,if,in,instanceof,new,return,switch,this,throw,try,typeof,var,void,while,with,' +
        'class,enum,export,extends,import,super,implements,interface,let,package,private,protected,public,static,yield,' +
        'const,null,true,false,' +
        // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects
        'Array,ArrayBuffer,Boolean,Date,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Error,eval,EvalError,Float32Array,Float64Array,Function,Infinity,Int16Array,Int32Array,Int8Array,isFinite,isNaN,Iterator,JSON,Math,NaN,Number,Object,parseFloat,parseInt,RangeError,ReferenceError,RegExp,StopIteration,String,SyntaxError,TypeError,Uint16Array,Uint32Array,Uint8Array,Uint8ClampedArray,undefined,uneval,URIError,' +
        // https://developer.mozilla.org/en/DOM/window
        'applicationCache,closed,Components,content,_content,controllers,crypto,defaultStatus,dialogArguments,directories,document,frameElement,frames,fullScreen,globalStorage,history,innerHeight,innerWidth,length,location,locationbar,localStorage,menubar,messageManager,mozAnimationStartTime,mozInnerScreenX,mozInnerScreenY,mozPaintCount,name,navigator,opener,outerHeight,outerWidth,pageXOffset,pageYOffset,parent,performance,personalbar,pkcs11,returnValue,screen,screenX,screenY,scrollbars,scrollMaxX,scrollMaxY,scrollX,scrollY,self,sessionStorage,sidebar,status,statusbar,toolbar,top,URL,window,' +
        'addEventListener,alert,atob,back,blur,btoa,captureEvents,clearImmediate,clearInterval,clearTimeout,close,confirm,disableExternalCapture,dispatchEvent,dump,enableExternalCapture,escape,find,focus,forward,GeckoActiveXObject,getAttention,getAttentionWithCycleCount,getComputedStyle,getSelection,home,matchMedia,maximize,minimize,moveBy,moveTo,mozRequestAnimationFrame,open,openDialog,postMessage,print,prompt,QueryInterface,releaseEvents,removeEventListener,resizeBy,resizeTo,restore,routeEvent,scroll,scrollBy,scrollByLines,scrollByPages,scrollTo,setCursor,setImmediate,setInterval,setResizable,setTimeout,showModalDialog,sizeToContent,stop,unescape,updateCommands,XPCNativeWrapper,XPCSafeJSObjectWrapper,' +
        'onabort,onbeforeunload,onblur,onchange,onclick,onclose,oncontextmenu,ondevicemotion,ondeviceorientation,ondragdrop,onerror,onfocus,onhashchange,onkeydown,onkeypress,onkeyup,onload,onmousedown,onmousemove,onmouseout,onmouseover,onmouseup,onmozbeforepaint,onpaint,onpopstate,onreset,onresize,onscroll,onselect,onsubmit,onunload,onpageshow,onpagehide,' +
        'Image,Option,Worker,' +
        // https://developer.mozilla.org/en/Gecko_DOM_Reference
        'Event,Range,File,FileReader,Blob,BlobBuilder,' +
        'Attr,CDATASection,CharacterData,Comment,console,DocumentFragment,DocumentType,DomConfiguration,DOMError,DOMErrorHandler,DOMException,DOMImplementation,DOMImplementationList,DOMImplementationRegistry,DOMImplementationSource,DOMLocator,DOMObject,DOMString,DOMStringList,DOMTimeStamp,DOMUserData,Entity,EntityReference,MediaQueryList,MediaQueryListListener,NameList,NamedNodeMap,Node,NodeFilter,NodeIterator,NodeList,Notation,Plugin,PluginArray,ProcessingInstruction,SharedWorker,Text,TimeRanges,Treewalker,TypeInfo,UserDataHandler,Worker,WorkerGlobalScope,' +
        'HTMLDocument,HTMLElement,HTMLAnchorElement,HTMLAppletElement,HTMLAudioElement,HTMLAreaElement,HTMLBaseElement,HTMLBaseFontElement,HTMLBodyElement,HTMLBRElement,HTMLButtonElement,HTMLCanvasElement,HTMLDirectoryElement,HTMLDivElement,HTMLDListElement,HTMLEmbedElement,HTMLFieldSetElement,HTMLFontElement,HTMLFormElement,HTMLFrameElement,HTMLFrameSetElement,HTMLHeadElement,HTMLHeadingElement,HTMLHtmlElement,HTMLHRElement,HTMLIFrameElement,HTMLImageElement,HTMLInputElement,HTMLKeygenElement,HTMLLabelElement,HTMLLIElement,HTMLLinkElement,HTMLMapElement,HTMLMenuElement,HTMLMetaElement,HTMLModElement,HTMLObjectElement,HTMLOListElement,HTMLOptGroupElement,HTMLOptionElement,HTMLOutputElement,HTMLParagraphElement,HTMLParamElement,HTMLPreElement,HTMLQuoteElement,HTMLScriptElement,HTMLSelectElement,HTMLSourceElement,HTMLSpanElement,HTMLStyleElement,HTMLTableElement,HTMLTableCaptionElement,HTMLTableCellElement,HTMLTableDataCellElement,HTMLTableHeaderCellElement,HTMLTableColElement,HTMLTableRowElement,HTMLTableSectionElement,HTMLTextAreaElement,HTMLTimeElement,HTMLTitleElement,HTMLTrackElement,HTMLUListElement,HTMLUnknownElement,HTMLVideoElement,' +
        'HTMLCanvasElement,CanvasRenderingContext2D,CanvasGradient,CanvasPattern,TextMetrics,ImageData,CanvasPixelArray,HTMLAudioElement,HTMLVideoElement,NotifyAudioAvailableEvent,HTMLCollection,HTMLAllCollection,HTMLFormControlsCollection,HTMLOptionsCollection,HTMLPropertiesCollection,DOMTokenList,DOMSettableTokenList,DOMStringMap,RadioNodeList,' +
        'SVGDocument,SVGElement,SVGAElement,SVGAltGlyphElement,SVGAltGlyphDefElement,SVGAltGlyphItemElement,SVGAnimationElement,SVGAnimateElement,SVGAnimateColorElement,SVGAnimateMotionElement,SVGAnimateTransformElement,SVGSetElement,SVGCircleElement,SVGClipPathElement,SVGColorProfileElement,SVGCursorElement,SVGDefsElement,SVGDescElement,SVGEllipseElement,SVGFilterElement,SVGFilterPrimitiveStandardAttributes,SVGFEBlendElement,SVGFEColorMatrixElement,SVGFEComponentTransferElement,SVGFECompositeElement,SVGFEConvolveMatrixElement,SVGFEDiffuseLightingElement,SVGFEDisplacementMapElement,SVGFEDistantLightElement,SVGFEFloodElement,SVGFEGaussianBlurElement,SVGFEImageElement,SVGFEMergeElement,SVGFEMergeNodeElement,SVGFEMorphologyElement,SVGFEOffsetElement,SVGFEPointLightElement,SVGFESpecularLightingElement,SVGFESpotLightElement,SVGFETileElement,SVGFETurbulenceElement,SVGComponentTransferFunctionElement,SVGFEFuncRElement,SVGFEFuncGElement,SVGFEFuncBElement,SVGFEFuncAElement,SVGFontElement,SVGFontFaceElement,SVGFontFaceFormatElement,SVGFontFaceNameElement,SVGFontFaceSrcElement,SVGFontFaceUriElement,SVGForeignObjectElement,SVGGElement,SVGGlyphElement,SVGGlyphRefElement,SVGGradientElement,SVGLinearGradientElement,SVGRadialGradientElement,SVGHKernElement,SVGImageElement,SVGLineElement,SVGMarkerElement,SVGMaskElement,SVGMetadataElement,SVGMissingGlyphElement,SVGMPathElement,SVGPathElement,SVGPatternElement,SVGPolylineElement,SVGPolygonElement,SVGRectElement,SVGScriptElement,SVGStopElement,SVGStyleElement,SVGSVGElement,SVGSwitchElement,SVGSymbolElement,SVGTextElement,SVGTextPathElement,SVGTitleElement,SVGTRefElement,SVGTSpanElement,SVGUseElement,SVGViewElement,SVGVKernElement,' +
        'SVGAngle,SVGColor,SVGICCColor,SVGElementInstance,SVGElementInstanceList,SVGLength,SVGLengthList,SVGMatrix,SVGNumber,SVGNumberList,SVGPaint,SVGPoint,SVGPointList,SVGPreserveAspectRatio,SVGRect,SVGStringList,SVGTransform,SVGTransformList,' +
        'SVGAnimatedAngle,SVGAnimatedBoolean,SVGAnimatedEnumeration,SVGAnimatedInteger,SVGAnimatedLength,SVGAnimatedLengthList,SVGAnimatedNumber,SVGAnimatedNumberList,SVGAnimatedPreserveAspectRatio,SVGAnimatedRect,SVGAnimatedString,SVGAnimatedTransformList,' +
        'SVGPathSegList,SVGPathSeg,SVGPathSegArcAbs,SVGPathSegArcRel,SVGPathSegClosePath,SVGPathSegCurvetoCubicAbs,SVGPathSegCurvetoCubicRel,SVGPathSegCurvetoCubicSmoothAbs,SVGPathSegCurvetoCubicSmoothRel,SVGPathSegCurvetoQuadraticAbs,SVGPathSegCurvetoQuadraticRel,SVGPathSegCurvetoQuadraticSmoothAbs,SVGPathSegCurvetoQuadraticSmoothRel,SVGPathSegLinetoAbs,SVGPathSegLinetoHorizontalAbs,SVGPathSegLinetoHorizontalRel,SVGPathSegLinetoRel,SVGPathSegLinetoVerticalAbs,SVGPathSegLinetoVerticalRel,SVGPathSegMovetoAbs,SVGPathSegMovetoRel,ElementTimeControl,TimeEvent,SVGAnimatedPathData,' +
        'SVGAnimatedPoints,SVGColorProfileRule,SVGCSSRule,SVGExternalResourcesRequired,SVGFitToViewBox,SVGLangSpace,SVGLocatable,SVGRenderingIntent,SVGStylable,SVGTests,SVGTextContentElement,SVGTextPositioningElement,SVGTransformable,SVGUnitTypes,SVGURIReference,SVGViewSpec,SVGZoomAndPan');

    /**
     * Order of operation ENUMs.
     * https://developer.mozilla.org/en/JavaScript/Reference/Operators/Operator_Precedence
     */
    Blockly.C.ORDER_ATOMIC = 0; // 0 "" ...
    Blockly.C.ORDER_NEW = 1.1; // new
    Blockly.C.ORDER_MEMBER = 1.2; // . []
    Blockly.C.ORDER_FUNCTION_CALL = 2; // ()
    Blockly.C.ORDER_INCREMENT = 3; // ++
    Blockly.C.ORDER_DECREMENT = 3; // --
    Blockly.C.ORDER_BITWISE_NOT = 4.1; // ~
    Blockly.C.ORDER_UNARY_PLUS = 4.2; // +
    Blockly.C.ORDER_UNARY_NEGATION = 4.3; // -
    Blockly.C.ORDER_LOGICAL_NOT = 4.4; // !
    Blockly.C.ORDER_TYPEOF = 4.5; // typeof
    Blockly.C.ORDER_VOID = 4.6; // void
    Blockly.C.ORDER_DELETE = 4.7; // delete
    Blockly.C.ORDER_DIVISION = 5.1; // /
    Blockly.C.ORDER_MULTIPLICATION = 5.2; // *
    Blockly.C.ORDER_MODULUS = 5.3; // %
    Blockly.C.ORDER_SUBTRACTION = 6.1; // -
    Blockly.C.ORDER_ADDITION = 6.2; // +
    Blockly.C.ORDER_BITWISE_SHIFT = 7; // << >> >>>
    Blockly.C.ORDER_RELATIONAL = 8; // < <= > >=
    Blockly.C.ORDER_IN = 8; // in
    Blockly.C.ORDER_INSTANCEOF = 8; // instanceof
    Blockly.C.ORDER_EQUALITY = 9; // == != === !==
    Blockly.C.ORDER_BITWISE_AND = 10; // &
    Blockly.C.ORDER_BITWISE_XOR = 11; // ^
    Blockly.C.ORDER_BITWISE_OR = 12; // |
    Blockly.C.ORDER_LOGICAL_AND = 13; // &&
    Blockly.C.ORDER_LOGICAL_OR = 14; // ||
    Blockly.C.ORDER_CONDITIONAL = 15; // ?:
    Blockly.C.ORDER_ASSIGNMENT = 16; // = += -= *= /= %= <<= >>= ...
    Blockly.C.ORDER_COMMA = 17; // ,
    Blockly.C.ORDER_NONE = 99; // (...)

    /**
     * List of outer-inner pairings that do NOT require parentheses.
     * @type {!Array.<!Array.<number>>}
     */
    Blockly.C.ORDER_OVERRIDES = [
        // (foo()).bar -> foo().bar
        // (foo())[0] -> foo()[0]
        [Blockly.C.ORDER_FUNCTION_CALL, Blockly.C.ORDER_MEMBER],
        // (foo())() -> foo()()
        [Blockly.C.ORDER_FUNCTION_CALL, Blockly.C.ORDER_FUNCTION_CALL],
        // (foo.bar).baz -> foo.bar.baz
        // (foo.bar)[0] -> foo.bar[0]
        // (foo[0]).bar -> foo[0].bar
        // (foo[0])[1] -> foo[0][1]
        [Blockly.C.ORDER_MEMBER, Blockly.C.ORDER_MEMBER],
        // (foo.bar)() -> foo.bar()
        // (foo[0])() -> foo[0]()
        [Blockly.C.ORDER_MEMBER, Blockly.C.ORDER_FUNCTION_CALL],

        // !(!foo) -> !!foo
        [Blockly.C.ORDER_LOGICAL_NOT, Blockly.C.ORDER_LOGICAL_NOT],
        // a * (b * c) -> a * b * c
        [Blockly.C.ORDER_MULTIPLICATION, Blockly.C.ORDER_MULTIPLICATION],
        // a + (b + c) -> a + b + c
        [Blockly.C.ORDER_ADDITION, Blockly.C.ORDER_ADDITION],
        // a && (b && c) -> a && b && c
        [Blockly.C.ORDER_LOGICAL_AND, Blockly.C.ORDER_LOGICAL_AND],
        // a || (b || c) -> a || b || c
        [Blockly.C.ORDER_LOGICAL_OR, Blockly.C.ORDER_LOGICAL_OR]
    ];

    /**
     * Initialise the database of variable names.
     * @param {!Blockly.Workspace} workspace Workspace to generate code from.
     */
    Blockly.C.init = function (workspace) {
        // Create a dictionary of definitions to be printed before the code.
        Blockly.C.definitions_ = Object.create(null);
        // Create a dictionary mapping desired function names in definitions_
        // to actual function names (to avoid collisions with user functions).
        Blockly.C.functionNames_ = Object.create(null);

        if (!Blockly.C.variableDB_) {
            Blockly.C.variableDB_ =
                new Blockly.Names(Blockly.C.RESERVED_WORDS_);
        } else {
            Blockly.C.variableDB_.reset();
        }

        Blockly.C.variableDB_.setVariableMap(workspace.getVariableMap());
    };

    /**
     * Prepend the generated code with the variable definitions.
     * @param {string} code Generated code.
     * @return {string} Completed code.
     */
    Blockly.C.finish = function (code) {
        var workspace = Blockly.getMainWorkspace();
        var defvars = [];
        // Add user variables.
        var variables = workspace.getAllVariables();
        for (var i = 0; i < variables.length; i++) {
            defvars[i] = {
                name: Blockly.C.variableDB_.getName(variables[i].getId(), Blockly.Variables.NAME_TYPE),
                type: variables[i].c_type
            }
        }

        // Add developer variables (not created or named by the user).
        var devVarList = Blockly.Variables.allDeveloperVariables(workspace);
        for (var i = 0; i < devVarList.length; i++) {
            defvars.push({
                name: Blockly.C.variableDB_.getName(devVarList[i], Blockly.Names.DEVELOPER_VARIABLE_TYPE),
                type: 'var'
            });
        }
        // Declare all of the variables.
        if (defvars.length) {
            var var_code = '';
            for (var i = 0; i < defvars.length; i++) {
                var type = defvars[i].type ? defvars[i].type : 'float';
                if (type === 'String') {
                    var_code += 'String ' + defvars[i].name + ' = "";\n';
                } else {
                    var_code += type + ' ' + defvars[i].name + ';\n';
                }
            }
            Blockly.C.definitions_['variables'] = var_code;
        }

        // Convert the definitions dictionary into a list.
        var definitions = [];
        for (var name in Blockly.C.definitions_) {
            definitions.push(Blockly.C.definitions_[name]);
        }

        // Clean up temporary data.
        delete Blockly.C.definitions_;
        delete Blockly.C.functionNames_;
        Blockly.C.variableDB_.reset();
        return '#include "codecraft_def.h"\n' +
            '#define NULL 0\n' +
            definitions.join('\n') + '\n' + code;

    };

    /**
     * Naked values are top-level blocks with outputs that aren't plugged into
     * anything.  A trailing semicolon is needed to make this legal.
     * @param {string} line Line of generated code.
     * @return {string} Legal line of code.
     */
    Blockly.C.scrubNakedValue = function (line) {
        return line + ';\n';
    };

    /**
     * Encode a string as a properly escaped JavaScript string, complete with
     * quotes.
     * @param {string} string Text to encode.
     * @return {string} JavaScript string.
     * @private
     */
    Blockly.C.quote_ = function (string) {
        // Can't use goog.string.quote since Google's style guide recommends
        // JS string literals use single quotes.
        string = string.replace(/\\/g, '\\\\')
            .replace(/\n/g, '\\\n')
            .replace(/"/g, '\\\"');
        return '"' + string + '"';
    };

    /**
     * Common tasks for generating JavaScript from blocks.
     * Handles comments for the specified block and any connected value blocks.
     * Calls any statements following this block.
     * @param {!Blockly.Block} block The current block.
     * @param {string} code The JavaScript code created for this block.
     * @return {string} JavaScript code with comments and subsequent blocks added.
     * @private
     */
    Blockly.C.scrub_ = function (block, code) {
        var commentCode = '';
        // Only collect comments for blocks that aren't inline.
        if (!block.outputConnection || !block.outputConnection.targetConnection) {
            // Collect comment for this block.
            var comment = block.getCommentText();
            comment = Blockly.utils.wrap(comment, Blockly.C.COMMENT_WRAP - 3);
            if (comment) {
                if (block.getProcedureDef) {
                    // Use a comment block for function comments.
                    commentCode += '/**\n' +
                        Blockly.C.prefixLines(comment + '\n', ' * ') +
                        ' */\n';
                } else {
                    commentCode += Blockly.C.prefixLines(comment + '\n', '// ');
                }
            }
            // Collect comments for all value arguments.
            // Don't collect comments for nested statements.
            for (var i = 0; i < block.inputList.length; i++) {
                if (block.inputList[i].type == Blockly.INPUT_VALUE) {
                    var childBlock = block.inputList[i].connection.targetBlock();
                    if (childBlock) {
                        var comment = Blockly.C.allNestedComments(childBlock);
                        if (comment) {
                            commentCode += Blockly.C.prefixLines(comment, '// ');
                        }
                    }
                }
            }
        }
        var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
        var nextCode = Blockly.C.blockToCode(nextBlock);
        return commentCode + code + nextCode;
    };

    /**
     * Gets a property and adjusts the value while taking into account indexing.
     * @param {!Blockly.Block} block The block.
     * @param {string} atId The property ID of the element to get.
     * @param {number=} opt_delta Value to add.
     * @param {boolean=} opt_negate Whether to negate the value.
     * @param {number=} opt_order The highest order acting on this value.
     * @return {string|number}
     */
    Blockly.C.getAdjusted = function (block, atId, opt_delta, opt_negate,
        opt_order) {
        var delta = opt_delta || 0;
        var order = opt_order || Blockly.C.ORDER_NONE;
        if (block.workspace.options.oneBasedIndex) {
            delta--;
        }
        var defaultAtIndex = block.workspace.options.oneBasedIndex ? '1' : '0';
        if (delta > 0) {
            var at = Blockly.C.valueToCode(block, atId,
                Blockly.C.ORDER_ADDITION) || defaultAtIndex;
        } else if (delta < 0) {
            var at = Blockly.C.valueToCode(block, atId,
                Blockly.C.ORDER_SUBTRACTION) || defaultAtIndex;
        } else if (opt_negate) {
            var at = Blockly.C.valueToCode(block, atId,
                Blockly.C.ORDER_UNARY_NEGATION) || defaultAtIndex;
        } else {
            var at = Blockly.C.valueToCode(block, atId, order) ||
                defaultAtIndex;
        }

        if (Blockly.isNumber(at)) {
            // If the index is a naked number, adjust it right now.
            at = parseFloat(at) + delta;
            if (opt_negate) {
                at = -at;
            }
        } else {
            // If the index is dynamic, adjust it in code.
            if (delta > 0) {
                at = at + ' + ' + delta;
                var innerOrder = Blockly.C.ORDER_ADDITION;
            } else if (delta < 0) {
                at = at + ' - ' + -delta;
                var innerOrder = Blockly.C.ORDER_SUBTRACTION;
            }
            if (opt_negate) {
                if (delta) {
                    at = '-(' + at + ')';
                } else {
                    at = '-' + at;
                }
                var innerOrder = Blockly.C.ORDER_UNARY_NEGATION;
            }
            innerOrder = Math.floor(innerOrder);
            order = Math.floor(order);
            if (innerOrder && order >= innerOrder) {
                at = '(' + at + ')';
            }
        }
        return at;
    };

}

