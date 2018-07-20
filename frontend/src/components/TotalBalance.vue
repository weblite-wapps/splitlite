<template>
<div :class="$style['total-balance']">
  <div :class="$style['total-balance-caption']">
      Total Balance
  </div>

  <div :class="$style[`total-balance-value-${(totalBalance <= 0) ? 'positive' : 'negative'}`]">
      {{ getPresentingForm(totalBalance) }}
  </div>
</div>
</template>


<script>
// Mixin
import pricePresenterMixin from '../mixins/pricePresenterMixin.js'

export default {
  name: 'TotalBalance',

  mixins: [pricePresenterMixin],

  props: ['totalBalance'],
}
</script>


<style module>
.total-balance {
  width: 310px;
  min-height: 50px;
  background: linear-gradient(rgb(236, 192, 60), rgb(221, 166, 2));
  display: flex;
  flex-direction: row;
  margin: 10px auto;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  border-radius: 2px;
  position: fixed;
  bottom: 0;
}

.total-balance-caption {
  font-size: 16px;
}

.total-balance-value-positive {
    color: rgb(14, 138, 14);
}

.total-balance-value-negative {
    color: rgb(224, 13, 13);
}

.total-balance-value-positive::before {
  content: '+';
}

.total-balance-value-negative::before {
  content: '-';
}

.total-balance-value-positive::after, .total-balance-value-negative::after {
  content: 'T';
}

</style>
