import HyperTreeCoordE from './../../src/hypertree/hypertree_coord_e.js';

describe('hypertree coordinates in euclidian space', () => {
  it('projects from hyperbolic to euclidian properly', () => {
    let subject;

    (subject = HyperTreeCoordE.fromCoord(0.0, 0.0)).projectionHtoE();
    expect(subject.x).toBeCloseTo(0.0);
    expect(subject.y).toEqual(0.0);

    (subject = HyperTreeCoordE.fromCoord(0.04, 0.0)).projectionHtoE();
    expect(subject.x).toBeCloseTo(0.039);
    expect(subject.y).toEqual(0.0);

    (subject = HyperTreeCoordE.fromCoord(-0.1999, 0.34641)).projectionHtoE();
    expect(subject.x).toBeCloseTo(-0.19737);
    expect(subject.y).toBeCloseTo(0.333188);

    (subject = HyperTreeCoordE.fromCoord(-0.21999, 0.381)).projectionHtoE();
    expect(subject.x).toBeCloseTo(-0.216518);
    expect(subject.y).toBeCloseTo(0.36362);
  });

  it('projects from hyperbolic to euclidian properly', () => {
    let subject, model;

    model = { sMax: { x: 250, y: 250 }, sOrigin: { x: 250, y: 250 } };
    (subject = HyperTreeCoordE.fromCoord())
      .projectionStoE(147, 180, model);
    expect(subject.x).toEqual(-0.412);
    expect(subject.y).toEqual(-0.28);

    model = { sMax: { x: 250, y: 250 }, sOrigin: { x: 250, y: 250 } };
    (subject = HyperTreeCoordE.fromCoord())
      .projectionStoE(193, 277, model);
    expect(subject.x).toEqual(-0.228);
    expect(subject.y).toEqual(0.108);
  });

  it('translates properly', () => {
    let subject, t;

    t = { x: 0.1119, y: 0.264 };
    (subject = HyperTreeCoordE.fromCoord(-0.01732, 0.1854627)).translate(t);
    expect(subject.x).toBeCloseTo(0.1);
    expect(subject.y).toBeCloseTo(0.4268);
  });
});
