///<reference types='jasmine'/>
/* tslint:disable:no-use-before-declare */
import { configure, shallow } from 'enzyme';
// tslint:disable-next-line
const Adapter = require('enzyme-adapter-react-16');
import { Dropdown } from 'office-ui-fabric-react/lib-commonjs/Dropdown';
import * as React from 'react';
import { EnumDropdown, EnumDropdownProps } from './enumDropdown';
/* tslint:enable:no-use-before-declare */

configure({ adapter: new Adapter() });

enum Mock {
  red,
  blue,
  white
}

describe('enumDropdown', () => {
  const props: EnumDropdownProps<Mock> = {
    val: Mock.red,
    enumType: Mock,
    change: () => {
      // ignore
    }
  };
  it('renders Dropdown', () => {
    const view = shallow(<EnumDropdown {...props} />);
    expect(view.find(Dropdown).length).toBe(1);
  });
});
