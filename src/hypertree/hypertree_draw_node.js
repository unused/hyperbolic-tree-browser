import HyperTreeCoordE from './hypertree_coord_e';
import HyperTreeCoordS from './hypertree_coord_s';

/**
 * HyperTree draw node model wrapper for helper methods.
 **/
class HyperTreeDrawNode {
  constructor(node, model) {
    this.node  = node;
    this.model = model;

    this.ze = new HyperTreeCoordE(node.coordinates);
    this.zr = new HyperTreeCoordE(node.radiusCoordinates);

    this._ze = new HyperTreeCoordE(this.ze);
    this._zr = new HyperTreeCoordE(this.zr);

    this.zs = new HyperTreeCoordS();
  }

  get name() {
    return this.node.name;
  }

  screenCoordinates() {
    return this.zs;
  }

  refreshScreenCoordinates(sOrigin, sMax) {
    this.zs.projectionEtoS(this.ze, sOrigin, sMax), this.debug;
  }

  drawNodes() {
    const dist  = ((this.zr.x - this.ze.x) * (this.zr.x - this.ze.x))
                + ((this.zr.y - this.ze.y) * (this.zr.y - this.ze.y));
    const coeff = Math.sqrt(dist) / this.model.radius;

    this.model.drawNode(this.node, this.zs, coeff);
  }

  translate(t) {
    this.ze.translate(this._ze, t);
    this.zr.translate(this._zr, t);
  }

  endTranslation() {
    this._ze.copy(this.ze);
    this._zr.copy(this.zr);
  }

  debug() {
    console.group('draw node %s', this.name);
    console.debug('  %f : %f', this.ze.x, this.ze.y);
    console.debug('  %f : %f', this.zs.x, this.zs.y);
    console.debug('  %f : %f', this.zr.x, this.zr.y);
    console.groupEnd('draw node %s', this.name);
  }
}

export default HyperTreeDrawNode;
