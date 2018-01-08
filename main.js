var app = require('app');
var BrowserWindow = require('browser-window');

require('crash-reporter').start();

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
                                    width:  1360, 
                                    height: 800,
                                    webPreferences: {
                                      plugins: true,
                                    }
                                 });

  mainWindow.loadUrl('file://' + __dirname + '/public/index.html');

  // mainWindow.loadUrl( 'file://' + '/Users/ericg/Desktop/reactd3v4.pdf' );

  

  mainWindow.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
