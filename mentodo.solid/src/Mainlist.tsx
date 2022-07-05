import { createEffect, createResource, createSignal, For } from "solid-js";
import { mydto } from "./myclass";
import { DeleteItem, LoadItems, SaveItem } from "./service";

function MainList() {
  const [itemList, setItemList] = createSignal<mydto[]>([]);
  const [textInfo, setTextInfo] = createSignal("");
  const [priority, setPriority] = createSignal("");
  const [searchText, setSearchText] = createSignal("");

  createEffect(() => {
    refresh();
  }, []);

  function refresh() {
    LoadItems().then((items: mydto[]) => {
      items = items.filter(
        (p) => p.info == null || p.info.indexOf(searchText()) !== -1
      );
      setItemList(items);
    });
  }

  function addNewClick() {
    SaveItem({ info: textInfo(), priority: priority() }).then((p) => refresh());
  }

  function deleteClick(id: number) {
    DeleteItem(id).then((p) => refresh());
  }

  function doneClick(id: number) {
    var item = itemList().find((p) => p.id === id);
    if (item != null) {
      item.done = !item.done;
      SaveItem(item).then((p) => refresh());
    }
  }

  return (
    <div class="container my-4">
      <div class="row">
        <div class="col">
          Search:
          <input
            type="text"
            value={searchText()}
            oninput={(e: any) => setSearchText(e.target.value)}
          />
          <button class="btn btn-primary" onclick={() => refresh()}>
            Search
          </button>
          Add new:
          <input
            type="text"
            value={textInfo()}
            oninput={(e: any) => setTextInfo(e.target.value)}
          />
          Priority
          <select
            id="prio"
            value={priority()}
            onchange={(e: any) => setPriority(e.target.value)}
          >
            <option value="0">None</option>
            <option value="1">Low</option>
            <option value="2">Normal</option>
            <option value="3">Urgent</option>
          </select>
          <button class="btn btn-primary" onclick={() => addNewClick()}>
            Add new item
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div>
            <table class="table table-striped">
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
                <For each={itemList()}>
                  {(p: mydto) => (
                    <tr>
                      <td>{p.id}</td>
                      <td>
                        <input
                          type="checkbox"
                          checked={p.done}
                          onclick={() => doneClick(p.id)}
                        />
                      </td>
                      <td>{p.info}</td>
                      <td>{p.priority}</td>
                      <td>
                        <button
                          class="btn btn-warning"
                          onclick={() => deleteClick(p.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainList;
