import * as d3 from 'd3';
import math from './../utils/radial_math';

const treemap = d3.tree()
  .size([2 * Math.PI, 400])
  .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

/**
 * A demonstrational radial tidy tree implementation.
 *
 * @see https://bl.ocks.org/mbostock/4063550
 **/
class RadialTree {
  constructor() {
    this.svg = d3.select('svg');
    this.group = this.svg.append('g');
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
        .attr('transform', d => `translate(${math.radialPoint(d.x, d.y)})`);

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

export default RadialTree;
