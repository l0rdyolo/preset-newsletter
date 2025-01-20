import type { Editor } from 'grapesjs';
import { PluginOptions } from '.';

export default function(editor: Editor, opts: Required<PluginOptions>) {
    // Remove all sectors first
    editor.StyleManager.getSectors().reset();

    // if (opts.updateStyleManager) {
    //     const styleManagerSectors = [{
    //         name: 'Dimension',
    //         open: false,
    //         buildProps: ['width', 'height', 'margin', 'padding'],
    //         properties:[{
    //           property: 'width',
    //           units: ['vw'],
    //           defaults: '10vw',
    //         },{
    //           property: 'height',
    //           units: ['vh'],
    //           defaults: '10vh',
    //         },{
    //           property: 'margin',
    //           properties:[
    //             { name: 'Top', property: 'margin-top', units: ['vh'], defaults: '0vh'},
    //             { name: 'Left', property: 'margin-left', units: ['vw'], defaults: '0vw'},
    //             { name: 'Right', property: 'margin-right', units: ['vw'], defaults: '0vw'},
    //             { name: 'Bottom', property: 'margin-bottom', units: ['vh'], defaults: '0vh'}
    //           ],
    //         },{
    //           property: 'padding',
    //           properties:[
    //             { name: 'Top', property: 'padding-top', units: ['vh'], defaults: '0vh'},
    //             { name: 'Right', property: 'padding-right', units: ['vw'], defaults: '0vw'},
    //             { name: 'Bottom', property: 'padding-bottom', units: ['vh'], defaults: '0vh'},
    //             { name: 'Left', property: 'padding-left', units: ['vw'], defaults: '0vw'}
    //           ],
    //         }],
    //       },{
    //         name: 'Typography',
    //         open: false,
    //         buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', 'text-align', 'text-decoration', 'font-style', 'vertical-align', 'text-shadow'],
    //         properties:[
    //           { name: 'Font', property: 'font-family'},
    //           { name: 'Weight', property: 'font-weight'},
    //           { name: 'Font color', property: 'color'},
    //           {
    //             property: 'text-align',
    //             type: 'radio',
    //             defaults: 'left',
    //             list: [
    //               { value: 'left', name: 'Left', className: 'fa fa-align-left'},
    //               { value: 'center', name: 'Center', className: 'fa fa-align-center' },
    //               { value: 'right', name: 'Right', className: 'fa fa-align-right'},
    //               { value: 'justify', name: 'Justify', className: 'fa fa-align-justify'}
    //             ],
    //           },{
    //             property: 'text-decoration',
    //             type: 'radio',
    //             defaults: 'none',
    //             list: [
    //               { value: 'none', name: 'None', className: 'fa fa-times'},
    //               { value: 'underline', name: 'underline', className: 'fa fa-underline' },
    //               { value: 'line-through', name: 'Line-through', className: 'fa fa-strikethrough'}
    //             ],
    //           },{
    //             property: 'font-style',
    //             type: 'radio',
    //             defaults: 'normal',
    //             list: [
    //               { value: 'normal', name: 'Normal', className: 'fa fa-font'},
    //               { value: 'italic', name: 'Italic', className: 'fa fa-italic'}
    //             ],
    //           },{
    //             property: 'vertical-align',
    //             type: 'select',
    //             defaults: 'baseline',
    //             list: [
    //               { value: 'baseline'},
    //               { value: 'top'},
    //               { value: 'middle'},
    //               { value: 'bottom'}
    //             ],
    //           },{
    //             property: 'text-shadow',
    //             properties: [
    //               { name: 'X position', property: 'text-shadow-h'},
    //               { name: 'Y position', property: 'text-shadow-v'},
    //               { name: 'Blur', property: 'text-shadow-blur'},
    //               { name: 'Color', property: 'text-shadow-color'}
    //             ],
    //         }],
    //       },{
    //         name: 'Decorations',
    //         open: false,
    //         buildProps: ['background-color', 'border-collapse', 'border-radius', 'border', 'background'],
    //         properties: [{
    //           property: 'background-color',
    //           name: 'Background',
    //         },{
    //           property: 'border-radius',
    //           properties  : [
    //             { name: 'Top', property: 'border-top-left-radius'},
    //             { name: 'Right', property: 'border-top-right-radius'},
    //             { name: 'Bottom', property: 'border-bottom-left-radius'},
    //             { name: 'Left', property: 'border-bottom-right-radius'}
    //           ],
    //         },{
    //           property: 'border-collapse',
    //           type: 'radio',
    //           defaults: 'separate',
    //           list: [
    //             { value: 'separate', name: 'No'},
    //             { value: 'collapse', name: 'Yes'}
    //           ],
    //         },
    //         {
    //           property: 'border',
    //           properties: [
    //             { name: 'Width', property: 'border-width', defaults: '0'},
    //             { name: 'Style', property: 'border-style'},
    //             { name: 'Color', property: 'border-color'},
    //           ],
    //         },{
    //           property: 'background',
    //           properties: [
    //             { name: 'Image', property: 'background-image'},
    //             { name: 'Repeat', property:   'background-repeat'},
    //             { name: 'Position', property: 'background-position'},
    //             { name: 'Attachment', property: 'background-attachment'},
    //             { name: 'Size', property: 'background-size'}
    //           ],
    //         }],
    //     }];

    // //     // Add our custom sectors
    //     styleManagerSectors.forEach(sector => 
    //         editor.StyleManager.addSector(sector.name, sector)
    //     );
    // }
}