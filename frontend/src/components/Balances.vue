<template>
<div :class="$style['balances']">
  <div :class="$style['items']">
    <BalanceItem
      v-for="(balanceItem, index) in balances"
      :user="balanceItem.user"
      :value="balanceItem.value"
      :key="index"
    />
  </div>

  <total-balance :total-balance="totalBalance" />
</div>
</template>


<script>
// Components
import TotalBalance from './TotalBalance.vue'
import BalanceItem from './BalanceItem.vue'
// R
const { R } = window


export default {
  name: 'Balances',

  props: {
    balances: Array
  },

  components: {
      BalanceItem,
      TotalBalance,
  },

  computed: {
    totalBalance () { return R.sum(R.pluck('value', this.balances)) },
  }
}
</script>


<style module>
.balances {
  width: 330px;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  margin-bottom: 0;
  align-items: flex-start;
  align-content: space-around;
  position: absolute;
  top: 50px;
  z-index: 10;
}

.items {
  width: 330px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: scroll;
}

::-webkit-scrollbar {
  display: none;
}

</style>
