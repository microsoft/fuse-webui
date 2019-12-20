///<reference types='jasmine'/>
import { CliInvoke, playBackShell, recordingShell, shell } from './shell';

function* testScript(): Generator<CliInvoke> {
  yield [{}, 'echo 1'];
  yield [{}, 'echo 2'];
  yield [{}, 'echo 3'];
}

function* branchScript(): Generator<CliInvoke, void, string> {
  let last = yield [{}, 'echo 1'];
  if (last.indexOf('1') >= 0) {
    last = yield [{}, 'echo 2'];
  }
  if (last.indexOf('1') >= 0) {
    last = yield [{}, 'echo 3'];
  }
}

function* otherBranchScript(): Generator<CliInvoke, void, string> {
  let last = yield [{}, 'echo 1'];
  if (last.indexOf('2') >= 0) {
    last = yield [{}, 'echo 2'];
  }
  if (last.indexOf('2') >= 0) {
    last = yield [{}, 'echo 3'];
  }
}

describe('shell', async () => {
  it('runs all lines', async () => {
    const dummy = {
      echo: x => Promise.resolve(x)
    };
    spyOn(dummy, 'echo').and.callThrough();
    const echo = (_, x) => dummy.echo(x);
    const echoShell = shell(echo);
    await echoShell(testScript());
    expect(dummy.echo).toHaveBeenCalledTimes(3);
  });

  it('can branch', async () => {
    const dummy = {
      echo: x => Promise.resolve(x)
    };
    spyOn(dummy, 'echo').and.callThrough();
    const echo = (_, x) => dummy.echo(x);
    const echoShell = shell(echo);
    await echoShell(branchScript());
    expect(dummy.echo).toHaveBeenCalledTimes(2);
  });

  it('can record', async () => {
    const dummy = {
      echo: (x: string) => Promise.resolve(x.substr(5))
    };
    spyOn(dummy, 'echo').and.callThrough();
    const echo = (_, x) => dummy.echo(x);
    const inputTape = [];
    const outputTape = [];
    const echoShell = recordingShell(echo, inputTape, outputTape);
    await echoShell(branchScript());
    expect(dummy.echo).toHaveBeenCalledTimes(2);
    expect(inputTape).toEqual([
      [{}, 'echo 1'],
      [{}, 'echo 2']
    ]);
    expect(outputTape).toEqual(['1', '2']);
  });

  it('will check playback', async () => {
    const dummy = {
      echo: (x: string) => Promise.resolve(x.substr(5))
    };
    spyOn(dummy, 'echo').and.callThrough();
    const echo = (_, x) => dummy.echo(x);
    const inputTape = [];
    const outputTape = [];
    const echoShell = recordingShell(echo, inputTape, outputTape);
    await echoShell(branchScript());
    expect(dummy.echo).toHaveBeenCalledTimes(2);

    await playBackShell(inputTape, outputTape)(branchScript());
    expect(dummy.echo).toHaveBeenCalledTimes(2);
  });

  it('will throw on check playback', async () => {
    const dummy = {
      echo: (x: string) => Promise.resolve(x.substr(5))
    };
    spyOn(dummy, 'echo').and.callThrough();
    const echo = (_, x) => dummy.echo(x);
    const inputTape = [];
    const outputTape = [];
    const echoShell = recordingShell(echo, inputTape, outputTape);
    await echoShell(branchScript());
    expect(dummy.echo).toHaveBeenCalledTimes(2);
    let error: Error = undefined;

    try {
      await playBackShell(inputTape, outputTape)(otherBranchScript());
    } catch (e) {
      error = e;
    }
    expect(error.message).toContain('output not drained');

    error = undefined;
    try {
      await playBackShell(inputTape, outputTape)(testScript());
    } catch (e) {
      error = e;
    }
    expect(error.message).toContain('out of range');
  });
});
