# Terminal Tab

Open a terminal tab programatically.

# Install

```bash
npm install terminal-tab -g
```

# Usage

```javascript
const terminalTab = require('terminal-tab');

terminalTab.open('echo hello; sleep 2 && exit');
```

### Args

```javascript
terminalTab.open('your cmd', option, {
	stdoutCb: (stdout) => {},
	stderrCb: (stderr) => {},
	errorCb: (error) => {},
	exitCb: (code, signal) => {
		console.log('exit:', code, signal);
		process.exit(0);
	}
});
// OR
terminalTab.open('your cmd', option, (stdout) => {
	// something
});
```

[option](https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html#child_process_child_process_exec_command_options_callback)

```bash
terminal-tab 'echo hello'
```

### Piping

```bash
echo 'echo hello' | terminal-tab
```

# License

MIT.
