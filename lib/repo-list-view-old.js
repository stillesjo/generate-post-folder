'use babel'

import { $$, SelectListView } from 'atom-space-pen-views';

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
    this.promise = new Promise((resolve, reject) => {
      this.show()
      this.resolve = resolve;
      this.reject = reject;
    })
  }
  getFilterKey() {
    return 'name';
  }

  show() {
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

  confirmed({repo}) {
    this.resolve(repo);
    this.cancel();
  }
}
