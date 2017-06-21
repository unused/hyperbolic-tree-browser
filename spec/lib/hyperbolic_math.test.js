
import hyperbolicMath from './../../src/lib/hyperbolic_math';
import Complex from 'complex.js';

console.debug = () => {};

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

  xit('calculate transformation with θ properly', () => {
    const z     = new Complex(-0.22961005941905419, -0.5543277195067718);
    //const theta = new Complex(0, 1);
    const p     = new Complex(0.2707131958649698, -0.5575322970490978);

    const result = hyperbolicMath.transform(z, p, theta);

    //expect(result.re).toEqual(0.5076144639404128);
    //expect(result.im).toEqual(-0.7139394498237439);
  });
});

