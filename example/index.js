const terminalTab = require('../')

const options = {
  cwd: null,
  env: null,
  encoding: 'utf8'
}

terminalTab.open(`echo "my command"`, options, {
  onStdout: (std) => {
    console.log(std)
    // process.exit(0)
  },
  onStderr: (std) => {
    console.log(std);
    // process.exit(1)
  },
  onError: (error) => {
    console.error('error:', error)
    // process.exit(2)
  },
  onExit: (code, signal) => {
    console.log('exit:', code, signal)
    process.exit(0)
  }
})