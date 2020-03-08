<template>
<div if="lineChart">
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
  mounted () {
    this.renderChart(  
      {
        labels: [this.filteredheroes[0].localized_name,this.filteredheroes[1].localized_name,this.filteredheroes[2].localized_name,this.filteredheroes[3].localized_name
        ,this.filteredheroes[4].localized_name,this.filteredheroes[5].localized_name,this.filteredheroes[6].localized_name,this.filteredheroes[7].localized_name,this.filteredheroes[8].localized_name,this.filteredheroes[9].localized_name],
        datasets: [
        {
          label: 'WIN RATE',
          backgroundColor: '#f87979',
          data: [this.filteredheroes[0].pro_win,this.filteredheroes[1].pro_win,this.filteredheroes[2].pro_win,this.filteredheroes[3].pro_win,this.filteredheroes[4].pro_win
          ,this.filteredheroes[5].pro_win,this.filteredheroes[6].pro_win,this.filteredheroes[7].pro_win,this.filteredheroes[8].pro_win,this.filteredheroes[9].pro_win],
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

