import type { Editor } from 'grapesjs';

export default class CustomComponent {
    protected editor: Editor;
    protected type: string;

    constructor(editor: Editor, type: string) {
        this.editor = editor;
        this.type = type;
    }

    protected registerComponent() {
        // Base component registration logic
    }

    protected registerBlock() {
        // Base block registration logic
    }

    protected getDefaults() {
        return {};
    }

    protected getBlockLabel() {
        return this.type;
    }
} 