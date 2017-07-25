'use babel';

import RepoListView from './repo-list-view';

export default class RepoListController {
  constructor(repos) {
    this.view = new RepoListView(repos)
    this.panel = atom.workspace.addModalPanel({
      item: this.view.element,
    });
    
  }

  tearDown() {

  }
}
