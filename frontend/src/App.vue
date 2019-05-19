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
        :connection-state="connectionState"
        @addTrans="addTrans"
      />
    </transition>
  </div>
</template>


<script>
// components
import AddTrans from './components/AddTrans.vue'
import Balances from './components/Balances.vue'
import Header from './components/Header.vue'
// helper
import webliteHandler from './helper/functions/weblite.api'
import requests from './helper/functions/requests.js'
// bus
import { bus } from './main.js'

// W
const { W, R } = window


export default {
  name: 'App',

  components: {
    Balances,
    AddTrans,
    Header,
  },

  data: () => ({
    username: '',
    wisId: '',
    users: [],
    balanceGraph: [],
    transactions: [],
    currentPage: 'balances', // balances, addTrans
    connectionState: 'none' // connected, none, disConnected
  }),

  computed: {
    balances () {
      return R.compose(
        R.map(({ target, value }) => ({ user: target, value })),
        R.filter(({ source, value }) => source === this.username && value),
      )(this.balanceGraph)
    }
  },

  created() {
    W && webliteHandler(this)
    !W && this.addUser()
  },

  methods: {
    toggleConnectionWarning() {
      this.connectionState = 'disConnected'
      setTimeout(() => this.connectionState = 'none', 2000)
    },

    addUser() {
      requests
        .addUser(this.username, this.wisId)
        .then(this.fetchData)
        .catch(this.toggleConnectionWarning)
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
        .catch(this.toggleConnectionWarning)
    },

    addTrans(transObj) {
      requests.addTrans(transObj)
        .then(this.fetchData)
        .then(() => {
          this.togglePage()
          bus.$emit('resetTransState')
        })
        .catch(this.toggleConnectionWarning)
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
