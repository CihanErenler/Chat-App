<template>
  <div
    v-if="user"
    class="signout-wrapper flex-space-between"
    style="width: 100%"
  >
    <div class="signout-wrapper-inner flex">
      <p></p>
      <p>
        Hey there <span class="nav-name">{{ user.displayName }}</span
        >! You loged in as
        <span class="pill">{{ user.email }}</span>
      </p>
    </div>
    <button @click="logoutUser" class="btn btn-small">Log out</button>
  </div>
</template>

<script>
import useLogout from "../reusables/useLogout";
import getUser from "../reusables/getUser";

export default {
  setup() {
    const { error, logout } = useLogout();
    const { user } = getUser();

    const logoutUser = async () => {
      await logout();
    };

    return { error, logoutUser, user };
  },
};
</script>

<style></style>
