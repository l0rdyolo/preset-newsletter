import type { Editor } from 'grapesjs';
import ImageComponent from './ImageComponent';
import ButtonComponent from './ButtonComponent';

export default function initializeComponents(editor: Editor) {
    const imageComponent = new ImageComponent(editor);
    const buttonComponent = new ButtonComponent(editor);
    
    imageComponent.addBlock();
    buttonComponent.addBlock();
} 