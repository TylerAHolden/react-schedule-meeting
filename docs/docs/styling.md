---
id: styling
title: Styling
---

# Styling

There are 3 different methods you can utilize to style React Schedule meeting.

## Method 1: Quick & Dirty; 3 Props.

React Schedule Meeting was designed to be an easy-to-integrate solution so the component comes with 3 basic style configuration props, `backgroundColor`, `primaryColor`, and `borderRadius`, that make it very easy to quickly theme the component.

## Method 2: Medium Control: CSS Variable overrides.

The 3 props mentioned above get turned into CSS variables which are then used throughout the component. You can fine-tune the component theming a little bit more by overriding these CSS variables on the main component. Notice that all of the colors are specified in rgb values because throughout the component, the RGB values are used with different alpha values.

```css
--primary-color-rgb: 63, 91, 133;
--text-color-rgb: 255, 255, 255;
--primary-color-text-shade-rgb: 31.5, 45.5, 66.5;
--background-color-rgb: 255, 255, 255;
--background-color-contrast-rgb: 34, 34, 34;
--primary-color-contrast-rgb: 255, 255, 255;
--border-radius: 10;
```

## Method 3: Full Control: CSS Class Overrides.

There are a few classNames included on key components such as `rsm-arrow-button`, `rsm-confirm-button`, `rsm-cancel-button`, `rsm-empty-list-text`, `rsm-no-future-times-text`, `rsm-next-available-date-button`, and `rsm-date-title`.
