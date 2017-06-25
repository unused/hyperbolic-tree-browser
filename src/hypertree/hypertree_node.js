import HyperTreeCoordE        from './hypertree_coord_e.js';

/**
 * HyperTree node model wrapper providing helper methods.
 **/
class HyperTreeNode {
  constructor(node, model) {
    this.node  = node;
    this.model = model;

    this.node.z  = new HyperTreeCoordE();
    this.node.zr = new HyperTreeCoordE();
  }

  get isLeaf() {
    return true;
  }

  get name() {
    return this.node.data.name;
  }

  get weight() {
    return 1.0; // this.node.value || this.node.weight;
  }

  get parent() {
    return this.node.parent;
  }

  get coordinates() {
    return this.node.z;
  }

  get radiusCoordinates() {
    return this.node.zr;
  }

  /**
   * Layout this node in the hyperbolic space. First set the point at the
   * right distance, then translate by fathers coordinates.
   **/
  layout(angle, width) {
    console.debug('layout', angle, width);
    if (!this.parent) {
      this.node.zr.x = this.model.radius;
      this.node.zr.y = 0.0;
      this.node.zr.projectionHtoE();
      return ;
    }

    console.groupCollapsed('layout for %s', this.name);

    console.debug(
      this.model.length, angle
    );

    // We first start as if the parent was the origin. We still are in the
    // hyperbolic space.
    this.node.z.x = this.model.length * Math.cos(angle);
    this.node.z.y = this.model.length * Math.sin(angle);

    // go to the Euclidian space
    this.node.z.projectionHtoE();

    // translate by parents coordinates
    this.node.z.translate(this.parent.z);

    // do the same for a point at z + model.radius to have the coefficient of
    // reduction for the radius
    this.node.zr.x = (this.model.length + this.model.radius) * Math.cos(angle);
    this.node.zr.y = (this.model.length + this.model.radius) * Math.sin(angle);
    this.node.zr.projectionHtoE();
    this.node.zr.translate(this.parent.z);

    this.node.z.debug(); this.node.zr.debug();
    console.groupEnd('layout for %s', this.name);
  }
}

export default HyperTreeNode;
