

class ImportControls {

  constructor(selector, action) {
    this.selector  = selector;
    this.action    = action;
    this.fileInput = document.querySelector(`${selector} input[type=file]`);
    this.button    = document.querySelector(`${selector} button`);
    console.debug('Importer::constructor', this.fileInput, this.controls, this.button);
  }

  listen() {
    document.body.addEventListener("dragover", this.styleDropzone, false);
    document.body.addEventListener("dragleave", this.unstyleDropzone, false);
    document.body.addEventListener("drop", this.handleDrop.bind(this), false);
    this.fileInput.addEventListener('change', this.handleFileChange.bind(this));
    this.button.addEventListener('click', this.handleClick.bind(this));
  }

  destroy() {
    document.body.removeEventListener('dragover');
    document.body.removeEventListener('dragleave');
    document.body.removeEventListener('drop');
    this.fileInput.removeEventListener('change');
    this.button.removeEventListener('click');
  }

  handleDrop(event) {
    event.stopPropagation();
    event.preventDefault();

    if (!event.dataTransfer.files) {
      return ;
    }

    this.readFile(event.dataTransfer.files[0], this.action);
  }

  styleDropzone(event) {
    event.dataTransfer.dropEffect = 'copy';
    const className = document.body.getAttribute('class') || '';
    if (className.includes('dragover')) {
      return ;
    }
    let classNames = className.split(' ');
    classNames.push('dragover');
    document.body.setAttribute('class', classNames.join(' '));
  }

  unstyleDropzone() {
    console.debug('unstyleDropzone');
    const className = document.body.getAttribute('class');
    if (!className) {
      return ;
    }

    let classNames = className.split(' ');
    document.body.setAttribute('class',
      classNames.filter(c => c !== 'dragover').join(' '));
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
