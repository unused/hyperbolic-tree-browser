---
author:
- D. Bramreiter, M. Ebner, P. Leitner, C. Lipautz
title: Hyperbolic Tree Browser using D3.js v4.x
subtitle: INFOVIS - Group 1, SS 2017
institute: Graz University of Technology

---

## Presentation Overview

- Motivation
- Project Setup and Testing
- Usage, Goals and Current State

## Motivation: Recall Hyperbolic Tree Browser

- Handle large hierarchical data
- Drag focus area to switch context (focus+context) <!-- in order to be captured by human brain -->
- Use animation on switch (click) to follow relations
- See Course Notes\footnote{Chapter 5.3.3 Hyperbolic Browser in Course Notes}

## Motivation: Hyperbolic Tree Browser

\small
![Hyperbolic Tree Example]

\tiny Source: https://en.wikipedia.org/wiki/File:BasicTree.png (Public domain)

## Project Setup: Runtime Environment

- Data-Driven Documents using D3.js (v4). <!-- Use to keep track and update data -->
- Algorithm to generate the visualization via JavaScript (Poincaré disk model).
- Present using HTML/SVG and CSS.

## Project Setup: Development Environment

- Jest <!-- unit testing for algorithm, and snapshot testing for the result -->
- Yarn, Webpack, ES6 <!-- state of the art env -->
- HTML5, SVG 1.1, CSS3 <!-- no fancy extensions, keep to the basics -->
- D3.js latest (v4.9.1)

## Jest: Testing

```javascript
import Subject from './../src/hyperbolic_d3';

test('does something', () => {
  expect(typeof (new Subject()).doSomething)
    .toEqual('function');
});
```

## Jest: Snapshot Testing

Use HTML in snapshot testing with Jest.

```javascript
test('use snapshot testing with html', () => {
  expect('<p class="foo">bar</p>')
    .toMatchSnapshot();
});
```

## Jest: Snapshot Testing in Node.js

- Snapshot testing in Node.js has no HTML document.
- Current challenge: Use JSDOM to simulate (partial) documents.

## Jest: Snapshot Testing with JSDOM

```javascript
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

test('use snapshot testing with d3', () => {
  const window = new JSDOM('<html><body>').window;
  const body = window.document.querySelector('body');
  const d3 = require('d3');
  d3.select(body)
    .append('p')
    .text('Foobar');
  console.log(window.document.innerHTML);
  expect(window.document.innerHTML).toMatchSnapshot();
});
```

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
