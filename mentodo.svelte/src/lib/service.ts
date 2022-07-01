const APIURL = "http://todoapi.azitmentor.hu/";

export function DeleteItem(id: number): Promise<Response> {
  const requestOptions = {
    method: "DELETE",
  };
  return fetch(APIURL + "todo/" + id, requestOptions);
}

export function LoadItems(): Promise<any> {
  return fetch(APIURL + "todo").then((r) => r.json());
}

export function SaveItem(item: any): Promise<any> {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(item),
    headers: { "Content-Type": "application/json" },
  };
  return fetch(APIURL + "todo/save", requestOptions);
}
