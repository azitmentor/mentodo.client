import { useEffect, useState } from "react";
import { mydto } from "./myclass";
import { DeleteItem, LoadItems, SaveItem } from "./service";

function MainList() {
  const [itemList, setItemList] = useState<mydto[]>([]);
  const [textInfo, setTextInfo] = useState("");
  const [priority, setPriority] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    refresh();
  }, []);

  function refresh() {
    LoadItems().then((items: mydto[]) => {
      items = items.filter(
        (p) => p.info == null || p.info.indexOf(searchText) !== -1
      );
      setItemList(items);
    });
  }

  function addNewClick() {
    SaveItem({ info: textInfo, priority: priority }).then((p) => refresh());
  }

  function deleteClick(id: number) {
    DeleteItem(id).then((p) => refresh());
  }

  function doneClick(id: number) {
    var item = itemList.find((p) => p.id === id);
    if (item != null) {
      item.done = !item.done;
      SaveItem(item).then((p) => refresh());
    }
  }

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col">
          Search:
          <input
            type="text"
            value={searchText}
            onChange={(p) => {
              setSearchText(p.target.value);
            }}
          />
          <button className="btn btn-primary" onClick={() => refresh()}>
            Search
          </button>
          Add new:
          <input
            type="text"
            value={textInfo}
            onChange={(p) => setTextInfo(p.target.value)}
          />
          Priority
          <select
            id="prio"
            value={priority}
            onChange={(i) => setPriority(i.target.value)}
          >
            <option value="0">None</option>
            <option value="1">Low</option>
            <option value="2">Normal</option>
            <option value="3">Urgent</option>
          </select>
          <button className="btn btn-primary" onClick={() => addNewClick()}>
            Add new item
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>State</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {itemList.map((p) => {
                  return (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>
                        {p.done}
                        <input
                          type="checkbox"
                          defaultChecked={p.done}
                          onClick={() => doneClick(p.id)}
                        />
                      </td>
                      <td>{p.info}</td>
                      <td>{p.priority}</td>
                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={() => deleteClick(p.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainList;
