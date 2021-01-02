const electron = require("electron");
const fs = require("fs");
const path = require("path");

const { app, BrowserWindow, ipcMain } = electron;

const startUrl =
  process.env.ELECTRON_START_URL || `file://${__dirname}/build/index.html`;
const MOVIES_PATH = path.join(__dirname, "public", "movies");

let mainWindow;
let categories;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    height: 600,
    width: 800
  });

  mainWindow.loadURL(startUrl);

  //enable garbage collector
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

app.on("ready", createWindow);

ipcMain.on("categories:get", () => {
  fs.readdir(MOVIES_PATH, function(err, items) {
    categories = items;
    mainWindow.webContents.send("categories:list", categories);
  });
});
