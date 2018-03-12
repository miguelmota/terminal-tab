const terminalTab = require('../')

const options = {
  cwd: null,
  env: null,
  encoding: 'utf8'
}

terminalTab.open(`echo "my command"`, options, {
  onStdout: (stdout) => {
    console.log(stdout)
    // process.exit(0)
  },
  onStderr: (stderr) => {
    console.log(stderr);
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