export interface IconDefinition {
  fontCharacter: string;
  fontColor: string;
}

export interface FontSource {
  path: string;
  format: 'woff';
}

export interface FontDefinition {
  id: string;
  src: FontSource[];
  weight: 'normal';
  style: 'normal';
  size: string;
}

export interface IconThemeCore {
  file: '_default' | '_default_light';
  fileExtensions: { [ext: string]: string };
  languageIds: { [id: string]: string };
}

export interface IconTheme extends IconThemeCore {
  fonts: FontDefinition[];
  iconDefinitions: { [key: string]: IconDefinition };
  light: IconThemeCore;
}
