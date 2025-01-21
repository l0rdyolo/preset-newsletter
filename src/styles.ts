import type { Editor } from 'grapesjs';
import { PluginOptions } from '.';

// Define a type for the style manager sector
interface StyleManagerSector {
  name: string;
  open: boolean;
  buildProps?: string[];
  properties: Array<{
    property: string;
    name?: string;
    type?: string;
    default?: string;
    units?: string[];
    list?: Array<{ value: string; name: string; className?: string }>;
    properties?: Array<{ name: string; property: string; type?: string; default?: string; units?: string[] }>;
  }>;
}

export default function(editor: Editor, opts: Required<PluginOptions>) {
    editor.on('load', () => {
        // Remove all sectors first
        editor.StyleManager.getSectors().reset();
        let sectors = editor.StyleManager.getSectors();
        let styleManagerSectors: StyleManagerSector[] = [];
        if (opts.updateStyleManager) {
             styleManagerSectors = [
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
                        { name: 'Height', property: 'height', type: 'number', default: '50vh', units: ['vh']  },
                    ],
                },
                {
                    name: 'Color and Background',
                    open: false,
                    buildProps: ['color', 'background-color', 'background-gradient'],
                    properties: [
                        { name: 'Text Color', property: 'color', type: 'color', default: '#000000' },
                        { name: 'Background Color', property: 'background-color', type: 'color', default: '#ffffff' },
                        { name: 'Background Gradient', property: 'background-gradient', type: 'gradient' }
                    ],
                },
                {
                    name: 'Borders',
                    open: false,
                    buildProps: ['border-width', 'border-color', 'border-radius'],
                    properties: [
                        { name: 'Border Width', property: 'border-width', type: 'number', default: '0.1vw', units: ['vw'] },
                        { name: 'Border Color', property: 'border-color', type: 'color', default: '#000000' },
                        { name: 'Border Radius', property: 'border-radius', type: 'number', default: '1vw', units: ['vw'] }
                    ],
                },
                {
                    name: 'Typography and Text',
                    open: false,
                    buildProps: ['font-family', 'font-weight', 'text-transform'],
                    properties: [
                        { name: 'Font Family', property: 'font-family', type: 'select', list: [
                            { value: 'Arial', name: 'Arial' },
                            { value: 'Helvetica', name: 'Helvetica' },
                            { value: 'Times New Roman', name: 'Times New Roman' }
                        ]},
                        { name: 'Font Weight', property: 'font-weight', type: 'select', list: [
                            { value: 'normal', name: 'Normal' },
                            { value: 'bold', name: 'Bold' },
                            { value: 'bolder', name: 'Bolder' }
                        ]},
                        { name: 'Text Transform', property: 'text-transform', type: 'select', list: [
                            { value: 'none', name: 'None' },
                            { value: 'uppercase', name: 'Uppercase' },
                            { value: 'lowercase', name: 'Lowercase' }
                        ]}
                    ],
                },
                {
                    name: 'Effects',
                    open: false,
                    buildProps: ['hover-effect', 'box-shadow', 'transition'],
                    properties: [
                        { name: 'Hover Effect', property: 'hover-effect', type: 'text' },
                        { name: 'Shadow', property: 'box-shadow', type: 'text' },
                        { name: 'Transition', property: 'transition', type: 'text' }
                    ],
                },
                {
                    name: 'Positioning and Alignment',
                    open: false,
                    buildProps: ['justify-content', 'align-items'],
                    properties: [
                        { name: 'Horizontal Alignment', property: 'justify-content', type: 'select', list: [
                            { value: 'flex-start', name: 'Start' },
                            { value: 'center', name: 'Center' },
                            { value: 'flex-end', name: 'End' }
                        ]},
                        { name: 'Vertical Alignment', property: 'align-items', type: 'select', list: [
                            { value: 'flex-start', name: 'Start' },
                            { value: 'center', name: 'Center' },
                            { value: 'flex-end', name: 'End' }
                        ]}
                    ],
                }
            ];
        }
        sectors.reset();
        sectors.add(styleManagerSectors);
    });
}