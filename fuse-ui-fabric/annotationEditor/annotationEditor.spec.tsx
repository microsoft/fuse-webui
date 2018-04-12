///<reference types='jasmine'/>
/* tslint:disable:no-use-before-declare */
import { Editor } from 'draft-js';
import { configure, shallow } from 'enzyme';
// tslint:disable-next-line
const Adapter = require('enzyme-adapter-react-16');
import * as React from 'react';
import { AnnotationEditor, AnnotationEditorProps } from './annotationEditor';
/* tslint:enable:no-use-before-declare */

configure({ adapter: new Adapter() });

describe('annotation editor', () => {
  const props: AnnotationEditorProps = {
    document: [],
    //tslint:disable
    insert: x => { },
    remove: x => { },
    update: x => { },
    tag: (x, t) => { },
    unTag: (x, t) => { }
    //tslint:enable
  };
  it('renders editor', () => {
    const view = shallow(<AnnotationEditor {...props} />);
    expect(view.find(Editor).length).toBe(1);
  });
});
