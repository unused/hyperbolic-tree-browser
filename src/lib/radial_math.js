
export default {
  radialPoint: (x, y) => {
    return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
  },

  textRotation: d => {
    const mod = d.x < Math.PI ? -1 : 1;
    return `rotate(${(d.x + mod * Math.PI / 2) * 180 / Math.PI})`;
  }
}
