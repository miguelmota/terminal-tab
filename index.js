const child_process = require('child_process');
const through = require('through');
const os = require('os');
const { platform } = require('./utils/platform');
const { open, defaultConfig } = require('./utils/config');

let child;
const args = process.argv;

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
