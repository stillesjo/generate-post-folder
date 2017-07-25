'use babel';
import { CompositeDisposable } from 'atom';
import { View } from 'space-pen';
import { TextEditorView } from 'atom-space-pen-views';

export default class TitleDialog extends View {

  constructor(repo) {
    super()
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    })

    currentPane = atom.workspace.getActivePaneItem();
    panel = atom.workspace.addModalPanel({ item: this });
    panel.show()

    disposable = new CompositeDisposable();
    disposable.add(atom.commands.add('atom-text-editor', 'core:cancel', e => {
      panel && panel.destroy()
      currentPane.activate()
      disposable.dispose();
      this.reject()
    }))

    disposable.add(atom.commands.add('atom-text-editor', 'core:confirm', e => {
      panel && panel.destroy();
      currentPane.activate();
      disposable.dispose();
      this.resolve(this.commandEditor.getText())
    }))
  }
  content() {
    return this.div(() => {
      this.subview('commandEditor',
      new TextEditorView({
        mini: true,
        placeholderText: 'Please enter post title'
      })
      )
    })
  }
}
