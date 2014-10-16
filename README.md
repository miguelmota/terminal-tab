# Terminal Tab

Open a terminal tab programatically.

# Install

```bash
npm install terminal-tab -g
```

# Usage

```javascript
var terminalTab = require('terminal-tab');

terminalTab.open('echo hello; sleep 2 && exit');
```

### Args

```bash
terminal-tab 'echo hello'
```

### Piping

```bash
echo 'echo hello' | terminal-tab
```

# License

MIT.
