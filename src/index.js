
import HierarchyData from './hierarchy_data';
import RadialTree    from './radial_tree';

(new HierarchyData('json'))
  .fetch('assets/data/simple.json').then(data => (new RadialTree()).draw(data));

