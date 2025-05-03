const { app, BrowserWindow, screen } = require('electron');

let mainWindow;

app.on('ready', () => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  mainWindow = new BrowserWindow({
    width,
    height,
    fullscreenable: false, // Prevent F11-like fullscreen
    webPreferences: {
      contextIsolation: true, // Recommended for security
    },
  });

  // Remove the menu bar
  mainWindow.setMenuBarVisibility(false);

  // Load the external URL
  mainWindow.loadURL('https://optimihost.com/dashboard');

  // Set the window bounds to cover the entire screen
  mainWindow.setBounds({
    x: primaryDisplay.bounds.x,
    y: primaryDisplay.bounds.y,
    width,
    height,
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});