<template>
<div :class="$style['total-balance']">
  <div :class="$style['total-balance-caption']"> 
      Total Balance :
  </div>

  <div :class="(totalBalance >= 0) ? $style['total-balance-value-positive'] : $style['total-balance-value-negative']"> 
      {{ getPresentingForm(totalBalance) }}
  </div>
</div>
</template>


<script>
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
  background: rgb(255, 232, 182);
  display: flex;
  flex-direction: row;
  
  margin: 10px;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
}

.total-balance-caption {
  font-size: 16px;
}

.total-balance-value-positive {
    color: rgb(14, 134, 14);
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
