# Hyperbolic Tree Browser with D3.js

A hyperbolic tree implementation using D3.js.

The mathematical base and implementation is based upon the work of Benjamin
Bergé and Christophe Bouthier, see "Mathematics and Algorithms for the
Hyperbolic Tree Visualization".

The library hyperbolic\_math.js is based on the work of John Lamping and Ramana
Rao, see "The Hyperbolic Browser : A Focus 1 Context Technique for Visualizing
Large Hierarchies".

## Usage

You can run the demo application by using [npm] or [yarn], installing the
javascript dependencies with `yarn install` and starting the demo application
with `yarn server`. Your default web browser will open the at
[http://localhost:3000]. Any changes to source files (scss/css, html,
javascript) will update the browser window automatically.

To use the hierarchy visualisation with your own data, see demo application
index file at [/src/app.js].

```javascript
(new HierarchyData('json')) // initialize importer of type json
  .fetch('/assets/data/simple.json') // fetch remote source from /public/assets/data/simple.json
  .then(data => treemap(d3.hierarchy(data))) // prepare data
  .then(root => {
    const tree = new HyperTree(root); // initialize hyperbolic transformation
    tree.build(); // calculation hyperbolic space transformations
    tree.view.draw(); // calculate presentation space transformations
    new RadialTreeBrowser('svg').draw(root); // draw data in d3 visualisation
  });
```

See [/src/utils/hierarchy\_data.json] to find usage information for the file
import.

## Setup and Development

```shell
$ yarn install         # install javascript stuff
$ yarn build           # build project files
$ yarn server          # start development server
$ yarn watch           # watch source changes
$ yarn watch-styles    # watch style changes
$ yarn test            # run tests
$ yarn test -- --watch # watch tests
```

[yarn]: https://yarnpkg.com/en/
[npm]: https://www.npmjs.com/
