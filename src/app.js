import * as d3 from 'd3';

import HierarchyData     from './utils/hierarchy_data';
import HyperTree         from './hypertree/hypertree.js';
import RadialTreeBrowser from './d3_visualizations/radial_tree_browser.js';

import TreeBrowserKeyboardNavigation from './utils/keyboard_navigation.js';

const treemap = d3.tree()
  .size([2 * Math.PI, 500]);

TreeBrowserKeyboardNavigation.listenFor('node');

(new HierarchyData('json'))
  .fetch('/assets/data/simple.json')
  .then(data => treemap(d3.hierarchy(data)))
  .then(root => {
    let tree; (tree = new HyperTree(root).build()).view.draw();
    new RadialTreeBrowser('svg').draw(tree.view);
  });

