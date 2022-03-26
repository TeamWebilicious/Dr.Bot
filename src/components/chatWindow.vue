<template>
  <section id="chat-window-wrap" v-if="showChatWindow">
    <v-card id="chat-window">
      <v-app-bar color="deep-purple accent-4" id="appbar" dense dark>
        <v-avatar class="mr-3">
          <img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="John"
            width="10px"
          />
        </v-avatar>
        <v-toolbar-title>Dr Bot</v-toolbar-title>

        <v-spacer></v-spacer>
      </v-app-bar>

      <div id="body">
        <div v-for="message in messages" :key="message.id">
          <div v-if="message.bot" class="chat-wrap bot-wrap">
            <div class="bot chat">{{ message.text }}</div>
          </div>
          <div v-else class="chat-wrap user-wrap">
            <div class="user chat">{{ message.text }}</div>
          </div>
        </div>
      </div>

      <div id="options" v-if="optionsFlag">
        <v-chip v-for="option in options" :key="option.id" class="ml-1">{{
          option.text
        }}</v-chip>
      </div>
      <div id="foot">
        <v-text-field
          placeholder="type something..."
          filled
          dense
          append-outer-icon="mdi-send"
        ></v-text-field>
        <!-- <v-btn><v-icon>mdi-minus</v-icon></v-btn> -->
      </div>
    </v-card>
  </section>
</template>

<script>
export default {
  props: ["showChatWindow"],
  data() {
    return {
      messages: [
        { id: 1, text: "Hey!", bot: true },
        { id: 2, text: "sfs", bot: false },
        { id: 1, text: "Hey!", bot: true },
        { id: 2, text: "sfs", bot: false },
      ],
      optionsFlag: true,
      options: [
        { id: 1, text: "I am not feeling well" },
        { id: 2, text: "I need a Doctor" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
#chat-window-wrap {
  width: 100vw;
  height: 100vh;
  background-color: rgba($color: #000000, $alpha: 0.3);
  display: flex;
  justify-content: center;
  align-items: center;

  background: #e5e5e5;
}
#chat-window {
  width: 60%;
  min-width: 300px;
  max-width: 450px;
  border-radius: 3%;
  height: 90vh;
  background: #f0f0f3;
  box-shadow: -2.17893px -2.17893px 6.5368px #ffffff,
    2.17893px 2.17893px 6.5368px rgba(174, 174, 192, 0.4);
}
#appbar {
  border-radius: 3%;
}
#body {
  height: 70%;
  overflow-y: scroll;
}
/* Hide scrollbar for Chrome, Safari and Opera */
#body::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
#body {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.chat-wrap {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5px;
  // margin-bottom: 5px;
  border-radius: 3%;
}

.bot-wrap {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}

.user-wrap {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
}

.chat {
  height: auto;
  width: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5px;
  margin: 5px;
  border-radius: 3%;
  background: #f0f0f3;
  box-shadow: -2.17893px -2.17893px 6.5368px #ffffff,
    2.17893px 2.17893px 6.5368px rgba(174, 174, 192, 0.4);
}
.user {
  justify-content: flex-end;
  align-items: center;
  background: #f0f0f3;
  // max-width: 50%;
  box-shadow: -2.17893px -2.17893px 6.5368px #ffffff,
    2.17893px 2.17893px 6.5368px rgba(174, 174, 192, 0.4);
}
.bot {
  justify-content: flex-start;
  align-items: center;
  background: #f0f0f3;
  max-width: 50%;
  box-shadow: -2.17893px -2.17893px 6.5368px #ffffff,
    2.17893px 2.17893px 6.5368px rgba(174, 174, 192, 0.4);
}
#options {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 10%;
  padding: 10px;
}
#foot {
  padding: 10px;
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>