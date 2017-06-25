import * as d3 from 'd3';
import math from './group3_math.js';

const BOX_SIZE = 1100;
const RADIUS   =  500;

const treemap = d3.tree()
  .size([2 * Math.PI, RADIUS])
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
    this.svg   = d3.select(selector);
    this.group = this.svg.append('g');

    this.svg.attr('viewBox', `0 0 ${BOX_SIZE} ${BOX_SIZE}`);
    this.group.attr('class', 'hyperbolic-tree');

    this.handleClick = this.handleClick.bind(this);
  }

  draw(data) {
    this.root   = treemap(d3.hierarchy(data));
    this.root.z = {re: 0.6129910910477687, im: -0.20544981586185937};
    this.update();

    this.center();
    this.drawEdges();
    this.drawNodes();
  }

  center() {
    this.group.attr('transform', `translate(${RADIUS},${RADIUS})`);
  }

  update() {
    this.root = math.layoutHyperbolic(this.root);
  }

  drawEdges() {
    this.group.selectAll('.edge')
      .data(this.root.links())
      .enter().append('line')
        .attr('class', 'edge')
        .attr('x1', d => d.source.z.re * RADIUS)
        .attr('y1', d => d.source.z.im * RADIUS)
        .attr('x2', d => d.target.z.re * RADIUS)
        .attr('y2', d => d.target.z.im * RADIUS);
  }

  drawNodes() {
    const nodes = this.group.selectAll('.node')
      .data(this.root.descendants())
      .enter().append('g')
        .attr('class', d => `node ${d.children ? 'internal' : 'leaf'}`)
        .attr('aria-label', d => d.text)
        .attr('tabindex', 0)
        .attr('transform', node => {
          return `translate(${node.z.re * RADIUS} ${node.z.im * RADIUS})`;
        });

    nodes.append('circle')
      .attr('r', 10)
      .on("click", this.handleClick);

    nodes.append('text')
      .attr('dy', '0.3rem')
      .attr('x', d => d.x < Math.PI === !d.children ? 15 : -15)
      .attr('opacity', d => {
        if (Math.abs(d.x) > RADIUS / 3.0) return 0;
        if (Math.abs(d.y) > RADIUS / 3.0) return 0;
        return .75;
      })
      .attr('text-anchor', d => {
        return d.x < Math.PI === !d.children ? 'start' : 'end';
      })
      .attr('transform', math.textRotation)
      .text(d => d.data.name);
  }

  handleClick(event) {
    console.debug(event);
  }

  handleCollapse(event) {
  }
}

export default HyperbolicTree;
