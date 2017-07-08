import * as d3 from 'd3';

import HierarchyData     from './utils/hierarchy_data';
import HyperTree         from './hypertree/hypertree.js';
import RadialTreeBrowser from './d3_visualizations/radial_tree_browser.js';

import TreeBrowserKeyboardNavigation from './utils/keyboard_navigation.js';

import ImportControls from './utils/import_controls.js';

const treemap = d3.tree()
  .size([2 * Math.PI, 500]);

TreeBrowserKeyboardNavigation.listenFor('node');

/* demo application */
(new HierarchyData('json'))
  .fetch('/assets/data/simple.json')
  .then(data => treemap(d3.hierarchy(data)))
  .then(root => {
    let tree; (tree = new HyperTree(root).build()).view.draw();
    new RadialTreeBrowser('svg').draw(tree.view);
  });

const resetSvg = function() {
  const svg = document.createElement('svg');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('version', '1.1');

  document.querySelector('svg').remove();
  document.body.appendChild(svg);
}

const updateVisualisation = (file, content) => {
  resetSvg();
  const type = file.name.endsWith('.json') ? 'json' : 'xml';
  (new HierarchyData(type))
    .load(content)
    .then(data => treemap(d3.hierarchy(data)))
    .then(root => {
      let tree; (tree = new HyperTree(root).build()).view.draw();
      new RadialTreeBrowser('svg').draw(tree.view);
    });
};

/* importer controls */
(new ImportControls('.import-controls', updateVisualisation)).listen();
