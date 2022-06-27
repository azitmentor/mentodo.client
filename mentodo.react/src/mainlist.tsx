import { useEffect, useState } from "react";
import { mydto } from "./myclass";

function MainList() {
  const [itemList, setItemList] = useState<mydto[]>([]);
  const [textInfo, setTextInfo] = useState("");
  const [priority, setPriority] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    refresh();
  }, []);

  function refresh() {
    fetch("http://todoapi.azitmentor.hu/todo")
      .then((p) => p.json())
      .then((k: mydto[]) => {
        k = k.filter((p) => p.info.indexOf(searchText) !== -1);
        setItemList(k);
      });
  }

  function addNew() {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({ info: textInfo, priority: priority }),
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://todoapi.azitmentor.hu/todo/save", requestOptions).then((p) =>
      refresh()
    );
  }

  function deleteItem(id: number) {
    const requestOptions = {
      method: "DELETE",
    };
    fetch("http://todoapi.azitmentor.hu/todo/" + id, requestOptions).then((p) =>
      refresh()
    );
  }

  function doneClick(id: number) {
    var item = itemList.find((p) => p.id === id);
    if (item != null) {
      item.done = !item.done;
      const reqop = {
        method: "POST",
        body: JSON.stringify(item),
        headers: { "Content-Type": "application/json" },
      };
      fetch("http://todoapi.azitmentor.hu/todo/save", reqop).then((p) =>
        refresh()
      );
    }
  }
  return (
    <div>
      Search:
      <input
        type="text"
        value={searchText}
        onChange={(p) => {
          setSearchText(p.target.value);
          //refresh();
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
      <button className="btn btn-primary" onClick={() => addNew()}>
        Add new item
      </button>
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
                    checked={p.done}
                    onClick={() => doneClick(p.id)}
                  />
                </td>
                <td>{p.info}</td>
                <td>{p.priority}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => deleteItem(p.id)}
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
  );
}

export default MainList;