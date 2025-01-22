import type { Editor } from 'grapesjs';
import { StyleManagerSector } from '../uilts/StyleManagerSector';
import CustomComponent from './CustomComponent';

export const type = 'vl-button';

export default class Button extends CustomComponent {
  private styleManagerSectors: StyleManagerSector[];
  constructor(editor: Editor, type: string) {
    super(editor, type);
    this.editor = editor;
    this.type = type;
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
      },
      {
        name: 'Animation',
        open: false,
        buildProps: ['animation-name', 'animation-duration', 'animation-timing-function', 'animation-delay', 'animation-iteration-count'],
        properties: [
          {
            name: 'Animation Type',
            property: 'animation-name',
            type: 'select',
            default: 'none',
            list: [
              { value: 'none', name: 'None' },
              { value: 'pulse', name: 'Pulse' },
              { value: 'bounce', name: 'Bounce' },
              { value: 'fadeIn', name: 'Fade In' },
              { value: 'slideIn', name: 'Slide In' }
            ]
          },
          {
            name: 'Duration',
            property: 'animation-duration',
            type: 'number',
            units: ['s'],
            default: '1s'
          },
          {
            name: 'Timing',
            property: 'animation-timing-function',
            type: 'select',
            list: [
              { value: 'ease', name: 'Ease' },
              { value: 'linear', name: 'Linear' },
              { value: 'ease-in', name: 'Ease In' },
              { value: 'ease-out', name: 'Ease Out' },
              { value: 'ease-in-out', name: 'Ease In Out' }
            ]
          },
          {
            name: 'Delay',
            property: 'animation-delay',
            type: 'number',
            units: ['s'],
            default: '0s'
          },
          {
            name: 'Iteration',
            property: 'animation-iteration-count',
            type: 'select',
            list: [
              { value: '1', name: 'Once' },
              { value: '2', name: 'Twice' },
              { value: 'infinite', name: 'Infinite' }
            ]
          }
        ]
      }
    ];
    this.registerComponent();
  }

  protected registerComponent() {
    const componentType = this.type;

    this.editor.Components.addType(this.type, {
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
          traits: ['title']
        },
  
        init() {
          this.on('change:style', this.handleStyleChange);
        },
  
        handleStyleChange() {
          const style = this.get('style');
          this.view?.updateStyle();
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
  }

  protected registerBlock() {
    this.editor.BlockManager.add(this.type, {
      label: this.getBlockLabel(),
      content: { type: this.type }
    });
  }

  protected getDefaults() {
    return {
      // Component varsayılan özellikleri
    };
  }

  protected getBlockLabel() {
    return this.type;
  }
} 