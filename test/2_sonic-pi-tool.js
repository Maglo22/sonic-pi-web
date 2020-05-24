/*
  Tests to confirm the tool sonic-pi-tool is installed in the system.
  It should be possible to test the other commands like 'start-server',
  however, I'm not sure how to do it without having the command line
  stuck in that process, since it doesn't return when called successfully.
*/
const chai = require('chai');
const { exec } = require('child_process'); // commands

describe('test sonic-pi-tool commands', () => {

  it('checks if sonic-pi-tool is an available command', (done) => {
    exec('sonic-pi-tool -V', (err, stdout, stderr) => {
      if (err) throw err;
      if (stderr) throw stderr;
      chai.assert.isOk(stdout);
      done();
    });
  });

});
