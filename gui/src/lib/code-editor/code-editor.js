class CodeEditor {
    constructor() {
        this.editor = null;
        this.model = null;
        this.code = '';
        this.language = 'python';
    }

    init(el) {
        this.model = monaco.editor.createModel('myModel');
        this.editor = monaco.editor.create(el, {
            model: this.model,
            theme: 'vs',
            autoIndent: true,
            formatOnPaste: true,
            automaticLayout: true,
            highlightActiveIndentGuide: false,
            iconsInSuggestions: false,
            lineNumbers: true,
            links: false,
            lineHeight: 25,
            matchBrackets: false,
            minimap: {
                enabled: false
            },
            overviewRulerBorder: false,
            readOnly: true,
            wordWrap: 'off',
            scrollbar: {
                verticalHasArrows: true,
                verticalScrollbarSize: 8
            },
            wrappingIndent: 'none'
            // rulers:[1,2]
            // colorDecorators: true
            // smoothScrolling: true,
            // stopRenderingLineAfter: -1
        });
        monaco.languages.setLanguageConfiguration('javascript', {
            indentationRules: {
                // ^(.*\*/)?\s*\}.*$
                decreaseIndentPattern: /^((?!.*?\/\*).*\*\/)?\s*[\}\]\)].*$/,
                // ^.*\{[^}"']*$
                increaseIndentPattern: /^((?!\/\/).)*(\{[^}"'`]*|\([^)"'`]*|\[[^\]"'`]*)$/
            }
        });
        this.setValue(this.code);
        this.setLanguage(this.language);
    }

    setValue(value) {
        this.code = value;
        if (!this.editor) return;
        this.editor.setValue(this.code);
    }

    getValue() {
        return this.code;
    }


    setLanguage(language) {
        this.language = language;
        if (!this.editor) return;
        monaco.editor.setModelLanguage(this.model, this.language);
    }


}

export default new CodeEditor();

