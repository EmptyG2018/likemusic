import { BrowserWindowConstructorOptions } from 'electron';
import Win from '..';
import defaultOptions from '../defaultOptions';
import { resolveHtmlPath } from '../../util';

type Options = BrowserWindowConstructorOptions & {
  url: string;
};

const options: Options = {
  ...defaultOptions,
  url: resolveHtmlPath('index.html'),
};

export default class WinMain extends Win {
  constructor() {
    super(options);
  }
}
