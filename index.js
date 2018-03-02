const child_process = require('child_process');
const through = require('through');
const os = require('os');

let child,
	platform;
const open = {
	mac: cmd => [
		`osascript -e 'tell application "Terminal" to activate' -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down' `,
		`-e 'tell application "Terminal" to do script `,
		`"${cmd}" `,
		`in selected tab of the front window'`].join(''),
	linux: () => {},
	win: cmd => `start cmd.exe /K ${cmd}`
}
const args = process.argv;
const defaultConfig = {
	stdoutCb: () => {},
	stderrCb: () => {},
	errorCb: () => {},
	exitCb: () => {}
}

switch (os.platform()) {
	case 'darwin':
		platform = 'mac';
		break;
	case 'win32':
		platform = 'win';
		break;
	default:
		platform = 'linux';
}

function openTab(cmd, option = {}, cbOrConfig = defaultConfig) {
	// let config = {}
	if (typeof cbOrConfig === 'object' && cbOrConfig !== null) {
		cbOrConfig = Object.assign({}, defaultConfig, cbOrConfig);
	} else if (typeof cbOrConfig === 'function') {
		cbOrConfig = Object.assign({}, defaultConfig, {
			stdoutCb: cbOrConfig
		});
	}

  child = child_process.exec(open[platform](cmd), option, (error, stdout, stderr) => {
    if (error) {
			cbOrConfig.errorCb(error);
			return;
    }

		cbOrConfig.stdoutCb(stdout);
		cbOrConfig.stderrCb(stderr);
  });

  child.on('close', (code, signal) => {
		// The 'close' event is emitted when the stdio streams of a child process have been closed. This is distinct from the 'exit' event, since multiple processes might share the same stdio streams.
		cbOrConfig.exitCb(code, signal);
  });
}

process.stdin.setEncoding('utf8');

process.stdin.pipe(through(function(buf) {
		openTab(buf.toString());
		process.exit(0);
	}, function() {

	})
);

if (args.length > 2) {
  openTab(args.slice(2).join(' '));
  process.exit(0);
}

module.exports = {
  open: openTab
};
