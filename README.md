[![Build status](https://badgen.net/travis/danoc/clickable-box)](https://travis-ci.com/danoc/clickable-box) [![Code coverage](https://badgen.net/codecov/c/github/danoc/clickable-box)](https://codecov.io/gh/danoc/clickable-box) [![Bundle size](https://badgen.net/bundlephobia/min/clickable-box?label=size)](https://bundlephobia.com/result?p=clickable-box) [![Bundle size](https://badgen.net/bundlephobia/minzip/clickable-box?label=gzip%20size)](https://bundlephobia.com/result?p=clickable-box)

# ClickableBox

> React component to add `onClick` to HTML elements without sacrificing accessibility.

## What is this?

It's [very hard](https://www.scottohara.me/blog/2018/10/03/unbutton-buttons.html) to remove all styles from HTML `button` elements. It's also hard to create clickable `div`s that are accessible. This can cause developers to ship inaccessible UI.

The `ClickableBox` React component accepts an `onClick` prop and an element to render. It returns the element with the `onClick` as well as the attributes and event listeners needed to make it as accessible as a `button`. It combines the flexibility of a `div` or `span` with the accessibility of a `button`.

## Install

You can install `ClickableBox` with NPM or Yarn.

```bash
npm install clickable-box --save-exact
yarn add clickable-box --exact
```

We encourage pinning the version number until `ClickableBox` reaches `1.0.0`. We may ship breaking changes in `0.x.x` versions.

## Usage

Here's a look at how to use `ClickableBox` to make a clickable SVG.

```jsx
// import ClickableBox from 'clickable-box';

<ClickableBox
  is="span" 
  className="icon-container" 
  aria-label="Close modal"
>
  <CloseIcon />
</ClickableBox>
```

## Props

There are a few props that are built into `ClickableBox`:

| prop      | type                                            | description                                       |
| --------- | ----------------------------------------------- | ------------------------------------------------- |
| `onClick` | `function` \| _required_                        | The action to perform when the element is pressed |
| `is`      | `string`, `React.Element` \| defaults to: `div` | The element to render                             |
| `ref`     | `React.Ref`                                     | Provides access to the React element              |

You can pass any custom prop as well since this component spreads all of the props on the rendered element.

## What happens behind the scenes?

The component does a few things to make the HTML element behave like a `button`.

* Add `tabIndex={0}` to make the element navigable by keyboard.
* Add `cursor: pointer` to indicate on hover that the element is interactive.
* Add `onKeyDown` event listener that runs `onClick` when `Space` or `Enter` are pressed.
* Add `role="button"` so that screen readers announce the element as a button.
