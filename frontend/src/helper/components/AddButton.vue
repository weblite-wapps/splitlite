<template>
<div :class="$style['button-container']" @click="$emit('click')">
  {{ label }}
</div>
</template>


<script>
export default {
  name: 'AddButton',
  props: ['label'],
}
</script>


<style module>
.button-container {
  width: inherit;
  min-height: 50px;
  background: inherit;
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  background: #2582b8;
  color: white;

  position: fixed;
  bottom: 0;
}

.button-container:hover {
  color: black;
}
</style>
