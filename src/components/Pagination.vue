<template>
  <v-col>
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="numPages"
        :total-visible="7"
         @input="$emit('dataPagination')"
      ></v-pagination>
    </div>
  </v-col>
</template>

<script>
  export default {
    name: "App",
    data (){
      return {
        page: 1,
      }
    },
    props: {
      numPages: Number
    },
  }

</script>