<template>
  <form @submit.prevent="handleSubmit" class="welcome-form">
    <h1 class="form-title">Sign up</h1>
    <div class="form-group">
      <span class="material-icons icon">
        person_outline
      </span>
      <input
        type="text"
        name="uname"
        id="uname"
        placeholder="Username"
        v-model="userName"
      />
      <div class="underline">
        <div class="underline-bar"></div>
      </div>
    </div>
    <div class="form-group">
      <span class="material-icons icon">
        email
      </span>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        required
        v-model="email"
      />
      <div class="underline">
        <div class="underline-bar"></div>
      </div>
    </div>
    <div class="form-group">
      <span class="material-icons icon">
        lock
      </span>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        required
        v-model="password"
      />
      <div class="underline">
        <div class="underline-bar"></div>
      </div>
    </div>
    <div class="error">{{ error }}</div>
    <button class="btn">Sign up</button>

    <p class="form-ask">
      Already have an account?
      <a class="already" href="javascript:void(0)" @click="changeComponent"
        >Login</a
      >
    </p>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import useSignup from "../reusables/useSignup";
import { useRouter } from "vue-router";

export default {
  emits: ["change-component"],
  setup(props, { emit }) {
    const { error, signup } = useSignup();
    // Refs
    const userName = ref("");
    const email = ref("");
    const password = ref("");
    const router = useRouter();

    const changeComponent = () => {
      emit("change-component", "login");
    };

    const handleSubmit = async () => {
      await signup(email.value, password.value, userName.value);
      if (!error.value) {
        router.push({ name: "chatroom" });
      }
    };

    return { changeComponent, userName, email, password, handleSubmit, error };
  },
};
</script>

<style></style>
