'use babel';

import RepoListView from './repo-list-view';
import TitleDialogView from './title-dialog-view';
import { CompositeDisposable } from 'atom';
import path from 'path';
import createPost from './post-creator';
import transform from './title-transformer';

export default {

  postFolderCreatorView: null,
  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();

    // Register command
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'post-folder-creator:create': e => this.actionExecuted(e)
    }));
  },

  confirm() {
    this.modalPanel.hide();
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
    return {
      postFolderCreatorViewState: {}
    }
  },

  getPathName(e) {
    const pathName = e.target.dataset.path;
    return pathName ? path.dirname(pathName) : undefined;
  },


  showListView() {
    const repos = atom.project.getRepositories()
    const repoListView = new RepoListView(repos)
    return repoListView.promise;
  },
  showInputView() {
    // TODO Implement
    const titleDialogView = new TitleDialogView();
    return titleDialogView.promise.then(title => title || 'Hello world');
  },
  actionExecuted(e) {
    this.showListView()
      .then(repo => this.showInputView()
        .then(title => createPost(transform(title, repo.repo.workingDirectory))
          .then(() => atom.notifications.addSuccess('Successfully created post!', {}))
          .catch(e => atom.notifications.addError('Failed to create post 😞', { description: e }))));
  }
};
