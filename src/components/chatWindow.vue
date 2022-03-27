<template>
  <section id="chat-window-wrap" v-if="showChatWindow">
    <v-card id="chat-window">
      <v-app-bar color="#4285F4" id="appbar" dense dark>
        <v-badge bottom color="green accent-4" dot offset-x="10" offset-y="10">
          <v-avatar size="40">
            <v-icon color="white accent-4">mdi-robot-outline</v-icon>
          </v-avatar>
        </v-badge>
        <div class="ml-2">
          <p class="white--text ma-0 pa-0 botTitle">Dr Bot</p>
          <p class="grey--text ma-0 pa-0 botStatus">Active</p>
        </div>
        <v-spacer></v-spacer>

        <!-- <v-btn class="mx-2" small fab depressed @click="close">
          <v-icon dark> mdi-close </v-icon>
        </v-btn> -->

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
        <v-chip
          v-for="option in options"
          :key="option.id"
          class="ml-1"
          @click="userOptionFn(option)"
          >{{ option.text }}</v-chip
        >
      </div>
      <div id="foot" class="md-0">
        <v-text-field
          class="md-0 pa-0"
          placeholder="type something..."
          filled
          dense
          append-outer-icon="mdi-send"
          v-model="userMsg"
          @keyup.enter="sendTypeMessage"
          @click:append-outer="sendTypeMessage"
        ></v-text-field>
        <!-- <v-btn><v-icon>mdi-minus</v-icon></v-btn> -->
      </div>
    </v-card>
  </section>
</template>

<script>
import msgService from "./../service.js";

export default {
  props: ["showChatWindow"],
  data() {
    return {
      dialog: false,
      userMsg: null,
      userOption: null,
      messages: [
        { id: 1, text: "Hey!", bot: true },
        { id: 2, text: "sfs", bot: false },
        { id: 3, text: "Hey!", bot: true },
        { id: 4, text: "sfs", bot: false },
      ],
      optionsFlag: true,
      options: [
        { id: 1, text: "I am not feeling well" },
        { id: 2, text: "I need a Doctor" },
      ],
    };
  },
  methods: {
    async sendMessage(message) {
      this.messages.push({
        id: this.messages.length + 1,
        text: message,
        bot: false,
      });
      await msgService.sendMessage(message).then((response) => {
        this.messages.push({
          id: this.messages.length + 1,
          text: response.data.message,
          bot: true,
        });
      });
    },
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

  background: rgba(0, 0, 0, 0.3);
}
#chat-window {
  width: 60%;
  min-width: 300px;
  max-width: 450px;
  border-radius: 3%;
  height: 90vh;
  background: #fcfcfc;
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
.botStatus {
  font-size: 12px;
  color: #8c8c8c;
}
.botTitle {
  font-size: 14px;
  color: #8c8c8c;
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
