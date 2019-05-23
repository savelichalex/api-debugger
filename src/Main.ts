import { BrowserWindow, app } from 'electron';

export class Main {
	static mainWindow: Electron.BrowserWindow;
	static application: Electron.App;
	static BrowserWindow;

	private static onAllWindowClosed() {
		Main.application.quit();
	}

	private static onClose() {
		Main.mainWindow = null;
	}

	private static onReady() {
		Main.mainWindow = new Main.BrowserWindow({
			width: 800,
			height: 600,
			webPreferences: {
				nodeIntegration: true,
			},
		});
		Main.mainWindow.loadFile('index.html');
		Main.mainWindow.on('closed', Main.onClose);
	}

	static run(app: Electron.App, browserWindow: typeof BrowserWindow) {
		Main.BrowserWindow = browserWindow;
		Main.application = app;
		Main.application.on('window-all-closed', Main.onAllWindowClosed);
		Main.application.on('ready', Main.onReady);
	}
}

Main.run(app, BrowserWindow);
