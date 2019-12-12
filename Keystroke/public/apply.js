const noServer = document.getElementById('noserver');
const applyDiv = document.getElementById('applyDiv');
const servHeader = document.getElementById('servHeader');



var server = location.href.split('/')[2];
if (!server) {
  applyDiv.style.display = "none";
} else {
  noServer.style.display = "none";
};

var req = new XMLHttpRequest;
req.open('GET', '/serv?id=' + server);
req.send();
req.onreadystatechange = function() {
  if (req.readyState === 4) {
    var res = JSON.parse(req.responseText);
    if (!res) noServer.style.display = "block"; applyDiv.style.display = "none";
    var gicon = res.iconURL;
    var gname = res.name;
    servHeader.innerHTML = `<img src="${gicon}" alt="Guild Icon"> ${gname}`;
  }
}