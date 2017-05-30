---
author:
- D. Bramreiter, M. Ebner, P. Leitner, C. Lipautz
title: Hyperbolic Tree Browser using D3.js
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

- Data-Driven Documents using D3.js (v4) <!-- Use to keep track and update data -->
- Algorithm to generate via JavaScript (Poincaré disk model)
- Present using HTML/SVG and CSS

## Project Setup: Development Environment

- Jest <!-- unit testing for algorithm, and snapshot testing for the result -->
- Yarn, Webpack, ES6 <!-- state of the art env -->
- HTML5, SVG 1.1, CSS3 <!-- no fancy extensions, keep to the basics -->
- D3.js version 4.x

## Jest: Testing

```javascript
import Subject from './../src/hyperbolic_d3';

test('does something', () => {
    expect(typeof (new Subject()).doSomething)
      .toEqual('function');
});
```

## Jest: Snapshot Testing

- Snapshot Testing uses HTML Document
- Snapshot Testing with Node.js has no HTML Document
- Current Challenge: Use JSDOM

## Usage and Goals

- Minimal Dependencies <!-- to JavaScript packages -->
- Follow D3 (v4.9.x) Guidelines
- No General Styles, No Hard Bound Styles <!-- no generic rules, no id rules -->
- A11y in Mind <!-- implement what learned in survey -->

## Current State

- Complete Setup for Jest Testing Environment
- Implement Algorithm in Object-Oriented JavaScript using Poincaré Model
- Use D3.js to Update Data and Animate View
- Ongoing Documentation

[Hyperbolic Tree Example]: images/basic_tree.png
