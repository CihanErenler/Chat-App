import { createRouter, createWebHistory } from "vue-router";
import Welcome from "../views/Welcome.vue";
import ChatRoom from "../views/ChatRoom.vue";
import { projectAuth } from "../firebase/config";

const check = (to, from, next) => {
  const user = projectAuth.currentUser;

  if (!user) {
    next({ name: "welcome" });
  } else {
    next();
  }
};

const isLogedin = (to, from, next) => {
  const user = projectAuth.currentUser;

  if (user) {
    next({ name: "chatroom" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "welcome",
    component: Welcome,
    beforeEnter: isLogedin,
  },
  {
    path: "/chatroom",
    name: "chatroom",
    component: ChatRoom,
    beforeEnter: check,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
