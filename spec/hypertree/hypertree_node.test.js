
import Subject from './../../src/hypertree/hypertree_node.js';

describe('hypertree node', () => {
  it('provides node name', () => {
    const subject = new Subject({ data: {name: 'Foobar' }});
    expect(subject.name).toEqual('Foobar');
  });
});
