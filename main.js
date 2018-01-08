var electron      = require( 'electron' );
var app           = electron.app
var BrowserWindow = electron.BrowserWindow;
var url           = require( 'url' );
var path          = require( 'path' );

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

  mainWindow.loadURL( url.format({
    pathname: path.join( __dirname, 'public/index.html' ),
    protocol: 'file:',
    slashes:  true
  }));

  // mainWindow.loadUrl( 'file://' + '/Users/ericg/Desktop/reactd3v4.pdf' );

  

  mainWindow.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
