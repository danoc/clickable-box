# 🖱 Unbutton

[![NPM version](https://badgen.net/npm/v/unbutton)](https://www.npmjs.com/package/unbutton) [![Build status](https://badgen.net/travis/danoc/unbutton)](https://travis-ci.com/danoc/unbutton) [![Code coverage](https://badgen.net/codecov/c/github/danoc/unbutton)](https://codecov.io/gh/danoc/unbutton) [![Bundle size](https://badgen.net/bundlephobia/min/unbutton?label=size)](https://bundlephobia.com/result?p=unbutton) [![Bundle size](https://badgen.net/bundlephobia/minzip/unbutton?label=gzip%20size)](https://bundlephobia.com/result?p=unbutton)

> React component to add `onClick` to HTML elements without sacrificing accessibility.

## What is this?

It's [very hard](https://www.scottohara.me/blog/2018/10/03/unbutton-buttons.html) to remove all styles from HTML `button` elements. It's also hard to create clickable `div`s that are accessible. This can cause developers to ship inaccessible UI.

The `Unbutton` React component accepts an `onClick` prop and an element to render. It returns the element with the `onClick` as well as the attributes and event listeners needed to make it as accessible as a `button`.

## Install

You can install `Unbutton` with NPM or Yarn.

```bash
npm install unbutton --save-exact
```

```bash
yarn add unbutton --exact
```

We encourage pinning the version number until `Unbutton` reaches `1.0.0`. We may ship breaking changes in `0.x.x` versions.

## Usage

Here's how to use `Unbutton` to make a clickable SVG:

```jsx
// import Unbutton from 'unbutton';

<Unbutton
  onClick={this.closeModal}
  aria-label="Close modal"
  className="icon-button"
>
  <CloseIcon />
</Unbutton>
```

`Unbutton` will return a `span` that looks like this:

```js
<span
  // Make the element clickable
  onClick={this.closeModal}
  // Make the element navigable by keyboard
  tabIndex={0}
  // Call `this.closeModal` if the user presses either the
  // enter or space key while the element is in focus
  onKeyDown={...}
  // Tell screen readers that the element is a button
  role="button"
  // Indicate on hover that the element is clickable
  style={{ cursor: 'pointer' }}
  // All other props are passed through to the element
  aria-label="Close modal"
  className="icon-button"
>
  <CloseIcon />
</span>
```

The resulting HTML is accessible for users navigating by screen readers, keyboard, and mouse/touch.

## Props

There are a few props that are built into `Unbutton`:

| prop       | type                                             | description                                                  |
| ---------- | ------------------------------------------------ | ------------------------------------------------------------ |
| `onClick`  | `function` \| defaults to: `undefined`           | The action to perform when the element is pressed            |
| `is`       | `string`, `React.Element` \| defaults to: `span` | The element to render                                        |
| `disabled` | `boolean` \| defaults to: `false`                | Makes element non-interactive, even if `onClick` is provided |
| `ref`      | `React.Ref`                                      | Provides access to the React element                         |

You can pass any custom prop as well. This component will forward those props to the rendered element.

## When should you use this?

- You're building a button that looks like plain text.
- You're building a button that has content spanning multiple columns or rows.
- You're making a clickable SVG icon.

## When shouldn't you use this?

- You're linking to another page: Use an `a` tag with an `href` instead. The anchor tag is semantically correct, allows users to preview the URL, open it in a new tab, and copy the link to their clipboard.
- You're building a button that [looks like a button](https://getbootstrap.com/docs/4.0/components/buttons/#examples): This is fairly easy to build as a `button` element with CSS.
