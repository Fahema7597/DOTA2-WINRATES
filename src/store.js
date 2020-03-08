import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store(
    {
        //state
        state:{
           title: "DOTA2 TOP 10 WIN RATES",
           herostats: window.localStorage.getItem('heroStats'),
           winrate: 0,
           loading: true,
        },
        //actions
        actions: {
            //loads the API data and commits 
            loadData({
              commit
            }) {
              axios.get("https://api.opendota.com/api/heroStats/?_limit=10")
                .then((response) => {
                commit('updateHeroStats', response.data)
                commit('changeLoadingState', false)
              })
            },
          },

          //mutations
          mutations: {
            //Calculates winrate % and Stores the Hero stats
            updateHeroStats(state, herostats) {
                {        
                   for(let i = 0; i < herostats.length; i++)
                  {
                 state.winrate = ((herostats[i].pro_win / herostats[i].pro_pick) * 100); 
                 herostats[i].pro_win = (state.winrate.toFixed(2));
                 state.winrate = 0
                  }
                  state.herostats = herostats
                  window.localStorage.setItem('heroStats', herostats);
                 }                   
                },
            //loading stops after fetching data from API (set = false)
            changeLoadingState(state, loading) {
                state.loading = loading
              },
          },
    }
)


  