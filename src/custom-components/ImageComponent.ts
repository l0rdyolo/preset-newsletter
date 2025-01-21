import type { Editor } from 'grapesjs';

export default class ImageComponent {
    private editor: Editor;

    constructor(editor: Editor) {
        this.editor = editor;
        this.init();
    }

    private init() {
        this.editor.DomComponents.addType('custom-image', {
            model: {
                defaults: {
                    tagName: 'div',
                    droppable: false,
                    attributes: { class: 'image-container' },
                    style: {
                        position: 'relative',
                        width: '100vw',
                        height: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '0',
                        padding: '0'
                    },
                    components: [{
                        type: 'image',
                        style: {
                            position: 'relative',
                            maxWidth: '100%',
                            maxHeight: '100%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            objectFit: 'contain',
                            margin: '0',
                            padding: '0'
                        },
                        attributes: {   
                            src: 'https://picsum.photos/200/300'   
                        }
                    }],
                    traits: [
                        {
                            type: 'button',
                            text: 'Select Image',
                            command: (editor: Editor) => {
                                const selected = editor.getSelected();
                                editor.runCommand('open-assets', {
                                    target: selected?.find('img')[0],
                                    types: ['image'],
                                    accept: 'image/*'
                                });
                            }
                        }
                    ],
                    stylable: false,
                },
                init() {
                    this.on('dblclick', () => {
                        this.editor.runCommand('open-assets', {
                            target: this.find('img')[0],
                            types: ['image'],
                            accept: 'image/*'
                        });
                    });
                }
            },
        });
    }

    addBlock() {
        this.editor.BlockManager.add('custom-image', {
            label: 'Centered Image',
            media: `<svg viewBox="0 0 24 24">
                <path fill="currentColor" d="M21,3H3C2,3 1,4 1,5V19A2,2 0 0,0 3,21H21C22,21 23,20 23,19V5C23,4 22,3 21,3M5,17L8.5,12.5L11,15.5L14.5,11L19,17H5Z" />
            </svg>`,
            content: { type: 'custom-image' }
        });
    }
} 