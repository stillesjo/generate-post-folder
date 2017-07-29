'use babel'

import { $$, SelectListView } from 'atom-space-pen-views';
import path from 'path';
import fs from 'fs';

export default class RepoListView extends SelectListView {
  constructor(repos) {
    super()
    this.repos = repos.map(r => {
      const path = r.getWorkingDirectory();
        return {
          name: path.substring(path.lastIndexOf('/')+1),
          repo: r
        }
    });
    this.setItems(this.repos);
  }

  show() {
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      this._show();
    })
  }

  getFilterKey() {
    return 'name';
  }

  _show() {
    this.panel = atom.workspace.addModalPanel({
      item: this.element,
      visible: true,
    });
    this.panel.show();
    this.focusFilterEditor();
    this.storeFocusedElement()
  }

  viewForItem(item) {
    return `<li>${item.name}</li>`
  }

  cancelled() {
    this.hide();
  }

  hide() {
    this.panel && this.panel.destroy();
  }

  getPostFolderConfig(repo) {
    const dir = repo.repo.workingDirectory;
    const _package = path.join(dir, 'package.json')
    const stat = fs.statSync(_package);
    if (stat) {
      const data = require(_package);
      repo.repo.postFolderSrcDir = path.join(repo.repo.workingDirectory, data.postFolderSrcDir || '')
    }
  }

  confirmed({repo}) {
    this.getPostFolderConfig(repo);
    this.resolve(repo);
    this.cancel();
  }
}
