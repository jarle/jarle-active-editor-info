'use babel';

import JarleActiveEditorInfoView from './jarle-active-editor-info-view';
import { CompositeDisposable, Disposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable(
      atom.workspace.addOpener(uri => {
        if(uri === 'atom://jarle-active-editor-info') {
          return new JarleActiveEditorInfoView();
        }
      }),

      atom.commands.add('atom-workspace', {
        'jarle-active-editor-info:toggle': () => this.toggle()
      }),

      new Disposable(() => {
        atom.workspace.getPaneItems().forEach(item => {
          if (item instanceof JarleActiveEditorInfoView) {
            item.destroy();
          }
        })
      })
    );
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  toggle() {
    atom.workspace.toggle('atom://jarle-active-editor-info')
  }

};
