import HyperTreeNode from './hypertree_node';

/**
 * HyperTree node composite model wrapper providing helper methods.
 **/
class HyperTreeNodeComposite extends HyperTreeNode {
  constructor(node, model) {
    super(node, model);

    this.node.children = this.node.children.map(node => {
      if ((node.children || []).length > 0) {
        return new HyperTreeNodeComposite(node, this.model);
      }

      return new HyperTreeNode(node, this.model);
    });
  }

  get globalWeight() {
    return this.children.reduce((acc, child) => acc += child.weight, 0);
  }

  get children() {
    return this.node.children;
  }

  get isLeaf() {
    return false;
  }

  /**
   * Layout this node and its children in the hyperbolic space.  Mainly, divide
   * the width angle between children and put the children at the right angle.
   */
  layout(angle, width) {
    console.groupCollapsed('layout composition for %s', this.name);
    console.debug('  subwedge with angle %f and width %f', angle, width);

    super.layout(angle, width);

    // Only the root node can have a width > PI
    if (this.parent && (width > Math.PI)) {
      width = Math.PI;
    }

    let startAngle = angle - (width / 2);

    this.children.map(child => {
      const percent    = child.weight / this.globalWeight;
      const childWidth = width * percent;
      const childAngle = startAngle + (childWidth / 2);

      child.layout(childAngle, childWidth);
      startAngle += childWidth;
      return child;
    });
    console.debug('after children layout', this.children);
    console.groupEnd('layout composition', this.name);
  }
}

export default HyperTreeNodeComposite;
