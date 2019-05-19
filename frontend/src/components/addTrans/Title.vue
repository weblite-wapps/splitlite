<template>
  <div :class="$style['title']">
    <span :class="$style['title-label']" />

    <input 
      :class="$style['text-input']" 
      v-model="title"
      placeholder="Title"
    />
  </div>
</template>


<script>
// bus
import { bus } from '../../main.js'

export default {
  name: 'Header',
  
  data: () => ({
    title: ''
  }),

  watch: {
    title(newTitle) {
      this.$emit('update:title', newTitle)
    }
  },

  created() { bus.$on('resetTransState', () => this.title = '') },
}
</script>


<style module>
.title {
  width: 330px;
  min-height: 40px;
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px;
  padding-bottom: 2px;
}

.text-input {
  background: none;
  border: none;
  border-bottom: 1px gray solid;
  color: lightgray;
  min-width: 100%;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  font-weight: 200;
  font-size: 16px;
  letter-spacing: .9px;
  text-align: justify;
  -moz-text-align-last: center;
  text-align-last: center;
}

.text-input:focus {
  outline: none;
  border-bottom: 1.2px rgb(255, 233, 136) solid;
}
</style>
