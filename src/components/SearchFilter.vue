<template>
  <v-card-title class="card-s d-flex justify-space-between p-0">
    <v-text-field
      v-model="search"
      solo
      label="Search"
      clearable
      class="mt-4 mx-0 px-0 search-data"
    ></v-text-field>
    <v-btn
      class="btn-s mb-4"
      dark
      small
      depressed
      color="primary" 
      @click="$emit('filterItems', search)"><v-icon>
      mdi-magnify
    </v-icon></v-btn>
    <v-btn
      class="btn-s mb-4"
      depressed
      dark
      small
      @click="$emit('orderData')"
      color="primary">
      <v-icon>mdi-sort-bool-descending</v-icon>
    </v-btn>
  </v-card-title>
</template>

<script>
  export default {
    name: "App",
    data (){
      return {
        search:''
      }
    }
  }

</script>

<style lang="sass" scoped>
  .btn-s
    height:49px!important
    width:10%
    margin-left:1px
  .search-data
    width:65%
</style>
