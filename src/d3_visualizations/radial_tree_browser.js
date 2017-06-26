import * as d3 from 'd3';

const BOX_SIZE = 1000;
const RADIUS   =  500;

/* some rendering helpers */
const labelRotation = d => {
  const r = Math.sqrt(d.x * d.x + d.y * d.y);
  return `rotate(${Math.sin(r)})`;
};

const links = root => root.node.descendants()
  .reduce((acc, node) => {
    if (node.children) {
      node.children
        .forEach(child => acc.push({ source: node, target: child }));
    }
    return acc;
  }, []);

const hideTextAtBorder = d => {
  if (d.x - BOX_SIZE / 6 < 0) return 0.0;
  if (d.y - BOX_SIZE / 6 < 0) return 0.0;
  if (d.x + BOX_SIZE / 6 > BOX_SIZE) return 0.0;
  if (d.y + BOX_SIZE / 6 > BOX_SIZE) return 0.0;
  return 1.0;
};

/**
 * A radial tree browser visualization.
 *
 * Usate:
 *   const radialTreeBrowser = new radialTreeBrowser(<selector>);
 *   radialTreeBrowser.draw(data);
 **/
class RadialTreeBrowser {
  constructor(selector) {
    this.selector = selector;
    this._init();
  }

  _init() {
    this.svg   = d3.select(this.selector);
    this.group = this.svg.append('g');

    this.svg.attr('viewBox', `0 0 ${BOX_SIZE} ${BOX_SIZE}`);
    this.group.attr('class', 'radial-tree-browser');
  }

  draw(view) {
    this.view = view;
    this.update();
    this.drawEdges(this.view.root);
    this.drawNodes(this.view.root);
  }

  update() {
    this.group.selectAll('.edge').remove();
    this.group.selectAll('.node').remove();
    this.drawEdges(this.view.root);
    this.drawNodes(this.view.root);
  }

  drawEdges(root) {
    this.group.selectAll('.edge')
      .data(links(root))
      .enter().append('line')
        .attr('class', 'edge')
        .attr('x1', d => d.source.x).attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
  }

  drawNodes(root) {
    const nodes = this.group.selectAll('.node')
      .data(root.node.descendants()).enter().append('g')
        .attr('class', d => `node ${d.children ? 'internal' : 'leaf'}`)
        .attr('tabindex', 0)
        .attr('aria-label', d => d.text)
        .attr('transform', d => `translate(${d.x} ${d.y})`)
        .on('dblclick', this.clickHandler.bind(this))
        .on('keydown', e => console.debug(e)) // this.keyboardHandler.bind(this))
        .on('drag',    this.dragHandler());

    nodes.append('circle')
      .attr('r', 10);

    nodes.append('text')
      .attr('dy', '0.3rem')
      .attr('x', d => (d.x > BOX_SIZE / 2) ? 15 : -15)
      .attr('text-anchor', d => (d.x > BOX_SIZE / 2) ? 'start' : 'end')
      .attr('transform', labelRotation)
      .attr('opacity', hideTextAtBorder)
      .text(d => d.name);
  }

  dragHandler() {
    return d3.drag()
      .on('start', this.view.actions.startDrag)
      .on('drag',  e => { this.view.actions.onDrag(e);  this.update(); })
      .on('end',   e => { this.view.actions.endDrag(e); this.update(); });
  }

  clickHandler(event) {
    this.view.actions.onClick(event);
    this.update();
  }

  keyboardHandler(event) {
    console.debug(event, d3.event.key);
    //this.view.actions.onClick(event);
    this.update();
  }
}

export default RadialTreeBrowser;
