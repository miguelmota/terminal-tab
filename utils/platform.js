const os = require('os')
let platform = 'unknown'

switch (os.platform()) {
  case 'darwin':
    platform = 'mac'
    break;
  case 'win32':
    platform = 'win'
    break;
  default:
    platform = 'linux'
}

module.exports = {
  platform
}