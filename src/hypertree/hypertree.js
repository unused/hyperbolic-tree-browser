import HyperTreeModel from './hypertree_model';
import HyperTreeView  from './hypertree_view';

/**
 * HyperTree, a hierarchical data tree presentation using hyperbolic geometry.
 *
 * root ... the root of the tree to be represented, providing following
 *          attributes and methods: `height`, `children`, `parent`, `weight` or
 *          `value`. Corresponding descendents must provide the same attributes
 *          as well.
 *
 * Note: This software is based upon the on the work of Benjamin Berge and
 * Christophe Bouthier, (ref. Mathematics and Algorithms for the Hyperbolic
 * Tree Visualization) and the Java Implementation of Christophe Bouthier
 * (2001), see hypertree.sourceforge.net.
 **/
class HyperTree {
  constructor(root) {
    this.root  = root;
    this.model = new HyperTreeModel(this.root);
  }

  build() {
    this.model.layoutHyperbolicTree();
    return this;
  }

  get view() {
    return new HyperTreeView(this.model);
  }
}

export default HyperTree;
