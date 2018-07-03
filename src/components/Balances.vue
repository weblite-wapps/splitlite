<template>
<div :class="$style['balances']">
  
  <BalanceItem 
    v-for="(balanceItem, index) in balances"
    :user="balanceItem.user"
    :value="balanceItem.value"
    :key="index"
  />

</div>
</template>


<script>
import BalanceItem from './BalanceItem.vue'

export default {
  name: 'Balances',
  props: {
    balances: Array
  },
  components: {
      BalanceItem
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

  overflow-x: hidden;
  overflow-y: scroll;
}

::-webkit-scrollbar {
  display: none;
}

</style>
