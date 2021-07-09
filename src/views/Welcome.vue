<template>
  <div class="container">
    <div class="flex welcome">
      <div class="welcome-greeting">
        <span class="material-icons greeting-icon">
          question_answer
        </span>

        <h1 class="welcome-title">Welcome to LiveChat</h1>
        <p class="welcome-content-text">
          LiveChat is an awesome place where you can chat with the people all
          around the world. Join now!
        </p>
      </div>
      <div class="welcome-content">
        <component
          :is="selectedComponent"
          @change-component="changeComponent"
        ></component>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import Login from "../components/Login.vue";
import Signup from "../components/Signup.vue";

export default {
  components: {
    Login,
    Signup,
  },
  setup() {
    const selectedComponent = ref("login");

    const changeComponent = (name) => {
      selectedComponent.value = name;
    };

    return { selectedComponent, changeComponent };
  },
};
</script>

<style></style>
