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
          <p class="white--text ma-0 pa-0 botStatus">Active</p>
        </div>
        <v-spacer></v-spacer>

        <!-- <v-btn class="mx-2" small fab depressed @click="close">
          <v-icon dark> mdi-close </v-icon>
        </v-btn> -->

        <v-spacer></v-spacer>
        <slot> </slot>
      </v-app-bar>

      <div id="body">
        <div v-for="message in messages" :key="message.id">
          <div v-if="message.bot" class="chat-wrap bot-wrap">
            <div class="bot chat">
              {{ message.text }}
            </div>
          </div>
          <div v-else class="chat-wrap user-wrap">
            <div class="user chat">{{ message.text }}</div>
          </div>
        </div>
        <!-- Doctor Card -->
        <div class="doctorCard" v-if="showDoctor">
          <div class="top">
            <div class="left d-flex">
              <v-avatar size="30" color="#4285F4">
                <v-icon color="white accent-4">1</v-icon>
              </v-avatar>
              <div class="name ml-2 mt-1"><b>Dr. Bot</b></div>
              <div class="ml-2 spu mt-1"><b>,MBBS</b></div>
            </div>
            <div class="right">
              <div class="spu">Endocrinology</div>
              <div class="spu">4 Years of Experience</div>
            </div>
          </div>
        </div>
      </div>

      <div id="options" v-if="optionsFlag && options.length > 0">
        <v-chip
          @click="triggerChipClick(option.text)"
          v-for="option in options"
          :key="option.id"
          class="ml-1 mb-1 pink lighten-4 pink--text text--darken-5"
          >{{ option.text }}</v-chip
        >
      </div>
      <div id="foot" class="md-1">
        <v-text-field
          class="md-0 pa-0"
          placeholder="Type something..."
          filled
          dense
          append-outer-icon="mdi-send"
          v-model="userMsg"
          @keyup.enter="sendMessage"
          @click:append-outer="sendMessage"
        ></v-text-field>
      </div>
    </v-card>
  </section>
</template>

<script>
import { msgService } from "./../service.js";

export default {
  props: ["showChatWindow"],
  data() {
    return {
      userMsg: null,
      userOption: null,
      messages: [],
      optionsFlag: true,
      options: [],
    };
  },
  created() {
    this.userMsg = "Hai, Dr.Bot";
    this.sendMessage();
  },
  methods: {
    async sendMessage() {
      //waste
      if (
        this.userMsg == "Male" ||
        this.userMsg == "Female" ||
        this.userMsg == "Trance Gender"
      ) {
        this.messages.push({
          id: this.messages.length + 1,
          text: this.userMsg,
          bot: false,
        });
        this.messages.push({
          id: this.messages.length + 1,
          text: "please describe your issue?",
          bot: true,
        });
        this.options = [];
      } else {
        this.messages.push({
          id: this.messages.length + 1,
          text: this.userMsg,
          bot: false,
        });
        await msgService.dialogflowGateway(this.userMsg).then((response) => {
          console.log(response);
          this.messages.push({
            id: this.messages.length + 1,
            text: response.message,
            bot: true,
          });

          this.userMsg = "";
          this.options = response.options;
          console.log(this.userMsg);
          if (response.message == "can you please enter your gender") {
            this.options = [
              { text: "Female", id: 1 },
              { text: "Male", id: 2 },
              { text: "Trance Gender", id: 3 },
            ];
          }
        });
      }
      this.userMsg = "";
    },

    async triggerChipClick(msg) {
      this.userMsg = msg;
      this.sendMessage();
      this.userMsg = "";
    },
  },
};
</script>

<style lang="scss" scoped>
#chat-window-wrap {
  width: 100vw;
  height: 100vh;
  background-color: rgba($color: #000000, $alpha: 0.3);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#chat-window {
  width: 60%;
  min-width: 300px;
  max-width: 450px;
  border-radius: 10px;
  height: 90vh;
  background: #fcfcfc;
}
#appbar {
  border-radius: 3%;
}
#body {
  padding: 10px;
  margin: 5px;
  height: 70%;
  overflow: auto;
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
  // padding: 5px;
  // margin-bottom: 5px;
  border-radius: 3%;
}
.v-chip {
  min-width: 170px;
  text-align: center;
  // width: 100%;
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
  border-radius: 10%;
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
  background: #9f9fff;
  max-width: 50%;
  box-shadow: -2.17893px -2.17893px 6.5368px #9f9fff,
    2.17893px 2.17893px 6.5368px rgba(174, 174, 192, 0.4);
  color: #3737ee;
}
#options {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #880e4f;
  flex-wrap: wrap;
  height: 10%;
  width: 100%;
  margin: 2px;
  // overflow-x: scroll;
  overflow-y: scroll;
  scrollbar-width: thin;
}
#foot {
  padding: 0px 10px;
  margin-top: 20px;
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
