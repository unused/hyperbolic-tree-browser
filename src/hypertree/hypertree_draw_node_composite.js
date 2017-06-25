import HyperTreeDrawNode from './hypertree_draw_node';

/**
 * HyperTree draw node model wrapper for helper methods.
 **/
class HyperTreeDrawNodeComposite extends HyperTreeDrawNode {
  get children() {
    return this.node.children.map(node => {
      if ((node.children || []).length > 0) {
        return new HyperTreeDrawNodeComposite(node, this.model);
      }

      return new HyperTreeDrawNode(node, this.model);
    });
  }

  drawNodes(sOrigin, sMax) {
    super.refreshScreenCoordinates(sOrigin, sMax);

    console.groupCollapsed('draw nodes for %s', this.node.name);
    this.children.forEach(child => {
      child.refreshScreenCoordinates(sOrigin, sMax);
      child.drawNodes(sOrigin, sMax);
    });
    console.groupEnd('draw nodes for %s', this.node.name);
    return super.drawNodes();
  }

  translate(t) {
    super.translate(t);
    this.children.forEach(child => child.translate(t));
  }

  endTranslation() {
    super.endTranslation();
    this.children.forEach(child => child.endTranslation());
  }
}

export default HyperTreeDrawNodeComposite;
