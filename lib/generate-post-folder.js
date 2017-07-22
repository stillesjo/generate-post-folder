'use babel';

import GeneratePostFolderView from './generate-post-folder-view';
import { CompositeDisposable } from 'atom';
import path from 'path';

export default {

  generatePostFolderView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.generatePostFolderView = new GeneratePostFolderView(state.generatePostFolderViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.generatePostFolderView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    const blurHandler = () => this.modalPanel.isVisible() && this.modalPanel.hide();
    this.generatePostFolderView.titleEditor.element.addEventListener('blur', blurHandler);
    this.subscriptions = new CompositeDisposable({
      dispose: () => this.generatePostFolderView.titleEditor.element.removeEventListener(blurHandler),
    });

    // Register command
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'post-folder-creator:create': e => this.actionExecuted(e)
    }));
    atom.commands.add(this.generatePostFolderView.getElement(), {
      'core:confirm': () => this.confirm(),
      'core:cancel': () => this.modalPanel.hide(),
    });

  },

  confirm() {
    this.modalPanel.hide();
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.generatePostFolderView.destroy();
  },

  serialize() {
    return {
      generatePostFolderViewState: this.generatePostFolderView.serialize()
    };
  },


  getPathName(e) {
    const pathName = e.target.dataset.path;
    return pathName ? path.dirname(pathName) : undefined;
  },

  show() {
    this.modalPanel.show();
    this.generatePostFolderView.titleEditor.element.focus()
  },

  actionExecuted(e) {
    const name = this.getPathName(e);
    if (!name) {
      // TODO Better notification
      // return atom.notifications.addError('Unable to locate path');
    } else {
      this.generatePostFolderView.pathEditor.setText(`${name}/`);

    }

    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.show()
    );

    //
    // atom.workspace.addTopPanel({
    //
    // })

  }

};
