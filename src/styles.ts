import type { Editor } from 'grapesjs';
import { PluginOptions } from '.';

export default function(editor: Editor, opts: Required<PluginOptions>) {
    editor.on('load', () => {
        // Remove all sectors first
        editor.StyleManager.getSectors().reset();

        if (opts.updateStyleManager) {
            // Add button style sector
            

            // Add sectors properly
            // styleManagerSectors.forEach(sector => 
            //     editor.StyleManager.addSector(sector.id, sector)
            // );
        }
    });
}