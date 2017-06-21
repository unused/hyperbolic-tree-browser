
import HierarchyData  from './utils/hierarchy_data';
import HyperbolicTree from './d3_visualizations/hyperbolic_tree';

(new HierarchyData('json'))
  .fetch('/assets/data/four.json')
  .then(data => (new HyperbolicTree('svg')).draw(data));

