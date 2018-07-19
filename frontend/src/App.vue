<template>
<div class="root">
  <Header
    :currentPage="currentPage"
    @togglePage="togglePage"
  />

  <transition name="balances-move">
    <balances
      :balances="balances"
      v-show="currentPage === 'balances'"
    />
  </transition>

  <transition name="add-trans-move">
    <add-trans
      v-show="currentPage === 'addTrans'"
      :users="users"
      :wis-id="wisId"
      @addTrans="addTrans"
    />
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
    username: '',
    wisId: '',
    users: [],
    balanceGraph: [],
    transactions: [],
    currentPage: 'balances', // balances, addTrans
  }),

  computed: {
    balances () {
      return R.compose(
        R.map(({ target, value }) => ({ user: target, value })),
        R.filter(({ source }) => source === this.username),
      )(this.balanceGraph)
    }
  },

  created() { W && webliteHandler(this) },

  methods: {
    addUser() {
      requests
        .addUser(this.username, this.wisId)
        .then(this.fetchData)
    },

    togglePage() {
      this.fetchData()
      this.currentPage = (this.currentPage === 'balances') ? 'addTrans' : 'balances'
    },

    fetchData() {
      Promise.all([requests.fetchUsers(this.wisId), requests.fetchGraph(this.wisId)])
        .then(([users, graph]) => {
          this.users = R.map(R.prop('username'), users)
          this.balanceGraph = graph.balances
        })
    },

    addTrans(transObj) {
      requests.addTrans(transObj)
        .then(this.fetchData)
        .then(this.togglePage)
    }
  }
}
</script>


<style scoped>
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
</style>
