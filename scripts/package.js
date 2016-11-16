/* eslint-disable strict, no-shadow, no-unused-vars, no-console */

'use strict'

require('babel-polyfill')
const path = require('path')
const os = require('os')
const webpack = require('webpack')
const emptyDirectory = require('./empty-dir')
const electronCfg = require('../webpack.config.electron')
const cfg = require('../webpack.config.production')
const packager = require('electron-packager')
const del = require('del')
const opn = require('opn')
const exec = require('child_process').exec
const argv = require('minimist')(process.argv.slice(2))
const serverlessPkg = require('serverless/package.json')
const pkg = require('../package.json')
const appName = argv.name || argv.n || pkg.productName
const shouldUseAsar = argv.asar || argv.a || false
const shouldBuildAll = argv.all || false
const deps = Object.keys(pkg.dependencies)
const devDeps = Object.keys(pkg.devDependencies)
const slsDeps = Object.keys(serverlessPkg.dependencies)
const slsDevDeps = Object.keys(serverlessPkg.devDependencies)

const renameModulePath = (name) => {
  return `/node_modules/${name}($|/)`
}

const ignoreFiles = [
  '^/test($|/)',
  '^/release($|/)',
  '^/main.development.js',
]
.concat(devDeps.filter(name => {
  return !slsDevDeps.includes(name) && !slsDeps.includes(name)
}).map(renameModulePath)
.concat(deps.filter(name => {
  return !slsDevDeps.includes(name) && !slsDeps.includes(name) && !electronCfg.externals.includes(name)
}).map(renameModulePath))
)

console.log('these files will not be packaged with electron application', ignoreFiles)

const DEFAULT_OPTS = {
  dir: './',
  name: appName,
  asar: shouldUseAsar,
  ignore: ignoreFiles
}

const icon = argv.icon || argv.i || 'static/app'

if (icon) {
  DEFAULT_OPTS.icon = icon
}

const version = argv.version || argv.v
const releaseDir = path.join(__dirname, '..', 'release')
if (version) {
  DEFAULT_OPTS.version = version
  emptyDirectory(releaseDir, () => {
    emptyDirectory(releaseDir, () => {
      startPack()
    })
  })
} else {
  // use the same version as the currently-installed electron-prebuilt
  exec('npm list electron --dev', (err, stdout) => {
    if (err) {
      DEFAULT_OPTS.version = '1.2.0'
    } else {
      DEFAULT_OPTS.version = stdout.split('electron@')[1].replace(/\s/g, '')
    }
    emptyDirectory(releaseDir, () => {
      emptyDirectory(releaseDir, () => {
        startPack()
      })
    })
  })
}

function build(cfg) {
  return new Promise((resolve, reject) => {
    webpack(cfg, (err, stats) => {
      if (err) return reject(err)
      resolve(stats)
    })
  })
}

async function startPack() {
  console.log('start pack...')

  try {
    await build(electronCfg)
    await build(cfg)
    const paths = await del('release')

    if (shouldBuildAll) {
      // build for all platforms
      const archs = ['ia32', 'x64']
      const platforms = ['linux', 'win32', 'darwin']

      platforms.forEach(plat => {
        archs.forEach(arch => {
          pack(plat, arch, log(plat, arch))
        })
      })
    } else {
      // build for current platform only
      pack(os.platform(), os.arch(), log(os.platform(), os.arch()))
    }
  } catch (error) {
    console.error(error)
  }
}

function pack(plat, arch, cb) {
  console.log('plat', plat)
  // there is no darwin ia32 electron
  if (plat === 'darwin' && arch === 'ia32') return

  const iconObj = {
    icon: DEFAULT_OPTS.icon + (() => {
      let extension = '.png'
      if (plat === 'darwin') {
        extension = '.icns'
      } else if (plat === 'win32') {
        extension = '.ico'
      }
      return extension
    })()
  }

  const opts = Object.assign({}, DEFAULT_OPTS, iconObj, {
    platform: plat,
    arch,
    prune: true,
    protocols: [{
      name: DEFAULT_OPTS.name,
      // TODO: change protocol name
      schemes: [pkg.protocol]
    }],
    'app-version': pkg.version || DEFAULT_OPTS.version,
    out: `release/${plat}-${arch}`,
    overwrite: true,
  })
  // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#protocol
  // https://github.com/electron-userland/electron-packager/blob/303de520cef5a46d61a7a8646e9d83aa079af20a/mac.js#L57-L64
  console.log('opts', opts)
  packager(opts, cb)
}

function log(plat, arch) {
  return (err, filepath) => {
    if (err) return console.error(err)
    console.log(`${plat}-${arch} finished!`)
    const openPath = path.join(releaseDir, `${plat}-${arch}`, `${appName}-${plat}-${arch}`)
    opn(openPath)
    process.exit()
  }
}
