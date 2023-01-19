<template>
  <div class="wrapper">
    <button class="add-btn" @click="addUser">Add User</button>

    <table>
      <thead>
        <tr>
          <th>Fullname</th>
          <th>Userame</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in paginatedUsers" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button @click="editUser(user.id)" class="edit-btn">Edit</button>
            <button @click="showDialog(user.id)" class="delete-btn">
              Delete
            </button>
          </td>
          <div class="modal" v-if="showPopup" @click="showPopup = false"></div>
          <div class="popup" v-if="showPopup">
            <h3>Are you sure?</h3>
            <div class="modal-inner">
              <button class="confirm-btn" @click="deleteUser(userId)">
                Yes
              </button>
              <button class="cencel-btn" @click="showPopup = false">No</button>
            </div>
          </div>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <span v-for="page in pages" :key="page" @click="changePage(page)">
        {{ page }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useUserStore } from "../stores/useUserStore.js";
import router from "@/router";
import axios from "axios";

const userStore = useUserStore();

const showPopup = ref(false);
const userId = ref(null);
const currentPage = ref(1);
const itemsPerPage = 5;

const allUsers = computed(() => userStore.userData);

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return allUsers.value.slice(start, end);
});

const pages = computed(() => {
  const totalPages = Math.ceil(allUsers.value.length / itemsPerPage);
  return Array.from({ length: totalPages }, (_, index) => index + 1);
});

const changePage = (page) => {
  currentPage.value = page;
};

const showDialog = (id) => {
  userId.value = id;
  showPopup.value = true;
};

const editUser = (id) => {
  router.push({ name: "edit-user", params: { userId: id } });
};

const addUser = () => {
  router.push({ name: "add-user" });
};

const deleteUser = async (id) => {
  try {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    showPopup.value = false;
    userStore.userData = userStore.userData.filter((user) => user.id !== id);
  } catch (error) {
    console.log(error);
  }
};
</script>

<style>
.wrapper {
  padding: 10px;
}
table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
button {
  color: white;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
}

.edit-btn,
.delete-btn,
.add-btn,
.confirm-btn {
  background-color: #4caf50;
  border: 1px solid #4caf50;
  color: white;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  transition: 0.3s;
}
.edit-btn:hover,
.add-btn:hover,
.confirm-btn:hover {
  color: #4caf50;
  background-color: transparent;
  border: 1px solid #4caf50;
}
.delete-btn:hover {
  color: #f44336;
  background-color: transparent;
  border: 1px solid #f44336;
}

.delete-btn {
  background-color: #f44336;
  border: 1px solid #f44336;
}
.cencel-btn {
  background-color: black;
  padding: 8px 16px;

  border: 1px solid black;
  color: white;
}
.cencel-btn:hover {
  background-color: transparent;
  border: 1px solid black;
  color: black;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
}
.popup {
  position: absolute;
  z-index: 999999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f44336;
  padding: 50px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.popup > h3 {
  margin-bottom: 10px;
}
.modal-inner > button:first-child {
  margin-right: 40px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination span {
  margin: 0 10px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  cursor: pointer;
}

.pagination span:hover {
  background-color: #f2f2f2;
}
</style>
