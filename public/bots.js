setTimeout(start, 125)
function start() {
    document.getElementById("tab_join").style.display = "none";
    document.getElementById("tab_leave").style.display = "none";
    document.getElementById("tab_server").style.display = "none";
    setInterval(checkBoxes, 500)
}

tablist = {
    "join": "none",
    "leave": "none",
    "server": "none"
}

tabindex = [
    "join",
    "leave",
    "server"
]

function checkBoxes() {
    var i;
    for (i=0;i<tabindex.length;i++) {
        var tab = tabindex[i]
        var tabd = document.getElementById(`tab_${tab}`)
        var feature = document.getElementById(`feat_${tab}`)
        var check = feature.value
        if (check == "on") check="block"
        if (check !== "on") check="none"
        console.log(check + " " + tab);
        if (tablist[tab] !== check) {
            if ("block" == tabd.style.display) {
                console.log("1 " + tabd.style.display + " .. " + tabindex[i] + " .. " + feature.value + " .. " + check)
                tabd.style.display = "none"
                tablist[tab] = feature.value
            } else {
                console.log("2 " + tabd.style.display + " .. " + tabindex[i] + " .. " + feature.value + " .. " + check)
                tabd.style.display = "block"
                tablist[tab] = feature.value
            }
        }
    }
}