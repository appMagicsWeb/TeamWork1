const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const url = require('url')

let win

function createWindow() {
	// 创建浏览器窗口。
	win = new BrowserWindow({ width: 320, height: 572, resizable: false })

	// 加载应用的 index.html。
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}))

	// 打开开发者工具。
	//   win.webContents.openDevTools();

	const template = [{
		label: 'Edit',
		submenu: [{
				label: 'Undo',
				accelerator: 'CmdOrCtrl+Z',
				selector: 'undo:',
				role: 'undo'
			},
			{
				label: 'Redo',
				accelerator: 'Shift+CmdOrCtrl+Z',
				selector: 'redo:',
				role: 'redo'
			},
			{
				type: 'separator'
			},
			{
				label: 'Cut',
				accelerator: 'CmdOrCtrl+X',
				selector: 'cut:',
				role: 'cut'
			},
			{
				label: 'Copy',
				accelerator: 'CmdOrCtrl+C',
				selector: 'copy:',
				role: 'copy'
			},
			{
				label: 'Paste',
				accelerator: 'CmdOrCtrl+V',
				selector: 'paste:',
				role: 'paste'
			},
			{
				label: 'Select All',
				accelerator: 'CmdOrCtrl+A',
				selector: 'selectAll:',
				role: 'selectall'
			}
		]
	}]
	Menu.setApplicationMenu(Menu.buildFromTemplate(template));

	win.on('closed', () => {
		win = null
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	// 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
	// 否则绝大部分应用及其菜单栏会保持激活。
	if(process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	// 在这文件，你可以续写应用剩下主进程代码。
	// 也可以拆分成几个文件，然后用 require 导入。
	if(win === null) {
		createWindow()
	}
})

// 也可以拆分成几个文件，然后用 require 导入。