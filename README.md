# Serverless Desktop

This project is about providing a user-friendly layer on top of the serverless CLI.

What the desktop app is **NOT**

- A replacement for the serverless CLI
- The serverless platform

See the goals of the project [here](./docs/README.md)

## [Download App](http://bit.ly/2fj7wmC)

## Install and run locally

Download the latest version of the desktop app [here](http://bit.ly/2fj7wmC)

Or install the desktop app locally

First, clone the repo via git:

```bash
git clone https://github.com/serverless/dashboard.git
```

And then install dependencies.

```bash
cd dashboard && npm install
```

## Running locally

Run these two commands __simultaneously__ in different console tabs.

```bash
npm run hot-server
npm run start-hot
```

Run `npm run hot-server` and `npm run start-hot` in separate terminal windows

*Note: requires a node version >= 4 and an npm version >= 2.*

## File structure:

- `./app` react/redux app for UI
- `./desktop/main.development.js` is the electron main process file
- `./static` Static assets like images/fonts/svgs

## Externals

If you use any 3rd party libraries which can't or won't be built with webpack, you must list them in your `webpack.config.base.js`：

```javascript
externals: [
  // put your node 3rd party libraries which can't be built with webpack here (mysql, mongodb, and so on..)
]
```

## CSS Modules

Uses [css-modules](https://github.com/css-modules/css-modules).

All `.css` file extensions will use css-modules unless it has `.global.css`.

If you need global styles, stylesheets with `.global.css` will not go through the
css-modules loader. e.g. `app.global.css`

# Prior Art

Forked from the amazing [electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate)
