import type { Editor } from 'grapesjs';
import Image from './Image';
import Button from './Button';

export default function initializeComponents(editor: Editor) {
    new Button(editor, 'vl-button');
    // new Image(editor, 'vl-image');
} 