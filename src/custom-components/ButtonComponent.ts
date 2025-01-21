import type { Editor } from 'grapesjs';

export default class ButtonComponent {
    private editor: Editor;

    constructor(editor: Editor) {
        this.editor = editor;
        this.init();
    }

    private init() {
        this.editor.StyleManager.addSector('button-styles', {
            name: 'Button Styles',
            open: true,
            buildProps: ['color', 'background-color'],
            properties: [{
                type: 'color',
                name: 'color',
                property: 'color',
                label: 'Text Color',
                default: '#ffffff'
            }, {
                type: 'color',
                name: 'background-color',
                property: 'background-color',
                label: 'Background Color',
                default: '#000000'
            }]
        });
        this.editor.DomComponents.addType('custom-button', {
            model: {
                defaults: {
                    tagName: 'div',
                    attributes: { class: 'button-container' },
                    stylable: ['color', 'background-color'],
                    traits: [
                        {
                            type: 'text',
                            name: 'buttonText',
                            label: 'Button Text',
                            changeProp: true,
                            default: 'SHOP NOW'
                        }
                    ]
                },
                init() {
                    this.on('change:buttonText', this.updateText);
                    this.removeId();
                },
                updateText() {
                    const text = this.get('buttonText');
                    const button = this.find('button')[0];
                    if (button) {
                        button.set('content', text);
                    }
                },
                removeId() {
                    if (this.getId()) {
                        this.setId('');
                    }
                }
            },
            isComponent: (el) => el.classList?.contains('button-container')
        });
    }

    addBlock() {
        this.editor.BlockManager.add('custom-button', {
            label: 'Responsive Button',
            media: `<svg viewBox="0 0 24 24">
                <path fill="currentColor" d="M20,20.5C20,21.3 19.3,22 18.5,22H13C12.6,22 12.3,21.9 12,21.6L8,17.4L8.7,16.6C8.9,16.4 9.2,16.3 9.5,16.3H9.7L12,18V9C12,8.4 12.4,8 13,8S14,8.4 14,9V13.5L15.2,13.6L19.1,15.8C19.6,16 20,16.6 20,17.1V20.5Z" />
            </svg>`,
            content: `
                        <div style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007bff; border: none; border-radius: 5px; cursor: pointer; text-align: center; transition: background-color 0.3s ease;" onclick="alert('Button clicked!')">
            Button Label
            </div>
`,
        });
    }
} 