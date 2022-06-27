<script setup lang="ts">
import { ref, onMounted, toRaw } from 'vue'
import type { mydto } from './myclass';

// reactive state
const data = ref<mydto[]>([]);

const searchtext = ref("");

const newText = ref("");

const selected = ref("");

const actualItem = ref<mydto>();

function search() {
  refresh();
}

// lifecycle hooks
onMounted(() => {
  refresh();
})

function refresh() {
  fetch("http://todoapi.azitmentor.hu/todo").then(p => p.json()).then(k => {
    data.value = k.filter((p: mydto) => p.info == null || p.info.indexOf(searchtext.value) !== -1)
  });
}

function addNew() {
  const reqop = {
    method: "POST",
    body: JSON.stringify({ info: newText.value, priority: selected.value }),
    headers: { "Content-Type": "application/json" },
  };
  fetch("http://todoapi.azitmentor.hu/todo/save", reqop).then(p => refresh());
}

function deleteItem(id: number) {
  const reqop = {
    method: "DELETE"
  };
  fetch("http://todoapi.azitmentor.hu/todo/" + id, reqop).then(p => refresh());
}

function checkchange(id: any) {
  let item = toRaw(data.value.find(p => p.id == id));
  console.log(item);
  if (item != null) {
    const reqop = {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://todoapi.azitmentor.hu/todo/save", reqop).then(p => refresh());
  }

}
</script>

<template>
  <div class="container my-4">
    <div class="row">
      <div class="col">
        Search: <input type="text" v-model="searchtext" />
        <button class="btn btn-primary" @click="search()">Search</button>
        <div id="add">
          New item:
          <input type="text" id="infotext" v-model="newText">
          Priority
          <select id="prio" v-model="selected">
            <option value="0">None</option>
            <option value="1">Low</option>
            <option value="2">Normal</option>
            <option value="3">Urgent</option>
          </select>
          <button @click="addNew()" class="btn btn-primary">Hozzáad</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div id="main">
          <table class="table table-striped" id="tab1">
            <thead>
              <tr>
                <th>Id</th>
                <th>State</th>
                <th>Description</th>
                <th>Priority</th>
                <th></th>
              </tr>
            </thead>
            <tbody id="tbody1">
              <tr v-for="item in data">
                <td>{{ item.id }}</td>
                <td><input type="checkbox" v-model="item.done" @change="checkchange(item.id)" /></td>
                <td>{{ item.info }}</td>
                <td>{{ item.priority }}</td>
                <td><button class="btn btn-warning" @click="deleteItem(item.id)">Töröl</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
