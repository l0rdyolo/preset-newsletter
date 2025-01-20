import type { Editor } from 'grapesjs';
import ImageComponent from './ImageComponent';

export default function initializeComponents(editor: Editor) {
    const imageComponent = new ImageComponent(editor);
    imageComponent.addBlock();
    
    // Buraya diğer componentler eklenebilir
} 