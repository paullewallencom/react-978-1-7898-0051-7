const electron = require("electron");

const { app, BrowserWindow } = electron;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  });

  const startUrl = `file://${__dirname}/index.html`;
  mainWindow.loadURL(startUrl);

  //enable garbage collector
  mainWindow.on("closed", () => {
    app.quit();
    mainWindow = null;
  });
});
