import type { Editor } from 'grapesjs';
import { StyleManagerSector } from '../uilts/StyleManagerSector';

export const type = 'vl-button';

export default class Button {
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
            type: 'number',
            default: '1vh',
            units: ['vh']
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
          { name: 'Height', property: 'height', type: 'number', default: '10vh', units: ['vh'] }
        ]
      },
      {
        name: 'Typography',
        open: false,
        buildProps: ['color', 'font-size', 'font-weight', 'letter-spacing'],
        properties: [
          { name: 'Text Color', property: 'color', type: 'color', default: '#ffffff' },
          { name: 'Font Size', property: 'font-size', type: 'number', default: '10px', units: ['px'] },
          { name: 'Font Weight', property: 'font-weight', type: 'select', list: [
            { value: 'normal', name: 'Normal' },
            { value: 'bold', name: 'Bold' }
          ]},
          { name: 'Letter Spacing', property: 'letter-spacing', type: 'number', default: '0.2em', units: ['em'] }
        ]
      },
      {
        name: 'Background',
        open: false,
        buildProps: ['background-color', 'border-radius', 'border'],
        properties: [
          { name: 'Background Color', property: 'background-color', type: 'color', default: '#000000' },
          { name: 'Border Radius', property: 'border-radius', type: 'number', default: '1vh', units: ['vh'] }
        ]
      }
    ];
    this.init();
  }

  private init() {
    this.editor.Components.addType(type, {
      isComponent: el => el.tagName === type,
      extend: 'button',
      model: {
        defaults: {
          name: 'Button',
          resizable: true,
          highlightable: false,
          attributes: {
            type: type,
            class: 'custom-button'
          },
          style: {
            'padding-top': '1vh',
            'padding-left': '1vh',
            'margin-top': '15vh',
            'margin-left': '0vh',
            width: '50vw',
            height: '10vh',
            'background-color': '#000000',
            color: '#ffffff',
            'font-size': '2vh',
            'border-radius': '1vh',
            border: 'none',
            cursor: 'pointer',
            'text-transform': 'uppercase',
            'font-weight': 'bold',
            'letter-spacing': '0.2em'
          },
          content: 'Click Me',
          traits: ['title']
        },
        init() {
          console.log("Button init called");
          const em = this.em;
          
          this.on('change:style', this.handleStyleChange);
          
          em?.on('component:selected', (component) => {
            if (component === this) {
              console.log("Button selected");
              this.handleComponentSelected();
            }
          });
          this.listenTo(this.model, 'change:style', this.updateStyle);
        },
        handleStyleChange() {
          console.log("Style changed");
          const style = this.get('style');
          this.view?.updateStyle();
        },
        handleComponentSelected() {
          console.log("Button component selected");
        },
        updateStyle() {
          const model = this.model;
          const style = model.get('style');
          if (!style) return;

          Object.entries(style).forEach(([prop, value]) => {
            this.el.style[prop as any] = value as string;
          });
        }
      },
      view: {
        tagName() { return type; },
        events() {
          return {
            dblclick: 'onActive'
          };
        },
        onActive() {
          // Handle button click if needed
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
      if (component.attributes.tagName === 'button') {
        this.editor.StyleManager.getSectors().reset();
        this.editor.StyleManager.getSectors().add(this.styleManagerSectors);
      }
    });
  }
} 