<template>
<div :class="$style['balance-item']">
  <div :class="$style['balance-item-name']">
      {{ user }}
  </div>

  <div :class="(value <= 0) ? $style['balance-item-value-positive'] : $style['balance-item-value-negative']">
      {{ getPresentingForm(value) }}
  </div>
</div>
</template>


<script>
// Mixin
import pricePresenterMixin from '../mixins/pricePresenterMixin.js'

export default {
  name: 'BalanceItem',

  mixins: [pricePresenterMixin],

  props: ['user', 'value'],
}
</script>


<style module>
.balance-item {
  width: 316px;
  min-height: 50px;
  background: rgb(207, 207, 207);
  background: #EAEAEA;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 7px;
  margin-bottom: 10px;
  border-radius: 2px;
  box-shadow: 0px 2px 5px 1px rgba(32, 32, 32, 0.514);
}

.balance-item-name {
  font-size: 16px;
  color: rgb(77, 77, 77)
}

.balance-item-value-positive {
  color: rgb(14, 134, 14);
}

.balance-item-value-negative {
  color: rgb(224, 13, 13);
}

.balance-item-value-positive::before {
  content: '+';
}

.balance-item-value-negative::before {
  content: '-';
}

.balance-item-value-positive::after, .balance-item-value-negative::after {
  content: 'T';
}
</style>
