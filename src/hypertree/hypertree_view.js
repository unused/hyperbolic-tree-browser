import HyperTreeDraw from './hypertree_draw';

/**
 * HyperTree view representation.
 **/
class HyperTreeView {
  constructor(model, options={}) {
    this.model    = model;
    this.renderer = new HyperTreeDraw(model, this);
    // TODO action...
  }

  get root() {
    return this.model.root;
  }

  draw() {
    this.renderer.drawNodes();
  }
}

export default HyperTreeView;
