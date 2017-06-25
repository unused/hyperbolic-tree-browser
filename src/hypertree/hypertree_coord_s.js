
/**
 * HyperTree coordinates presenting a point of screen space.
 **/
class HyperTreeCoordS {

  constructor(z={ x: 0, y: 0}) {
    this.x = z.x;
    this.y = z.y;
  }

  /**
   * Projects the given Euclidian point ze on the screen plane.
   */
  projectionEtoS(ze, sOrigin, sMax) {
    this.x = ze.x * sMax.x + sOrigin.x;
    this.y = ze.y * sMax.y + sOrigin.y;
  }

  debug() {
    console.info('coord-s (%i, %i)', this.x, this.y);
  }
}

HyperTreeCoordS.fromCoord = (x, y) => new HyperTreeCoordS({ x: x, y: y });

export default HyperTreeCoordS;
