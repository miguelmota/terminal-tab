# Terminal Tab

> Open a terminal tab programatically.

## Install

```bash
npm install terminal-tab -g
```

## Getting started

```javascript
const terminalTab = require('terminal-tab')

terminalTab.open(`echo "my command"; sleep 2 && exit`)
```

### Options

```javascript
const options = {
	cwd: null,
	env: null,
	encoding: 'utf8'
}

terminalTab.open(`echo "my command"`, options)
```

### Event callbacks

```javascript
terminalTab.open(`echo "my command"`, options, {
  onStdout: (stdout) => {},
  onStderr: (stderr) => {},
  onError: (error) => {},
  onExit: (code, signal) => {
    console.log('exit:', code, signal)
    process.exit(0)
  }
})
```

Alternatively:

```javascript
terminalTab.open(`echo "my command"`, options, (stdout) => {

})
```

Without options:

```javascript
terminalTab.open(`echo "my command"`, (stdout) => {

})
```

[option](https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html#child_process_child_process_exec_command_options_callback)

```bash
terminal-tab 'echo hello'
```

### Piping

```bash
echo 'echo hello' | terminal-tab
```

## License

MIT
