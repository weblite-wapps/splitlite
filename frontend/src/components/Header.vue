<template>
<div :class="$style.header">
  <transition name="add-trans-header-move">
    <div v-show="currentPage === 'addTrans'" :class="$style['header-section']">
      <i :class="[$style['header-icon'], 'noselect']" @click="$emit('togglePage')">
        keyboard_arrow_left
      </i>
      <span :class="$style['header-title']">Add Transaction</span>
    </div>
  </transition>

  <transition name="balances-header-move">
    <div v-show="currentPage === 'balances'" :class="$style['header-section']">
      <span :class="$style['header-title']">SplitLite</span>
      <i :class="[$style['header-add'], 'noselect']" @click="$emit('togglePage')">
        add
      </i>
    </div>
  </transition>
</div>
</template>


<script>
export default {
  name: 'Header',

  props: ['currentPage'],
}
</script>


<style module>
.header {
  width: 350px;
  background: linear-gradient(#FACC43, #FABC09);
  position: absolute;
  top: 0;
}

.header-section {
  width: 330px;
  min-height: 50px;
  max-height: 50px;
  background: linear-gradient(#FACC43, #FABC09);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  position: inherit;
}

.header-title {
  font-size: 16px;
  font-weight: 530;
  letter-spacing: 1.5px;
  margin-right: 5px;
  margin-left: 5px;
  color: black;
}

.header-icon {
  margin-left: -7px;
}
</style>
