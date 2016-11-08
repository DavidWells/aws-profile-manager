# Serverless Desktop

This project is about providing a user-friendly layer on top of the serverless CLI.

What the desktop app is **NOT**

- A replacement for the serverless CLI
- The serverless platform

See the goals of the project [here](./docs/README.md)

## Install

Download the latest version of the desktop app [here](https://s3-us-west-2.amazonaws.com/assets.dashboard/Serverless.app.0.0.1.zip)

Or install the desktop app locally

First, clone the repo via git:

```bash
git clone https://github.com/serverless/dashboard.git
```

And then install dependencies.

```bash
cd dashboard && npm install
```

## Run

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


## Packaging for distribution

```bash
$ npm run package
```

To package apps for all platforms:

```bash
$ npm run package-all
```

To package apps with options:

```bash
$ npm run package -- --[option]
```

#### Options

- --name, -n: Application name
- --version, -v: Electron version (default: latest version)
- --asar, -a: [asar](https://github.com/atom/asar) support (default: false)
- --icon, -i: Application icon
- --all: pack for all platforms

Use `electron-packager` to pack your app with `--all` options for darwin (osx), linux and win32 (windows) platform. After build, you will find them in `release` folder. Otherwise, you will only find one for your os.

`test`, `tools`, `release` folder and devDependencies in `package.json` will be ignored by default.

#### Default Ignore modules

We add some module's `peerDependencies` to ignore option as default for application size reduction.

- `babel-core` is required by `babel-loader` and its size is ~19 MB
- `node-libs-browser` is required by `webpack` and its size is ~3MB.

> **Note:** If you want to use any above modules in runtime, for example: `require('babel/register')`, you should move them from `devDependencies` to `dependencies`.

# Prior Art

Forked from the amazing [electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate)
