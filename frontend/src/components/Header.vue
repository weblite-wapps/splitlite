<template>
<div :class="$style.header">
  <div v-if="curPage === 'balances'" :class="$style['header-balances']">
    <span :class="$style['header-title']">SplitLite</span>
    <i :class="[$style['header-add'], 'noselect']" @click="$emit('changePage')">
      add
    </i>
  </div>

  <div v-if="curPage === 'addTrans'" :class="$style['header-add-trans']">
    <i :class="[$style['header-icon'], 'noselect']" @click="$emit('changePage')">
      undo
    </i>
    <span :class="$style['header-title']">Add Transaction</span>
  </div>

</div>
</template>


<script>
export default {
  name: 'Header',
  props: ['curPage'],
}
</script>


<style module>
.header {
  width: inherit;
}

.header-balances {
  min-height: 50px;

  background: rgb(233, 168, 27);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}

.header-add-trans {
  min-height: 50px;

  background: rgb(233, 168, 27);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}

.header-title {
  font-size: 16px;
  font-weight: 530;
  letter-spacing: 1.5px;

  padding-left: 10px;
}

.header-icon {
  padding-right: 10px;
}
</style>
