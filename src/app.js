import * as d3 from 'd3';

import HierarchyData     from './utils/hierarchy_data';
import HyperTree         from './hypertree/hypertree.js';
import RadialTreeBrowser from './d3_visualizations/radial_tree_browser.js';

import TreeBrowserKeyboardNavigation from './utils/keyboard_navigation.js';

import ImportControls from './utils/import_controls.js';

const treemap = d3.tree()
  .size([2 * Math.PI, 500]);

TreeBrowserKeyboardNavigation.listenFor('node');

const data = treemap(d3.hierarchy({"name":"Victreebel","children":[{"name":"Nidorino","children":[{"name":"Haunter","children":[{"name":"Nidoqueen"},{"name":"Arbok"},{"name":"Arbok"},{"name":"Chansey"}]},{"name":"Ninetales","children":[{"name":"Vileplume"},{"name":"Ponyta"}]},{"name":"Psyduck","children":[{"name":"Weezing"}]}]},{"name":"Venusaur","children":[{"name":"Diglett","children":[{"name":"Voltorb"},{"name":"Abra"},{"name":"Magneton"},{"name":"Doduo"}]},{"name":"Beedrill","children":[{"name":"Exeggutor"},{"name":"Jigglypuff"}]},{"name":"Blastoise","children":[{"name":"Marowak"},{"name":"Weepinbell"},{"name":"Ditto"},{"name":"Zapdos"},{"name":"Jynx"}]},{"name":"Tentacruel","children":[{"name":"Poliwag"},{"name":"Arbok"},{"name":"Charmeleon"}]}]},{"name":"Vulpix","children":[{"name":"Spearow","children":[{"name":"Alakazam"},{"name":"Bellsprout"}]}]},{"name":"Marowak","children":[{"name":"Magmar","children":[{"name":"Chansey"},{"name":"Seel"}]},{"name":"Gastly","children":[{"name":"Charizard"}]},{"name":"Arbok","children":[{"name":"Tentacruel"},{"name":"Wigglytuff"},{"name":"Kakuna"}]}]}]}));
let tree; (tree = new HyperTree(data).build()).view.draw();
new RadialTreeBrowser('svg').draw(tree.view);

const updateVisualisation = (file, content) => {
  document.querySelector('svg').firstChild.remove();
  const type = file.name.endsWith('.json') ?  'json'
    : (file.name.endsWith('.skos.xml') ? 'skos' : 'tree');
  (new HierarchyData(type))
    .load(content)
    .then(data => treemap(d3.hierarchy(data)))
    .then(root => {
      let tree; (tree = new HyperTree(root).build()).view.draw();
      new RadialTreeBrowser('svg')
        .clear()
        .draw(tree.view);
    });
};

/* importer controls */
(new ImportControls('.import-controls', updateVisualisation)).listen();
