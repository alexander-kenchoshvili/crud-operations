import { defineStore } from "pinia";
import axios from "axios";
import { ref, onMounted } from "vue";

export const useUserStore = defineStore("allUsers", () => {
  const userData = ref([]);
  const users = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users`
      );
      userData.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  onMounted(() => {
    users();
  });

  return { users, userData };
});
