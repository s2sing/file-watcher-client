window.onload = function () {
  renderList();

  document.getElementById("btn-open").addEventListener('click', function () {
    onBtnOpenClick();
  });

  document.getElementById("btn-close").addEventListener('click', function () {
    onBtnCloseClick();
  });

  document.getElementById("btn-save").addEventListener('click', function () {
    onBtnSaveClick();
  });

  Array.from(document.getElementsByClassName("btn-select")).forEach((el, index) => {
    el.addEventListener('click', () => {
      onBtnSelectClick(el, index);
    });
  });

  Array.from(document.getElementsByClassName("btn-delete")).forEach((el, index) => {
    el.addEventListener('click', () => {
      onBtnDeleteClick(el, index);
    });
  });
}

const renderList = function () {
  let socketList = JSON.parse(window.localStorage.getItem('socket-list'));
  if (socketList == null || socketList.list == null) socketList = {list: []};

  const tbody = document.getElementById("socket-list");

  for (let i = 0; i < socketList.list.length; i++) {
    const tr = document.createElement('tr');

    const td1 = document.createElement('td');
    td1.innerHTML = socketList.list[i].description;
    tr.appendChild(td1);

    const td2 = document.createElement('td');
    td2.innerHTML = socketList.list[i].socket;
    tr.appendChild(td2);

    const td3 = document.createElement('td');
    td3.innerHTML = socketList.list[i].domain;
    tr.appendChild(td3);

    const td4 = document.createElement('td');
    td4.innerHTML = socketList.list[i].directory;
    tr.appendChild(td4);

    const td5 = document.createElement('td');
    td5.innerHTML = "<button class='btn-select'>선택</button> <button class='btn-delete'>삭제</button>";
    tr.appendChild(td5);

    tbody.appendChild(tr);
  }
}

const onBtnSaveClick = function () {
  let socketList = JSON.parse(window.localStorage.getItem('socket-list'));
  if (socketList == null || socketList.list == null) socketList = {list: []};

  socketList.list.push({
    description: document.getElementById('server-description').value,
    socket: document.getElementById('server-socket').value,
    domain: document.getElementById('server-domain').value,
    directory: document.getElementById('server-directory').value
  });

  window.localStorage.setItem('socket-list', JSON.stringify(socketList));
  location.reload();
}

const onBtnOpenClick = function () {
  const bgPage = chrome.extension.getBackgroundPage();
  bgPage.Connector.prototype.open({
    socket: "ws://" + document.getElementById('server-socket').value.replace("ws:\/\/", ""),
    domain: document.getElementById('server-domain').value.replace("http:\/\/", "").replace("https:\/\/", ""),
    directory: document.getElementById('server-directory').value,
  }, () => {
    document.getElementById("btn-open").style.display = 'none';
    document.getElementById("btn-close").style.display = 'inline';
  }, () => {
    document.getElementById("btn-open").style.display = 'inline';
    document.getElementById("btn-close").style.display = 'none';
  });
}

const onBtnCloseClick = function () {
  const bgPage = chrome.extension.getBackgroundPage();
  bgPage.Connector.prototype.close();
}

const onBtnSelectClick = function (el) {
  document.getElementById('server-description').value = el.parentNode.parentNode.children[0].innerHTML;
  document.getElementById('server-socket').value = el.parentNode.parentNode.children[1].innerHTML;
  document.getElementById('server-domain').value = el.parentNode.parentNode.children[2].innerHTML;
  document.getElementById('server-directory').value = el.parentNode.parentNode.children[3].innerHTML;
}

const onBtnDeleteClick = function (el, index) {
  let socketList = JSON.parse(window.localStorage.getItem('socket-list'));
  let newList = [];
  for (let i = 0; i < socketList.list.length; i++) {
    if (i == index) continue;
    newList.push(socketList.list[i]);
  }
  socketList.list = newList;
  window.localStorage.setItem('socket-list', JSON.stringify(socketList));
  location.reload();
}