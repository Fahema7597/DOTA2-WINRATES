<template>
  <div>
   <h1 id="title">{{ title }}</h1>
   <img 
   id="dota2Icon"
   src="../.././style/dota2Icon.png" width="70px" height="70px"/> 
 
   <!-- Element UI -->   
    <el-input
    style="marginBottom: 40px"
    v-model="search"
    placeholder="Search your hero"
    prefix-icon="el-icon-search"/> 
  <div>
  <el-switch
  v-model="isHidden"
  active-text="WIN RATE LINE CHART"
  inactive-text="HIDE LINE CHART"
  style="marginBottom: 40px">
</el-switch>
  <h1 v-if="isHidden"><visualization/></h1>
</div>
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
    <el-table-column prop="pro_win" label="WIN RATE PERCENT">
   <template slot-scope="props"> 
    <el-progress :percentage="props.row.pro_win" :format="format"></el-progress>
   </template>
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
      isHidden: false
  }},

 methods: {
      format(percentage) {
        return percentage === 100 ? 'Full' : `${percentage}%`;
      },
    },

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

  //Filter top 10 heroes
  filteredheroes: function () { 
     return this.$store.state.herostats.slice(0,10)
     },
},
}
</script>







