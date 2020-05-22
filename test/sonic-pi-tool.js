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
