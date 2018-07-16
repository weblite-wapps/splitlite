<template>
<div v-if="show === true" :class="$style['warning']">
  <span> <i> warning </i> </span>
  <span :class="$style['warning-text']"> {{ message }} </span>
</div>
</template>


<script>
export default {
  name: 'Warning',

  props: ['show', 'message'],
}
</script>


<style module>
.warning {
  width: 320px;
  min-height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #e42b2b;
  color: white;
  padding: 0 15px;
  position: fixed;
  bottom: 0;
}

.warning-text {
  max-width: 250px;
  padding-left: 15px;
}
</style>
