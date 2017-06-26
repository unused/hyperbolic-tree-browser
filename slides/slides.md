---
author:
- D. Bramreiter, M. Ebner, C. Lipautz
title: Hyperbolic Tree Browser using D3.js v4
subtitle: INFOVIS - Group 1, SS 2017
institute: Graz University of Technology
---

## Presentation Overview

- Hyperbolic Tree Browser
- Implementation using D3.js v4
- Project Demonstration

## Hyperbolic Tree Browser

Visualize large hierarchical data to support focus + context principle.\footnote{Chapter 5.3.3 Hyperbolic Browser in Course Notes}

## Showcase: Hyperbolic Tree Browser

\small
![Hyperbolic Tree Example]

## Data-Driven Documents with D3.js v4

Do not tell how to do, tell what to do!

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

D3.js bind data on DOM

  - `enter()`
  - `.on('dblclick', function(d){ //...`

## D3.js v4 Support for Hyperbolic Browser Tree Implementation

D3.js hierarchical data

  - attributes: `node.data.name`, `node.depth`
  - relations: `node.parent`, `node.children`

## Data structure and D3.Hierarchy

```json
{
    "name": "zero",
    "children": [
        {
            "name": "one",
            "children": [
                {
                  "name": "one-one"
                },
                {
                  "name": "one-two"
                },

                // ...
```

# Project Demonstration (Steps I - V)

<!-- start with README, then explain running services + show on changes -->

## Using D3.js v4 to Construct Hypertree I

Prepare hierarchical data (provide stratify callback if adaption needed).

<!-- DEMO Dominik -->

## Using D3.js v4 to Construct Hypertree II

<!-- hypertree generation overview -->

## Using D3.js v4 to Construct Hypertree III

Provide data to D3.js and set enter handler to transform calculations.

## Using D3.js v4 to Construct Hypertree IV

D3.js proceeds from root node through children. Wedge and rotation information
are stored to nodes.

## Using D3.js v4 to Construct Hypertree IV

SVG A11y

# Hyperbolic Tree Browser using D3.js v4.x

[Hyperbolic Tree Example]: images/basic_tree.png
[Hyperbolic Tree Construction]: images/tree_construction.png

