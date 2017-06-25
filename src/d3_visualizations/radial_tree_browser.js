import * as d3 from 'd3';

import math from './../utils/radial_math';

const BOX_SIZE = 1000;
const RADIUS   =  500;

/**
 * A radial tree visualization.
 *
 * Usate:
 *   const radialTreeBrowser = new radialTreeBrowser(<selector>);
 *   radialTreeBrowser.draw(data);
 **/
class RadialTreeBrowser {
  constructor(selector) {
    this.selector = selector;
    this.init();
  }

  init() {
    this.svg   = d3.select(this.selector);
    this.group = this.svg.append('g');

    this.svg.attr('viewBox', `0 0 ${BOX_SIZE} ${BOX_SIZE}`);
    this.group.attr('class', 'radial-tree-browser');
  }

  draw(root) {
    // TODO fix parent issue... is not at center
    root.x = BOX_SIZE / 2, root.y = root.x;

    this.drawEdges(root);
    this.drawNodes(root);
  }

  update(root) {
    d3.select(this.selector).transition()
      .selectAll('.node').data(root.descendants());
  }

  drawEdges(root) {
    this.group.selectAll('.edge')
      .data(root.links())
      .enter().append('path')
        .attr('class', 'edge')
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);
  }

  drawNodes(root) {
    const nodes = this.group.selectAll('.node')
      .data(root.descendants())
      .enter().append('g')
        .attr('class', d => `node ${d.children ? 'internal' : 'leaf'}`)
        .attr('aria-label', d => d.text)
        .attr('tabindex', 0)
        .attr('transform', d => `translate(${d.x} ${d.y})`);

    nodes.append('circle')
      .attr('r', 10);

    const hideTextAtBorder = d => {
      if (d.x - BOX_SIZE / 6 < 0) return 0.0;
      if (d.y - BOX_SIZE / 6 < 0) return 0.0;
      if (d.x + BOX_SIZE / 6 > BOX_SIZE) return 0.0;
      if (d.y + BOX_SIZE / 6 > BOX_SIZE) return 0.0;
      return 1.0;
    };
    nodes.append('text')
      .attr('dy', '0.3rem')
      .attr('x', d => (d.x > BOX_SIZE / 2) ? 15 : -15)
      .attr('text-anchor', d => (d.x > BOX_SIZE / 2) ? 'start' : 'end')
      .attr('transform', d => `rotate(${(d.x > BOX_SIZE / 2) ? 0 : 180})`)
      .attr('opacity', hideTextAtBorder)
      .text(d => d.name);
  }

  handleClick(event) {
  }

  handleCollapse(event) {
  }
}

export default RadialTreeBrowser;
