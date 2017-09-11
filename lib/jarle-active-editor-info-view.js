'use babel';

export default class JarleActiveEditorInfoView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('jarle-active-editor-info');

    // Create message element
    const message = document.createElement('div');
    message.textContent = 'The JarleActiveEditorInfo package is Alive! It\'s ALIVE!';
    message.classList.add('message');
    this.element.appendChild(message);
    this.subscriptions = atom.workspace.getCenter().observeActivePaneItem(item => {
      if(!atom.workspace.isTextEditor(item)) {
        message.innerText = 'Open a file to see info about it'
        return
      }
      message.innerHTML = `
        <h2>${item.getFileName() || 'untitled'}</h2>
        <ul>
          <li><b>Soft Wrap:</b> ${item.softWrapped}</li>
          <li><b>Tab Length:</b> ${item.getTabLength()}</li>
          <li><b>Encoding:</b> ${item.getEncoding()}</li>
          <li><b>Line Count:</b> ${item.getLineCount()}</li>
        </ul>
      `;
    })
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  getTitle() {
    return 'Active editor info'
  }

  getURI() {
    return 'atom://jarle-active-editor-info'
  }

  getDefaultLocation() {
    return 'right'
  }

  getAllowedLocations() {
    return ['left', 'right', 'bottom']
  }

}
