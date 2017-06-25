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

    this.startDrag = this.startDrag.bind(this);
    this.onDrag    = this.onDrag.bind(this);
    this.endDrag   = this.endDrag.bind(this);
  }

  startDrag(event) {
    const coords = d3.mouse(this);
    this.start.projectionStoE(coords[0], coords[1], this.model);
  }

  onDrag(event) {
    if (this.start.valid) {
      this.end.projectionStoE(coords[0], coords[1], this.model);
      if (this.end.valid) {
        this.current.sub(this.end, this.start);
        this.model.translate(this.current);
      }
    }
  }

  endDrag(event) {
    this.model.endTranslation();
  }
}

export default HyperTreeAction;
