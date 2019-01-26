function Connector() {
}

Connector.ws;

Connector.prototype.open = function (option, onOpend, onClosed) {
  Connector.ws = new WebSocket(option.socket);

  Connector.ws.onopen = function () {
    const obj = {directory: option.directory}
    Connector.ws.send(JSON.stringify(obj));
  }

  Connector.ws.onmessage = function (evt) {
    const message = JSON.parse(evt.data);
    if (message.proc == "connected") {
      chrome.browserAction.setIcon({
        path: "icon_active.png"
      });
      onOpend();
    } else if (message.proc == "changed") {
      chrome.tabs.query({}, function (arrayOfTabs) {
        const code = 'window.location.reload();';
        for (let i = 0; i < arrayOfTabs.length; i++) {
          const a = document.createElement('a');
          a.href = arrayOfTabs[i].url;
          if (a.hostname.includes(option.domain)) {
            chrome.tabs.executeScript(arrayOfTabs[i].id, {code: code});
          }
        }
      });
      console.log("changed");
    }
  }

  Connector.ws.onclose = function () {
    chrome.browserAction.setIcon({
      path: "icon.png"
    });
    onClosed();
  }
}

Connector.prototype.close = function () {
  Connector.ws.close();
}