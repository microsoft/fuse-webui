///<reference types='jasmine'/>
import { ancestors, closest } from './selectors';

describe('selectors', () => {
  beforeAll(done => {
    document.body.innerHTML =
      '<div>' +
      '  <div data-scrollable="true">' +
      '  <i id="anchor">anchor</i>' +
      '  </div>' +
      '</div>';
    done();
  });

  it('enumerate ancestors', () => {
    const anchor = document.body.querySelector('#anchor') as HTMLElement;
    expect(anchor).toBeTruthy();
    const parents = Array.from(ancestors(anchor));
    expect(parents.length).toBe(4);
  });

  it('find closest ancestor matches selector', () => {
    const anchor = document.body.querySelector('#anchor') as HTMLElement;
    expect(anchor).toBeTruthy();
    const scroll = closest(anchor, '[data-scrollable]') as HTMLElement;
    expect(scroll.tagName).toBe('DIV');
  });
})
