# 📦 ClickableBox

[![NPM version](https://badgen.net/npm/v/clickable-box)](https://www.npmjs.com/package/clickable-box) [![Build status](https://badgen.net/travis/danoc/clickable-box)](https://travis-ci.com/danoc/clickable-box) [![Code coverage](https://badgen.net/codecov/c/github/danoc/clickable-box)](https://codecov.io/gh/danoc/clickable-box) [![Bundle size](https://badgen.net/bundlephobia/min/clickable-box?label=size)](https://bundlephobia.com/result?p=clickable-box) [![Bundle size](https://badgen.net/bundlephobia/minzip/clickable-box?label=gzip%20size)](https://bundlephobia.com/result?p=clickable-box)

> React component to add `onClick` to HTML elements without sacrificing accessibility.

## What is this?

It's [very hard](https://www.scottohara.me/blog/2018/10/03/clickable-box-buttons.html) to remove all styles from HTML `button` elements. It's also hard to create clickable `div`s that are accessible. This can cause developers to ship inaccessible UI.

The `ClickableBox` React component accepts an `onClick` prop and an element to render. It returns the element with the `onClick` as well as the attributes and event listeners needed to make it as accessible as a `button`.

## Install

You can install `ClickableBox` with NPM or Yarn.

```bash
npm install clickable-box --save-exact
```

```bash
yarn add clickable-box --exact
```

We encourage pinning the version number until `ClickableBox` reaches `1.0.0`. We may ship breaking changes in `0.x.x` versions.

## Usage

Here's how to use `ClickableBox` to make a clickable SVG:

```jsx
// import ClickableBox from 'clickable-box';

<ClickableBox
  onClick={this.closeModal}
  aria-label="Close modal"
  className="icon-button"
>
  <CloseIcon />
</ClickableBox>
```

`ClickableBox` will return a `span` that looks like this:

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

There are a few props that are built into `ClickableBox`:

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
- You think it'd be easier to simply style a `button`: This is a good sign that you should use a `button` element instead.
