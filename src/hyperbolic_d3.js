import * as d3 from 'd3';

class HyperbolicD3 {
  doSomething() {
    d3.select('body')
      .style('background-color', () => `hsl(${Math.random() * 360},100%,50%)`)
      .append('p')
        .text('Disco!!!');
  }
}

export default HyperbolicD3;
