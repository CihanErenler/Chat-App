<template>
  <div class="chat-window" ref="container">
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="documents" class="messages">
      <div
        v-for="doc in documents"
        :key="doc.id"
        class="message"
        :class="{ friend: user !== doc.user }"
      >
        <div class="profile">{{ doc.user.charAt(0).toUpperCase() }}</div>
        <div class="message-body">
          <div class="message-text">{{ doc.message }}</div>
          <div class="created-at">{{ doc.createdAt }} ago</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { projectAuth } from "../firebase/config";
import getCollection from "../reusables/getCollection";
import { onUpdated } from "@vue/runtime-core";

export default {
  setup() {
    const user = projectAuth.currentUser.displayName;
    const firstLetter = user.charAt(0).toUpperCase();
    const { error, documents } = getCollection("messages");

    const container = ref(null);

    onUpdated(() => {
      container.value.scrollTop = container.value.scrollHeight;
    });

    return { error, documents, user, firstLetter, container };
  },
};
</script>

<style>
::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #cfcfcf;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #9e9e9e;
}

.chat-window {
  width: 100%;
  flex: 1;
  overflow: auto;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.messages {
  width: 100%;
  padding: 10px 60px;
  display: flex;
  flex-direction: column;
  background: #f7f3ed;
}

.message {
  min-width: 150px;
  display: flex;
  margin-bottom: 15px;
  display: flex;
  flex-direction: row-reverse;
  align-self: flex-end;
}

.profile {
  margin-left: 20px;
  height: 40px;
  width: 40px;
  background: rgb(255, 225, 159);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.message-text {
  width: max-content;
  background: #34c481;
  color: #ffffff;
  padding: 20px 25px;
  border-radius: 15px;
  position: relative;
  text-align: right;
  box-shadow: 0px 8px 34px -5px rgba(0, 0, 0, 0.1);
  font-size: 14px !important;
}

.message-text::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 100%; /* To the left of the tooltip */
  margin-top: -18px;
  border-width: 12px;
  border-bottom: 0;
  border-style: solid;
  border-color: transparent transparent transparent #34c481;
}

.friend.message {
  align-self: flex-start;
  flex-direction: row;
}

.friend .message-text::after {
  display: none;
}

.friend .message-text::before {
  content: "";
  position: absolute;
  top: 50%;
  right: 100% !important; /* To the left of the tooltip */
  margin-top: -18px;
  border-width: 12px;
  border-bottom: 0;
  border-style: solid;
  border-color: transparent #ffffff transparent transparent !important ;
}

.friend .message-text {
  background: #ffffff;
  color: #666666;
  border-radius: 15px;
  margin-left: 0;
  margin-right: 15px;
  text-align: left;
}

.friend .profile {
  margin-right: 20px;
  margin-left: 0;
  background: rgb(215, 236, 253);
}

.created-at {
  font-size: 11px;
  color: #9b9898;
  margin: 3px 0 0 5px;
}
</style>
