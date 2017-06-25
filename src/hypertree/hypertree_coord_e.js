
/**
 * HyperTree coordinates for euclidian space.
 *
 * The coordinates are only valid if they are in the hyperbolic tree.
 **/
class HyperTreeCoordE {
  constructor(z={}) {
    this.x = z.x || 0.0;
    this.y = z.y || 0.0;

    this.valid = z.valid || true;
  }

  copy(z) {
    this.x = z.x;
    this.y = z.y;
  }

  sub(a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
  }

  /**
   * Projects from Hyperbolic to Euclidian. Just multiply by tanh.
   *
   * TODO could use own implementation...
   */
  projectionHtoE() {
    this.x = Math.tanh(this.x);
    this.y = Math.tanh(this.y);
  }

  /**
   * Projects from Screen to Euclidian using the drawing model.
   */
  projectionStoE(x, y, model) {
    const ex = (x - model.sOrigin.x) / model.sMax.x;
    const ey = (y - model.sOrigin.y) / model.sMax.y;

    if (((ex * ex) + (ey * ey)) < 1.0) {
      this.x = ex;
      this.y = ey;

      this.valid = true;
      return ;
    }
    this.valid = false;
  }

  /**
   * Translate this Euclidian point by the coordinates of the given Euclidian
   * point.
   *
   * Using some complex computing formula :
   *
   * d(z)    = (z.x * z.x) + (z.y * z.y)
   *
   * conj(z) = | z.x
   *           | - z.y
   *
   * a * b   = | (a.x * b.x) - (a.y * b.y)
   *           | (a.x * b.y) + (a.y * b.x)
   *
   * a / b   = | ((a.x * b.x) + (a.y * b.y)) / d(b)
   *           | ((a.y * b.x) - (a.x * b.y)) / d(b)
   */
  translatePoint(t) {
    // z = (z + t) / (1 + z * conj(t))

    // first the denominator
    const denX = (this.x * t.x) + (this.y * t.y) + 1;
    const denY = (this.y * t.x) - (this.x * t.y);
    const dd   = (denX * denX) + (denY * denY);

    // and the numerator
    const numX = this.x + t.x;
    const numY = this.y + t.y;

    // then the division (bell)
    this.x = ((numX * denX) + (numY * denY)) / dd;
    this.y = ((numY * denX) - (numX * denY)) / dd;
  }

  /**
   * Translate the given Euclidian point s by the coordinates of the given
   * translation vector t, and put the results in this point.
   */
  translate(s, t) {
    if (!t) {
      this.translatePoint(s);
      return ;
    }

    this.copy(s);
    this.translate(t);
  }

  debug() {
    console.info('coord-e (%f, %f) %svalid', this.x, this.y,
                 this.valid ? '' : 'in');
  }
}

HyperTreeCoordE.fromCoord = (x, y) => new HyperTreeCoordE({ x: x, y: y });

export default HyperTreeCoordE;
