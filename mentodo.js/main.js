"use strict";

const APIURL = "http://todoapi.azitmentor.hu/todo";

domReady(() => {
    loadData();
});

function domReady(fn) {
    if (document.readyState === "interactive" || document.readyState === "complete") {
        setTimeout(fn, 1);
    }
    else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

function refresh() {
    loadData();
}

function checkclick(itemid) {
    console.log("check", itemid);
    const item = todoList.find(o => o.id == itemid);
    item.done = !item.done;
    console.log(item);
    updateItem(item);
}

let todoList;

function loadData() {
    let request = new XMLHttpRequest();

    let src = document.getElementById("searchtext");

    request.open("GET", APIURL, true);

    request.onload = function () {
        let data = JSON.parse(this.response);

        if (request.status >= 200 && request.status < 400) {
            let bodyNode = document.getElementById("tbody1");
            while (bodyNode.hasChildNodes()) {
                bodyNode.removeChild(bodyNode.lastChild);
            }
            todoList = data.filter(p => p.info.indexOf(src.value) != -1);
            todoList.forEach((todoitem) => {
                let delButton = document.createElement("button");
                delButton.classList = "btn btn-warning";
                delButton.innerText = "Törlés";
                delButton.onclick = function () {
                    deleteItem(todoitem.id);
                };
                let row = document.createElement("tr");
                let ch = todoitem.done ? "checked" : "";
                row.innerHTML = "<td>" + todoitem.id + "</td><td><input type='checkbox' value='" + todoitem.done + "' onclick='checkclick(" + todoitem.id + ")'" + ch + ">" + "</td><td>" + todoitem.info + "</td><td>" + todoitem.priority + "</td>";
                row.append(delButton);
                bodyNode.append(row);
                //console.log(todoitem)
            });
        } else {
            console.log("error");
        }
    }

    // Send request
    request.send();

}

function createItem() {

    let inp = document.getElementById("infotext");
    let prio = document.getElementById("prio");
    console.log(inp.value);

    let request = new XMLHttpRequest();
    request.open("POST", APIURL + "/save", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            loadData();
        } else {
            console.log("error");
        }
    }

    // Send request
    let reqText = JSON.stringify({ info: inp.value, priority: prio.value });
    request.send(reqText);
    inp.value = "";
}

function updateItem(item) {
    let request = new XMLHttpRequest();
    request.open("POST", APIURL + "/save", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            loadData();
        } else {
            console.log("error");
        }
    }

    // Send request
    let reqText = JSON.stringify(item);
    request.send(reqText);
}

function deleteItem(id) {
    let request = new XMLHttpRequest();

    request.open("DELETE", APIURL + "/" + id, true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            loadData();
        } else {
            console.log("error");
        }
    }

    // Send request
    request.send();
}
