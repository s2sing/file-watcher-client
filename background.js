chrome.browserAction.onClicked.addListener(function () {
  window.open(chrome.runtime.getURL('menu.html'));
});