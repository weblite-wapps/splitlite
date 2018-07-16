<template>
<div :class="$style['title']">
  <span :class="$style['title-label']"> </span>
  <input 
    :class="$style['text-input']" 
    v-model="title"
    placeholder="Title"/>
</div>
</template>


<script>
export default {
  name: 'Header',

  watch: {
    title(newTitle) {
      this.$emit('update:title', newTitle)
    }
  },
  
  data: () => ({
    title: ''
  })
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
