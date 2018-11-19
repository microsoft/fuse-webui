///<reference types='jasmine'/>
/* tslint:disable:no-use-before-declare */
import { configure, shallow, ShallowWrapper } from 'enzyme';
// tslint:disable-next-line
const Adapter = require('enzyme-adapter-react-16');
import * as React from 'react';
/* tslint:enable:no-use-before-declare */
import App from './app';

configure({ adapter: new Adapter() });

describe('developer list', () => {
  it('renders list', () => {
    const app: ShallowWrapper<any> = shallow(<App />);
    expect(app).toBeTruthy();
  });
});
