'use babel';

import { TextEditor } from 'atom';

export default class GeneratePostFolderView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('generate-post-folder');

    // Create message element
    // const message = document.createElement('div');
    // message.textContent = 'The GeneratePostFolder package is Alive! It\'s ALIVE!';
    // message.classList.add('message');
    // this.element.appendChild(message);
    //

    // Create text editor input
    this.titleEditor = new TextEditor({
      mini: true
    });
    this.titleEditor.tabindex = 1;
    this.element.appendChild(this.titleEditor.element);

    const titleLabel = document.createElement('div');
    titleLabel.classList.add('message');
    titleLabel.textContent = 'Post title';
    titleLabel.style.marginBottom = '10px';
    this.element.appendChild(titleLabel);

    this.pathEditor = new TextEditor({ mini: true });
    this.pathEditor.tabindex = 2;
    this.element.appendChild(this.pathEditor.element);

    const pathLabel = document.createElement('div')
    pathLabel.classList.add('message');
    pathLabel.textContent = 'Post path';
    this.element.appendChild(pathLabel);
  }

  getInputElements() {
    return [this.titleEditor.element, this.pathEditor.element];
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
