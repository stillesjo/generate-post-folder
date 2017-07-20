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
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'generate-post-folder:toggle': e => this.actionExecuted(e)
    }));
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

  actionExecuted(e) {
    const name = this.getPathName(e);
    if (!name) {
      // TODO Better notification
      return atom.notifications.addError('Unable to locate path');
    }

  }

};
