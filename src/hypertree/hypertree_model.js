import HyperTreeNode          from './hypertree_node';
import HyperTreeNodeComposite from './hypertree_node_composite';

/**
 * HyperTree model that layout the nodes in the hyperbolic space.
 **/
class HyperTreeModel {
  constructor(node) {
    this.node = ((node.children || []).length === 0)
      ?  new HyperTreeNode(node, this)
      :  new HyperTreeNodeComposite(node, this);
  }

  layoutHyperbolicTree() {
console.debug('layoutHyperbolicTree', this.node);
    this.node.layout(0.0, 2 * Math.PI);
  }

  get root() {
    return this.node;
  }

  /**
   * distance between a node and children, min. 0.4.
   **/
  get length() {
    return 0.4;
  }

  /**
   * radius of a node, min. 0.04.
   **/
  get radius() {
    return 0.04;
  }
}

export default HyperTreeModel;
