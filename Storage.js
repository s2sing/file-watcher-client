function Storage() {
}

Storage.prototype.set = function (key, value, callback) {
  chrome.storage.local.set({key: value}, callback);
}

Storage.prototype.get = function (key, callback) {
  chrome.storage.local.get([key], callback());
}