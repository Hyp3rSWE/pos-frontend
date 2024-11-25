const { app, BrowserWindow } = require("electron");
const path = require("path");

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