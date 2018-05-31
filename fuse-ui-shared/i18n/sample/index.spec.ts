///<reference types='jasmine'/>
import { reduce } from '../../iterator';
import { checkStrings } from './index';
import Strings from './res/strings';
import Combined from './index.strings';

describe('localized strings', () => {
  it('loads strings', () => {
    const strings = reduce(checkStrings(), (lines: string[], line: string) => lines.concat(line), []);
    expect(strings.length).toBe(6);
    expect(strings[1]).toBe("cancel = Cancel");
  });

  it('supports intellisense', () => {
    expect(Strings.common.buttons.add.value).toBe('Add');
  });

  it('can merge localized strings', () => {
    expect(Combined.form["city"].value).toBe('City');
    expect(Combined.common["ok"].value).toBe("OK");
  });
});
