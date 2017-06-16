
import RadialTree from './radial_tree';

fetch('/assets/data/simple.json')
  .then(response => response.json())
  .then(data => (new RadialTree()).draw(data));

