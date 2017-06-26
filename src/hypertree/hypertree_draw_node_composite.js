import HyperTreeDrawNode from './hypertree_draw_node';

/**
 * HyperTree draw node model wrapper for helper methods.
 **/
class HyperTreeDrawNodeComposite extends HyperTreeDrawNode {
  get children() {
    if (!this.drawChildren) {
      this.drawChildren = this.node.children.map(node => {
        if ((node.children || []).length > 0) {
          return new HyperTreeDrawNodeComposite(node, this.model);
        }

        return new HyperTreeDrawNode(node, this.model);
      });
    }
    return this.drawChildren;
  }

  drawNodes(sOrigin, sMax) {
    super.refreshScreenCoordinates(sOrigin, sMax);

    console.groupCollapsed('draw nodes for %s', this.node.name);
    this.children.map(child => {
      child.refreshScreenCoordinates(sOrigin, sMax);
      child.drawNodes(sOrigin, sMax);
      return child;
    });
    console.groupEnd('draw nodes for %s', this.node.name);
    return super.drawNodes();
  }

  translate(t) {
    super.translate(t);
    this.children.map(child => { child.translate(t); return child; });
  }

  endTranslation() {
    super.endTranslation();
    this.children.map(child => { child.endTranslation(); return child; });
  }
}

export default HyperTreeDrawNodeComposite;
