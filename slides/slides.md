---
author:
- D. Bramreiter, M. Ebner, P. Leitner, C. Lipautz
title: Hyperbolic Tree Browser using D3.js
subtitle: INFOVIS - Group 1, SS 2017
institute: Graz University of Technology

---

## Presentation Overview

- Motivation
- Project Setup
- Usage and Goals

## Motivation: Hyperbolic Tree Browser

- Handle large hierarchical data
- Use interaction and animation to browse
- Display a fisheye overview, details on focus
- Summary from Course\footnote{Chapter 5.3.3 Hyperbolic Browser in Course Notes}

## Motivation: Hyperbolic Tree Browser

\small
![Hyperbolic Tree Example]

\tiny Source: https://en.wikipedia.org/wiki/File:BasicTree.png (Public domain)

## Motivation: Hyperbolic Tree Browser

- Focus on the context visible <!-- view details about few, little about many -->
- Drag focus area to switch context <!-- in order to be captured by human brain -->
- Use animation on click to follow relations <!-- ensures being able to follow and understand relationships -->

## Project Setup: Runtime Environment

- Data-Driven Documents using D3.js (v4) <!-- Use to keep track and update data -->
- Algorithm to generate via JavaScript
- Present using HTML/SVG and CSS

## Project Setup: Development Environment

- Jest <!-- unit testing for algorithm, and snapshot testing for the result -->
- Yarn, Webpack, ES6 <!-- state of the art env -->
- HTML5, SVG 1.1, CSS3 <!-- no fancy extensions, keep to the basics -->
- D3.js version 4.x

## Usage and Goals

- Minimal dependencies <!-- to JavaScript packages -->
- Follow D3 guidelines
- No general styles, no hard bound styles <!-- no generic rules, no id rules -->
- A11y in mind <!-- implement what learned in survey -->

## Current State

- Reading Papers to extract Algorithm
- Reading Documentations (D3v4, Jest, ...)
- Started Project Setup

[Hyperbolic Tree Example]: images/basic_tree.png
