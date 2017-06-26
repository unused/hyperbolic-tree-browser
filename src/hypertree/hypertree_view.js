import HyperTreeDraw   from './hypertree_draw';
import HyperTreeAction from './hypertree_action';

/**
 * HyperTree view representation.
 **/
class HyperTreeView {
  constructor(model, options={}) {
    this.model    = model;
    this.renderer = new HyperTreeDraw(this.model, this);
    this._actions = new HyperTreeAction(this.renderer);
  }

  get root() {
    this.model.root.node.x = this.model.root.x;
    this.model.root.node.y = this.model.root.y;
    return this.model.root;
  }

  get actions() {
    return this._actions;
  }

  draw() {
    this.renderer.drawNodes();
  }
}

export default HyperTreeView;
