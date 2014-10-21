var terminalTab = require('../index');

terminalTab.open('echo hello; sleep 2 && exit', function() {
  process.exit(0);
});
