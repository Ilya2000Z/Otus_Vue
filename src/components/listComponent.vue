<script setup lang="ts">
  import {ref} from "vue";

  const listUser = ref([
      {name: "Ivan", id: 0, age: 20},
      {name: "Valera", id: 1, age: 30},
      {name: "Denis", id: 2, age: 40},
      {name: "Dima", id: 3, age: 50},
  ])
  const activeUser = ref('')
  const showList = ref(true)
  const isHovered = ref(false)

  function setActiveUser(item: string) {
    if(activeUser.value != item) {
      activeUser.value = item
    } else {
      activeUser.value = ''
    }
  }

</script>
<template>
    <ul v-if="showList">
      <template v-for="item in listUser" :key="item.id">
        <li
            @click="setActiveUser(item.name)"
            :style="{ color: isHovered ? 'red' : 'green' }"
            @mouseenter="isHovered = true"
            @mouseleave="isHovered = false"
        >
          {{item.name}}
          <div class="age" v-show="item.name === activeUser">
            {{item.age}}
          </div>
        </li>
      </template>
    </ul>
  <button @click="()=> {showList = !showList}">{{ !showList ?"Show list":"Off list"}}</button>
</template>
<style scoped>

</style>
