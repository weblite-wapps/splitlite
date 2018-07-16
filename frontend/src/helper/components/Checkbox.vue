<template>
<div :class="[$style.root, 'noselect']" @click="$emit('click')">
    <div :class="[$style['checkbox'], checked ? $style['selected'] : $style['unselected']]"/>
    <span :class="$style['label']"> {{ label }} </span>
</div>
</template>


<script>
export default {
  name: 'AddButton',
  
  props: ['label', 'checked'],
}
</script>


<style module>
.root {
  margin-left: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.label {
  letter-spacing: 1px;
  color: rgb(240, 237, 206);
  font-size: 14px;
}

.checkbox.unselected {
  width: 15px;
  height: 16px;
  border: 1px solid rgb(240, 189, 21);
  border-radius: 5px;
  margin-right: 5px;
  cursor: pointer;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}
.checkbox.selected {
  width: 15px;
  height: 16px;
  background: rgb(240, 189, 21);
  border: 1px solid rgb(240, 189, 21);
  border-radius: 5px;
  margin-right: 5px;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}
</style>
