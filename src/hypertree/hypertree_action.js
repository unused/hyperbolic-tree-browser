import HyperTreeCoordE from './hypertree_coord_e';

/**
 * HyperTree Action
 **/
class HyperTreeAction {
  constructor(model) {
    this.model = model;

    this.start   = new HyperTreeCoordE();
    this.end     = new HyperTreeCoordE();
    this.current = new HyperTreeCoordE();

    this.onClick   = this.onClick.bind(this);
    this.startDrag = this.startDrag.bind(this);
    this.onDrag    = this.onDrag.bind(this);
    this.endDrag   = this.endDrag.bind(this);
  }

  onClick(node) {
    console.group('onClick');
    console.debug(node);

    this.startDrag({ x: 500, y: 600 });
    this.onDrag(node);
    this.endDrag();

    console.groupEnd('onClick');
    return this.model.root;
  }

  startDrag(node) {
    this.start.projectionStoE(node.x, node.y, this.model);
  }

  onDrag(node) {
    if (!this.start.valid) {
      return ;
    }

    this.end.projectionStoE(node.x, node.y, this.model);

    if (!this.end.valid) {
      return ;
    }

    this.current.sub(this.end, this.start);
    this.model.translate(this.current);
  }

  endDrag() {
    this.model.endTranslation();
  }
}

export default HyperTreeAction;
