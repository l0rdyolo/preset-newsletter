import type { Editor } from 'grapesjs';
import { PluginOptions } from '.';

export default function(editor: Editor, opts: Required<PluginOptions>) {
    editor.on('load', () => {
        // Remove all sectors first
        editor.StyleManager.getSectors().reset();

        if (opts.updateStyleManager) {
            const styleManagerSectors = [{
                name: 'Dimension',
                id: 'dimension',
                properties: [{
                    property: 'width',
                    units: ['vw'],
                    defaults: '10vw',
                }, {
                    property: 'height',
                    units: ['vh'],
                    defaults: '10vh',
                }, {
                    property: 'margin',
                    properties: [
                        { name: 'Top', property: 'margin-top', units: ['vh'], defaults: '0vh' },
                        { name: 'Right', property: 'margin-right', units: ['vw'], defaults: '0vw' },
                        { name: 'Bottom', property: 'margin-bottom', units: ['vh'], defaults: '0vh' },
                        { name: 'Left', property: 'margin-left', units: ['vw'], defaults: '0vw' }
                    ],
                }, {
                    property: 'padding',
                    properties: [
                        { name: 'Top', property: 'padding-top', units: ['vh'], defaults: '0vh' },
                        { name: 'Right', property: 'padding-right', units: ['vw'], defaults: '0vw' },
                        { name: 'Bottom', property: 'padding-bottom', units: ['vh'], defaults: '0vh' },
                        { name: 'Left', property: 'padding-left', units: ['vw'], defaults: '0vw' }
                    ],
                }]
            }, {
                name: 'Position',
                id: 'position',
                properties: [{
                    property: 'position',
                    type: 'select',
                    defaults: 'relative',
                    options: [
                        { id: 'relative', label: 'Relative' },
                        { id: 'absolute', label: 'Free Position' }
                    ]
                }, {
                    property: 'left',
                    units: ['vw'],
                    defaults: '50vw'
                }, {
                    property: 'top',
                    units: ['vh'],
                    defaults: '50vh'
                }, {
                    property: 'transform',
                    defaults: 'translate(-50%, -50%)'
                }]
            }, {
                name: 'Alignment',
                id: 'alignment',
                properties: [{
                    property: 'display',
                    type: 'select',
                    defaults: 'flex',
                    options: [
                        { id: 'flex', label: 'Flex' }
                    ]
                }, {
                    property: 'justify-content',
                    type: 'select',
                    defaults: 'center',
                    options: [
                        { id: 'center', label: 'Center' },
                        { id: 'flex-start', label: 'Start' },
                        { id: 'flex-end', label: 'End' },
                        { id: 'space-between', label: 'Space Between' },
                        { id: 'space-around', label: 'Space Around' },
                        { id: 'space-evenly', label: 'Space Evenly' }
                    ]
                }, {
                    property: 'align-items',
                    type: 'select',
                    defaults: 'center',
                    options: [
                        { id: 'center', label: 'Center' },
                        { id: 'flex-start', label: 'Start' },
                        { id: 'flex-end', label: 'End' },
                        { id: 'space-between', label: 'Space Between' },
                        { id: 'space-around', label: 'Space Around' },
                        { id: 'space-evenly', label: 'Space Evenly' }
                    ]
                }]
            }];

            // Add sectors properly
            styleManagerSectors.forEach(sector => 
                editor.StyleManager.addSector(sector.id, sector)
            );
        }
    });
}