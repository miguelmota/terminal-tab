const child_process = require('child_process')

const cache = {
  isgnome: null,
  isxterm: null,
  isxtermemulator:null
}

const isGnome = () => {
  if (cache.isgnome !== null) {
    return cache.isgnome
  }
  try {
    child_process.execSync('which gnome-terminal')
    cache.isgnome = true
  } catch(e) {
    cache.isgnome = false
  }

  return cache.isgnome
};

const isXterm = () => {
  if (cache.isxterm !== null) {
    return cache.isxterm
  }
  try {
    child_process.execSync('which xterm')
    cache.isxterm = true
  } catch(e) {
    cache.isxterm = false
  }
  
  return cache.isxterm
};

const isXtermEmulator = () =>  {
  if (cache.isxtermemulator !== null) {
    return cache.isxtermemulator
  }
  try {
    child_process.execSync('which x-terminal-emulator')
    cache.isxtermemulator = true
  } catch(e) {
    cache.isxtermemulator = false
  }

  return cache.isxtermemulator
};

const open = (cmd) => {
  if (isGnome()) {
    return `gnome-terminal -e 'bash -c "${cmd};exec bash"'`
  } else if (isXterm()) {
    return `xterm -e 'bash -c "${cmd};exec bash"'`
  } else if (isXtermEmulator()) {
    return `x-terminal-emulator -e 'bash -c "${cmd};exec bash"'`
  }

  return ''
}

module.exports = {
  isGnome,
  isXterm,
  isXtermEmulator,
  open
}