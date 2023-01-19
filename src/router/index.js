import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/HomePage.vue";
import EditUser from "@/components/EditUser.vue";
import AddUser from "@/components/AddUser.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },

    {
      path: "/edit-user/:userId",
      name: "edit-user",
      component: EditUser,
    },
    {
      path: "/add-user",
      name: "add-user",
      component: AddUser,
    },
  ],
});

export default router;
