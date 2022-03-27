import { app, BrowserWindowConstructorOptions } from 'electron';
import path from 'path';

const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'assets')
  : path.join(__dirname, '../../assets');

const getAssetPath = (...paths: string[]): string => {
  return path.join(RESOURCES_PATH, ...paths);
};

const option: BrowserWindowConstructorOptions = {
  show: false,
  width: 1024,
  height: 728,
  icon: getAssetPath('icon.png'),
  webPreferences: {
    preload: app.isPackaged
      ? path.join(__dirname, 'preload.js')
      : path.join(__dirname, '../../.erb/dll/preload.js'),
  },
};

export default option;
