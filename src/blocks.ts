import type { Editor, BlockProperties } from 'grapesjs';
import { PluginOptions } from '.';

export default function(editor: Editor, opts: Required<PluginOptions>) {
  const bm = editor.Blocks;
  let tableStyleStr = '';
  let cellStyleStr = '';
  let tableStyle = opts.tableStyle || {};
  let cellStyle = opts.cellStyle || {};

  const addBlock = (id: string, blockDef: BlockProperties) => {
    opts.blocks.indexOf(id)! >= 0 && editor.Blocks.add(id, {
      select: true,
      ...blockDef,
      ...opts.block(id),
    });
  }

  for (let prop in tableStyle){
    tableStyleStr += `${prop}: ${tableStyle[prop]}; `;
  }
  for (let prop in cellStyle){
    cellStyleStr += `${prop}: ${cellStyle[prop]}; `;
  }

  // Register custom image component
  editor.DomComponents.addType('custom-image', {
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
          padding: '0',
          backgroundColor: 'red'
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
        ]
      },
      init() {
        this.on('dblclick', () => {
          editor.runCommand('open-assets', {
            target: this.find('img')[0],
            types: ['image'],
            accept: 'image/*'
          });
        });
      }
    }
  });

  addBlock('button', {
    label: 'Button',
    media: `<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M20 20.5C20 21.3 19.3 22 18.5 22H13C12.6 22 12.3 21.9 12 21.6L8 17.4L8.7 16.6C8.9 16.4 9.2 16.3 9.5 16.3H9.7L12 18V9C12 8.4 12.4 8 13 8S14 8.4 14 9V13.5L15.2 13.6L19.1 15.8C19.6 16 20 16.6 20 17.1V20.5M20 2H4C2.9 2 2 2.9 2 4V12C2 13.1 2.9 14 4 14H8V12H4V4H20V12H18V14H20C21.1 14 22 13.1 22 12V4C22 2.9 21.1 2 20 2Z" />
    </svg>`,
    content: '<a class="button">Button</a>',
  });

  editor.BlockManager.add('custom-image', {
    label: 'Centered Image',
    media: `<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M21,3H3C2,3 1,4 1,5V19A2,2 0 0,0 3,21H21C22,21 23,20 23,19V5C23,4 22,3 21,3M5,17L8.5,12.5L11,15.5L14.5,11L19,17H5Z" />
    </svg>`,
    content: { type: 'custom-image' }
  });
};
