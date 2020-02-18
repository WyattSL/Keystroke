const target = location.pathname.split("/")[2];

// make sure the bot exists
var req = new XMLHttpRequest;
req.open("GET", `/api/exists?path=bots/${target}.json`)
req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 404) {
        e("tab_login").style.display = "none";
    } else if (this.readyState == 4 && this.status == 200) {
        e("tab_404").style.display = "none";
    }
};
req.send();

var reqc = new XMLHttpRequest;
reqc.open("GET", `/info`)
reqc.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        loginFinish(this.responseText)
    }
};
reqc.send();

function wait() {
    wait=wait*1000 // seconds -> miliseconds
    setTimeout(function() { return }, wait);
}

function e(id) {
    return document.getElementById(id);
}

function login() {
    e("btn_login").innerHTML = "Popup Opened!"
    var turl = "https://keystroke.glitch.me/auth/discord"
    window.open(turl, "", `width=400,top=25,height=625,left=475,location=0,menubar=0,status=0,titlebar=1,toolbar=0,scrollbars=0`);
    wait(2);
    e("btn_login").innerHTML = "Login"
}

function loginContinue() {
    var req = new XMLHttpRequest;
    var data;
    req.open("GET", "https://keystroke.glitch.me/info");
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            loginFinish(this.responseText);
        } else if (this.readyState == 4 && this.status == 403) {
            return false;
        } else {
            console.error("Failed to fetch info.")
        }
    }
    req.send();
}

function loginFinish(data) {
    data=JSON.parse(data);
    var res;
    if (data) {
        var req = new XMLHttpRequest;
        console.log(`https://keystroke.glitch.me/api/serv/${target}`)
        req.open("GET", "https://keystroke.glitch.me/api/serv/" + target);
        req.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                res=JSON.parse(this.responseText);
                if (data.id == res.ownerID) {
                    e("tab_login").style.display = "none";
                    e("tab_config").style.display = "block";
                    e("title_avatar").src = "https://keystroke.glitch.me/api/avatar/" + target;
                    fetchStats();
                } else {
                    e("tab_login").style.display = "none";
                    e("tab_notowner").style.display = "block";                    
                }
            }
        }
        req.send();
    }
}

function fetchStats() {
    var data;
    var req = new XMLHttpRequest;
    req.open("GET", "https://keystroke.glitch.me/api/config/" + target);
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data=JSON.parse(this.responseText)
            e("title_name").innerHTML = `${data.username}#${data.discriminator}`
            e("form_username").value = data.username;
            e("form_prefix").value = data.prefix;
            e("form_status_" + data.status.toLowerCase()).setAttribute("checked", true);
            e("form_mode_" + data.mode.toLowerCase()).setAttribute("checked", true);
            e("form_game").value = data.game;
            fetchCommands();
        } else if(this.readyState == 4) {
            console.error("Failed to fetch config")
        }
    }
    req.send();
}

function fetchCommands() {
    var i;
    var req = new XMLHttpRequest;
    req.open("GET", "https://keystroke.glitch.me/api/commands");
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { //reconstructing an array that difficult way because the simple way aint working
            console.log(`begin res ${res}`)
            var res = this.responseText;
            var i;
            res=res.replace(/"/g, "");
            console.log(res);
            res=res.replace(/\[/g, "");
            console.log(res);
            res=res.replace(/]/g, "");
            console.log(res);
            res=res.split(",");
            array=res;
            console.log(`array ` + array);
            for (i=0;i<array.length;i++) {
                var it = array[i].split(".")[0];
                var reqcmd = new XMLHttpRequest;
                reqcmd.open("GET", "https://keystroke.glitch.me/api/cmdcheck/" + target + "?cmd=" + it, false);
                reqcmd.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        var res = this.responseText;
                        var ele = document.createElement("input");
                        if (res == "true") {
                            ele.checked = true;
                        }
                        ele.type = "checkbox";
                        ele.name = it;
                        ele.value = it;
                        e("form_cmdlist").appendChild(ele);
                
                        var elel = document.createElement("label");
                        elel.innerHTML = it;
                        e("form_cmdlist").appendChild(elel);
        
                        var elebr = document.createElement("br");
                        e("form_cmdlist").appendChild(elebr);
                    }
                }
                reqcmd.send();
            }
        } else if (this.readyState == 4) {
            console.error("Failed to fetch commands")
        }
    }
    req.send();
}

e("tab_config").style.display = "none";
e("tab_notowner").style.display = "none";
e("form_id").value = target;

window.addEventListener("message", (event) => {
    loginContinue();
});