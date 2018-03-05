const child_process = require('child_process');

// const isGnome = child_process.execSync('which gnome-terminal');
const isXterm = child_process.exec('which bash', (err, stdout, sdterr) => {
	console.log(err, stdout, sdterr)
});
// const isXtermEmulator = child_process.execSync('which x-terminal-emulator');

// console.log(isGnome, isXterm, isXtermEmulator);