<template>
  <v-btn
    depressed
    color="primary"
    width="100%"
    class="mt-0"
    v-on:click="$emit('back')"
  >
    <v-icon dark>
      mdi-arrow-left
    </v-icon>
  </v-btn>
</template>

<script>

export default {
  data () {

  },

};
</script>
