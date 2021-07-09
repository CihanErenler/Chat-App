<template>
  <div class="error">{{ error }}</div>
  <form>
    <div class="form-group flex">
      <textarea
        @keypress.enter.prevent="sendMessage"
        v-model="message"
        placeholder="Press enter to send a message"
      ></textarea>
    </div>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import { timeStamp } from "../firebase/config";
import getUser from "../reusables/getUser";
import useCollection from "../reusables/useCollection";

export default {
  setup() {
    const message = ref("");
    const { user } = getUser();
    const { error, addDoc } = useCollection("messages");

    const sendMessage = async () => {
      const newMessage = {
        message: message.value,
        user: user.value.displayName,
        createdAt: timeStamp(),
      };

      if (message.value !== "") {
        await addDoc(newMessage);

        if (!error.value) {
          message.value = "";
        }
      }
    };

    return { message, sendMessage, error };
  },
};
</script>

<style scoped>
form {
  width: 100%;
  height: 100px;
  background: #f9f9f9;
  border-radius: 0 0 15px 15px;
}

.form-group {
  height: 100%;
  width: 95%;
  margin: auto;
  position: relative;
}

textarea {
  resize: none;
  width: 100%;
  margin: 0 auto 10px;
  height: 80px;
  border: 0;
  border-radius: 30px;
  box-shadow: 5px 5px 30px 5px rgba(0, 0, 0, 0.04);
  outline: none;
  padding: 20px 70px 20px 20px;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  color: #888;
  border: 1px solid rgba(0, 0, 0, 0.08);
  /* background: rgb(243, 243, 243); */
}

textarea::placeholder {
  font-weight: 500;
  color: rgb(204, 204, 204);
}

.material-icons {
  position: absolute;
  right: 20px;
  top: 40px;
  width: 60px;
  height: 60px;
  background: #d9fdf5;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #34c498;
  cursor: pointer;
  transition: all 0.3s ease;
}

.material-icons:hover {
  background: rgb(192, 255, 237);
}
</style>
