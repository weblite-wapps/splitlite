<template>
<div :class="$style['type-section']">
  <span :class="$style['split-caption']"> split type </span>
  <div :class="$style['types']">
  <div :class="[$style['split-type'], 'noselect']" @click="changeType('equally')">
      <div :class="[$style['checkbox'], splitType == 'equally' ? $style['selected'] : $style['unselected']]"/>
      <span :class="$style['split-label']"> Equally </span>
  </div>
  <div :class="[$style['split-type'], 'noselect']" @click="changeType('unequally')">
      <div :class="[$style['checkbox'], splitType == 'unequally' ? $style['selected'] : $style['unselected']]"/>
      <span :class="$style['split-label']"> UnEqually </span>
  </div>
  </div>
</div>
</template>


<script>
export default {
  name: 'TypeSelection',

  props: ['splitType'],

  data: () => ({
    title: ''
  }),

  methods: {
    changeType(type) {
      console.log('type changed to' + type)
      this.$emit('update:splitType', type)
    }
  }
}
</script>


<style module>
.type-section {
  width: 330px;
  min-height: 40px;
  color: white;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  position: relative;
  bottom: 0px;
}

.types {
  display: flex;
  flex-direction: row;
  max-height: 20px;
}

.split-type {
  margin-left: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.split-caption {
  letter-spacing: 1px;
  margin-bottom: 5px;
  color: rgb(167, 167, 167);
}

.split-label {
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
