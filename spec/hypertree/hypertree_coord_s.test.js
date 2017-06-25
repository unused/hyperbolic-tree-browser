import HyperTreeCoordS from './../../src/hypertree/hypertree_coord_s.js';

describe('hypertree coordinates in screen space', () => {
  fit('projects properly', () => {
    let subject, o, z, m;

    o = { x: 0.0, y: 0.0 }, z = { x: 0.0, y: 0.0 }, m = { x: 0.0, y: 0.0 };
    (subject = HyperTreeCoordS.fromCoord(0.0, 0.0)).projectionEtoS(z, o, m);
    expect(subject.x).toBeCloseTo(0.0);
    expect(subject.y).toEqual(0.0);

    z = { x: 0.5393266281549871, y: 0.25281963216371034 };
    o = { x: 250, y: 250 };
    m = { x: 250, y: 250 };
    (subject = HyperTreeCoordS.fromCoord(256, 220)).projectionEtoS(z, o, m);
    expect(subject.x).toBeCloseTo(384.83);
    expect(subject.y).toBeCloseTo(313.205);
  });
});
