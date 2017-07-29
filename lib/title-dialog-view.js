'use babel';
import { CompositeDisposable, TextEditor } from 'atom';

export default class TitleDialog  {

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    })
    this.initView()

    panel = atom.workspace.addModalPanel({ item: this.element });
    panel.show();
    this.editor.element.focus();

    disposable = new CompositeDisposable();
    disposable.add(atom.commands.add('atom-text-editor', 'core:cancel', e => {
      panel && panel.destroy();
      disposable.dispose();
      this.reject();
    }));

    disposable.add(atom.commands.add('atom-text-editor', 'core:confirm', e => {
      panel && panel.destroy();
      disposable.dispose();
      this.resolve(this.editor.getText());
    }))
  }

  initView() {
    this.element = document.createElement('div');
    this.editor = new TextEditor({
      mini: true,
      placeholderText: 'Please enter a title'
    });

    this.element.appendChild(this.editor.element);
  }
}
