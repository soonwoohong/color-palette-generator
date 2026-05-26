# Color Palette Generator for Publication

A standalone browser app for designing a coordinated publication palette system. One base color and one contrast color generate categorical, sequential, and diverging palettes together, so figures across one manuscript can stay visually consistent.

Open `index.html` in a browser. No build step is required.

## What it does

- Generates categorical, sequential, and diverging palettes from the same base colors.
- Includes vivid published-style starting points, including Universal vivid color, Wong / Okabe-Ito, and Nature-family accessible color pair guidance.
- Lets users pick base and contrast colors from popular swatches or by entering HEX values.
- Applies an optional background contrast boost so light colors remain visible on the default white page.
- Simulates protanopia, deuteranopia, tritanopia, and achromatopsia / grayscale.
- Scores perceptual separation, color-blind separation, grayscale separation, and background contrast.
- Previews line, scatter, heatmap, and grouped-bar figures.
- Exports HEX, Python / Matplotlib, R / ggplot2, CSS variables, JSON, CSV, and SVG.

## Source notes

The examples are source-informed starting points, not official journal palettes and not extracted from copyrighted figure art.

- Wong / Okabe-Ito categorical anchors are based on Bang Wong's Nature Methods color-blindness guidance: https://www.nature.com/articles/nmeth.1618
- Nature-family author guidance encourages accessible pairings such as green-magenta, turquoise-red, and yellow-blue: https://www.nature.com/nature/for-authors/initial-submission and https://www.nature.com/ncomms/submit/how-to-submit
