

class ImportControls {

  constructor(selector, action) {
    this.selector  = selector;
    this.action    = action;
    this.fileInput = document.querySelector(`${selector} input[type=file]`);
    this.button    = document.querySelector(`${selector} button`);
    console.debug('Importer::constructor', this.fileInput, this.controls, this.button);
  }

  listen() {
    document.body.addEventListener("dragover", this.handleDragover.bind(this));
    this.fileInput.addEventListener('change', this.handleFileChange.bind(this));
    this.button.addEventListener('click', this.handleClick.bind(this));
  }

  destroy() {
    document.body.removeEventListener('dragover');
    this.fileInput.removeEventListener('change');
    this.button.removeEventListener('click');
  }

  handleDragover() {
    if ((document.body.getAttribute('class') || '').includes('dragover')) {
      return ;
    }

    console.debug('Importer::handleDragover');
    document.body.setAttribute('class',
      `${document.body.getAttribute('class') || ''} dragover`);
  }

  handleClick() {
    console.debug('Importer::handleClick');
    this.fileInput.click();
  }

  handleFileChange(event) {
    console.debug('Importer::handleFileChange');
    document.body.setAttribute('class',
      (document.body.getAttribute('class') || '').replace(' dragover', ''));

    if (!event.target.files || !event.target.files[0]) {
      return;
    }

    this.readFile(event.target.files[0], this.action);
  }

  readFile(file, callback) {
    let reader = new FileReader();
    reader.onload = function(e) {
      callback(file, e.target.result);
    };
    return reader.readAsText(file);
  }
}

export default ImportControls;
