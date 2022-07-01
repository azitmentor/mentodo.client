"use strict";

import { DeleteItem, LoadItems, SaveItem } from "./dataservice.js";

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

export function refresh() {
    loadData();
}

export function createItem() {
    let inp = document.getElementById("infotext");
    let prio = document.getElementById("prio");

    SaveItem({ info: inp.value, priority: prio.value }).then(p => {
        loadData();
        inp.value = "";
    });
}

function doneClick(itemid) {
    console.log(itemid);
    const item = todoList.find(o => o.id == itemid);
    item.done = !item.done;
    updateItem(item);
}

let todoList;

function loadData() {
    LoadItems().then(items => buildTable(items));
}

function buildTable(items) {
    let src = document.getElementById("searchtext");
    let bodyNode = document.getElementById("tbody1");
    while (bodyNode.hasChildNodes()) {
        bodyNode.removeChild(bodyNode.lastChild);
    }
    todoList = items.filter(p => p.info.indexOf(src.value) != -1);
    todoList.forEach((todoitem) => {
        const delButton = document.createElement("button");
        delButton.classList = "btn btn-warning";
        delButton.innerText = "Delete";
        delButton.addEventListener('click', (e, ev) => deleteItem(todoitem.id));

        const inputCheckbox = document.createElement("input");
        inputCheckbox.type = "checkbox";
        inputCheckbox.checked = todoitem.done;
        inputCheckbox.addEventListener("click", (e, ev) => doneClick(todoitem.id));

        let row = document.createElement("tr");
        let cell = document.createElement("td");
        cell.innerText = todoitem.id;
        row.append(cell);

        cell = document.createElement("td");
        cell.append(inputCheckbox);
        row.append(cell);

        cell = document.createElement("td");
        cell.innerText = todoitem.info;
        row.append(cell);

        cell = document.createElement("td");
        cell.innerText = todoitem.priority;
        row.append(cell);

        cell = document.createElement("td");
        cell.append(delButton);
        row.append(cell);

        bodyNode.append(row);
    });

}

function updateItem(item) {
    SaveItem(item).then(o => loadData());
}

function deleteItem(id) {
    DeleteItem(id).then(o => loadData());
}
