<template>
  <v-app>
    <v-main>
      <helloWorld />
      <!-- <chatWindow :showChatWindow="true" /> -->
    </v-main>
  </v-app>
</template>

<script>
// import chatWindow from "./components/chatWindow";
import helloWorld from "./components/helloWorld";

export default {
  name: "App",

  components: {
    // chatWindow,
    helloWorld,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
a {
  text-decoration: none;
}
</style>
