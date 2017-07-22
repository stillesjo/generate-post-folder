'use babel';

import { TextEditor } from 'atom';

export default class PostFolderCreatorView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('post-folder-creator');

    // Create text input for post title
    this.titleEditor = new TextEditor({
      mini: true
    });
    this.titleEditor.tabindex = 1;
    this.element.appendChild(this.titleEditor.element);

    // Add title
    const titleLabel = document.createElement('div');
    titleLabel.classList.add('message');
    titleLabel.textContent = 'Post Title';
    this.element.appendChild(titleLabel);
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
