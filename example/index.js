const terminalTab = require('../index');

// terminalTab.open('echo hello; sleep 2 && exit', function() {
//   process.exit(0);
// });

const option = {
	cwd: null,
	env: null,
	encoding: 'utf8'
}

terminalTab.open('curl -o min.js https://cdn.bootcss.com/xterm/2.9.2/addons/attach/attach.js', option, {
	stdoutCb: (std) => {
		console.log(std);
		// process.exit(0);
	},
	stderrCb: (std) => {
		console.log(std);
		// process.exit(1);
	},
	errorCb: (error) => {
		console.error('error:', error);
		// process.exit(2);
	},
	exitCb: (code, signal) => {
		console.log('exit:', code, signal);
		process.exit(0);
	}
});