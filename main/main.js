const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const {PosPrinter} = require("electron-pos-printer");

let appServe; // Declare appServe outside for dynamic assignment.

if (app.isPackaged) {
  // Dynamically import the ES Module
  import("electron-serve").then((serve) => {
    appServe = serve.default({
      directory: path.join(__dirname, "../out"),
    });
  });
}

const createWindow = async () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (app.isPackaged) {
    // Ensure appServe is initialized
    await appServe(win);
    win.loadURL("app://-");
  } else {
    win.loadURL("http://localhost:3000");
    win.webContents.openDevTools();
    win.webContents.on("did-fail-load", (e, code, desc) => {
      win.webContents.reloadIgnoringCache();
    });
  }
};

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// printer stuff : (DON'T TOUCH HERE :)

ipcMain.on("print", (event, arg) => {
  try {
    const data = JSON.parse(arg); 

    PosPrinter.print(data, {
      printerName: "XPC-80",
      silent: true,
      preview: true,
    })
      .then(() => {
        console.log("Printing completed successfully");
      })
      .catch((error) => {
        console.error("Error during printing:", error);
      });
  } catch (error) {
    console.error("Error parsing data or other issue:", error);
  }
});
