<template>
<div :class="$style['type-section']">
  <span :class="$style['split-caption']"> split type </span>
  
  <div :class="$style['types']">
    <checkbox
      label="Equally"
      :checked="splitType == 'equally'"
      @click="changeType('equally')"
    />

    <checkbox
      label="UnEqually"
      :checked="splitType == 'unequally'"
      @click="changeType('unequally')"
    />
  </div>
</div>
</template>


<script>
// Components
import Checkbox from '../../helper/components/Checkbox.vue'


export default {
  name: 'TypeSelection',

  components: {
      Checkbox
    },

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

.split-caption {
  letter-spacing: 1px;
  margin-bottom: 5px;
  color: rgb(167, 167, 167);
}
</style>
