---
author:
- D. Bramreiter, M. Ebner, ~~P. Leitner~~, C. Lipautz
title: Hyperbolic Tree Browser using D3.js v4.x
subtitle: INFOVIS - Group 1, SS 2017
institute: Graz University of Technology
---

## Presentation Overview

- Hyperbolic Tree Browser
- Implementation using D3.js v4
- Project Demonstration

## Hyperbolic Tree Browser

Visualize large hierarchical data to support focus + context principle.\footnote{Chapter 5.3.3 Hyperbolic Browser in Course Notes}

## Hyperbolic Tree Browser Example

\small
![Hyperbolic Tree Example]

\tiny Source: https://en.wikipedia.org/wiki/File:BasicTree.png (Public domain)

## Hyperbolic Tree Browser Construction: Distance

\small
![Hyperbolic Tree Construction]

\tiny Source: https://en.wikipedia.org/wiki/File:BasicTree.png (Public domain)

## Hyperbolic Tree Browser Construction: Rotation

- Root is at center.
- Root children have sections of same size around center.
- Other children have sections of same size inside wedge.

## Data-Driven Documents with D3.js v4

```javascript
svg.append("g")
  .selectAll("circle")
  .data(data)
    .enter(/* handle new data */)
    .update(/* handle changes */)
    .exit(/* handle data removal */);
```

## D3.js v4 Support for Hyperbolic Browser Tree Implementation

  - D3.js hierarchical data
    - attributes: `node.data.name`, `node.depth`
    - relations: `node.parent`, `node.children`

  - D3.js document data
    - `enter()`
    - `.on('dblclick', function(d){ //...`

## Data structure and D3.Hierarchy

```json
{
    "name": "UCI",
    "children": [
        {
            "name": "World Tour",
            "children": [
                {
                  "name": "AG2R La Mondiale"
                },
                {
                  "name": "Astana Pro Cycling Team"
                },

                // ...
```

## Using D3.js v4 to Construct Hypertree

- Prepare hierarchical data (provide stratify callback if adaption needed).
- Provide data to D3.js and set enter handler to transform calculations.
- D3.js proceeds from root node through children. Wedge and rotation
  information are stored to nodes.

# Project Demonstration

[Hyperbolic Tree Example]: images/basic_tree.png
[Hyperbolic Tree Construction]: images/tree_construction.png

