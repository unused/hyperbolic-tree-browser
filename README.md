# Hyperbolic Tree Browser with D3.js

A hyperbolic tree implementation using D3.js. The projects [github page](https://unused.github.com/hyperbolic-tree-browser) shows a demonstrational application, allowing to render a hyperbolic browser tree, interacting with drag and drop or doubleclick and upload new data files. Data types will be guessed by the file endings, use `.json` for json files, `.skos.xml` for skos files and `.xml` for treeml data.

## Implementation Details

The mathematical base and implementation is based upon the work of Benjamin
Bergé and Christophe Bouthier, see "Mathematics and Algorithms for the
Hyperbolic Tree Visualization". Sourcecode can be found in `src/hypertree`
directory.

The library hyperbolic\_math.js is based on the work of John Lamping and Ramana
Rao, see "The Hyperbolic Browser : A Focus 1 Context Technique for Visualizing
Large Hierarchies". Sourcecode can be found in `src/lib` directory.

The d3 visualisation using a radial browser tree can be found in
`src/d3_visualisations` directory. Note that handling drag and drop parallel to
click causes several browser issues therefor a workaround was implemented
detecting a click from the drag events.

## Setup and Usage

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

## Development

The ES6 javascript source code located in [/src/] directory is transformed and
merged into browser friendly JavaScript using **webpack** and **babel**
resulting in the [/public/assets/bunlde.js] ready to be used by the demo
application.
Changes to any source files are watched and the demo application automatically
refresehd in any open browser window using **browser-sync**.
A **jest** JavaScript testing based on Jasmin is used to ensure
hypertree calculation produce expected results.
To ensure quick edit of styles a **node-sass** watcher is
transforming SCSS code into CSS inside [/public/assets/] path.

Note: After build process there is no other dependency than **D3 (version
4.9.1)**, any of the before mentioned libraries are used in development
environment only.

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
