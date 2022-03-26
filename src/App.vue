<template>
  <v-app>
    <v-main>
      <chatWindow :showChatWindow="true" />
    </v-main>
  </v-app>
</template>

<script>
import chatWindow from "./components/chatWindow";

export default {
  name: "App",

  components: {
    chatWindow,
  },

  data: () => ({
    //
  }),
};
</script>

<style >
</style>
