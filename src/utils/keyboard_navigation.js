
/**
 * Keyboard Navigation handling node navigation and selection.
 *
 * The navigation traverse through the tree by switching levels or cycling
 * through nodes inside one level. To navigate parent/child-wise simply attach
 * identifiers to the node and replace the level switching methods.
 **/
export default class KeyboardNavigation {
  constructor(classSelector) {
    this.classSelector = classSelector;
    this.validNode = node => {
      const  classnames = node.getAttribute('class');
      return classnames && classnames.split(' ').includes(classSelector);
    };

    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur  = this.handleBlur.bind(this);
    this.handleNav   = this.handleNav.bind(this);
    this.attachListener();
  }

  attachListener() {
    document.addEventListener('focusin',  this.handleFocus);
    document.addEventListener('focusout', this.handleBlur);
    document.addEventListener('keydown',  this.handleNav);
  }

  stopListening() {
    document.removeEventListener('focusin',  this.handleFocus);
    document.removeEventListener('focusout', this.handleBlur);
    document.removeEventListener('keydown',  this.handleNav);
  }

  handleFocus(event) {
    const node = event.target;
    if (!this.validNode(node)) {
      return ;
    }
    this.selectNode(node);
  }

  handleBlur(event) {
    this.clearSelection();
  }

  selectNode(node) {
    node.setAttribute('class', `${node.getAttribute('class')} selected`);
  }

  clearSelection() {
    document.querySelectorAll(`.${this.classSelector}.selected`)
      .forEach(node => this.unselectNode(node));
  }

  unselectNode(node) {
    const className = node.getAttribute('class');
    node.setAttribute('class',
      className.substr(0, className.length - ' selected'.length));
    node.blur();
  }

  handleNav(event) {
    const node = document.querySelector(`.${this.classSelector}.selected`);

    if (!node || !this.validNode(node)) {
      return ;
    }

    ({
      ArrowUp:    this.level.bind(this, -1),
      ArrowDown:  this.level.bind(this,  1),
      ArrowRight: this.next.bind(this,  1),
      ArrowLeft:  this.next.bind(this, -1),
      Enter:      this.doubleClick.bind(this),
      ' ':        this.doubleClick.bind(this)
    }[event.key] || (() => { /* noop */}))(node);
  }

  level(direction, node) {
    const level  = parseInt(node.getAttribute('aria-level')) + direction;
    const parent = document.querySelector(`.node[aria-level="${level}"]`);
    if (!parent) {
      return ;
    }
    this.clearSelection();
    this.selectNode(parent);
  }

  next(direction, node) {
    const level = parseInt(node.getAttribute('aria-level'));
    const nodes = Array.prototype.slice.call(
      document.querySelectorAll(`.node[aria-level="${level}"]`));
    let   index = nodes.findIndex(n => node === n) + direction;

    if (index === nodes.length) index = 0;
    if (index < 0) index = nodes.length - 1;

    this.clearSelection();
    this.selectNode(nodes[index]);
  }

  doubleClick(element) {
    element.dispatchEvent(new MouseEvent('dblclick',
      { 'view': window, 'bubbles': true, 'cancelable': true }));
  }

  static listenFor(selector) {
    return new KeyboardNavigation(selector);
  }
}
