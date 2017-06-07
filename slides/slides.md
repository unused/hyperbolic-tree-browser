---
author:
- D. Bramreiter, M. Ebner, P. Leitner, C. Lipautz
title: Hyperbolic Tree Browser using D3.js v4.x
subtitle: INFOVIS - Group 1, SS 2017
institute: Graz University of Technology

---

## Presentation Overview

- JSON Tree and D3.hierarchy
- Radial Tide Tree Demo in D3
- Goals and Current State


## JSON Tree and D3.Hierarchy
```javascript
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
                {
                  "name": "Bahrain Merida PRo Cycling Team"
                },
                {
                  "name": "BMC Racing Team"
                },
                {
                  "name": "Bora - Hansgrohe"
                }
            ]
        }
    ]
}
```


## Radial Tide Tree in D3

\small
![Radial Tide Tree in D3]

\tiny Adapted from https://bl.ocks.org/mbostock/4063550


## Hyperbolic Layout
\small
![Hypertree Default]

\tiny Source: Mathematics and Algorithms for the Hyperbolic Tree Visualization (Benjamin Berge, Christophe Bouthier)

## Hyperbolic Dragging
\small
![Hypertree Drag]

\tiny Source: Mathematics and Algorithms for the Hyperbolic Tree Visualization (Benjamin Berge, Christophe Bouthier)

## Next Steps
- Contact other group to sync 'import data'
- Convert to Poincaré disc model
- Add dragging for browsing the hyperbolic tree layout


## Usage and Goals

- Minimal Dependencies <!-- to JavaScript packages -->
- Follow D3 (v4.9.1) Guidelines
- No General Styles; No Hard Bound Styles <!-- no generic rules, no id rules -->
- A11y in Mind <!-- implement what learned in survey -->

## Current State

- Complete setup for Jest testing environment.
- Implement algorithm in object-oriented JavaScript converting to Poincaré disk model.
- Use D3.js to update data and animate view.
- Write ongoing documentation.

[Hyperbolic Tree Example]: images/basic_tree.png
[Radial Tide Tree in D3]: images/ivis_graph_disc_tree002.png
[Hypertree Default]: images/hypertree001.png
[Hypertree Drag]: images/hypertree002.png

