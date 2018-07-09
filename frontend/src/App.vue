<template>
<div :class="$style.root">
  <Header 
    :curPage="curPage"
    @changePage="changePage()"
  />
  <balances :balances="balances" v-if="curPage === 'balances'"/>
  <add-tans v-if="curPage === 'addTrans'" :users="users"/>
  
  <total-balance :total-balance="totalBalance" v-if="curPage === 'balances'"/>

</div>
</template>


<script>
// components
import Header from './components/Header.vue'
import TotalBalance from './components/TotalBalance.vue'
import AddTans from './components/AddTrans.vue'
import Balances from './components/Balances.vue'

// helper
import webliteHandler from './helper/functions/weblite.api'
import reqHandler from './helper/functions/requests.js'
// W
const { W } = window


export default {
  name: 'App',

  components: {
    Header,
    TotalBalance,
    Balances,
    AddTans
  },

  data: () => ({
    username: 'reza',
    users: ['reza', 'ali', 'mostafa', 'mohammad'],
    
    balanceGraph: [
      {source: 'reza', target: 'ali', value: 2000},
      {source: 'ali', target: 'reza', value: -2000},
      {source: 'reza', target: 'mostafa', value: -5000},
      {source: 'mostafa', target: 'reza', value: 5000},
      {source: 'ali', target: 'mohammad', value: 20000},
      {source: 'mohammad', target: 'ali', value: -20000}
    ],
    transactions: [],

    curPage: 'addTrans', // balances, addTrans
    wisId: undefined

  }),
  computed: {
    balances () {
      let myBalancesSubGraph = this.balanceGraph.filter(balance => balance.source === this.username )
      let myBalances = []

      for (let i = 0; i < myBalancesSubGraph.length; i++)
        myBalances.push( {user: myBalancesSubGraph[i].target,
                          value: myBalancesSubGraph[i].value} )

      return myBalances
    },
    totalBalance () {
      let sum = 0
      for (let i = 0; i < this.balances.length; i++) {
        sum += this.balances[i].value
      }

      return sum
    }
  },
  created() { 
    W && webliteHandler(this) 

    reqHandler.fetchData().then(
      res => console.log(res)
    , err => console.log('Error ' + err))
  },

  methods: {
    changePage() {
      this.curPage = (this.curPage === 'balances') ? 'addTrans' : 'balances'
    }
  }
}
</script>


<style module>
.root {
  width: 350px;
  height: 100%;
  background: rgb(77, 77, 77);
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-content: space-between;
  align-items: center;
}

.customize {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 200;
  top: 0;
  right: 0;
}
</style>
