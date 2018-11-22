[![Build Status](https://badgen.net/travis/danoc/clickable-box)](https://travis-ci.com/danoc/clickable-box) [![Code Coverage](https://badgen.net/codecov/c/github/danoc/clickable-box)](https://codecov.io/gh/danoc/clickable-box)

# clickable-box

## Props

This component accepts all props and spreads them on the rendered element.

There are a few props though that are built into `ClickableBox`.

| prop      | type                                            | description                                       |
| --------- | ----------------------------------------------- | ------------------------------------------------- |
| `onClick` | `function` \| _required_                        | The action to perform when the element is pressed |
| `is`      | `string`, `React.Element` \| defaults to: `div` | The element to render                             |
| `ref`     | `React.Ref`                                     | Provides access to the React element              |
