import math from 'mathjs';

/**
 * Hyperbolic Geometry
 *
 * Implements ... TODO
 *
 * Usage:
 *   import hyperbolic from 'hyperbolicjs';
 *
 *   hyperbolic.toEuclidian(z, theta, p);
 *   hyperbolic.toHyperbolic(z, theta, p);
 *
 * References: ...
 **/
export default {

  //------------------------------------------------------------------------
  // Representation:

  /**
   * Complex function of z
   *
   * P and theta are complex numbers:
   *   |P| < 1 and
   *   |theta| = 1
   *
   * P_bar is is the complex conjugate of P.
   *
   * This transformation indicates a rotation by theta around the origin,
   * followed by moving the origin to P (and -P to the origin).
   *
   * zt = thetaz + P
   *      ----------
   *      1 + P_ theta z
   *
   * To euclidean represents a processing of a circle preserving transformation
   * of the unit disk.
   *
   * Params:
   *  p ... perspective value, moving the origin to P (or -P to the origin).
   *  theta ... rotation around the origin.
   **/
  toEuclidian: function(z, theta, p) {
    return math.divide(
      math.add(math.multiply(theta, z), p),
      math.add(1, math.multiply(p.conjugate(), theta, z))
    );
  },

  /**
   * TODO ...
   **/
  toHyperbolic: function(z, theta, p) {
    return this.toEuclidian(z, math.multiply(theta.conjugate(), p).neg(),
      theta.conjugate());
  },

  /**
   * The transformation (P, theta), the inverse transformation
   *
   * Which is needed to map from display coordinates back into hyperbolic
   * plane.
   *
   *   P`= - theta_bar P
   *   theta`= theta_bar
   **/
  //inverseTransformation(p, theta) {
    //const theta_bar = 0; // TODO: theta_bar is complex conjuagate of theta
    //const p_stick = (theta_bar * p) * (-1);
    //const theta_stick = theta_bar;

    //return [p_stick, theta_stick];
  //}


  /**
   * The composition of a transformation (P1, theta1) followed by (P2, theta2) is
   * given by: ?
   *
   * ref: https://en.wikipedia.org/wiki/Complex_conjugate
   * ref: https://en.wikipedia.org/wiki/Poincar%C3%A9_disk_model
   **/
  //compositionOfATransformation(p1, theta1, p2, theta2) {
    //const p1_bar = 0; // TODO: complex conjugate of P1
    //const p2_bar = 0; // TODO: complex conjugate of P2

    //let p = theta2 * p1 + p2;
    //p = p / (theta2 * p1 * p2_bar + 1);

    //let theta = theta1 * theta2 + theta1 * p1_bar * p2;
    //theta = theta / (theta2 * p1 * p2_bar + 1);

    // Due to the round-off error, the magnitude of the new theta may note be
    // exactly 1.
    // Accumulated errors in the magnitutde of theta can lead to large errrors
    // when trasnfroming points near the edge, so we always normalize the new
    // theta to a magnitude of 1.

    // TODO: normalize theta

    //return [p, theta];
  //}


  //------------------------------------------------------------------------
  // Layout:

  /**
   * Layout routine is structred as a recursion that takes a NODE and a WEDGE in
   * which to lay out the NODE and its CHILDREN. It places the NODE at the
   * VERTEX  of the WEDGE, computes a WEDGE for each CHILD and Recursivly calls
   * itself on each child.
   *
   * WEDGE is represented by:
   *  - the point at its vertex
   *  - the endpoint of its midline
   *  - and the ANGLE from the midline to either edge of the wegdge.
   *
   * Vertex and Endpoint are represented as complex numbers.  Since the
   * Endpoint is at Infinity, its complex number has magnitude 1.
   *
   * For calculations, teh endpoint is represented relative to the vertex.
   *    The representation corresponds to where the endpoint would end up, if
   *    the vertex were shifted to the origin.
   *
   * The layout rtoutine records the Position fo the WEDGE as the Position of
   * the NODE.  Then if there are children ... divide the angle of the wedge by
   * teh number of children, N and subdivide the wedge into N equal sized
   * WEDGES, each spanning that angle.
   *
   * More complicated Procedure, actually used in the figures (of the paper),
   * gives differen Children, differen fractions of the wedge, depending
   * logarithmically on the number of children and grandshildren of each child.
   *
   * Children are placed in the middle of their subwedges at a distance
   * computed by the formula.
   *
   * d = ...
   **/


  /**
   * a is the angle between midline and edge of the subwedge.
   * s is the desired distance between a child and the edge of its subwedge
   * (typically used a vlalue about 0.12), try also 0.06, 0.23, 0.28.
   *
   * Both, s and d are represented as the hyperbolic tangent of the distance in
   * the hyperbolic plane.  This form facilitates later operations in the
   * Poincare map, because it has the convenient property, that a line segment
   * on the unit disk with one end on the origin and extending the given amount
   * represents a segment extending the represented distance in the hyperbolic
   * plane.
   **/
  //necessaryDistanceFromParentToChild(a, s) {
    //var d = (1-(s*s) * sin(a) / (2*s));
    //d *= d;
    //d += 1;
    //d = sqrt(d);
    //d = d - ((1-(s*s) * sin(a)) / (2*s));

    //if(d < s) {
      //d = s;
    //}

    //return d;
  //}

  /**
   *
   * Given the subwedge for a child and the distance D to the child, the next step is
   * to calculate a wedge inside the subwedge, with its vertex at the child, (to use for the recursive call)
   *
   * Given
   * the vertex P,
   * midline endpoint M
   * angle A of the subwedge
   * the corresponding parameters of the contained wedge, that results from moving D into the SUBWEDGE can be calculated using the transformation apparatus:
   *
   * p' = Trans(dm, [p,1]))
   * m' = Trans(Trans(m, [p,1]), [-p',1])
   * a' = im(log(Traus(e^ia, [-d,1])))
   *
   * Trans is the transformation function from above,
   *   which takes a point and
   *   a transformation specification and
   *   returns the transformed point
   *
   * The im(log(..)) in the formula of a' returns the angle corresponding to the complex number,
   * doing the inverse of the conversion from ANGLE to COMPLEX NUMBER, done by the e^ia
   * These functions can be implemented using cos, sin and arc tangent
   * and a complex number constructors and selector instead
   **/
  //calculateWedgeInsideASubwedge(subwedge, d) {
    //throw('Not implemented');
  //}
}
