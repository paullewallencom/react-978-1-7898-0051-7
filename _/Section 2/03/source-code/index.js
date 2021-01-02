const electron = require("electron");

const { app, BrowserWindow, Menu, ipcMain } = electron;
let startUrl =
  process.env.ELECTRON_START_URL || `file://${__dirname}/build/index.html`;
startUrl = startUrl.trim();

let mainWindow;
let addTodoWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    height: 600,
    width: 800,
    resizable: false
  });
  const url = startUrl + "?window=main";
  mainWindow.loadURL(url);

  //enable garbage collector
  mainWindow.on("closed", () => {
    app.quit();
    mainWindow = null;
  });

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  if (process.platform === "darwin") {
    Menu.setApplicationMenu(mainMenu);
  } else {
    mainWindow.setMenu(mainMenu);
  }
};

const createAddTodoWindow = () => {
  addTodoWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    height: 200,
    width: 400,
    resizable: false
  });

  const url = startUrl + "?window=new_todo";
  addTodoWindow.loadURL(url);

  addTodoWindow.on("closed", () => {
    addTodoWindow = null;
  });

  addTodoWindow.setMenu(null);
};

app.on("ready", createWindow);

const menuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "New Todo",
        accelerator: process.platform === "darwin" ? "Command+N" : "Ctrl+N",
        click() {
          createAddTodoWindow();
        }
      },
      {
        label: "Clear Todos",
        click() {
          todos = [];
          mainWindow.webContents.send("todo:clear");
        }
      },
      {
        label: "Quit",
        accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        }
      }
    ]
  },
  {
    label: "View",
    submenu: [{ role: "reload" }, { role: "toggledevtools" }]
  }
];
