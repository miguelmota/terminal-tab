const child_process = require('child_process')

const cache = {
  isgnome: null,
  isxterm: null,
  isxtermemulator:null
}

const isGnome = async () => {
  if (cache.isgnome !== null) {
    return cache.isgnome
  }
  try {
    await child_process.execSync('which gnome-terminal')
    cache.isgnome = true
    return true
  } catch(e) {
    cache.isgnome = false
    return false
  }
};

const isXterm = async () => {
  if (cache.isxterm !== null) {
    return cache.isxterm
  }
  try {
    await child_process.execSync('which xterm')
    cache.isxterm = true
    return true
  } catch(e) {
    cache.isxterm = false
    return false
  }
};

const isXtermEmulator = async () =>  {
  if (cache.isxtermemulator !== null) {
    return cache.isxtermemulator
  }
  try {
    await child_process.execSync('which x-terminal-emulator')
    cache.isxtermemulator = true
    return true
  } catch(e) {
    cache.isxtermemulator = false
    return false
  }
};

const open = async (cmd) => {
  const isgnome = await isGnome()
  const isxterm = !isgnome && await isXterm()
  const isxtermemulator = !isgnome && !isxterm && await isXtermEmulator()

  if (isgnome) {
    return `gnome-terminal -e 'bash -c "${cmd};exec bash'`
  } else if (isxterm) {
    return `xterm -e 'bash -c "${cmd};exec bash"'`
  } else if (isxtermemulator) {
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