'use babel';
import RepoListView from '../lib/repo-list-view';

describe('RepoListView', () => {
  it('should be constructable', () => {
    const view = new RepoListView([])
    expect(view).not.toBeUndefined();
  })
})
