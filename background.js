// will be called when the app is started
chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('vcs.html', {
    'bounds': {
      'width': 800,
      'height': 800
    }
  });
});