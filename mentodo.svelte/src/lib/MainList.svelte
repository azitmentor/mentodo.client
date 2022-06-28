<script lang="ts">
  import { onMount } from "svelte";

  const APIURL = "http://todoapi.azitmentor.hu/";

  $: searchText = "";

  $: itemList = [];

  $: textInfo = "";

  $: priority = "";

  onMount(async function () {
    await refresh();
  });

  async function refresh() {
    const response = await fetch(APIURL + "todo");
    const atm = await response.json();
    console.log(searchText);
    itemList = atm.filter(
      (p) => p.info == null || p.info.indexOf(searchText) !== -1
    );
  }
  function deleteClick(id: number) {
    const requestOptions = {
      method: "DELETE",
    };
    fetch(APIURL + "todo/" + id, requestOptions).then((p) => refresh());
  }

  function addNew() {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({ info: textInfo, priority: priority }),
      headers: { "Content-Type": "application/json" },
    };
    fetch(APIURL + "todo/save", requestOptions).then((p) => refresh());
  }

  function doneClick(id: number) {
    var item = itemList.find((p) => p.id == id);
    if (item != null) {
      item.done = !item.done;
      const reqop = {
        method: "POST",
        body: JSON.stringify(item),
        headers: { "Content-Type": "application/json" },
      };
      fetch(APIURL + "todo/save", reqop).then((p) => refresh());
    }
  }
</script>

<div class="container my-4">
  <div class="row">
    <div class="col">
      Search:
      <input type="text" bind:value={searchText} />
      <button class="btn btn-primary" on:click={() => refresh()}>
        Search
      </button>
        Add new:
        <input type="text" bind:value={textInfo} />
        Priority
        <select id="prio" bind:value={priority}>
          <option value="0">None</option>
          <option value="1">Low</option>
          <option value="2">Normal</option>
          <option value="3">Urgent</option>
        </select>
        <button class="btn btn-primary" on:click={() => addNew()}>
          Add new item
        </button>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <div id="main">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>State</th>
              <th>Description</th>
              <th>Priority</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {#each itemList as item}
              <tr>
                <td>{item.id}</td>
                <td>
                  <input
                    type="checkbox"
                    bind:checked={item.done}
                    on:click={() => doneClick(item.id)}
                  />
                </td>
                <td>{item.info}</td>
                <td>{item.priority}</td>
                <td>
                  <button
                    class="btn btn-warning"
                    on:click={() => deleteClick(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
