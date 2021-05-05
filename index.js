const child_process = require('child_process')
const os = require('os')
const through = require('through')
const debounce = require('lodash.debounce')
const { platform } = require('./utils/platform')
const { open, defaultConfig } = require('./utils/config')

const args = process.argv

const openTab = (cmd, option = {}, cbOrConfig = defaultConfig) => {
  let child
  if (typeof cbOrConfig === 'object' && cbOrConfig !== null) {
    cbOrConfig = Object.assign({}, defaultConfig, cbOrConfig)
  } else if (typeof cbOrConfig === 'function') {
    cbOrConfig = Object.assign({}, defaultConfig, {
      onStdout: cbOrConfig
    });
  }

  child = child_process.exec(open[platform](cmd), option, (error, stdout, stderr) => {
    if (error) {
      cbOrConfig.onError(error)
      return
    }

    cbOrConfig.onStdout(stdout)
    cbOrConfig.onStderr(stderr)
  });

  child.on('close', (code, signal) => {
    // The 'close' event is emitted when the stdio streams of a child process have been closed. This is distinct from the 'exit' event, since multiple processes might share the same stdio streams.
    cbOrConfig.onExit(code, signal)
  })
}

process.stdin.setEncoding('utf8')
process.stdin.pipe(through(buf => {
    openTab(buf.toString())
    process.exit(0)
  }, () => {})
);

if (args.length > 2) {
  openTab(args.slice(2).join(' '))
  process.exit(0)
}

module.exports = {
  open: debounce(openTab, 100, {leading: true})
}
