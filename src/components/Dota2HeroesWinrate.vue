<template>
  <div>
   <h1 id="title">{{ title }}</h1>
   <img 
   id="dota2Icon"
   src="../.././style/dota2Icon.png" width="70px" height="70px"/> 
   <visualization/>
 <!-- Element UI -->   
    <el-input
    style="marginBottom: 40px"
    v-model="search"
    placeholder="Search your hero"
    prefix-icon="el-icon-search"/> 
   <el-table
    v-loading="this.$store.state.loading"
    element-loading-text="Loading your heroes..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    :data="filteredheroes.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style=" color:rgba(166, 131, 18)">
  <el-table-column prop="img" label="HERO">
   <template slot-scope="props"> 
    <img :src=" `https://api.opendota.com`+props.row.img" width="50px" height="50px" style="borderRadius: 50%"/>
   </template>
  </el-table-column>
  <el-table-column prop="localized_name" label="NAME" >
  </el-table-column>
  <el-table-column prop="pro_win" label="WIN 
  RATE">
  </el-table-column>
  <el-table-column prop="pro_ban" label="BAN COUNT">
  </el-table-column>
  <el-table-column prop="pro_pick" label="PICK COUNT">
  </el-table-column>
  </el-table>
  </div>  
</template>

<!-- VUE.js -->
<script>
import '../../style/style.css'
import Vue from 'vue'
import '../../style/theme/index.css'
import {mapState} from 'vuex'
import visualization from '.././BarPercentage/BarPercentage'

export default {
name: 'Dota2HeroesWinRate',
components: {
    visualization
},
data()
  {
    return{
      search: '',
  }},
  //Dispatch the loadData - (API call)
mounted()
    {
      this.$store.dispatch('loadData')
    },
computed: {
   //vuex mapState
    ...mapState([
     'title'
   ]),
   //Sort heroes based on highest win rate
   sortheroes: function()
   {    
     let issorted = false;
     let temp = 0;
     while(!issorted)
     {
       issorted = true;
       for(let i=0; i<this.$store.state.herostats.length - 1; i++)
       {
             if(this.$store.state.herostats[i+1].pro_win > this.$store.state.herostats[i].pro_win)
             {
              temp = this.$store.state.herostats[i];
              Vue.set(this.$store.state.herostats, i, this.$store.state.herostats[i + 1]);
              Vue.set(this.$store.state.herostats, i + 1, temp);
              issorted = false
             }
       }
     }
      return this.$store.state.herostats
   },
  //Filter top 10 heroes
  filteredheroes: function () {
     return this.sortheroes.slice(0,10)
     },
},
}
</script>







