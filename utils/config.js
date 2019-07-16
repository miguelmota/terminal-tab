const { open: openLinux } = require('./linux')

const open = {
  mac: cmd => [
    `osascript -e 'tell application "Terminal" to activate' -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down' `,
    `-e 'tell application "Terminal" to do script `,
    `"${cmd.replace(/"/g, '\\"')}" `,
    `in selected tab of the front window'`].join(''),
  linux: openLinux,
  win: cmd => `start cmd.exe /K ${cmd}`
}

const defaultConfig = {
  onStdout: () => {},
  onStderr: () => {},
  onError: () => {},
  onExit: () => {}
}

module.exports = {
  open,
  defaultConfig
}