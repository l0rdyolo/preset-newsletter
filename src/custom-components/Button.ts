import type { Editor } from 'grapesjs';
import { StyleManagerSector } from '../uilts/StyleManagerSector';

export const type = 'vl-button';

export default (editor: Editor) => {
     console.log(
     editor.Components.getAll()
          
     )
     editor.Components.addType(type, {
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

  editor.on('component:selected', (component) => {
     console.log(component.attributes)
    if (component.attributes.tagName === "button") {
     editor.StyleManager.getSectors().reset();
      let sectors = editor.StyleManager.getSectors();
      let styleManagerSectors: StyleManagerSector[] = [
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
          buildProps: ['color', 'font-size', 'font-weight', 'letter-spacing', 'text-transform'],
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
      
      sectors.reset();
      sectors.add(styleManagerSectors);
    }
    else {
        editor.StyleManager.getSectors().reset();
    }
  });
}; 