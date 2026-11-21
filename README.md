# Operations Research Solver

> Interactive graphical method solver for two-variable linear programming problems.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Plotly](https://img.shields.io/badge/Plotly-3F4F75?style=flat-square&logo=plotly&logoColor=white)

## Overview

This project solves **linear programming problems with two decision variables** using the graphical method. The user enters an objective function and a set of constraints; the app computes the feasible region, its vertices and the optimal value of `Z`.

It was built as a teaching and analysis tool for Operations Research coursework.

## Features

- Objective function: maximize or minimize `Z = c1·x1 + c2·x2`.
- Any number of constraints with `<=` or `>=` operators.
- Automatic intersection calculation between constraints and with the axes.
- Feasibility filtering, including the origin when applicable.
- Vertex table with the value of `Z` at each point.
- Interactive Plotly chart of the feasible region.
- Input validation and clear result highlighting.

## How it works

1. Parse the objective function and constraints.
2. Compute every pairwise intersection and every axis intersection.
3. Keep only points that satisfy all constraints and `x1, x2 >= 0`.
4. Evaluate `Z` at every feasible vertex.
5. Return the maximum or minimum according to the selected objective.

The core logic lives in `src/utils/metodo_grafico.js`.

## Getting started

### Prerequisites

- Node.js 20+

### Run locally

```bash
npm ci
npm run dev
```

App: `http://localhost:5173`

### Build

```bash
npm run build
npm run preview
```

## Stack

| Layer | Technology |
|---|---|
| UI | React 19 |
| Build tool | Vite 7 |
| Styling | Tailwind CSS 4 |
| Charting | Plotly.js + react-plotly.js |
| Math | Custom linear algebra utilities |

## Limitations

- Only two decision variables (`x1`, `x2`), by design of the graphical method.
- Coefficients and bounds must be numeric.
- Degenerate and unbounded cases are reported through the computed vertex set rather than a full simplex solver.

## Possible next steps

- Add a simplex method mode for more than two variables.
- Export the solution and chart as PDF.
- Add step-by-step explanations for each vertex.
