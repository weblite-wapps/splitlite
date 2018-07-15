<template>
<div :class="$style['sources']">
  <div :class="$style['section-label']"> Sources </div>
  <div :class="$style['input-items']">
    <div v-for="(source, index) in sources" :key="index">
        <SourceInput
          :users="users"
          :sources="sources"
          :index="index"
          @remove="$emit('remove', index)"
        />
    </div>
    <div :class="[$style['add-user'], 'noselect']">
        <i @click="$emit('add')"> add </i>
    </div>
  </div>
</div>
</template>


<script>
// Components
import SourceInput from './SourceInput.vue'

export default {
  name: 'SourcesSelect',
  components: {
    SourceInput
  },
  props: ['sources', 'users']
}
</script>


<style module>
.sources {
  width: 330px;
  max-height: 42%;
  min-height: 42%;

  color: white;
  border: none;
  border-bottom: 1px rgba(143, 143, 143, 0.233) solid;

  display: flex;
  flex-direction: column;

  margin-bottom: 10px;
  overflow: hidden;

  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.section-label {
  letter-spacing: 1px;
  margin-bottom: 5px;
  color: rgb(167, 167, 167);
}

.input-items {
  max-height: inherit;
  min-height: inherit;

  display: flex;
  flex-direction: column;

  align-items: center;
  overflow: scroll;

  -webkit-transition: height 0.5s ease;
  transition: height 0.5s ease;
}

.add-user {
  color: rgb(230, 172, 96);
  margin-top: 10px;
  margin-bottom: 5px;
}

::-webkit-scrollbar {
  display: none;
}
</style>
