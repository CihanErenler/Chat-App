<template>
  <form @submit.prevent="handleSubmit" class="welcome-form">
    <h1 class="form-title">Login</h1>
    <div class="form-group">
      <span class="material-icons icon">
        person_outline
      </span>
      <input
        v-model="user"
        type="text"
        name="uname"
        id="uname"
        placeholder="Username"
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
        :type="showPassword ? 'text' : 'password'"
        v-model="password"
        name="password"
        id="password"
        placeholder="Password"
        required
      />
      <div class="underline">
        <div class="underline-bar"></div>
      </div>
      <span
        v-if="!showPassword"
        class="material-icons show-pass"
        @click="showPassword = !showPassword"
      >
        visibility
      </span>
      <span
        v-else
        class="material-icons show-pass"
        @click="showPassword = !showPassword"
      >
        visibility_off
      </span>
    </div>
    <div class="error">
      {{ error }}
    </div>
    <button class="btn">Login</button>
    <div class="form-group">
      <p class="form-ask">
        Don't have an account?
        <a class="already" href="javascript:void(0)" @click="changeComponent"
          >Signup</a
        >
      </p>
    </div>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import useLogin from "../reusables/useLogin";

export default {
  emits: ["change-component"],
  setup(props, { emit }) {
    // Refs
    const user = ref("");
    const password = ref("");
    const showPassword = ref(false);
    const router = useRouter();

    const changeComponent = () => {
      emit("change-component", "signup");
    };

    const { error, login } = useLogin();

    const handleSubmit = async () => {
      await login(user.value, password.value);
      if (!error.value) {
        router.push({ name: "chatroom" });
      }
    };
    return {
      changeComponent,
      showPassword,
      user,
      password,
      handleSubmit,
      error,
    };
  },
};
</script>

<style></style>
