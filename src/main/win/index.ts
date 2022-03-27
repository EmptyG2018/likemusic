/* eslint global-require: off, no-console: off, promise/always-return: off */

import Electron, {
  BrowserWindow,
  Menu,
  MenuItemConstructorOptions,
} from 'electron';
import { resolveHtmlPath } from '../util';

type DarwinMenuItemConstructorOptions = MenuItemConstructorOptions & {
  selector?: string;
  submenu?: DarwinMenuItemConstructorOptions[] | Menu;
};

type BrowserWinOptoins = Electron.BrowserWindowConstructorOptions & {
  url: string;
  menus?: DarwinMenuItemConstructorOptions[] | MenuItemConstructorOptions[];
};

// 是否macos系统
const isDarwin = process.platform === 'darwin';

// 是否处于开发模式
const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

export default class Win {
  public win: BrowserWindow | null;

  private menus;

  private options;

  public constructor(options?: BrowserWinOptoins) {
    const { menus, url, ...browserOptions } = options || {};
    this.win = null;
    this.menus = menus;
    this.options = browserOptions;
    this.create(url || resolveHtmlPath('index.html'));
    this.mounteMenus();
    this.registerListener();
  }

  // 注册监听
  private registerListener() {
    this.win?.on('ready-to-show', () => {
      if (!this.win) {
        throw new Error('"mainWindow" is not defined');
      }
      if (process.env.START_MINIMIZED) {
        this.win?.minimize();
      } else {
        this.win?.show();
      }
    });

    this.win?.on('closed', () => {
      this.win = null;
    });
  }

  // 创建浏览器窗口
  private create(url: string) {
    this.win = new BrowserWindow(this.options);

    // 加载浏览器URL
    this.win.loadURL(url);
  }

  // 挂载菜单
  public mounteMenus(
    menus?: DarwinMenuItemConstructorOptions[] | MenuItemConstructorOptions[]
  ) {
    const menuOptions = menus && menus.length ? menus : this.menus || [];
    const menu = Menu.buildFromTemplate(menuOptions);
    Menu.setApplicationMenu(menu);
  }
}
