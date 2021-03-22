<template>
  <v-app>
    <v-main>
      <v-container fluid class="black align-center" fill-height>
        <v-row :height="iheight" class="d-flex justify-center">
          <v-col cols="12" sm="6" md="4" class="pa-0 wrap-section">
            <v-row class="wrap-header pa-0">
              <v-col
                cols="12"
                class="p-0"
              >
                <Title :title="title"/>
                <SearchFilter ref="childDataSearch" @orderData="orderData" @filterItems="filterItems" v-if="mode == 'items'" />
              </v-col>
            </v-row>
            <v-row class="wrap-list">
              <v-col
                cols="12"
              >
                <v-item-group v-if="!sending">
                  <Items @getData="getData" :itemsListChild="itemsListPag" :height="height"  :mode="mode" :fontItem="fontItem" :itemLoaded="itemLoaded"/>
                </v-item-group>
                <div class="text-center " v-else>
                  <v-progress-circular
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </div>
                <div v-if="error">
                  <v-alert type="error">
                  Error accediendo a la API
                </v-alert>
                </div>
              </v-col>            
            </v-row>
            <v-row class="wrap-pagination">
              <Pagination ref="childData" @dataPagination="dataPagination" :numPages="numPages" v-show="numPages>1" />
            </v-row>
            <v-row class="wrap-back">
              <Back v-show="mode!='title'" @back="back"/>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SearchFilter from "./components/SearchFilter";
import Items from "./components/Items";
import Pagination from "./components/Pagination";
import Title from "./components/Title";
import Back from "./components/Back";
import Vue from "vue";
export default {
  name: "App",
  components:{
    Title,
    SearchFilter,
    Items,
    Pagination,
    Back
  },
  data (){
    return {
      itemsTitle:[
        { name: 'People' },
        { name: 'Starships'},
        { name: 'Planets'},
      ],
      titleItem:'',
      itemLoaded:false,
      error:false,
      numPages:0,
      itemsList:[],
      itemsListPag:[],
      itemsFiltered:[],
      height:'180px',
      iheight:'300px',
      page: 1,
      fontItem: 'display-2',
      length: 6,
      sending:false,
      title: 'Title',
      mode: 'title'
    }
    //
  },
  mounted(){
    this.itemsListPag = this.itemsTitle;
  },
  methods:{
    async getData(itemType, mode){
      if (mode == 'title'){
        let itemTypeLower = itemType.toLowerCase();
        this.sending = true;
        this.itemsList = await this.fetchData(itemTypeLower, 1);
        this.sending = false;
        if (this.error==false){
          this.itemsFiltered = this.itemsList;
          this.title = itemType;
          this.titleItem = itemType;
          this.mode = 'items';
          await this.changeList();
        }else{
          setTimeout(function(){ this.error=false; }, 3000);
        }
      }else if (mode == 'items'){
        this.itemsFiltered = this.itemsList;
        let filterItem = this.itemsFiltered.filter(item => item.name == itemType );
        let filterItem2 = Object.assign({}, filterItem[0]);
        this.title = filterItem2['name'];
        Object.keys(filterItem2).forEach(key => {
          if (Array.isArray(filterItem2[key]) || typeof filterItem2[key] =='object' || filterItem2[key].includes('http') || key == 'created' || key == 'edited' || key =='name'){
            delete filterItem2[key];
          } 
        });
        this.itemsFiltered = Object.keys(filterItem2)
          .map(key => ({key: String(key), name: filterItem2[key]}));
        this.itemsListPag = this.itemsFiltered.slice(0, 10);
        this.numPages = Math.trunc(parseInt(this.itemsFiltered.length)/10);
        this.itemLoaded = true;
        this.mode = 'details';
      }
    },
    changeList(){
      this.fontItem = 'display-1';
      this.itemsListPag = this.itemsFiltered.slice(0, 10);
      this.numPages = Math.trunc(parseInt(this.itemsFiltered.length)/10);
      this.height = '50px';
      this.fontItem = '';
    },
    orderData(){
      this.itemsList.sort(function (o1,o2) {
        if (o1.name > o2.name) { //comparación lexicogŕafica
          return 1;
        } else if (o1.name < o2.name) {
          return -1;
        } 
        return 0;
      });
      this.itemsListPag = this.itemsList.slice(0, 10);
      this.$refs.childData.page = 1;
    },
    filterItems(search){
      
      if (search != ''){
        this.filterData = this.itemsList.filter(item => item.name.includes(search));
        this.itemsListPag = this.filterData.slice(0, 10);
        this.$refs.childData.page = 1;
        this.numPages = Math.trunc(parseInt(this.itemsFiltered.length)/10);
      }else{
        this.filterData = this.itemsList;
        this.itemsListPag = this.filterData.slice(0, 10);
        this.$refs.childData.page = 1;
        this.numPages = Math.trunc(parseInt(this.itemsFiltered.length)/10);
      }
    },
    async fetchData(itemType, page = 1) {
      const query = `https://swapi.dev/api/${itemType}?page=${page}`
      try{
        const response = await Vue.axios({
        url:query
        })
        const dataN = response.data.next;
        const data = response.data.results;
        if (dataN) {
          return data.concat(await this.fetchData(itemType, page+1)) 
        } else {
          return data
        }
      }catch(e){
        this.error=true;
        return
      }
    },
    dataPagination(){
      this.itemsListPag = this.filterData.slice(parseInt(this.$refs.childData.page)*10, parseInt(this.$refs.childData.page)*10 + 10);
    },
    back(){
      if(this.mode == 'items'){
        this.mode = 'title';
        this.itemsListPag = this.itemsTitle;
        this.numPages = 0;
        this.height = '180px';
        this.fontItem = 'display-2';
        this.title = 'Title';
      }else if(this.mode == 'details'){
        this.mode = 'items';
        this.itemsFiltered = this.itemsList;
        this.itemsListPag = this.itemsFiltered.slice(0, 10);
        this.$refs.childData.page = 1;
        this.title = this.titleItem;
        this.numPages = Math.trunc(parseInt(this.itemsFiltered.length)/10);
      }
    }
  }
};
</script>

<style lang="sass" scoped>
  .wrap-section
    height: 860px!important
  
  .wrap-header
    height: 20%!important
  
  .wrap-list
    height: 66%!important
  
  .wrap-pagination
    height: 7%!important

  .wrap-back
    height: 7%!important

  .v-progress-circular
    margin: 2rem

</style>
