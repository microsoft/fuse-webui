///<reference types='jasmine'/>
/* tslint:disable:no-use-before-declare */
import { configure, shallow } from 'enzyme';
// tslint:disable-next-line
const Adapter = require('enzyme-adapter-react-16');
import * as React from 'react';
import { asyncState } from './asyncState';
/* tslint:enable:no-use-before-declare */

configure({ adapter: new Adapter() });

/**
 * simple React component
 */
@asyncState
class Simple extends React.Component {
  constructor(props: {}) {
    super(props);
  }
  public render(): JSX.Element {
    return <p>simple</p>;
  }
}

describe('asyncState decorator', () => {
  it('wraps mount', () => {
    const view = shallow(<Simple />);
    expect(view).toBeTruthy();
  });

  it('inject updateAsyncState and key', () => {
    const s: any = new Simple({});
    expect(s.state.asyncKey === s.key).toBeTruthy();
    expect(typeof (s.updateAsyncState)).toBe('function');
    expect(typeof (s.key)).toBe('symbol');
    expect(s.key.toString()).toBe('Symbol()');
  });

});
