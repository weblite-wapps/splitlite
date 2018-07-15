<template>
<div :class="$style.root">
  <Header 
    :curPage="curPage"
    @changePage="changePage()"
  /> 
  <transition name="balances-move">
    <keep-alive>
      <balances 
        :balances="balances" 
        v-if="curPage === 'balances'"
      />
    </keep-alive>
  </transition>
  <transition name="add-trans-move">
    <keep-alive>
      <add-trans 
        v-if="curPage === 'addTrans'" 
        :users="users" 
        :wis-id="wisId"
        @addTrans="addTrans"
      />
    </keep-alive>
  </transition>
</div>
</template>


<script>
// components
import Header from './components/Header.vue'

import AddTrans from './components/AddTrans.vue'
import Balances from './components/Balances.vue'

// helper
import webliteHandler from './helper/functions/weblite.api'
import requests from './helper/functions/requests.js'
// W
const { W, R } = window


export default {
  name: 'App',

  components: {
    Header,
    Balances,
    AddTrans
  },

  data: () => ({
    username: 'radium',
    users: [],
    
    balanceGraph: [],
    transactions: [],

    curPage: 'balances', // balances, addTrans
    wisId: "0"

  }),
  computed: {
    balances () {
      const myBalancesSubGraph = this.balanceGraph.filter(balance => balance.source === this.username )

      return R.map(balance => ({ user: balance.target, value: balance.value }),
                  myBalancesSubGraph)
    }
  },
  created() { 
    W && webliteHandler(this) 

    requests.addUser(this.username, this.wisId)
      .then(this.fetchData)
      .catch(console.log)
  },

  methods: {
    changePage() {
      this.fetchData()
      this.curPage = (this.curPage === 'balances') ? 'addTrans' : 'balances'
    },
    fetchData() {
      requests.fetchUsers(this.wisId)
        .then(users => {
          this.users = R.map(user => user.username, users)
          return requests.fetchGraph(this.wisId)
        })
        .then(graph => {
          this.balanceGraph = graph.balances
        })
        .catch(console.log)
    },
    addTrans(transObj) {
      requests.addTrans(transObj)
        .then(this.fetchData)
        .then(() => {
          this.changePage()
        })
        .catch(console.log)
    }
  }
}
</script>


<style module>
.root {
  width: 350px;
  height: 100%;
  background: rgb(85, 85, 85);
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-content: space-between;
  align-items: center;

  position: absolute;
  top: 0;
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
