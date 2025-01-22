import type { Editor } from 'grapesjs';
import { PluginOptions } from '.';
import initializeComponents from './custom-components';
import { type } from './custom-components/Image';

export default function(editor: Editor, opts: Required<PluginOptions>) {


  // Initialize custom components
  initializeComponents(editor);




  editor.BlockManager.add("vl-image", {
    label: 'Image',
    media: `<svg viewBox="0 0 24 24">
      <path fill="currentColor" d="M21,3H3C2,3 1,4 1,5V19A2,2 0 0,0 3,21H21C22,21 23,20 23,19V5C23,4 22,3 21,3M5,17L8.5,12.5L11,15.5L14.5,11L19,17H5Z" />
    </svg>`,
    content: `
<div style="width: 100%; display: flex; justify-content: center; align-items: center; padding: 10px; box-sizing: border-box;">
    <img src="https://picsum.photos/200/300" alt="Placeholder Image" />
</div>
    `,
  });


};
