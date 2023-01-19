<template>
  <div class="wrapper">
    <form>
      <div class="form-group">
        <label for="fullname">Fullname:</label>
        <input type="text" id="fullname" name="fullname" v-model="name" />
        <span v-if="checkName" class="error-message">field is Required</span>
      </div>
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" v-model="username" />
        <span class="error-message" v-if="checkUsername"
          >field is Required</span
        >
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" v-model="email" />
        <span class="error-message" v-if="checkEmail">field is Required</span>
      </div>
      <button class="add-btn" @click.prevent="onSubmit" type="submit">
        Add User
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import axios from "axios";
import router from "@/router";
import { useUserStore } from "../stores/useUserStore.js";

const userStore = useUserStore();

const name = ref("");
const username = ref("");
const email = ref("");
const checkName = ref(false);
const checkUsername = ref(false);
const checkEmail = ref(false);

const validForm = computed(() => name.value && username.value && email.value);

const invalidForm = () => {
  checkName.value = !name.value;
  checkUsername.value = !username.value;
  checkEmail.value = !email.value;
};

const onSubmit = async () => {
  invalidForm();
  if (validForm.value) {
    try {
      const response = await axios.post(
        `https://jsonplaceholder.typicode.com/users`,
        { name: name.value, username: username.value, email: email.value }
      );
      userStore.userData.unshift(response.data);
      router.push({ name: "home" });
    } catch (error) {
      console.log(error);
    }
  }
};
watch(name, (newValue) => {
  checkName.value = newValue === "" ? true : false;
});
watch(username, (newValue) => {
  checkUsername.value = newValue === "" ? true : false;
});
watch(email, (newValue) => {
  checkEmail.value = newValue === "" ? true : false;
});
</script>

<style>
.wrapper {
  margin-top: 20px;
}
.form-group {
  margin-bottom: 20px;
}
.error-message {
  color: red;
}
label {
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
}

input {
  width: 100%;
  padding: 12px 20px;
  margin-bottom: 20px;
}
</style>
