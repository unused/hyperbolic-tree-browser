import HyperTreeCoordE from './hypertree_coord_e';
import debounce from '../utils/debounce';


/**
 * To simulate animation steps for the click event, we produce 10 steps of
 * updates. Note: The last step is the target.
 **/
const animationSteps = (init, target) => {
  let  steps = [{ x: target.x, y: target.y }];
  const step = { x: (target.x - init.x) / 10, y: (target.y - init.y) / 10 };

  for (let i = 1; i < 10; i++) {
    steps[i] = { x: steps[i-1].x - step.x, y: steps[i-1].y - step.y };
  }

  return steps;
};

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

  onClick(node, update) {
     console.debug('onClick');

    this.startDrag(node);
    let steps = animationSteps(node, { x: 500, y: 500 });
    let animate = setInterval(() => {
      if (steps.length === 0) {
        clearInterval(animate);
        this.endDrag();
        update();
      }
      console.debug('click steps', steps);
      this.onDrag(steps.pop());
      update();
    }, 200 / 10);

    return this.model.root;
  }

  startDrag(node) {
    console.debug('startDrag');
    this.start.projectionStoE(node.x, node.y, this.model);
  }

  onDrag(node) {
    console.debug('onDrag');
    debounce(function() {
      if (!this.start.valid) {
        console.debug('invalid start');
        return ;
      }

      this.end.projectionStoE(node.x, node.y, this.model);

      if (!this.end.valid) {
        console.debug('invalid end');
        return ;
      }

      this.current.sub(this.end, this.start);
      this.model.translate(this.current);
    }.bind(this), 50, true)();
  }

  endDrag() {
    this.model.endTranslation();
    console.debug('endDrag');
  }
}

export default HyperTreeAction;
