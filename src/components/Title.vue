<template>
  <div class="display-3 flex-grow-1 white--text text-center">
    {{title}}
  </div> 
</template>


<script>

export default {
  name: "Title",
  data () {
    return {
    }
  },
  props: {
    title: String
  },
  
};
</script>
