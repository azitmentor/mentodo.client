<script setup lang="ts">
import { DeleteItem, LoadItems, SaveItem } from '@/services/service';
import { ref, onMounted, toRaw } from 'vue'
import type { mydto } from './myclass';

const data = ref<mydto[]>([]);

const searchtext = ref("");

const newText = ref("");

const selected = ref("");

onMounted(() => {
  refresh();
})

function SearchClick() {
  refresh();
}

function refresh() {
  LoadItems().then(k => {
    data.value = k.filter((p: mydto) => p.info == null || p.info.indexOf(searchtext.value) !== -1)
  });
}

function addNewClick() {
  SaveItem({ info: newText.value, priority: selected.value }).then(p => refresh());
}

function deleteItem(id: number) {
  DeleteItem(id).then(p=> refresh());
}

function statusClick(id: any) {
  let item = toRaw(data.value.find(p => p.id == id));
  if (item != null) {
    SaveItem(item).then(p => refresh());
  }
}

</script>

<template>
  <div class="container my-4">
    <div class="row">
      <div class="col">
        Search: <input type="text" v-model="searchtext" />
        <button class="btn btn-primary mx-2" @click="SearchClick()">Search</button>
        New item:
        <input type="text" class="form-input" id="infotext" v-model="newText">
        Priority
        <select id="prio" v-model="selected">
          <option value="0">None</option>
          <option value="1">Low</option>
          <option value="2">Normal</option>
          <option value="3">Urgent</option>
        </select>
        <button @click="addNewClick()" class="btn btn-primary mx-2">Add new</button>
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
                <td><input type="checkbox" v-model="item.done" @change="statusClick(item.id)" /></td>
                <td>{{ item.info }}</td>
                <td>{{ item.priority }}</td>
                <td><button class="btn btn-warning" @click="deleteItem(item.id)">Delete</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
