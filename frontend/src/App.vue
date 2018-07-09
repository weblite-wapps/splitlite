<template>
<div :class="$style.root">
  <Header 
    :curPage="curPage"
    @changePage="changePage()"
  />
  <balances :balances="balances" v-if="curPage === 'balances'"/>
  <keep-alive>
    <add-trans v-if="curPage === 'addTrans'" :users="users"/>
  </keep-alive>
  
  <total-balance :total-balance="totalBalance" v-if="curPage === 'balances'"/>

</div>
</template>


<script>
// components
import Header from './components/Header.vue'
import TotalBalance from './components/TotalBalance.vue'
import AddTrans from './components/AddTrans.vue'
import Balances from './components/Balances.vue'

// helper
import webliteHandler from './helper/functions/weblite.api'
import reqHandler from './helper/functions/requests.js'
// W
const { W, R } = window


export default {
  name: 'App',

  components: {
    Header,
    TotalBalance,
    Balances,
    AddTrans
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
      const myBalancesSubGraph = this.balanceGraph.filter(balance => balance.source === this.username )

      return R.map(balance => ({ user: balance.target, value: balance.value }),
                  myBalancesSubGraph)
    },
    totalBalance () {
      return R.sum(R.map(balance => balance.value ,this.balances))
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
