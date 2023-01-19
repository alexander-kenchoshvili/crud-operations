<template>
  <div class="wrapper">
    <form>
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" v-model="user.name" />
      <label for="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        v-model="user.username"
      />
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" v-model="user.email" />
      <button class="edit-btn" @click.prevent="save" type="submit">Save</button>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import router from "@/router";
import { useUserStore } from "../stores/useUserStore.js";

const userStore = useUserStore();
const user = ref({});
const userId = useRoute().params.userId;

onMounted(() => {
  user.value = userStore.userData.find((u) => u.id === +userId);
});

const save = async () => {
  try {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${userId}`,
      user.value
    );
    userStore.userData = userStore.userData.map((u) => {
      if (u.id === +user.value.id) {
        return user.value;
      }
      return u;
    });

    router.push({ name: "home" });
  } catch (error) {
    console.log(error);
  }
};
</script>

<style>
.wrapper {
  margin-top: 20px;
}
form {
  width: 300px;
  margin: 0 auto;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 12px 20px;
  margin-bottom: 20px;
}
</style>
