<img align="right" width="350" height="255" src="https://s3-us-west-2.amazonaws.com/assets.dashboard/gifs/DashGif.gif">
# Serverless Dashboard

This project is about providing a user-friendly layer on top of the serverless CLI.

See the goals of the project [here](./docs/README.md)

## [Download App](http://bit.ly/serverless-dashboard)

## Features

- [x] Run serverless commands from GUI
- [x] Invoke functions via GUI
- [x] Setup & Manage AWS profiles
- [ ] Point and click editing
- [Add yours here!](https://github.com/serverless/dashboard/issues)

## Install and run locally

Download the latest version of the desktop app [here](http://bit.ly/serverless-dashboard)

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
npm start
npm run dev
```

Run `npm run dev` (starts webpack + hot-reloading) and `npm start` (starts electron) in separate terminal windows.

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
