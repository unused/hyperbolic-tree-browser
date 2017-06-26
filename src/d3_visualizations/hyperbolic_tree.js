import * as d3 from 'd3';
import math from './../lib/hyperbolic_math.js';

const BOX_SIZE = 1000;
const RADIUS   =  500;

const treemap = d3.tree()
  .size([2 * Math.PI, RADIUS])
  .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

/**
 * A hyperbolic tree visualization (deprecated).
 *
 * Usate:
 *   const hyperbolicTree = new HyperbolicTree(<selector>);
 *   hyperbolicTree.draw(data);
 *
 * NOTE: This visualization was replaced by the radial tree browser.
 **/
class HyperbolicTree {
  constructor(selector) {
    console.error('this visualization is deprecated, see radial tree browser');

    this.svg   = d3.select(selector);
    this.group = this.svg.append('g');

    this.svg.attr('viewBox', `0 0 ${BOX_SIZE} ${BOX_SIZE}`);
    this.group.attr('class', 'hyperbolic-tree');
  }

  draw(data) {
    console.time('HyperbolicTree::draw');
    const root = treemap(d3.hierarchy(data));

    this.center();
    this.prepareNodes(root);
    this.drawEdges(root);
    this.drawNodes(root);
    console.timeEnd('HyperbolicTree::draw');
  }

  center() {
    this.group.attr('transform', `translate(${RADIUS},${RADIUS})`);
  }

  prepareNodes(root) {
    this.group.selectAll('.node')
      .data(root.descendants())
      .enter().append('g')
        .attr('class', d => `node ${d.children ? 'internal' : 'leaf'}`)
        .attr('aria-label', d => d.text)
        .attr('tabindex', 0)
        .attr('transform', node => {
          //const unit = math.hyperbolicPoint(node);
          //return `translate(${unit[0]} ${unit[1]})`;
          const layout = math.layoutHyperbolic(node);
          console.debug(layout);
          return `translate(${layout.x} ${layout.y})`;
        });
  }

  drawEdges(root) {
    this.group.selectAll('.edge')
      .data(root.links())
      .enter().append('line')
        .attr('class', 'edge')
        .attr('x1', d => d.source.x * (RADIUS - 215))
        .attr('y1', d => d.source.y * (RADIUS - 215))
        .attr('x2', d => d.target.x * (RADIUS - 215))
        .attr('y2', d => d.target.y * (RADIUS - 215));
  }

  drawNodes(root) {
    const nodes = this.group.selectAll('.node')
    nodes.append('circle')
      .attr('r', 10);

    nodes.append('text')
      .attr('dy', '0.3rem')
      .attr('x', d => d.x < Math.PI === !d.children ? 15 : -15)
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
