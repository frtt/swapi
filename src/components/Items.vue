<template>
  <v-row height="100%">
    <v-col
      v-for="item in itemsListChild"
      :key="item.name"
      cols="12"
      height="100%"
      class="ma-0 py-1 px-0"
    >
      <v-item v-slot="{ active, toggle }" height="100%">
        <v-card
          :color="active ? 'primary' : ''"
          class="d-flex align-center"
          dark
          :height="height"
          @click="toggle"
          v-on:click="$emit('getData', item.name, mode)"
        >
          <v-scroll-y-transition>
            <div
            
              class="flex-grow-1 text-center"
              :class="fontItem"
            >
              <p class="pa-0 ma-0" v-if="itemLoaded">{{ item.key }}</p>
              <p class="pa-0 ma-0">{{ item.name }}</p>
            </div>
          </v-scroll-y-transition>
        </v-card>
      </v-item>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    props:{
      itemsListChild: Array,
      height: String,
      mode: String,
      fontItem: String,
      itemLoaded: Boolean
    }
  }
</script>

<style lang="sass" scoped>
  
</style>

