import type { Editor } from 'grapesjs';
import { StyleManagerSector } from '../uilts/StyleManagerSector';

export const type = 'vl-image';

export default class Image {
  private editor: Editor;
  private styleManagerSectors: StyleManagerSector[];

  constructor(editor: Editor) {
    this.editor = editor;
    this.styleManagerSectors = [
      {
        name: 'Size and Layout',
        open: false,
        buildProps: ['padding', 'margin', 'width', 'height'],
        properties: [
          {
            name: 'Padding',
            property: 'padding',
            type: 'number', default: '1vh', units: ['vh']
          },
          {
            name: 'Margin',
            property: 'margin',
            type: 'composite',
            properties: [
              { name: 'Top', property: 'margin-top', type: 'number', default: '0vh', units: ['vh'] },
              { name: 'Left', property: 'margin-left', type: 'number', default: '0vh', units: ['vh'] }
            ]
          },
          { name: 'Width', property: 'width', type: 'number', default: '50vw', units: ['vw'] },
          { name: 'Height', property: 'height', type: 'number', default: '50vh', units: ['vh'] },
        ],
      },
      {
        name: 'Color and Background',
        open: false,
        buildProps: ['background-color'],
        properties: [
          { name: 'Background Color', property: 'background-color', type: 'color', default: '#ffffff' },
        ],
      },
    ];
    this.init();
  }

  private init() {
    this.editor.Components.addType(type, {
      isComponent: el => el.tagName === 'img',
      extend: 'image',
      model: {
        defaults: {
          name: 'Image',
          resizable: true,
          highlightable: false,
          attributes: {
            src: 'https://picsum.photos/350/250'
          },
          stylable: [

          ],
          style: {
            'padding-top': '1vh',
            'padding-left': '1vh',
            'margin-top': '15vh',
            'margin-left': '0vh',
            width: '50vw',
            height: '50vh',
            align: 'center',
            'animation-duration': '1s',
            'animation-delay': '0s',
            'animation-timing-function': 'ease',
            'animation-iteration-count': '1'
          },
          traits: ['alt', 'title'],
        },

        init() {
          this.on('change:style', this.handleStyleChange);
        },

        handleStyleChange() {
          const animationName = this.get('style')['animation-name'];
          if (animationName && animationName !== 'none') {
            this.updateAnimation();
          }
        },

        updateAnimation() {
          const style = this.get('style');
          const el = this.view?.el;
          if (!el) return;

          const animationProps = {
            'animation-name': style['animation-name'],
            'animation-duration': style['animation-duration'],
            'animation-delay': style['animation-delay'],
            'animation-timing-function': style['animation-timing-function'],
            'animation-iteration-count': style['animation-iteration-count']
          };

          Object.entries(animationProps).forEach(([key, value]) => {
            if (value) el.style[key as any] = value;
          });
        }
      },

      view: {
        tagName() { return 'img'; },
        events() {
          return {
            dblclick: 'onActive'
          };
        },

        onActive() {
          const em = this.em;
          const editor = em?.Editor;
          
          editor?.runCommand('open-assets', {
            target: this.model,
            types: ['image'],
            accept: 'image/*'
          });
        },

        init() {
          this.listenTo(this.model, 'change:style', this.updateStyle);
        },

        updateStyle() {
          const model = this.model;
          const style = model.get('style');
          if (!style) return;

          Object.entries(style).forEach(([prop, value]) => {
            this.el.style[prop as any] = value as string;
          });
        }
      }
    });

    // Component specific style manager
    this.editor.on('component:selected', (component) => {
      if (component.attributes.tagName === 'img') {
        this.editor.StyleManager.getSectors().reset();
        this.editor.StyleManager.getSectors().add(this.styleManagerSectors);
      }
    });
  }
}