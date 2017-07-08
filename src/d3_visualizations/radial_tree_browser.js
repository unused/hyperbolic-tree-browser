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
    this.group.call(this.dragHandler());
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
      .enter().append('path')
        .attr('class', 'edge')
        .attr('d', d => {
          const s = d.source, t = d.target;
          return `M${s.x},${s.y}S${t.x},${s.y} ${t.x},${t.y}`;
        });
  }

  drawNodes(root) {
    const nodes = this.group.selectAll('.node')
      .data(root.node.descendants()).enter().append('g')
        .attr('class', d => `node ${d.children ? 'internal' : 'leaf'}`)
        .attr('tabindex', 0)
        .attr('aria-label', d => d.text)
        .attr('aria-level', d => d.node && d.node.depth || 0)
        .attr('transform', d => `translate(${d.x} ${d.y})`);

    nodes.append('circle')
      .attr('r', 10);

    nodes.append('text')
      .attr('dy', '0.3rem')
      .attr('x', d => (d.x > BOX_SIZE / 2) ? 15 : -15)
      .attr('text-anchor', d => (d.x > BOX_SIZE / 2) ? 'start' : 'end')
      .attr('transform', labelRotation)
      .attr('opacity', hideTextAtBorder)
      .text(d => d.name);

    nodes
      .on('dblclick', this.clickHandler.bind(this));
  }

  /**
   * As d3 has an issue with drag & click handling at the same time, we figure
   * out a doubleclick occured ourselves and trigger the onclick handler.
   **/
  dragHandler() {
    let clickTimestamp = new Date().getTime();
    const testDoubleClick = () => {
      const now = new Date().getTime();
      const doubleClick = (now - clickTimestamp) <= 500;
      clickTimestamp = new Date().getTime();
      return doubleClick;
    };

    return d3.drag()
      .on('start', () => {
        this.view.actions.startDrag(d3.event);
        d3.event.sourceEvent.stopPropagation();
      })
      .on('drag', () => {
        this.view.actions.onDrag(d3.event);
        d3.event.sourceEvent.stopPropagation();
        this.update();
      })
      .on('end', function() {
        if (testDoubleClick()) {
          this.clickHandler(d3.event);
          return ;
        } else {
          this.view.actions.endDrag(d3.event);
          d3.event.sourceEvent.stopPropagation();
          this.update();
        }

        d3.event.sourceEvent
          .target.parentElement.setAttribute('class', 'node selected');
      }.bind(this));
  }

  clickHandler(event) {
    console.debug('click');
    this.view.actions.onClick(event, this.update.bind(this));
  }
}

export default RadialTreeBrowser;
