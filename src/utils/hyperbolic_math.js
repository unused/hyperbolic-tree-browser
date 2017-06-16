
export default {

  //------------------------------------------------------------------------
  // Representation:

  /**
   * Complex function of z
   *
   * P and Deta are complex numbers:
   *   |P| < 1 and
   *   |deta| = 1
   *
   * P_bar is is the complex conjugate of P.
   *
   * This transformation indicates a rotation by DETA around the origin,
   * followed by moving the origin to P (and -P to the origin).
   *
   * zt = detaz + P
   *      ----------
   *      1 + P_ Deta z
   **/
  circlePreservingTransformationOfTheUnitDisk(z, deta, p) {
    // TODO: Check about P and deta (see in text above)
    const p_bar = 0; // TODO: p_bar is the complex conjugate of p
    return (deta * z + p) / (1 + p_bar * deta * z);
  }

  /**
   * The transformation (P, Deta), the inverse transformation
   *
   * Which is needed to map from display coordinates back into hyperbolic
   * plane.
   *
   *   P`= - Deta_bar P
   *   Deta`= Deta_bar
   **/
  inverseTransformation(p, deta) {
    const deta_bar = 0; // TODO: deta_bar is complex conjuagate of deta
    const p_stick = (deta_bar * p) * (-1);
    const deta_stick = deta_bar;

    return [p_stick, deta_stick];
  }


  /**
   * The composition of a transformation (P1, Deta1) followed by (P2, Deta2) is
   * given by: ?
   *
   * ref: https://en.wikipedia.org/wiki/Complex_conjugate
   * ref: https://en.wikipedia.org/wiki/Poincar%C3%A9_disk_model
   **/
  compositionOfATransformation(p1, deta1, p2, deta2) {
    const p1_bar = 0; // TODO: complex conjugate of P1
    const p2_bar = 0; // TODO: complex conjugate of P2

    let p = deta2 * p1 + p2;
    p = p / (deta2 * p1 * p2_bar + 1);

    let deta = deta1 * deta2 + deta1 * p1_bar * p2;
    deta = deta / (deta2 * p1 * p2_bar + 1);

    // Due to the round-off error, the magnitude of the new DETA may note be
    // exactly 1.
    // Accumulated errors in the magnitutde of DETA can lead to large errrors
    // when trasnfroming points near the edge, so we always normalize the new
    // DETA to a magnitude of 1.

    // TODO: normalize DETA

    return [p, deta];
  }


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
  necessaryDistanceFromParentToChild(a, s) {
    var d = (1-(s*s) * sin(a) / (2*s));
    d *= d;
    d += 1;
    d = sqrt(d);
    d = d - ((1-(s*s) * sin(a)) / (2*s));

    if(d < s) {
      d = s;
    }

    return d;
  }

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
  calculateWedgeInsideASubwedge(subwedge, d) {
    throw('Not implemented');
  }
}
