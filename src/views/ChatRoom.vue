<template>
  <div
    class="container container-light "
  >
    <signout></signout>
    <chat-window></chat-window>
    <message-form></message-form>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import Signout from "../components/Signout.vue";
import { projectAuth } from "../firebase/config";
import getUser from "../reusables/getUser";
import MessageForm from "../components/MessageForm.vue";
import ChatWindow from "../components/ChatWindow.vue";

export default {
  components: {
    Signout,
    MessageForm,
    ChatWindow,
  },
  setup() {
    const router = useRouter();

    projectAuth.onAuthStateChanged(() => {
      const { user } = getUser();

      if (!user.value) {
        router.push({ name: "welcome" });
      }
    });

    return {};
  },
};
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    background: #f9f9f9 !important;
  }
</style>
