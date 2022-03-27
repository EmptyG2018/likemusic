import Electron, {
  BrowserWindow,
  Menu,
  MenuItemConstructorOptions,
} from 'electron';

type DarwinMenuItemConstructorOptions = MenuItemConstructorOptions & {
  selector?: string;
  submenu?: DarwinMenuItemConstructorOptions[] | Menu;
};

type BrowserWinOptoins = Electron.BrowserWindowConstructorOptions & {
  menus?: DarwinMenuItemConstructorOptions[] | MenuItemConstructorOptions[];
};

// 是否macos系统
const isDarwin = process.platform === 'darwin';

export default class Win extends BrowserWindow {
  private menus;

  public constructor(options?: BrowserWinOptoins) {
    const { menus, ...browserOptions } = options || {};
    super(browserOptions);
    this.menus = menus;
  }

  // 挂载菜单
  public mounteMenus(
    menus: DarwinMenuItemConstructorOptions[] | MenuItemConstructorOptions[]
  ) {
    const menuOptions = menus && menus.length ? menus : this.menus || [];
    if (menuOptions.length) {
      const menu = Menu.buildFromTemplate(menuOptions);
      Menu.setApplicationMenu(menu);
    }
  }
}
