import HyperTreeCoordS            from './hypertree_coord_s';
import HyperTreeDrawNode          from './hypertree_draw_node';
import HyperTreeDrawNodeComposite from './hypertree_draw_node_composite';

/**
 * HyperTree drawing model.
 **/
class HyperTreeDraw {
  constructor(model, view, size=1000) {
    this.model = model;
    this.view  = view;

    this.sMax    = HyperTreeCoordS.fromCoord(size / 2, size / 2);
    this.sOrigin = HyperTreeCoordS.fromCoord(this.sMax.x, this.sMax.y);

    this.drawNode = this.drawNode.bind(this);
  }

  get drawRoot() {
    if (this.model.root.children) {
      return new HyperTreeDrawNodeComposite(this.model.root, this);
    }

    return new HyperTreeDrawNode(this.model.root, this);
  }

  get radius() {
    return this.model.radius;
  }

  drawNodes() {
    this.drawRoot.drawNodes(this.sOrigin, this.sMax);
  }

  /**
   * Draw a node where the radius is reduced by the reduction coefficient.
   **/
  drawNode(node, zs, coeff) {
    console.group('draw node %s', node.name);
    const minMax = Math.min(this.sMax.x, this.sMax.y);
    const radius = this.model.radius * minMax * coeff;

    node.x = zs.x, node.y = zs.y, node.radius = radius;
    console.debug('results to %x, %y', node.x, node.y);
    console.groupEnd('draw node %s', node.name);
  }

  translate(t) {
    this.drawRoot.translate(t);
    console.debug('view.repaint()');
  }

  endTranslation() {
    this.drawRoot.endTranslation();
  }
}

export default HyperTreeDraw;
