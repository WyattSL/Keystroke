const bot = location.pathname.split("/")[2];

function showCategory(id) {
  if (!id.innerHTML) {
    id = document.getElementById(id)
  }
  id.classList.remove("hidden")
  id.classList.add("shown")
}

function hideCategory(id) {
  if (!id.innerHTML) {
    id = document.getElementById(id)
  }
  id.classList.add("hidden")
  id.classList.remove("shown")
}

function toggleCategory(id) {
  if (!id.innerHTML) {
    id = document.getElementById(id)
  }
  id.classList.toggle("hidden")
  id.classList.toggle("shown")
}

function button(btn) {
  switch (btn.name) {
    case "swearfilter":
      toggleCategory("filtered")
  }
}

function loadDefault(data) {
  var i;
  for (i=0;i<data.length;i++) {
    var elements = document.getElementsByClassName(data[i])
    var u;
    for (u=0;u<elements.length;u++) {
      var element = elements[u];
      if (!element.text) {
        element.checked = true
        button(element);
      }
    }
  }
}

function loadDefaultReq() {
  var req = XMLHttpRequest();
  req.onload = function() {
    loadDefault(JSON.parse(this.responseText));
  }
  req.open("GET", "/api/config/" + bot)
  req.send();
}