import * as d3 from 'd3';
import math from './../lib/hyperbolic_math.js';

const treemap = d3.tree()
  .size([2 * Math.PI, 400])
  .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

/**
 * A hyperbolic tree visualization.
 *
 * Usate:
 *   const hyperbolicTree = new HyperbolicTree(<selector>);
 *   hyperbolicTree.draw(data);
 **/
class HyperbolicTree {
  constructor(selector) {
    this.svg = d3.select(selector);
    this.group = this.svg.append('g');
    this.group.attr('class', 'hyperbolic-tree');
  }

  draw(data) {
    const root = treemap(d3.hierarchy(data));

    this.center();
    this.drawEdges(root);
    this.drawNodes(root);
  }

  center() {
    const width  = +this.svg.attr('width');
    const height = +this.svg.attr('height');
    this.group.attr('transform', `translate(${width / 2},${height / 2})`);
  }

  drawEdges(root) {
    this.group.selectAll('.edge')
      .data(root.links())
      .enter().append('path')
        .attr('class', 'edge')
        .attr('d', d3.linkRadial().angle(d => d.x).radius(d => d.y));
  }

  drawNodes(root) {
    const node = this.group.selectAll('.node')
      .data(root.descendants())
      .enter().append('g')
        .attr('class', d => `node ${d.children ? 'internal' : 'leaf'}`)
        .attr('transform', node => `translate(${math.hyperbolicPoint(node)})`);

    node.append('circle')
      .attr('r', 5);

    node.append('text')
      .attr('dy', '0.3em')
      .attr('x', d => d.x < Math.PI === !d.children ? 8 : -8)
      .attr('text-anchor', d => d.x < Math.PI === !d.children ? 'start' : 'end')
      .attr('transform', math.textRotation)
      .text(d => d.data.name);
  }

  handleClick(event) {
  }

  handleCollapse(event) {
  }
}

export default HyperbolicTree;
