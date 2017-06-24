
import hyperbolicMath from './../../src/lib/hyperbolic_math';
import Complex from 'complex.js';

console.debug = () => {};
console.group = () => {};
console.groupEnd = () => {};
console.time = () => {};
console.timeEnd = () => {};

describe('transform to hyperbolic space', () => {
  it('does forward zero input', () => {
    const z     = new Complex(0, 0);
    const theta = new Complex(0, 0);
    const p     = new Complex(0, 0);

    const result = hyperbolicMath.transform(z, p, theta);

    expect(result.re).toEqual(0);
    expect(result.im).toEqual(0);
  });

  it('keeps forward input unchanged', () => {
    const z     = new Complex(0, 0);
    const theta = new Complex(0, 1);
    const p     = new Complex(0.25731858300008165, -0.1542308232579665);

    const result = hyperbolicMath.transform(z, p, theta);

    expect(result.re).toEqual(0.25731858300008165);
    expect(result.im).toEqual(-0.1542308232579665);
  });

  it('calculate transformation with P properly', () => {
    const z     = new Complex(-0.22961005941905419, -0.5543277195067718);
    const theta = new Complex(0, 1);
    const p     = new Complex(0.2707131958649698, -0.5575322970490978);

    const result = hyperbolicMath.transform(z, p, theta);

    expect(result.re).toEqual(0.5076144639404128);
    expect(result.im).toEqual(-0.7139394498237439);
  });

  it('calculate transformation with θ properly', () => {
    const z     = new Complex(-0.22961005941905419, -0.5543277195067718);
    const theta = new Complex(0, 1);
    const p     = new Complex(0.2707131958649698, -0.5575322970490978);

    const result = hyperbolicMath.transform(z, p, theta);

    expect(result.re).toEqual(0.5076144639404128);
    expect(result.im).toEqual(-0.7139394498237439);
  });
});

describe('inverse transform to hyperbolic space', () => {
  it('does forward zero input', () => {
    const z     = new Complex(0, 0);
    const theta = new Complex(0, 0);
    const p     = new Complex(0, 0);

    const result = hyperbolicMath.inverseTransform(z, p);

    expect(Math.abs(result[0].re)).toEqual(0);
    expect(Math.abs(result[0].im)).toEqual(0);
    expect(Math.abs(result[1].re)).toEqual(0);
    expect(Math.abs(result[1].im)).toEqual(0);
  });

  it('calculate transformation with properly', () => {
    const z     = new Complex(-0.22961005941905419, -0.5543277195067718);
    const p     = new Complex(0.2707131958649698, -0.5575322970490978);

    const result = hyperbolicMath.inverseTransform(z, p);

    expect(result[0].re).toEqual(-0.24689713378652073);
    expect(result[0].im).toEqual(0.2780788523577039);
    expect(result[1].re).toEqual(0.2707131958649698);
    expect(result[1].im).toEqual(0.5575322970490978);
  });
});

describe('hyperbolic point', () => {
  it('calculates center correctly', () => {
    const result = hyperbolicMath.hyperbolicPoint({
      data: { name: 'center' }, depth: 0
    });

    expect(result).toEqual([0, 0]);
  });

  it('calculates root children correctly', () => {
    let parentNode = {
      data: { name: 'center' }, depth: 0, children: [{ wedge: {} }, {}]
    };
    hyperbolicMath.hyperbolicPoint(parentNode);
    const result = hyperbolicMath.hyperbolicPoint({
      data: { name: 'one' }, depth: 1, parent: parentNode
    });

    expect(result).toEqual([0.4398229715025711, 7.181703923228016e-17]);
  });
});
