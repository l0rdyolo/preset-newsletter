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
    list?: Array<{ value: string; name: string; className?: string }>;
    properties?: Array<{ name: string; property: string }>;
  }>;
}

export default function(editor: Editor, opts: Required<PluginOptions>) {
    editor.on('load', () => {
        // Remove all sectors first
        editor.StyleManager.getSectors().reset();
        let sectors = editor.StyleManager.getSectors();
        let styleManagerSectors: StyleManagerSector[] = [];
        if (opts.updateStyleManager) {
             styleManagerSectors = [{
                name: 'Dimension',
                open: false,
                buildProps: ['width', 'height', 'max-width', 'min-height', 'margin', 'padding'],
                properties:[{
                  property: 'margin',
                  properties:[
                    { name: 'Top', property: 'margin-top'},
                    { name: 'Left', property: 'margin-left'},
                    { name: 'Right', property: 'margin-right'},
                    { name: 'Bottom', property: 'margin-bottom'}
                  ],
                },{
                  property  : 'padding',
                  properties:[
                    { name: 'Top', property: 'padding-top'},
                    { name: 'Right', property: 'padding-right'},
                    { name: 'Bottom', property: 'padding-bottom'},
                    { name: 'Left', property: 'padding-left'}
                  ],
                }],
              },{
                name: 'Typography',
                open: false,
                buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', 'text-align', 'text-decoration', 'font-style', 'vertical-align', 'text-shadow'],
                properties:[
                  { name: 'Font', property: 'font-family'},
                  { name: 'Weight', property: 'font-weight'},
                  { name: 'Font color', property: 'color'},
                  {
                    property: 'text-align',
                    type: 'radio',
                    default: 'left',
                    list: [
                      { value: 'left', name: 'Left', className: 'fa fa-align-left'},
                      { value: 'center', name: 'Center', className: 'fa fa-align-center' },
                      { value: 'right', name: 'Right', className: 'fa fa-align-right'},
                      { value: 'justify', name: 'Justify', className: 'fa fa-align-justify'}
                    ],
                  },{
                    property: 'text-decoration',
                    type: 'radio',
                    default: 'none',
                    list: [
                      { value: 'none', name: 'None', className: 'fa fa-times'},
                      { value: 'underline', name: 'Underline', className: 'fa fa-underline' },
                      { value: 'line-through', name: 'Line-through', className: 'fa fa-strikethrough'}
                    ],
                  },{
                    property: 'font-style',
                    type: 'radio',
                    default: 'normal',
                    list: [
                      { value: 'normal', name: 'Normal', className: 'fa fa-font'},
                      { value: 'italic', name: 'Italic', className: 'fa fa-italic'}
                    ],
                  },{
                    property: 'vertical-align',
                    type: 'select',
                    default: 'baseline',
                    list: [
                      { value: 'baseline', name: 'Baseline'},
                      { value: 'top', name: 'Top'},
                      { value: 'middle', name: 'Middle'},
                      { value: 'bottom', name: 'Bottom'}
                    ],
                  },{
                    property: 'text-shadow',
                    properties: [
                      { name: 'X position', property: 'text-shadow-h'},
                      { name: 'Y position', property: 'text-shadow-v'},
                      { name: 'Blur', property: 'text-shadow-blur'},
                      { name: 'Color', property: 'text-shadow-color'}
                    ],
                }],
              },{
                name: 'Decorations',
                open: false,
                buildProps: ['background-color', 'border-collapse', 'border-radius', 'border', 'background'],
                properties: [{
                  property: 'background-color',
                  name: 'Background',
                },{
                  property: 'border-radius',
                  properties  : [
                    { name: 'Top', property: 'border-top-left-radius'},
                    { name: 'Right', property: 'border-top-right-radius'},
                    { name: 'Bottom', property: 'border-bottom-left-radius'},
                    { name: 'Left', property: 'border-bottom-right-radius'}
                  ],
                },{
                  property: 'border-collapse',
                  type: 'radio',
                  default: 'separate',
                  list: [
                    { value: 'separate', name: 'No'},
                    { value: 'collapse', name: 'Yes'}
                  ],
                },
                {
                  property: 'border',
                  properties: [
                    { name: 'Width', property: 'border-width'},
                    { name: 'Style', property: 'border-style'},
                    { name: 'Color', property: 'border-color'},
                  ],
                },{
                  property: 'background',
                  properties: [
                    { name: 'Image', property: 'background-image'},
                    { name: 'Repeat', property:   'background-repeat'},
                    { name: 'Position', property: 'background-position'},
                    { name: 'Attachment', property: 'background-attachment'},
                    { name: 'Size', property: 'background-size'}
                  ],
                }],
            }];

        }
        sectors.reset();
        sectors.add(styleManagerSectors);
    });
}