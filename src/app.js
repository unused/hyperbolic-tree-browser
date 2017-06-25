import * as d3 from 'd3';

import HierarchyData     from './utils/hierarchy_data';
import HyperTree         from './hypertree/hypertree.js';
import RadialTreeBrowser from './d3_visualizations/radial_tree_browser.js';

const treemap = d3.tree()
  .size([2 * Math.PI, 500]);

(new HierarchyData('json'))
  .fetch('/assets/data/three.json')
  .then(data => treemap(d3.hierarchy(data)))
  .then(root => {
    const tree = new HyperTree(root);
    tree.build();
    tree.view.draw();
    new RadialTreeBrowser('svg').draw(root);
  });

