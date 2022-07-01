"use strict";

const APIURL = "http://todoapi.azitmentor.hu/";

export function LoadItems() {
    return fetch(APIURL + "todo").then(k => k.json());
}

export function DeleteItem(id) {
    const requestOptions = {
        method: "DELETE",
    };
    return fetch(APIURL + "todo/" + id, requestOptions);
}

export function SaveItem(item) {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "Content-Type": "application/json" },
    };
    return fetch(APIURL + "todo/save", requestOptions);
  }
  