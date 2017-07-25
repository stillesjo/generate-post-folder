'use babel';

import PostFolderCreatorView from './post-folder-creator-view';
import RepoListView from './repo-list-view';
import { CompositeDisposable } from 'atom';
import path from 'path';
import createPost from './post-creator';
import transform from './title-transformer';

export default {

  postFolderCreatorView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();

    // Register command
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'post-folder-creator:create': e => this.actionExecuted(e)
    }));


    // this.postFolderCreatorView = new PostFolderCreatorView(state.postFolderCreatorViewState);

    // const repos = atom.project.getRepositories();
    // this.repoListView = new RepoListView(repos);

    // this.modalPanel = atom.workspace.addModalPanel({
    //   item: this.postFolderCreatorView.getElement(),
    //   visible: false
    // });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    // const blurHandler = () => this.modalPanel.isVisible() && this.modalPanel.hide();
    // this.postFolderCreatorView.titleEditor.element.addEventListener('blur', blurHandler);

    // atom.commands.add(this.postFolderCreatorView.getElement(), {
    //   'core:confirm': () => this.confirm(),
    //   'core:cancel': () => this.modalPanel.hide(),
    // });

  },

  confirm() {
    this.modalPanel.hide();
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.postFolderCreatorView.destroy();
  },

  serialize() {
    return {
      postFolderCreatorViewState: {}
    }
    // return {
    //   postFolderCreatorViewState: this.postFolderCreatorView.serialize()
    // };
  },


  getPathName(e) {
    const pathName = e.target.dataset.path;
    return pathName ? path.dirname(pathName) : undefined;
  },

  show() {
    this.modalPanel.show();
    this.postFolderCreatorView.titleEditor.element.focus()
  },

  showListView() {
    const repos = atom.project.getRepositories()
    const repoListView = new RepoListView(repos)
    return repoListView.promise;
  },
  showInputView() {
    // TODO Implement
    return Promise.resolve('Hai');
  },
  actionExecuted(e) {

    // this.repoListView.show()
    new RepoListView(atom.project.getRepositories()).promise.then(repo => {

    })

    this.showListView()
      .then(repo => this.showInputView()
        .then(title => {
          // Get data based on title needed for post
          const titleData = transform(title)
          console.log('Creating stuff for');
          console.log(repo);
          console.log(title);
          return createPost(repo, titleData)
            .then(() => console.log('done!'));
            // Validate repo and title
            // TODO Pass to some kind of creator class
        })
      )
      .then(() => {
        // TODO Notify success
      })
      .catch(e => {
        // TODO Notify failure
      });
  }
};
