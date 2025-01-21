import type { Editor } from 'grapesjs';
import Image from './Image';
import Button from './Button';

export default function initializeComponents(editor: Editor) {
    Image(editor);
    Button(editor);
} 