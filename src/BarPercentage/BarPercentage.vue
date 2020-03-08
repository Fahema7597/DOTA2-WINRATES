<template>
<div if="linChart">
	<line-chart
  :labels="labels"
  :datasets="datasets"></line-chart>
</div>
</template>

<script>
import Vue from 'vue'
import VueChartJs from 'vue-chartjs'
export default{
  name: "BarPercentage",
}
Vue.component('line-chart', {
  extends: VueChartJs.Line,
computed: {

  //Filter top 10 heroes
  filteredheroes: function () {
     return this.$store.state.herostats.slice(0,10)
     },
},
  mounted () {  
     let arrNames=[]
     let arrWinRates=[]
     for(let i=0; i<this.filteredheroes.length ; i++)
     {
            arrNames.push(this.filteredheroes[i].localized_name)
            arrWinRates.push(this.filteredheroes[i].pro_win)
     }
    this.renderChart(  
      {
        labels: arrNames,
        datasets: [
        {
          label: 'WIN RATE',
          backgroundColor: '#f87979',
          data: arrWinRates
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  },
  
}),

new Vue({
  el: '.lineChart',
  data: {
    message: 'Hello World'
  }
})
</script>

