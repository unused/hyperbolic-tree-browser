import * as d3 from 'd3';
import math from './../lib/hyperbolic_math.js';

const BOX_SIZE = 1000;
const RADIUS   = BOX_SIZE / 2;

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
  }

  draw(data) {
    const root = treemap(d3.hierarchy(data));

    this.center();
    this.drawNodes(root);
    this.drawEdges(root);
  }

  center() {
    this.group.attr('transform', `translate(${RADIUS},${RADIUS})`);
  }

  drawEdges(root) {
    this.group.selectAll('.edge')
    .data(root.links())
    .enter().append('line')
    .attr("stroke-width", function(d) {
          //console.log("Edge Data");
          //console.log(d);
          //console.log(d.target.wedge);
          return Math.sqrt(2);
          })
    
    //.enter().append('path')
    .attr('class', 'edge')
    .attr("stroke", "#4D4D4D")
    .attr("x1", function(d) { return d.source.x * RADIUS; } )
    .attr("y1", function(d) { return d.source.y * RADIUS; } )
    .attr("x2", function(d) { return d.target.x * RADIUS; } )
    .attr("y2", function(d) { return d.target.y * RADIUS; } )
    
    //.attr('d', d3.linkRadial().angle(d => d.x).radius(d => d.y));
    ;
  }

  drawNodes(root) {
    const node = this.group.selectAll('.node')
      .data(root.descendants())
      .enter().append('g')
        .attr('class', d => `node ${d.children ? 'internal' : 'leaf'}`)
        .attr('transform', node => {
          const unit = math.hyperbolicPoint(node);
          // return `translate(${unit})`;
          return `translate(${unit[0] * RADIUS} ${unit[1] * RADIUS})`;
        });

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
