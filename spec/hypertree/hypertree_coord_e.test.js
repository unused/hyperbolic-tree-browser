
import Subject from './../../src/hypertree/hypertree_coord_e.js';

describe('hypertree coord in euclidian space', () => {
  it('ensure tanh and math.tanh equal in results', () => {
    const test = 2.3;
    const tanh = x => {
      x = Math.exp(2 * x);
      return (x - 1) / (x + 1);
    };
    expect(Math.tanh(test)).toEqual(tanh(test));
  });
});
