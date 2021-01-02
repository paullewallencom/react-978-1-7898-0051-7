const electron = require("electron");

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    height: 600,
    width: 800
  });

  const startUrl =
    process.env.ELECTRON_START_URL || `file://${__dirname}/build/index.html`;
  mainWindow.loadURL(startUrl);

  //enable garbage collector
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

app.on("ready", createWindow);

ipcMain.on("video:url", async (event, data) => {
  try {
    const info = await ytdl.getInfo(data.url);

    mainWindow.webContents.send("video:info", {
      title: info.title,
      length_seconds: info.length_seconds,
      thumbnail_url: info.thumbnail_url
    });

    const videoStream = ytdl(data.url, {
      quality: "highestaudio",
      filter: "audioonly"
    });

    await ffmpeg(videoStream)
      .setFfmpegPath(ffmpegPath)
      .audioBitrate(128)
      .on("progress", progress => {
        mainWindow.webContents.send("video:progress", { info, progress });
      })
      .on("end", () => {
        mainWindow.webContents.send("video:end");
      })
      .save(path.join(settings.folderPath, sanitize(`${info.title}.mp3`)));
  } catch (err) {
    mainWindow.webContents.send("video:error", { message: err.message });
  }
});
